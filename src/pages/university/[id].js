import AboutUniversity from '@/components/clientSite/university/AboutUniversity';
import UniversityTestimonials from '@/components/clientSite/university/common/UniversityTestimonials';
import UniversityContact from '@/components/clientSite/university/Contact';
import UniversityFaculties from '@/components/clientSite/university/Faculties';
import HeroHome from '@/components/clientSite/university/HeroHome';
import SponsorHome from '@/components/clientSite/university/SponsorHome';
import UniversityFAQ from '@/components/clientSite/university/UniversityFAQ';
import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import UniversityPictureGallery from '@/components/clientSite/university/UniversityPictureGallery';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function SingleUniversityHome() {
  const [university, setUniversity] = useState(null);
  const { data: universityData } = useGetAllUniversityQuery();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (universityData?.data?.length > 0) {
      const university = universityData?.data?.find((uni) => uni._id === id);
      setUniversity(university);
    }
  }, [universityData, id]);



  return (
    <UniversityLayout>
      <HeroHome university={university} />
      <AboutUniversity university={university} />
      <UniversityFaculties university={university} />
      <UniversityPictureGallery university={university?.gallery} />
      <UniversityFAQ university={university?.faqs} />
      <SponsorHome sponsorData={university?.sponsors} />
      <UniversityTestimonials university={university} />
      <UniversityContact university={university} />
    </UniversityLayout>
  );
}
