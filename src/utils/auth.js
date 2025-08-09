
// export const getToken = () => localStorage.getItem("access_token");

// export const setToken = (token) => {
//   localStorage.setItem("access_token", token);
// };

// export const isLoggedIn = () => !!getToken();


import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "access_token";
const EXP_SKEW_SECONDS = 30; // small grace to handle clock skew

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token); // exp is seconds since epoch
    if (!exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return exp <= now + EXP_SKEW_SECONDS;
  } catch {
    return true; // invalid/undecodable token => treat as expired
  }
};

export const isLoggedIn = () => {
  const expired = isTokenExpired(); // call it once
  if (expired) clearToken();
  return !expired;
};
