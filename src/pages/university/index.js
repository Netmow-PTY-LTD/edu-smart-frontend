import AboutUniversity from '@/components/clientSite/university/AboutUniversity';
import HeroHome from '@/components/clientSite/university/HeroHome';
import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import React from 'react';

export default function UniversityHome() {
  return (
    <UniversityLayout>
      <HeroHome />
      <AboutUniversity />
    </UniversityLayout>
  );
}
