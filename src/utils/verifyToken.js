import { jwtDecode } from 'jwt-decode';

export const verifyToken = (token) => {
  if (!token || typeof token !== 'string') {
    console.warn('Invalid token: Token is missing or not a string.');
    return null;
  }

  try {
    const decoded = jwtDecode(token);

    // Check if token has expired
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      console.warn('Token has expired.');
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
};
