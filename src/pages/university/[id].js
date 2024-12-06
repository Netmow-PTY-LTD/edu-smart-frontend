import AboutUniversity from '@/components/clientSite/university/AboutUniversity';
import HeroHome from '@/components/clientSite/university/HeroHome';
import UniversityFAQ from '@/components/clientSite/university/UniversityFAQ';
import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import UniversityPictureGallery from '@/components/clientSite/university/UniversityPictureGallery';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export default function SingleUniversityHome() {
  const [university, setUniversity] = React.useState(null);
  const { data: universityData } = useGetAllUniversityQuery();
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    if (universityData?.data?.length > 0) {
      const university = universityData?.data?.find((uni) => uni._id === id);
      setUniversity(university);
    }
  }, [universityData, id]);
  return (
    <UniversityLayout>
      <HeroHome university={university} />
      <AboutUniversity university={university} />
      
      <UniversityPictureGallery />
      <UniversityFAQ />
    </UniversityLayout>
  );
}
