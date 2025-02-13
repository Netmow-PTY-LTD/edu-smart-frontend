import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <figure className="course-card__image">
        <Image
          src={
            course?.image?.url
              ? course?.image?.url
              : '/assets/images/landing/popularCourse/course2.png'
          }
          alt={course?.name ? course?.name : ''}
          width={500}
          height={300}
        />
      </figure>
      <div className="course-card__body">
        <header>
          {/* <h6 className="course-card__university">
            <i className="course-card__icon ri-map-pin-fill"></i>
            {course.university}
          </h6> */}
          <h5 className="course-card__title">{course?.name}</h5>
        </header>
        <p className="course-card__description">{course?.description}</p>
      </div>
      <footer>
        <Link
          href={`/university/${course?.university?._id}/course/${course?._id}`}
          className="course-card__button"
        >
          View Details <i className="ri-arrow-right-line"></i>
        </Link>
      </footer>
    </div>
  );
};

export default CourseCard;
