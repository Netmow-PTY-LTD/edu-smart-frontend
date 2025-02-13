require('dotenv').config();

import HomeUniversities from '@/components/clientSite/agent/Home/HomeUniversities';
import HeroSection from '@/components/main/home/HeroSection';
import MainLayout from '@/components/main/layout';
import OurServices from '@/components/main/home/OurServices';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import StudyAbroadBanner from '@/components/main/home/StudyAbroadBanner';
import PopularCourses from '@/components/main/home/PopularCourses';
import BlogSection from '@/components/main/home/BlogSection';
import { useEffect } from 'react';
import { useSubscribeNewsLetterMutation } from '@/slice/services/public/newsLetter/newsLetterSubscriptionPublic';
import { toast } from 'react-toastify';
import HeroSectionSlider from '@/components/main/home/HeroSectionSlider';

const HomePage = () => {
  const router = useRouter();
  const { query } = router;

  const [subscribe] = useSubscribeNewsLetterMutation();

  useEffect(() => {
    const subscribeFunction = async () => {
      try {
        if (query.code && query.email) {
          const result = await subscribe({
            code: parseInt(query.code),
            email: query.email,
          }).unwrap();

          if (result) {
            toast.success(result?.message);
            router.replace(router.pathname, undefined, { shallow: true }); // Remove query params
          }
        }
      } catch (error) {
        const errorMessage = error?.data?.message;
        toast.error(errorMessage);
      }
    };

    subscribeFunction();
  }, [query.code, query.email, subscribe, router]);

  return (
    <MainLayout>
      {/* <HeroSection /> */}
      <HeroSectionSlider />
      <HomeUniversities />
      <OurServices />
      <PopularCourses />
      <StudyAbroadBanner />
      <BlogSection />
    </MainLayout>
  );
};

export default HomePage;
