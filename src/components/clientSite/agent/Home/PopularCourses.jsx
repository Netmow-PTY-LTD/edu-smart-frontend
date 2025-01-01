import Image from 'next/image';
import React from 'react';
import CourseCard from '../common/UI/CourseCard';

const PopularCourses = () => {
  return (
    <section className="popular-coureses-section ">
      <div className="container">
        <header className="popular-coureses-heading">
          <h5 className="popular-coureses-subtitle">
            Looking For Most Popular Programs?
          </h5>
          <h4 className="popular-coureses-title">
            Discover The Most Popular Courses That Shape Your Future
          </h4>
        </header>

        <article className="popular-coureses-content">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </article>
      </div>
    </section>
  );
};

export default PopularCourses;
