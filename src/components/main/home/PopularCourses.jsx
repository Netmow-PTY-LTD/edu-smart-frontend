import React from 'react';
import CourseCard from '../common/CourseCard';
import {
  useGetAllCoursesQuery,
  useGetAllUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';

const PopularCourses = () => {
  const { data: universityData } = useGetAllUniversityQuery();
  const { data: allCourses } = useGetAllCoursesQuery();

  // const imageUrls = {
  //   'Department of Aerospace Engineering':
  //     'https://i.ibb.co.com/v4zDZwwr/image-2025-02-07-T06-33-58-418-Z.png',
  //   'Department of Physics':
  //     'https://i.ibb.co.com/dwXt07qN/image-2025-02-07-T06-24-15-714-Z.png',
  //   'Department of Chemical Engineering':
  //     'https://i.ibb.co.com/WWhVVbMw/image-2025-02-07-T10-05-16-408-Z.png',
  //   'Department of Mathematics':
  //     'https://i.ibb.co.com/vvDZ8gBt/image-2025-02-07-T06-36-51-474-Z.png',
  // };
  // // Assign images dynamically
  // const updatedCourses = allCourses?.data?.map((course) => ({
  //   ...course,
  //   image: imageUrls[course.name],
  // }));

  //console.log(allCourses);
  //console.log(updatedCourses);

  return (
    <section className="popular-coureses-section">
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
          {allCourses?.data?.length > 0 &&
            allCourses?.data
              ?.slice(0, 6)
              .map((course, i) => <CourseCard course={course} key={i} />)}
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

export default PopularCourses;
