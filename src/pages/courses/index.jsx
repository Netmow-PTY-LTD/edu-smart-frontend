import CourseCard from '@/components/main/common/CourseCard';
import PageBanner from '@/components/main/common/PageBanner';
import MainLayout from '@/components/main/layout';
import { useGetAllCoursesQuery } from '@/slice/services/public/university/publicUniveristyService';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AllCourses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(6);

  const { data: allCourses } = useGetAllCoursesQuery();
  const params = useSearchParams();
  const courseId = params.get('id');

  const course = allCourses?.data?.find((item) => item?._id === courseId);

  useEffect(() => {
    if (course) {
      setSearchTerm(course?.name);
    }
  }, [course]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filteredData = (
      allCourses?.data && allCourses?.data.length > 0
        ? allCourses?.data
        : allCourses?.data
    )?.filter((course) =>
      Object.values(course).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredCourses(filteredData);
  }, [allCourses?.data, searchTerm]);

  const loadMore = () => {
    setVisibleCourses((prevVisibleCourses) => prevVisibleCourses + 6);
  };

  return (
    <MainLayout>
      <PageBanner
        title="List of Courses"
        bgImage="/assets/images/agent/agent_slider_bg.png"
      />
      <section className="all-courses">
        <div className="container">
          <div className="university-search">
            <form action="">
              <div className="es-form-group">
                <button className="search-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  className="es-form-input"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>
          <div className="course-grid">
            {filteredCourses?.length > 0 &&
              filteredCourses
                ?.slice(0, visibleCourses)
                .map((course, i) => <CourseCard course={course} key={i} />)}
          </div>
          {filteredCourses && filteredCourses.length > visibleCourses && (
            <div
              className="load-more-btn d-flex justify-content-center"
              style={{ marginTop: '50px' }}
            >
              <button
                onClick={loadMore}
                className="button fw-semibold fs-2 px-4 py-3 d-flex btn-loadmore"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
