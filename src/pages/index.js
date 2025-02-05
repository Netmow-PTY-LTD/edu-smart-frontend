require('dotenv').config();

import HeroSection from '@/components/main/home/HeroSection';
import Layout from '@/components/main/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Layout>
      <HeroSection />
    </Layout>
  );
};

export default HomePage;
