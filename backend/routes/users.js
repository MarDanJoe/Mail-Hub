const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const db = require('../models');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.create({ email, password });
    res.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ success: true, token: 'Bearer ' + token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2FA Setup
router.get('/2fa/setup', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  req.user.twoFactorSecret = secret.base32;
  await req.user.save();
  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.json({ success: true, qrCode: data_url, secret: secret.base32 });
  });
});

// 2FA Verify
router.post('/2fa/verify', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { token } = req.body;
  const verified = speakeasy.totp.verify({
    secret: req.user.twoFactorSecret,
    encoding: 'base32',
    token,
  });
  if (verified) {
    req.user.isTwoFactorEnabled = true;
    await req.user.save();
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid Token' });
  }
});

module.exports = router;
