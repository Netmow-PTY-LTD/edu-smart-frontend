import AboutUniversity from '@/components/clientSite/university/AboutUniversity';
import UniversityContact from '@/components/clientSite/university/Contact';
import UniversityFaculties from '@/components/clientSite/university/Faculties';
import HeroHome from '@/components/clientSite/university/HeroHome';
import SponsorHome from '@/components/clientSite/university/SponsorHome';
import UniversityFAQ from '@/components/clientSite/university/UniversityFAQ';
import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import UniversityPictureGallery from '@/components/clientSite/university/UniversityPictureGallery';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import Image from 'next/image';
import React from 'react';

export default function UniversityHome() {
  const { data: universityData } = useGetAllUniversityQuery();
  return (
    <UniversityLayout>
      <HeroHome />
      <AboutUniversity />
      <UniversityFaculties />
      <UniversityPictureGallery />
      <UniversityFAQ />
      <UniversityContact />
    </UniversityLayout>
  );
}
