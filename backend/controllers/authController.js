const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');
const Creator = require('../models/Creator');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// --- In-Memory OTP Stores ---
const otpStore = new Map();
const requestRateLimits = new Map();

// --- Nodemailer Setup ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Helper utilities
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const hashValue = (val) => crypto.createHash('sha256').update(val).digest('hex');

// Validation Schemas
const requestOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const verifyOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must be numeric'),
});

// =============================================
// STEP 1: Register User + Send OTP
// =============================================

// @desc    Register new user and send OTP for verification
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, username, phone, email, password } = req.body;

  // Validate all required fields
  if (!name || !username || !phone || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Check uniqueness individually
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const usernameExists = await User.findOne({ username: username.toLowerCase() });
    if (usernameExists) {
      return res.status(400).json({ success: false, message: 'This username is already taken' });
    }

    const phoneExists = await User.findOne({ phone: phone.trim() });
    if (phoneExists) {
      return res.status(400).json({ success: false, message: 'An account with this phone number already exists' });
    }

    // Create user (unverified)
    const user = await User.create({
      name,
      username: username.toLowerCase(),
      phone: phone.trim(),
      email: email.toLowerCase(),
      password,
      isVerified: false,
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid user data' });
    }

    // Generate OTP
    const now = Date.now();
    const rawOtp = generateOTP();
    const hashedOtp = hashValue(rawOtp);

    otpStore.set(email.toLowerCase(), {
      hashedOtp,
      expiry: now + 5 * 60 * 1000,
      attempts: 0,
      lastSent: now,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Renown" <noreply@renown.com>',
      to: email,
      subject: 'Your Renown Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Verify your email address</h2>
          <p style="color: #555; font-size: 16px;">Hello ${name},</p>
          <p style="color: #555; font-size: 16px;">Welcome to Renown! Here is your verification code:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #f95c4b; background-color: #f6f4f1; padding: 10px 20px; border-radius: 8px;">${rawOtp}</span>
          </div>
          <p style="color: #555; font-size: 16px;">This code will expire in 5 minutes.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">If you didn't request this code, you can safely ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: 'Account created! OTP sent to your email for verification.',
      email: user.email,
    });

  } catch (error) {
    console.error('registerUser error:', error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ success: false, message: `An account with this ${field} already exists` });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// STEP 2: Request OTP
const requestOtp = async (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const ipData = requestRateLimits.get(ip) || { count: 0, resetTime: now + 15 * 60 * 1000 };
    if (now > ipData.resetTime) {
      ipData.count = 0;
      ipData.resetTime = now + 15 * 60 * 1000;
    }
    if (ipData.count >= 5) {
      return res.status(429).json({ success: false, message: 'Too many requests. Please try again later.' });
    }
    ipData.count += 1;
    requestRateLimits.set(ip, ipData);

    const parsed = requestOtpSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: parsed.error.errors[0].message });
    }
    const { email } = parsed.data;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email.' });
    }

    const existingOTP = otpStore.get(email.toLowerCase());
    if (existingOTP && now - existingOTP.lastSent < 30 * 1000) {
      return res.status(429).json({ success: false, message: 'Please wait 30 seconds before requesting a new OTP' });
    }

    const rawOtp = generateOTP();
    const hashedOtp = hashValue(rawOtp);

    otpStore.set(email.toLowerCase(), {
      hashedOtp,
      expiry: now + 5 * 60 * 1000,
      attempts: 0,
      lastSent: now,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Renown" <noreply@renown.com>',
      to: email,
      subject: 'Your Renown Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Verify your email address</h2>
          <p style="color: #555; font-size: 16px;">Hello,</p>
          <p style="color: #555; font-size: 16px;">Here is your verification code:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #f95c4b; background-color: #f6f4f1; padding: 10px 20px; border-radius: 8px;">${rawOtp}</span>
          </div>
          <p style="color: #555; font-size: 16px;">This code will expire in 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error('requestOtp error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while sending OTP' });
  }
};

// STEP 3: Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const now = Date.now();
    const parsed = verifyOtpSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ success: false, message: parsed.error.errors[0].message });
    
    const { email, otp } = parsed.data;
    const record = otpStore.get(email.toLowerCase());
    if (!record || now > record.expiry) {
      if (record) otpStore.delete(email.toLowerCase());
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    if (record.attempts >= 5) {
      otpStore.delete(email.toLowerCase());
      return res.status(429).json({ success: false, message: 'Too many failed attempts. Please request a new OTP.' });
    }

    const incomingHash = hashValue(otp);
    if (incomingHash !== record.hashedOtp) {
      record.attempts += 1;
      otpStore.set(email.toLowerCase(), record);
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    otpStore.delete(email.toLowerCase());

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.isVerified = true;
    user.lastLogin = now;
    await user.save();

    const secret = process.env.JWT_SECRET || 'secret123';
    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '7d' });

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        countryOfResidence: user.countryOfResidence,
        token,
      }
    });

  } catch (error) {
    console.error('verifyOtp error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while verifying OTP' });
  }
};

// STEP 4: Set Role
const setRole = async (req, res) => {
  const { role } = req.body;
  if (!role || !['user', 'creator'].includes(role)) return res.status(400).json({ success: false, message: 'Invalid role.' });

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.role = role;
    await user.save();

    if (role === 'creator') {
      const existingCreator = await Creator.findOne({ userId: user._id.toString() });
      if (!existingCreator) {
        await Creator.create({
          userId: user._id.toString(),
          name: user.name,
          username: user.username,
        });
      }
    }

    const token = generateToken(user._id);
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        countryOfResidence: user.countryOfResidence,
        token,
      }
    });
  } catch (error) {
    console.error('setRole error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Traditional Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    if (!user.isVerified) return res.status(403).json({ message: 'Please verify your email first' });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        countryOfResidence: user.countryOfResidence,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      countryOfResidence: user.countryOfResidence,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No account found with this email' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@renown.app',
      to: user.email,
      subject: 'Reset your Renown password',
      html: `<p>You requested a password reset. Use this link to continue: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password are required' });
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, {
      $set: { password: hashedPassword },
      $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 },
    });
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  requestOtp,
  verifyOtp,
  setRole,
  loginUser,
  getUserProfile,
  forgotPassword,
  resetPassword,
};
