import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmails } from '../actions/emailActions';

const EmailList = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.list);

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  return (
    <div>
      <h2>Inbox</h2>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            <strong>{email.sender}</strong>: {email.subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
