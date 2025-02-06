require('dotenv').config();

import HeroSection from '@/components/main/home/HeroSection';
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
    <Layout>
      <HeroSection />
      <OurServices />
      <PopularCourses />
      <StudyAbroadBanner />
      <BlogSection />
    </Layout>
  );
};

export default HomePage;
