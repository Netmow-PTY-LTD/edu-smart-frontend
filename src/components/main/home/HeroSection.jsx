import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Col, Row } from 'reactstrap';

export default function HeroSection() {
  const { data: universityData } = useGetAllUniversityQuery();
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Get the selected university object (if any)
  const university =
    universityData?.data?.find((uni) => uni._id === selectedUniversity) || null;

  // Departments come directly from the selected university
  const departments = university ? university.departments : [];

  // Filter courses from the university where the course.department matches the selected department
  const courses =
    university && selectedDepartment
      ? university.courses.filter(
          (course) => course.department === selectedDepartment
        )
      : [];

  // Handlers to update the state
  const handleUniversityChange = (e) => {
    const uniId = e.target.value;
    setSelectedUniversity(uniId);
    setSelectedDepartment(''); // Reset department & course when university changes
    setSelectedCourse('');
  };

  const handleDepartmentChange = (e) => {
    const deptId = e.target.value;
    setSelectedDepartment(deptId);
    setSelectedCourse(''); // Reset course when department changes
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  // Handle form submission (for example, to search courses)
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the selected values here:
    console.log('Selected University:', selectedUniversity);
    console.log('Selected Department:', selectedDepartment);
    console.log('Selected Course:', selectedCourse);
    // Further processing...
  };

  //console.log('universityData', universityData);
  return (
    <section className="hero-main">
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
                  href="/auth/register"
                  className="button text-secondary-alt fs-20 fw-semibold py-2 px-5"
                >
                  Join us as agent
                </Link>
                <Link
                  href="/universities"
                  className="button text-secondary-alt fs-20 fw-semibold py-2 px-5"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="hero-img">
              <Image
                src="/assets/images/main/hero-img.png"
                width={558}
                height={580}
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
                  <Col lg={3} md={6}>
                    <div className="form-group">
                      <label htmlFor="">Select University</label>
                      <select
                        type="text"
                        className="form-select"
                        value={selectedUniversity}
                        onChange={handleUniversityChange}
                      >
                        <option>Select University</option>
                        {universityData?.data?.length > 0 &&
                          universityData?.data?.map((item, index) => (
                            <option key={index}>{item.name}</option>
                          ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={3} md={6}>
                    <div className="form-group">
                      <label htmlFor="">Select Department</label>
                      <select
                        type="text"
                        className="form-select"
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                        disabled={!selectedUniversity}
                      >
                        <option>Select Department</option>
                        {departments?.length > 0 &&
                          departments?.map((item, index) => (
                            <option key={index}>{item.name}</option>
                          ))}
                      </select>
                    </div>
                  </Col>

                  <Col lg={3} md={6}>
                    <div className="form-group">
                      <label htmlFor="">Select Course</label>
                      <select
                        type="text"
                        className="form-select"
                        value={selectedCourse}
                        onChange={handleCourseChange}
                        disabled={!selectedDepartment}
                      >
                        <option>Select Course</option>
                        {courses?.length > 0 &&
                          courses?.map((item, index) => (
                            <option key={index}>{item.name}</option>
                          ))}
                      </select>
                    </div>
                  </Col>
                  <Col lg={3} md={6} className="d-flex align-items-end">
                    <button
                      type="submit"
                      className="button text-secondary-alt p-4 text-center w-100"
                      style={{ height: '48px' }}
                    >
                      Search Courses
                    </button>
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
