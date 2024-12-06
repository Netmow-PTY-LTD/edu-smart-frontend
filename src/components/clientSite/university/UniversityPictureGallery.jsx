import Image from 'next/image';
import React from 'react';

const UniversityPictureGallery = () => {
  return (
    <>
      <section className="gellary-area py-5">
        <div className="container">
          <div className="sec-heading">
            <h3>Our Picture Gallery</h3>
            <p>
              Malaysia started focusing on the development of telecommunication,
              Telekom Malaysia Berhad (TM) took a leap of faith by establishing
              the first private-owned higher learning institute.
            </p>
          </div>
          <div className="my-5 university_gallery">
            <div className="d-flex flex-column gap-4 align-items-center justify-content-center ">
              <Image
                className="gallery-first-column-img"
                width={500}
                height={500}
                src={'/assets/university-gallery/1st-element.jpeg'}
                alt=""
              />
              <Image
                className="gallery-first-column-img"
                width={500}
                height={500}
                src={'/assets/university-gallery/second-element.png'}
                alt=""
              />
            </div>
            <div className="d-flex flex-column gap-4 align-items-center justify-content-center ">
              <Image
                className="gallery-second-column-img"
                width={500}
                height={500}
                src={'/assets/university-gallery/third-element.jpeg'}
                alt=""
              />
              <Image
                className="gallery-second-column-img"
                width={500}
                height={500}
                src={'/assets/university-gallery/fourth-element.png'}
                alt=""
              />
              <Image
                className="gallery-second-column-img"
                width={500}
                height={500}
                src={'/assets/university-gallery/fivth-element.png'}
                alt=""
              />
            </div>
            <div className="d-flex flex-column gap-4 align-items-center justify-content-center ">
              <Image
                className="gallery-first-column-img"
                width={500}
                height={500}
                src={'/assets/university-gallery/sixth-element.jpeg'}
                alt=""
              />
              <Image
                className="gallery-first-column-img"
                width={500}
                height={500}
                src={'/assets/university-gallery/seventh-element.png'}
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
