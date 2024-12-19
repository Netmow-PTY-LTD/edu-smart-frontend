import CourseCardComponent from '@/components/common/CourseCardComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import {
  useFilterUniversityCoursesQuery,
  useGetsingleUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import FilterTags from './FilterTagsComponentAllCourses';

const AllCoursesLayout = ({ university_id }) => {
  // State to manage selected filters
  const [selectedValue, setSelectedValue] = useState([]);

  const [debouncedFilters, setDebouncedFilters] = useState(selectedValue);

  // Debounce state changes to avoid excessive API calls
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedFilters(selectedValue);
    }, 100); // Adjust debounce time as needed

    return () => clearTimeout(debounceTimeout);
  }, [selectedValue]);

  const {
    data: getSingleUniversityDataForStudent,
    isLoading: getSingleUniversityIsLoadingForStudent,
    refetch: getSingleUniversityForStudentRefetch,
  } = useGetsingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  const {
    data: getSingleUniversityCoursesDataForStudent,
    isLoading: getSingleUniversityCourseIsLoadingForStudent,
    refetch: getSingleUniversityCoursesForStudentRefetch,
  } = useFilterUniversityCoursesQuery(
    { university_id, args: debouncedFilters },
    {
      skip: !university_id,
    }
  );

  const universitData = getSingleUniversityDataForStudent?.data || [];
  const allCourses = getSingleUniversityCoursesDataForStudent?.data || [];

  // Handle checkbox changes for departments
  const handleDepartmentChange = (event) => {
    const { name, checked } = event.target;

    setSelectedValue((prevSelectedValues) => {
      if (checked) {
        // Add the department to the selected value array if not already selected
        const isAlreadySelected = prevSelectedValues.some(
          (item) => item.name === 'department' && item.value === name
        );
        if (!isAlreadySelected) {
          return [...prevSelectedValues, { name: 'department', value: name }];
        }
      } else {
        // Remove the department from the selected value array if it is unchecked
        return prevSelectedValues.filter(
          (item) => !(item.name === 'department' && item.value === name)
        );
      }
    });
  };

  // Handle checkbox changes for programs
  const handleProgramChange = (event) => {
    const { name, checked } = event.target;

    setSelectedValue((prevSelectedValues) => {
      if (checked) {
        // Add the department to the selected value array if not already selected
        const isAlreadySelected = prevSelectedValues?.some(
          (item) => item.name === 'course_category' && item.value === name
        );
        if (!isAlreadySelected) {
          return [
            ...prevSelectedValues,
            { name: 'course_category', value: name },
          ];
        }
      } else {
        // Remove the department from the selected value array if it is unchecked
        return prevSelectedValues?.filter(
          (item) => !(item.name === 'course_category' && item.value === name)
        );
      }
    });
  };

  // Utility function to check if a department is selected
  const isDepartmentSelected = (deptName) => {
    return selectedValue?.some(
      (item) => item.name === 'department' && item.value === deptName
    );
  };

  // Utility function to check if a program is selected
  const isProgramSelected = (programName) => {
    return selectedValue?.some(
      (item) => item.name === 'course_category' && item.value === programName
    );
  };

  return (
    <Row>
      <Row>
        <FilterTags
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </Row>
      <Row>
        {/* Sidebar with filters */}
        <Col lg={3}>
          <Card>
            <CardHeader>Filter Courses</CardHeader>
            <CardBody>
              {/* Department Filters */}
              <div>All Departments</div>
              <div className="d-flex flex-column align-items-start justify-content-start mt-3 gap-3">
                {universitData?.departments?.map((dept, index) => (
                  <label key={dept?._id}>
                    <input
                      type="checkbox"
                      name={dept?.name}
                      checked={isDepartmentSelected(dept?.name)}
                      onChange={handleDepartmentChange}
                    />{' '}
                    {dept?.name}
                  </label>
                ))}
              </div>
              <hr />
              {/* Program Filters */}
              <div>All Programs</div>
              <div className="d-flex flex-column align-items-start justify-content-start gap-3 mt-3">
                {universitData?.categories?.map((program) => (
                  <label key={program?._id}>
                    <input
                      type="checkbox"
                      name={program?.name}
                      checked={isProgramSelected(program?.name)}
                      onChange={handleProgramChange}
                    />{' '}
                    {program?.name}
                  </label>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Main Content Area */}
        {getSingleUniversityCourseIsLoadingForStudent ? (
          <LoaderSpiner />
        ) : (
          <Col lg={9}>
            <Row>
              {allCourses.length > 0 ? (
                allCourses?.map((item, index) => (
                  <Col lg={4} md={6} sm={12} className="mb-4" key={index}>
                    <CourseCardComponent
                      item={item}
                      university_id={university_id}
                    />
                  </Col>
                ))
              ) : (
                <p className="text-warning">
                  No courses available for the selected filters.
                </p>
              )}
            </Row>
          </Col>
        )}
      </Row>
    </Row>
  );
};

export default AllCoursesLayout;
