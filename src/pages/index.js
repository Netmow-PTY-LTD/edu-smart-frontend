require('dotenv').config();

import HomeUniversities from '@/components/clientSite/agent/Home/HomeUniversities';
import BlogSection from '@/components/main/home/BlogSection';
import HeroSectionSlider from '@/components/main/home/HeroSectionSlider';
import OurServices from '@/components/main/home/OurServices';
import PopularCourses from '@/components/main/home/PopularCourses';
import StudyAbroadBanner from '@/components/main/home/StudyAbroadBanner';
import MainLayout from '@/components/main/layout';
import { useSubscribeNewsLetterMutation } from '@/slice/services/public/newsLetter/newsLetterSubscriptionPublic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
