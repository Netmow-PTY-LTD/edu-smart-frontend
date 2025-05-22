import {
  useGetAllCoursesQuery,
  useGetAllUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Row } from 'reactstrap';

export default function HeroSection() {
  const { data: universityData } = useGetAllUniversityQuery();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const router = useRouter();

  const { data: allCourses } = useGetAllCoursesQuery();

  // Get courses based on selected university

  // Handlers
  const handleUniversityChange = (e) => {
    const uniId = e.target.value;

    if (!uniId) {
      setSelectedUniversity('');
      setSelectedCourses([]);
      setSelectedCourse('');
      return;
    }

    if (uniId == 'Select University') {
      setSelectedUniversity(allCourses?.data);
      setSelectedCourses([]);
      setSelectedCourse('');
    }

    setSelectedUniversity(uniId);
    const foundUniversity = universityData?.data?.find(
      (uni) => uni._id === uniId
    );

    setSelectedCourses(
      foundUniversity?.courses?.length > 0 ? foundUniversity.courses : []
    );
    setSelectedCourse(''); // Reset selected course
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCourse) {
      router.push(`/university/${selectedUniversity}/course/${selectedCourse}`);
    } else {
      toast.error('Please select a course');
    }
  };

  const displayedCourses =
    selectedUniversity || selectedUniversity !== null
      ? selectedCourses
      : allCourses?.data || [];

  return (
    <section className="hero-main">
      <ToastContainer />
      <div className="container">
        <Row>
          <Col lg={6} md={12}>
            <div className="hero-text-content">
              <h1 className="hero-title">
                Unleash Your <span className="highlighted-text">Career</span>{' '}
                Opportunities With EduSmart Free Study{' '}
                <span className="highlighted-text">Guideline</span>
              </h1>
              <p className="hero-text">
                Edusmart is dedicated to empowering students worldwide with
                comprehensive guidance for studying abroad. From selecting the
                right course to securing your study visa, we make your journey
                seamless.
              </p>
              <div className="hero-cta">
                <Link
                  href="/packages"
                  className="button text-secondary-alt fs-20 fw-semibold py-2 px-5"
                >
                  Join us as Partner
                </Link>
                <Link
                  href="/auth/register?userRole=student"
                  className="button text-secondary-alt fs-20 fw-semibold py-2 px-5"
                >
                  Join us as student
                </Link>
                {/* <Link
                  href="/university/courses"
                  className="button text-secondary-alt fs-20 fw-semibold py-2 px-5"
                >
                  Explore Courses
                </Link> */}
              </div>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="hero-img">
              <Image
                src="/assets/images/main/hero-img.png"
                width={558}
                height={580}
                alt="Hero_Image"
              />
            </div>
          </Col>
        </Row>
        <div className="hero-search-area">
          <h2 className="hero-search-title">Find the best courses for you</h2>
          <div className="hero-search-form">
            <form onSubmit={handleSubmit}>
              <div className="form-area">
                <Row>
                  <Col lg={5}>
                    <div className="form-group mb-3">
                      <label htmlFor="">Select University</label>
                      <select
                        type="text"
                        className="form-select"
                        value={selectedUniversity}
                        onChange={handleUniversityChange}
                      >
                        <option value="Select University">
                          Select University
                        </option>
                        {universityData?.data?.length > 0 &&
                          universityData?.data?.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </Col>
                  {/* <Col lg={3} md={6}>
                    <div className="form-group mb-3">
                      <label htmlFor="">Select Department</label>
                      <select
                        type="text"
                        className="form-select"
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                        // disabled={!selectedUniversity}
                      >
                        <option>Select Department</option>
                        {departments?.length > 0 &&
                          departments?.map((item, index) => (
                            <option key={index}>{item.name}</option>
                          ))}
                      </select>
                    </div>
                  </Col> */}

                  <Col lg={5}>
                    <div className="form-group mb-3">
                      <label htmlFor="">Select Course</label>
                      <select
                        type="text"
                        className="form-select"
                        value={selectedCourse}
                        onChange={handleCourseChange}
                        // disabled={!selectedDepartment}
                      >
                        <option>Select Course</option>
                        {displayedCourses?.length > 0 &&
                          displayedCourses?.map((item) => (
                            <option key={item._id} value={item._id}>
                              {item?.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={2} className="d-flex align-items-end">
                    <div className="mb-3 w-100">
                      <button
                        type="submit"
                        className="button text-secondary-alt p-4 text-center w-100 d-flex justify-content-center align-items-center"
                        style={{ height: '4.8rem', fontWeight: '600' }}
                      >
                        Go to course
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
