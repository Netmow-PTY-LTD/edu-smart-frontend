import Cookies from 'js-cookie';
import { verifyToken } from './verifyToken';

export const currentUser = () => {
  const token = Cookies.get('token');

  if (!token || typeof token !== 'string') {
    console.warn('No valid token found in cookies. User is not logged in.');
    return null;
  }

  try {
    const user = verifyToken(token);

    if (!user) {
      console.warn('Token is invalid or expired.');
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
