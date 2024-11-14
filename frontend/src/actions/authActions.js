import axios from '../utils/axios';

export const register = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users/register', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'REGISTER_FAIL', payload: err.response.data });
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users/login', credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    dispatch({ type: 'LOGIN_FAIL', payload: err.response.data });
  }
};
