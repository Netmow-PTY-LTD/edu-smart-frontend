import { userDummyImage } from '@/utils/common/data';
import Image from 'next/image';
import React from 'react';

const UniversityPictureGallery = ({ university }) => {
  return (
    <>
      <section className="gellary-area py-5">
        <div className="container">
          <div className="sec-heading">
            <h3>Our Picture Gallery</h3>
            <p>
              {university?.description ||
                `Malaysia started focusing on the development of telecommunication,
              Telekom Malaysia Berhad (TM) took a leap of faith by establishing
              the first private-owned higher learning institute.`}
            </p>
          </div>
          <div className="my-5 university_gallery">
            <div className="d-flex flex-column gap-4 align-items-center justify-content-center ">
              <Image
                className="gallery-first-column-img"
                width={500}
                height={500}
                src={
                  university?.images?.[0]?.url ||
                  // '/assets/university-gallery/1st-element.jpeg'
                  userDummyImage
                }
                alt=""
              />
              <Image
                className="gallery-first-column-img"
                width={500}
                height={500}
                src={
                  university?.images?.[1]?.url ||
                  // '/assets/university-gallery/second-element.png'
                  userDummyImage
                }
                alt=""
              />
            </div>
            <div className="d-flex flex-column gap-4 align-items-center justify-content-center ">
              <Image
                className="gallery-second-column-img"
                width={500}
                height={500}
                src={
                  university?.images?.[2]?.url ||
                  // '/assets/university-gallery/third-element.jpeg'
                  userDummyImage
                }
                alt=""
              />
              <Image
                className="gallery-second-column-img"
                width={500}
                height={500}
                src={
                  university?.images?.[3]?.url ||
                  // '/assets/university-gallery/fourth-element.png'
                  userDummyImage
                }
                alt=""
              />
              <Image
                className="gallery-second-column-img"
                width={500}
                height={500}
                src={
                  university?.images?.[4]?.url ||
                  // '/assets/university-gallery/fivth-element.png'
                  userDummyImage
                }
                alt=""
              />
            </div>
            <div className="d-flex flex-column gap-4 align-items-center justify-content-center ">
              <Image
                className="gallery-first-column-img"
                width={500}
                height={500}
                src={
                  university?.images?.[5]?.url ||
                  // '/assets/university-gallery/sixth-element.jpeg'
                  userDummyImage
                }
                alt=""
              />
              <Image
                className="gallery-first-column-img"
                width={500}
                height={500}
                src={
                  university?.images?.[6]?.url ||
                  // '/assets/university-gallery/seventh-element.png'
                  userDummyImage
                }
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UniversityPictureGallery;
