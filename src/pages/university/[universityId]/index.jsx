import AboutUniversity from '@/components/clientSite/university/AboutUniversity';
import UniversityContact from '@/components/clientSite/university/Contact';
import UniversityFaculties from '@/components/clientSite/university/Faculties';
import HeroHome from '@/components/clientSite/university/HeroHome';
import SponsorHome from '@/components/clientSite/university/SponsorHome';
import UniversityFAQ from '@/components/clientSite/university/UniversityFAQ';
import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
import UniversityPictureGallery from '@/components/clientSite/university/UniversityPictureGallery';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetsingleUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function SingleUniversityHome() {
  const router = useRouter();
  const { universityId } = router.query;

  const {
    data: singleUniversityData,
    isLoading: isSingleUniversityDataLoading,
  } = useGetsingleUniversityQuery(universityId);

  return (
    <UniversityLayout>
      {isSingleUniversityDataLoading ? (
        <LoaderSpiner />
      ) : (
        <>
          <HeroHome university={singleUniversityData?.data} />
          <AboutUniversity university={singleUniversityData?.data} />
          <UniversityFaculties
            coursesSubtitle={
              singleUniversityData?.data?.course_section_description
            }
            universityId={universityId}
          />
          <UniversityPictureGallery
            university={singleUniversityData?.data?.gallery}
          />
          <UniversityFAQ
            university={singleUniversityData?.data?.faqs}
            faqSubtitle={singleUniversityData?.data?.faq_section_description}
          />
          <SponsorHome sponsorData={singleUniversityData?.data?.sponsors} />
          {/* <UniversityTestimonials university={university} /> */}
          <UniversityContact university={singleUniversityData?.data} />
        </>
      )}
    </UniversityLayout>
  );
}
