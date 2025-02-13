import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DOMPurify from 'dompurify';

const CourseCard = ({ course }) => {
  const truncateText = (text, maxLength) => {
    const textContent = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };
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
          <h6 className="course-card__university">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
            >
              <path
                d="M8 0C5.87913 0.00276942 3.84593 0.833343 2.34625 2.30959C0.846571 3.78584 0.00281338 5.78726 0 7.87499C0 13.5286 7.45333 20.6095 7.77 20.9081C7.8316 20.967 7.91411 21 8 21C8.08589 21 8.1684 20.967 8.23 20.9081C8.54667 20.6095 16 13.5286 16 7.87499C15.9972 5.78726 15.1534 3.78584 13.6537 2.30959C12.1541 0.833343 10.1209 0.00276942 8 0ZM8 11.4844C7.2748 11.4844 6.56589 11.2727 5.96291 10.8761C5.35993 10.4795 4.88996 9.91576 4.61244 9.25624C4.33492 8.59671 4.26231 7.87099 4.40379 7.17084C4.54527 6.47069 4.89448 5.82756 5.40728 5.32278C5.92007 4.818 6.57341 4.47424 7.28467 4.33497C7.99593 4.1957 8.73318 4.26718 9.40317 4.54037C10.0732 4.81355 10.6458 5.27617 11.0487 5.86973C11.4516 6.46329 11.6667 7.16113 11.6667 7.87499C11.6661 8.83208 11.2796 9.7498 10.5921 10.4266C9.90458 11.1033 8.97228 11.4838 8 11.4844Z"
                fill="#13C9BF"
              />
            </svg>
            <span>{course?.university?.name}</span>
          </h6>
          <h5 className="course-card__title">{course?.name}</h5>
          <p>{course?.department?.name}</p>
        </header>
        <p className="course-card__description">
          {truncateText(course?.description, 150)}
        </p>
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
