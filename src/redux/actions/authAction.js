
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post('http://68.183.89.229:4005/auth/login', {
        email,
        password
      });

      console.log('response', response)
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      dispatch({ type: LOGIN_SUCCESS, payload: token });
      window.location.href = '/admin/dashboard';

    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: 'Invalid email or password' });
    }
  };
};
