import Cookies from 'js-cookie';
import { verifyToken } from './verifyToken';

export const cureentUser = () => {
  const token = Cookies.get('token');
  const user = verifyToken(token);

  return user;
};
