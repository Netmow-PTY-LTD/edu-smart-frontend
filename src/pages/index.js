require('dotenv').config();

import HomeUniversities from '@/components/clientSite/agent/Home/HomeUniversities';
import HeroSection from '@/components/main/home/HeroSection';
import MainLayout from '@/components/main/layout';
import OurServices from '@/components/main/home/OurServices';
import Layout from '@/components/main/layout';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import StudyAbroadBanner from '@/components/main/home/StudyAbroadBanner';
import PopularCourses from '@/components/main/home/PopularCourses';
import BlogSection from '@/components/main/home/BlogSection';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <MainLayout>
      <HeroSection />
      <HomeUniversities />
      <OurServices />
      <PopularCourses />
      <StudyAbroadBanner />
      <BlogSection />
    </MainLayout>
  );
};

export default HomePage;
