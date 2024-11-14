const express = require('express');
const passport = require('passport');
const nodemailer = require('nodemailer');
const db = require('../models');

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.your-email.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@domain.com',
    pass: 'your-email-password',
  },
});

// Send Email
router.post('/send', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { recipients, subject, body } = req.body;
  const sender = req.user.email;

  const mailOptions = {
    from: sender,
    to: recipients.join(', '),
    subject,
    text: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    const email = await db.Email.create({
      sender,
      recipients,
      subject,
      body,
      userId: req.user.id,
    });
    res.json({ success: true, email });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Fetch Emails
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const emails = await db.Email.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json({ success: true, emails });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
