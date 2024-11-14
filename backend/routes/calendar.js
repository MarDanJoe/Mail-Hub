const express = require('express');
const passport = require('passport');
const { google } = require('googleapis');

const router = express.Router();

// OAuth2 Client Setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// Get Calendar Events
router.get(
  '/events',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      oauth2Client.setCredentials({ access_token: req.user.googleAccessToken });
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
      const events = await calendar.events.list({ calendarId: 'primary' });
      res.json({ success: true, events: events.data.items });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

module.exports = router;
