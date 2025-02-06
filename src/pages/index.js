require('dotenv').config();

import HomeUniversities from '@/components/clientSite/agent/Home/HomeUniversities';
import HeroSection from '@/components/main/home/HeroSection';
import MainLayout from '@/components/main/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <MainLayout>
      <HeroSection />
      <HomeUniversities />
    </MainLayout>
  );
};

export default HomePage;
