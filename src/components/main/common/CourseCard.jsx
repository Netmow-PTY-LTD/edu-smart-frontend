import Image from 'next/image';
import React from 'react';

const CourseCard = () => {
  return (
    <div class="course-card">
      <figure class="course-card__image">
        <Image
          src="/assets/images/landing/popularCourse/Program Image.png"
          alt="MBA in International Business at Harvard University"
          width={500}
          height={300}
        />
      </figure>
      <div class="course-card__body">
        <header>
          <h6 class="course-card__university">
            <i class="course-card__icon ri-map-pin-fill"></i>
            Harvard University
          </h6>
          <h5 class="course-card__title">MBA in International Business</h5>
        </header>
        <p class="course-card__description">
          Gain global leadership skills and expertise in international markets,
          preparing you for top executive roles worldwide.
        </p>
      </div>
      <footer>
        <button class="course-card__button">
          View Details <i class="ri-arrow-right-line"></i>
        </button>
      </footer>
    </div>
  );
};

export default CourseCard;
