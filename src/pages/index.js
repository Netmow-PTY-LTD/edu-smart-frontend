require('dotenv').config();

import HeroSection from '@/components/main/home/HeroSection';
import OurServices from '@/components/main/home/OurServices';
import Layout from '@/components/main/layout';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import StudyAbroadBanner from '@/components/main/home/StudyAbroadBanner';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Layout>
      <HeroSection />
      <OurServices />
      <StudyAbroadBanner />
    </Layout>
  );
};

export default HomePage;
