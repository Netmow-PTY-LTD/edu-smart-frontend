import CourseCard from '@/components/main/common/CourseCard';
import PageBanner from '@/components/main/common/PageBanner';
import MainLayout from '@/components/main/layout';
import { useGetAllCoursesQuery } from '@/slice/services/public/university/publicUniveristyService';
import React from 'react';

export default function AllCourses() {
  const { data: allCourses } = useGetAllCoursesQuery();

  return (
    <MainLayout>
      <PageBanner
        title="List of Courses"
        bgImage="/assets/images/agent/agent_slider_bg.png"
      />
      <section className="all-courses">
        <div className="container">
          <div className="course-grid">
            {allCourses?.data?.length > 0 &&
              allCourses?.data?.map((course, i) => (
                <CourseCard course={course} key={i} />
              ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
