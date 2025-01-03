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
  const [selectedValue, setSelectedValue] = useState([]);
  const [debouncedFilters, setDebouncedFilters] = useState(selectedValue);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedFilters(selectedValue);
    }, 100);

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

  const handleDepartmentChange = (event) => {
    const { name, checked } = event.target;

    setSelectedValue((prevSelectedValues) => {
      if (checked) {
        const isAlreadySelected = prevSelectedValues.some(
          (item) => item.name === 'department' && item.value === name
        );
        if (!isAlreadySelected) {
          return [...prevSelectedValues, { name: 'department', value: name }];
        }
      } else {
        return prevSelectedValues.filter(
          (item) => !(item.name === 'department' && item.value === name)
        );
      }
    });
  };

  const handleProgramChange = (event) => {
    const { name, checked } = event.target;

    setSelectedValue((prevSelectedValues) => {
      if (checked) {
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
        return prevSelectedValues?.filter(
          (item) => !(item.name === 'course_category' && item.value === name)
        );
      }
    });
  };

  const isDepartmentSelected = (deptName) => {
    return selectedValue?.some(
      (item) => item.name === 'department' && item.value === deptName
    );
  };

  const isProgramSelected = (programName) => {
    return selectedValue?.some(
      (item) => item.name === 'course_category' && item.value === programName
    );
  };

  return (
    <>
      {getSingleUniversityIsLoadingForStudent ||
      getSingleUniversityCourseIsLoadingForStudent ? (
        <LoaderSpiner />
      ) : (
        <Row>
          <Row>
            <FilterTags
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </Row>
          <Row>
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
                    <p className="text-primary">
                      No courses available for the selected filters.
                    </p>
                  )}
                </Row>
              </Col>
            )}
          </Row>
        </Row>
      )}
    </>
  );
};

export default AllCoursesLayout;
