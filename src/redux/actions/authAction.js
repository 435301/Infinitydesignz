
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

      const token = response.data.token;
      localStorage.setItem('token', token);

      dispatch({ type: LOGIN_SUCCESS, payload: token });
      window.location.href = '/dashboard';

    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: 'Invalid email or password' });
    }
  };
};
