import AboutUniversity from '@/components/clientSite/university/AboutUniversity';
import HeroHome from '@/components/clientSite/university/HeroHome';
import UniversityFAQ from '@/components/clientSite/university/UniversityFAQ';
import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import UniversityPictureGallery from '@/components/clientSite/university/UniversityPictureGallery';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import React from 'react';

export default function UniversityHome() {
  const { data: universityData } = useGetAllUniversityQuery();
  return (
    <UniversityLayout>
      <HeroHome />
      <AboutUniversity />
    </UniversityLayout>
  );
}
