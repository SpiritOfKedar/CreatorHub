const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const connectDB = require('../config/db');
const User = require('../models/User');

const ADMIN_EMAIL = 'adminpurple@gmail.com';
const ADMIN_PASSWORD = 'Admin123';
const ADMIN_PHONE = '+10000000099';
const ADMIN_USERNAME = 'adminpurple';

async function seedAdmin() {
  try {
    await connectDB();

    let user = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

    if (!user) {
      user = await User.create({
        name: 'Purple Admin',
        username: ADMIN_USERNAME,
        phone: ADMIN_PHONE,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin',
        isVerified: true,
        countryOfResidence: 'All courses',
      });

      console.log('Admin created:', user.email);
      process.exit(0);
      return;
    }

    user.name = 'Purple Admin';
    user.role = 'admin';
    user.isVerified = true;

    if (!user.username) user.username = ADMIN_USERNAME;
    if (!user.phone) user.phone = ADMIN_PHONE;

    user.password = ADMIN_PASSWORD;
    await user.save();

    console.log('Admin updated:', user.email);
    process.exit(0);
  } catch (error) {
    console.error('Admin seeding failed:', error.message);
    process.exit(1);
  }
}

seedAdmin();
