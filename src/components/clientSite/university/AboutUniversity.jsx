import React from 'react';
import aboutImage from '../../../../public/assets/images/university-about.png';
import Image from 'next/image';

const AboutUniversity = ({ university }) => {
  return (
    <section className="university-about w-100 d-flex justify-content-center align-items-center">
      <div className="container d-flex flex-column-reverse flex-lg-row justify-content-center align-items-center gap-5">
        <div className="w-100 w-lg-50">
          <h3 className="university-title">About Institute</h3>
          <div className="univ-desc">
            {university?.description ||
              `When Malaysia started focusing on the development of
            telecommunication, Telekom Malaysia Berhad (TM) took a leap of faith
            by establishing the first private-owned higher learning institute.
            Located in Taiping, Perak, the Institute of Telecommunication and
            Information Technology (ITTM) opened its dooer in 1994 by offering
            42 pioneer students to undergo a two-year course in
            Telecommunication Engineering Diploma Programme.`}
          </div>
          {/* <p className="mb-4 fs-3">
            In 1996, ITTM was renamed Universiti Telekom (UNITELE) and was
            upgraded by the Ministry of Education as the first private
            university in Malaysia. From Perak, the campus then moved to Melaka
            in 1997.
          </p> */}
          <button className="button px-4 py-3">Read More</button>
        </div>
        <div className="w-100 w-lg-50 d-flex justify-content-center align-items-center">
          <Image
            className="mw-100"
            src={university?.logo?.url || aboutImage}
            alt="university about image"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUniversity;
