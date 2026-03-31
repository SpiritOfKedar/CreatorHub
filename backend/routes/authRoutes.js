const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  requestOtp, 
  verifyOtp, 
  setRole,
  forgotPassword,
  resetPassword 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Step 1: Register (creates user + sends OTP)
router.post('/register', registerUser);

// Step 2: Resend OTP
router.post('/request-otp', requestOtp);

// Step 3: Verify OTP (marks verified + returns token)
router.post('/verify-otp', verifyOtp);

// Step 4: Set role after role selection (protected)
router.patch('/set-role', protect, setRole);

// Traditional login
router.post('/login', loginUser);

// Password Reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
