import React from 'react';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import CourseCard from '@/components/main/common/CourseCard';

const AgentPopularCourses = () => {
  const { data: universityData } = useGetAllUniversityQuery();

  const courses = universityData?.data?.flatMap(
    (university) => university.courses
  );

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
          {courses?.length > 0 &&
            courses?.map((course, i) => <CourseCard course={course} key={i} />)}
        </article>

        {/* <div className="d-flex justify-content-center align-item-center">
          <button className="popular-coureses-button">
            Explore All Courses <i class="ri-arrow-right-line ms-1"></i>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default AgentPopularCourses;
