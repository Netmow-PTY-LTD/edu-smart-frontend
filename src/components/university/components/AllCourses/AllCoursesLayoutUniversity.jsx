import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import {
  useFilterUniversityCoursesQuery,
  useGetsingleUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';
import React, { useEffect, useState } from 'react';
import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from 'reactstrap';

import Link from 'next/link';
import Image from 'next/image';

const AllCoursesLayoutUniversity = ({ university_id }) => {
  // State to manage selected filters
  const [selectedValue, setSelectedValue] = useState([]);

  const [debouncedFilters, setDebouncedFilters] = useState(selectedValue);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

      // --------------------- NB: This Filtering method not fixed this logic future changeable ------------------------
      // Filter out any previously selected department values
      // const previousValues = prevSelectedValues?.filter(
      //   (item) => item.name !== 'department'
      // );

      // if (checked) {
      //   // Add the new department selection while keeping other selected values
      //   return [...previousValues, { name: 'department', value: name }];
      // }
      // return prevSelectedValues;
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
      // --------------------- NB: This Filtering method not fixed this logic future changeable ------------------------
      // Filter out any previously selected course_category values
      // const previousValues = prevSelectedValues?.filter(
      //   (item) => item.name !== 'course_category'
      // );

      // if (checked) {
      //   // Add the new course_category selection while keeping other selected values
      //   return [...previousValues, { name: 'course_category', value: name }];
      // }
      // return prevSelectedValues;
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = allCourses?.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(allCourses?.length / itemsPerPage);

  return (
    <Row>
      {/* Sidebar with filters */}
      <Col
        className="faculty-content-left mb-sm-3"
        lg={3}
        md={4}
        sm={12}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <div className="faculty-tab-navs">
          <h5>Courses By Categories</h5>

          {/* Department Filters */}
          <div>All Departments</div>
          <div
            style={{ overflow: 'auto', maxHeight: '100px' }}
            className="d-flex flex-column align-items-start justify-content-start mt-3 gap-3"
          >
            {universitData?.departments?.map((dept) => (
              <label key={dept?._id}>
                <input
                  type="checkbox"
                  // type="radio"
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
          <div
            style={{ overflow: 'auto', maxHeight: '100px' }}
            className="d-flex flex-column align-items-start justify-content-start gap-3 mt-3"
          >
            {universitData?.categories?.map((program) => (
              <label key={program?._id}>
                <input
                  type="checkbox"
                  // type="radio"
                  name={program?.name}
                  checked={isProgramSelected(program?.name)}
                  onChange={handleProgramChange}
                />{' '}
                {program?.name}
              </label>
            ))}
          </div>
        </div>
      </Col>

      {/* Main Content Area */}
      {getSingleUniversityCourseIsLoadingForStudent ? (
        <LoaderSpiner />
      ) : (
        <Col className="mt-lg-0 mt-4" lg={9} md={8} sm={12}>
          <Row>
            {selectedData.length > 0 ? (
              selectedData?.map((item, index) => (
                <Col lg={4} md={6} sm={12} className="mb-4" key={index}>
                  <div className="faculty-item" key={index}>
                    <Image
                      src={`${item?.logo ? item.logo : 'https://res.cloudinary.com/ddm9zna39/image/upload/v1734502893/edu-smart/ckb38cu824zmnbv6ajgw.png'}`}
                      width={500}
                      height={500}
                      alt={item.name}
                    />
                    <h3>{item.name}</h3>
                    <div className="fc-desc">
                      <p className="text-wrap">
                        {`${item.description.split(' ').slice(0, 20).join(' ')}...`}
                      </p>
                    </div>
                    <Link
                      href={
                        item?._id ? `${university_id}/course/${item._id}` : ''
                      }
                      className="button py-3 px-5 fw-semibold d-inline-block mt-4"
                    >
                      Apply Now
                    </Link>
                  </div>
                </Col>
              ))
            ) : (
              <Col className="mt-sm-3  " lg={9} md={8} sm={12}>
                <div className="faculty-item">
                  <p className=" text-warning">
                    No courses available for the selected filters.
                  </p>
                </div>
              </Col>
            )}
          </Row>
          <Row>
            {selectedData.length > 0 && (
              <Pagination size="lg" className="mt-5 ">
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    first
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem disabled={currentPage === 1}>
                  <PaginationLink
                    previous
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem active={page === currentPage} key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink
                    next
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem disabled={currentPage === totalPages}>
                  <PaginationLink
                    last
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(totalPages);
                    }}
                  />
                </PaginationItem>
              </Pagination>
            )}
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default AllCoursesLayoutUniversity;
