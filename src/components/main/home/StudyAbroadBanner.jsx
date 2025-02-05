import Image from 'next/image';
import React from 'react';

const StudyAbroadBanner = () => {
  return (
    <div className="study-abroad">
      <div className="study-abroad__content">
        <h4 className="study-abroad__subtitle">Ready to Study Abroad?</h4>
        <h2 className="study-abroad__title">
          Take the First Step Toward Your Global Future!
        </h2>
        <p className="study-abroad__description">
          Edusmart offers expert guidance from program selection to visa
          approval, making your journey smooth and successful. Start today and
          unlock global opportunities!
        </p>
        <button className=" study-abroad__button button">
          Contact Us For Information
        </button>
      </div>
      <div className="study-abroad__image">
        <figure>
          <Image
            src="/assets/images/landing/AddBanner/Image Container.png"
            alt="Architecture"
            width={960}
            height={650}
          />
        </figure>
      </div>
    </div>
  );
};

export default StudyAbroadBanner;
