require('dotenv').config();
import HeroSection from '@/components/main/home/HeroSection';
import OurServices from '@/components/main/home/OurServices';
import Layout from '@/components/main/layout';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Layout>
      <HeroSection />
      <OurServices />
    </Layout>
  );
};

export default HomePage;
