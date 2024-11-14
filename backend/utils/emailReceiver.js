const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const db = require('../models');

const imap = new Imap({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: process.env.IMAP_HOST,
  port: 993,
  tls: true,
});

function openInbox(cb) {
  imap.openBox('INBOX', false, cb);
}

imap.once('ready', () => {
  openInbox((err, box) => {
    if (err) throw err;

    imap.on('mail', (numNewMsgs) => {
      const fetch = imap.seq.fetch(`${box.messages.total - numNewMsgs + 1}:*`, {
        bodies: '',
        markSeen: true,
      });

      fetch.on('message', (msg, seqno) => {
        msg.on('body', async (stream) => {
          const parsed = await simpleParser(stream);

          await db.Email.create({
            sender: parsed.from.text,
            recipients: parsed.to.value.map((to) => to.address),
            subject: parsed.subject,
            body: parsed.text,
            userId: /* Find user by email */1001,
          });
        });
      });
    });
  });
});

imap.connect();
