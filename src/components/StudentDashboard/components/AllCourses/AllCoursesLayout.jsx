import CourseCardComponent from '@/components/common/CourseCardComponent';
import { useGetsingleUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import FilterTags from './FilterTagsComponentAllCourses';

const AllCoursesLayout = ({ university_id }) => {
  const {
    data: getSingleUniversityDataForStudent,
    isLoading: getSingleUniversityIsLoadingForStudent,
    refetch: getSingleUniversityForStudentRefetch,
  } = useGetsingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  // Extract course data
  const allCourses = getSingleUniversityDataForStudent?.data?.courses || [];

  // State to manage selected filters
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  // Handle checkbox changes for departments
  const handleDepartmentChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedDepartments((prev) => [...prev, name]);
    } else {
      setSelectedDepartments((prev) => prev.filter((dept) => dept !== name));
    }
  };

  // Handle checkbox changes for programs
  const handleProgramChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedPrograms((prev) => [...prev, name]);
    } else {
      setSelectedPrograms((prev) => prev.filter((program) => program !== name));
    }
  };

  // Filter courses based on selected departments and programs
  const filteredCourses = allCourses.filter((course) => {
    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(course.department);

    const matchesProgram =
      selectedPrograms.length === 0 ||
      selectedPrograms.includes(course.program);

    return matchesDepartment && matchesProgram;
  });

  return (
    <Row>
      {/* Sidebar with filters */}
      <Col lg={3}>
        <Card>
          <CardHeader>Filter Courses</CardHeader>
          <CardBody>
            {/* Department Filters */}
            <div>All Departments</div>
            <div className="d-flex flex-column align-items-start justify-content-start gap-3">
              {['CSE', 'EEE', 'ME', 'IPE', 'CIVIL'].map((dept) => (
                <label key={dept}>
                  <input
                    type="checkbox"
                    name={dept}
                    onChange={handleDepartmentChange}
                  />{' '}
                  {dept}
                </label>
              ))}
            </div>
            <hr />
            {/* Program Filters */}
            <div>All Programs</div>
            <div className="d-flex flex-column align-items-start justify-content-start gap-3">
              {['CSE', 'EEE', 'ME', 'IPE', 'CIVIL'].map((program) => (
                <label key={program}>
                  <input
                    type="checkbox"
                    name={program}
                    onChange={handleProgramChange}
                  />{' '}
                  {program}
                </label>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* Main Content Area */}
      <Col lg={9}>
        <FilterTags/>

        <Row>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((item, index) => (
              <Col lg={4} md={6} sm={12} className="mb-4" key={index}>
                <CourseCardComponent item={item} />
              </Col>
            ))
          ) : (
            <p className="text-warning">
              No courses available for the selected filters.
            </p>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default AllCoursesLayout;
