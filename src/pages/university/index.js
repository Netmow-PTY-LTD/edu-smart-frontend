import UniversityLayoutBanner from '@/components/clientSite/university/common/UniversityLayoutBanner';
import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import UniversityList from '@/components/clientSite/university/UniversityList';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import React from 'react';

export default function UniversityHome() {
  const { data: universityData } = useGetAllUniversityQuery();
  return (
    <UniversityLayout>
      <UniversityLayoutBanner
        title="List of Universities"
        bgImage={'/assets/images/landing/hero/hero-image.png'}
      />
      <UniversityList universityData={universityData} />
    </UniversityLayout>
  );
}
