import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendEmail } from '../actions/emailActions';
import { encryptMessage } from '../utils/encryption';

const ComposeEmail = () => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();

  const handleSend = async () => {
    // Placeholder for recipient public key retrieval logic
    const recipientPublicKey = await fetchRecipientPublicKey(recipients);
    const encryptedBody = await encryptMessage(recipientPublicKey, body);

    dispatch(sendEmail({
      recipients: recipients.split(',').map((email) => email.trim()),
      subject,
      body: encryptedBody,
    }));
  };

  const fetchRecipientPublicKey = async (recipient) => {
    // Fetch public key logic (placeholder)
    return '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----';
  };

  return (
    <div>
      <h2>Compose Email</h2>
      <input
        type="text"
        placeholder="Recipients"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ComposeEmail;
