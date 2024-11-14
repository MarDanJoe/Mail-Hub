import axios from '../utils/axios';

export const fetchEmails = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/emails');
    dispatch({ type: 'FETCH_EMAILS_SUCCESS', payload: res.data.emails });
  } catch (err) {
    dispatch({ type: 'FETCH_EMAILS_FAIL', payload: err.response.data });
  }
};

export const sendEmail = (emailData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/emails/send', emailData);
    dispatch({ type: 'SEND_EMAIL_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'SEND_EMAIL_FAIL', payload: err.response.data });
  }
};
