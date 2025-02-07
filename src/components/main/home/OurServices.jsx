import Image from 'next/image';
import React from 'react';

const OurServices = () => {
  return (
    <div
      className="bg-black ourServices-section"
      style={{
        backgroundImage: 'url("/assets/images/landing/ourServices/Vector.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="section-heading">
        <h3>What We Do?</h3>
        <h2 className="text-light">
          EduSmart Guiding For Global Education Journey
        </h2>
      </div>

      <div className="ourservices-content">
        {/* student-banner */}
        <div className="student-banner ">
          <div className="banner-image">
            <figure className="student">
              <Image
                src="/assets/images/landing/ourServices/student.png"
                alt="student"
                width={500}
                height={500}
              />
            </figure>
            <figure className="globe">
              <Image
                src="/assets/images/landing/ourServices/earth_image.png"
                alt="Globe"
                width={500}
                height={500}
              />
            </figure>
          </div>
          <div className="student-banner-info">
            <div className="info-card">
              <h2 className="text-light">
                Relocation Guideline For International Student
              </h2>
              <p className="text-light">
                At Edusmart, we guide you through every step of studying abroad
                from choosing the right program to securing your visa making
                your global education journey seamless.
              </p>
              <div>
                <button className="btn">
                  Contact Us Now <i className="ri-arrow-right-line"></i>{' '}
                </button>
              </div>
            </div>
            <figure>
              <Image
                src="/assets/images/landing/ourServices/Vector_2.png"
                alt="Vector2"
                width={320}
                height={320}
              />
            </figure>
          </div>
        </div>

        {/* info-banner */}
        <div
          className="info-banner"
          style={{
            backgroundImage:
              'url("/assets/images/landing/ourServices/Info_Image.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div>
            <p>Choosing the right Institute & program to securing your visa</p>
            <button className="button">
              Apply Online <i class="ri-arrow-right-line"></i>
            </button>
          </div>
          {/* vector */}
          <figure className="paralla-vector">
            <Image
              src="/assets/images/landing/ourServices/Vector_4.png"
              alt="Vector2"
              width={180}
              height={160}
            />
          </figure>
          <figure className="plus-vector">
            <Image
              src="/assets/images/landing/ourServices/Vector_3.png"
              alt="Vector2"
              width={60}
              height={60}
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
