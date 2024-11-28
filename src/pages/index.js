require('dotenv').config();

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/login');
  }, [router]);

  return <></>;
};

export default HomePage;
