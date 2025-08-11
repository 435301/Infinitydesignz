

import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";
const EXP_SKEW_SECONDS = 30; 

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY);

export const setAdminToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = () => {
  const token = getAdminToken();
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token); 
    if (!exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return exp <= now + EXP_SKEW_SECONDS;
  } catch {
    return true; 
  }
};

export const isAdminLoggedIn = () => {
  const expired = isTokenExpired(); 
  if (expired) clearAdminToken();
  return !expired;
};
