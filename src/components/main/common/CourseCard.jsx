import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CourseCard = ({ course }) => {
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
          {/* <h6 class="course-card__university">
            <i class="course-card__icon ri-map-pin-fill"></i>
            {course.university}
          </h6> */}
          <h5 class="course-card__title">{course?.name}</h5>
        </header>
        <p class="course-card__description">{course?.description}</p>
      </div>
      <footer>
        <Link
          href={`/university/${course?.university}/course/${course?._id}`}
          class="course-card__button"
        >
          View Details <i className="ri-arrow-right-line"></i>
        </Link>
      </footer>
    </div>
  );
};

export default CourseCard;
