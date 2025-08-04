const initialState = {
  showLoginModal: false,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOGIN_MODAL":
      return { ...state, showLoginModal: true };
    case "HIDE_LOGIN_MODAL":
      return { ...state, showLoginModal: false };
    default:
      return state;
  }
};

export default LoginReducer;
