import AboutUniversity from '@/components/clientSite/university/AboutUniversity';
import HeroHome from '@/components/clientSite/university/HeroHome';
import UniversityLayout from '@/components/clientSite/university/UniversityLayout';
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
      <section className="sponsors-area  mt-5">
        <div className="container">
          <div className="sec-heading">
            <h3>Our Picture Gallery</h3>
            <p>
              Malaysia started focusing on the development of telecommunication,
              Telekom Malaysia Berhad (TM) took a leap of faith by establishing
              the first private-owned higher learning institute.
            </p>

            <div className="my-5 university_gallery">
              <Image
                width={500}
                height={500}
                src={'/assets/university-gallery/1st-element.jpeg'}
                alt=""
              />
              <Image
                width={500}
                height={500}
                src={'/assets/university-gallery/second-element.png'}
                alt=""
              />
              <Image
                width={500}
                height={500}
                src={'/assets/university-gallery/third-element.jpeg'}
                alt=""
              />
              <Image
                width={500}
                height={500}
                src={'/assets/university-gallery/fourth-element.png'}
                alt=""
              />
              <Image
                width={500}
                height={500}
                src={'/assets/university-gallery/fivth-element.png'}
                alt=""
              />
              <Image
                width={500}
                height={500}
                src={'/assets/university-gallery/sixth-element.jpeg'}
                alt=""
              />
              <Image
                width={500}
                height={500}
                src={'/assets/university-gallery/seventh-element.png'}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </UniversityLayout>
  );
}
