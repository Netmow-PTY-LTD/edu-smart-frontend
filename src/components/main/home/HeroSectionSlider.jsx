import {
  useGetAllCoursesQuery,
  useGetAllUniversityQuery,
} from '@/slice/services/public/university/publicUniveristyService';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Select from 'react-select';

export default function HeroSectionSlider() {
  const { data: universityData } = useGetAllUniversityQuery();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [universities, setUniversities] = useState(null);

  const router = useRouter();
  const universityRef = useRef();
  const courseRef = useRef();

  const { data: allCourses } = useGetAllCoursesQuery();

  const seen = {};
  const countries = [];
  universityData?.data?.forEach((item) => {
    if (!seen[item.country]) {
      seen[item.country] = true;
      countries.push({ value: item.country, label: item.country });
    }
  });

  // Get Country based university

  const handleCountryChange = (selectedOption) => {
    if (!selectedOption) return;

    if (universityRef.current) universityRef.current.clearValue();
    if (courseRef.current) courseRef.current.clearValue();

    const selectedCountry = selectedOption.value;
    setSelectedUniversity(null);
    setSelectedUniversity(null);
    setSelectedCourses([]);
    setSelectedCourse(null);

    // Filter universityData based on selected country
    const filteredUniversities = universityData?.data?.filter(
      (item) => item.country === selectedCountry
    );

    // You can now update local state, formik values, or trigger other logic
    setUniversities(filteredUniversities); // Example if storing to state
  };

  // Get courses based on selected university

  const handleUniversityChange = (selectedOption) => {
    const uniId = selectedOption?.value;
    if (courseRef.current) courseRef.current.clearValue();

    if (!uniId) {
      setSelectedUniversity(null);
      setSelectedUniversity(null);
      setSelectedCourses([]);
      setSelectedCourse(null);
      return;
    }

    // setSelectedCourse(null);
    setSelectedUniversity(uniId);
    const foundUniversity = universityData?.data?.find(
      (uni) => uni._id === uniId
    );

    setSelectedCourses(
      foundUniversity?.courses?.length > 0 ? foundUniversity.courses : []
    );

    setSelectedCourse(null); // Reset selected course
  };

  const handleCourseChange = (selectedOption) => {
    setSelectedCourse(selectedOption?.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!universities) {
      toast.error('Please select a country');
      return;
    }

    if (!selectedUniversity) {
      toast.error('Please select a university');
      return;
    }

    if (!selectedCourse) {
      toast.error('Please select a course');
      return;
    }

    // ✅ All required fields are present
    router.push(`/university/${selectedUniversity}/course/${selectedCourse}`);
  };

  const displayedCourses =
    selectedUniversity || selectedUniversity !== null
      ? selectedCourses
      : allCourses?.data || [];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#FFFFFF', // Light background
      borderColor: state.isFocused ? '#4CAF50' : '#ccc', // Green focus border
      borderRadius: '8px',
      padding: '5px',
      boxShadow: state.isFocused ? '0 0 5px rgba(76, 175, 80, 0.5)' : 'none',
      '&:hover': {
        borderColor: '#4CAF50',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#4CAF50'
        : state.isFocused
          ? '#e8f5e9'
          : 'white',
      color: state.isSelected ? 'white' : '#333',
      padding: '10px',
      cursor: 'pointer',
    }),
    menu: (base) => ({
      ...base,
      //   borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    }),
  };

  return (
    <section className="hero-main">
      <ToastContainer />
      <div className="container">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Row>
              <Col lg={6} md={12}>
                <div className="hero-text-content">
                  <h1 className="hero-title">
                    Expand Your{' '}
                    <span className="highlighted-text">Business</span>{' '}
                    Opportunities With EduSmart{' '}
                    <span className="highlighted-text">Partnership</span>
                  </h1>
                  <p className="hero-text">
                    EduSmart is an innovative educational admission marketplace
                    connecting agents with top universities worldwide. Partner
                    with us to streamline student enrollments, access exclusive
                    opportunities, and grow your business.
                  </p>
                  <div className="hero-cta">
                    <Link
                      href="/packages"
                      className="button text-secondary-alt fs-20 fw-semibold py-2 px-5"
                    >
                      Join as a agent
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={12}>
                <div className="hero-img">
                  <Image
                    src="/assets/images/main/hero-agent.png"
                    width={558}
                    height={580}
                    alt="Hero_Image"
                  />
                </div>
              </Col>
            </Row>
          </SwiperSlide>
          <SwiperSlide>
            <Row>
              <Col lg={6} md={12}>
                <div className="hero-text-content">
                  <h1 className="hero-title">
                    Unleash Your{' '}
                    <span className="highlighted-text">Career</span>{' '}
                    Opportunities With EduSmart Free Study{' '}
                    <span className="highlighted-text">Guideline</span>
                  </h1>
                  <p className="hero-text">
                    Edusmart is dedicated to empowering students worldwide with
                    comprehensive guidance for studying abroad. From selecting
                    the right course to securing your study visa, we make your
                    journey seamless.
                  </p>
                  <div className="hero-cta">
                    <Link
                      href="/auth/register?userRole=student"
                      className="button text-secondary-alt fs-20 fw-semibold py-2 px-5"
                    >
                      Join as a student
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
                    alt="Hero_Image"
                  />
                </div>
              </Col>
            </Row>
          </SwiperSlide>
        </Swiper>

        <div className="hero-search-area">
          <h2 className="hero-search-title">Find the best courses for you</h2>
          <div className="hero-search-form">
            <form onSubmit={handleSubmit}>
              <div className="form-area">
                <Row>
                  <Col lg={3}>
                    <div className="form-group mb-3">
                      <label htmlFor="">Select Country</label>
                      <Select
                        placeholder="Select Country"
                        styles={customStyles}
                        onChange={handleCountryChange}
                        options={countries}
                        // options={[
                        //   ...new Map(
                        //     universityData?.data?.map((item) => [
                        //       item.country,
                        //       {
                        //         value: item.country,
                        //         label: item.country,
                        //       },
                        //     ])
                        //   ).values(),
                        // ]}
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-group mb-3">
                      <label htmlFor="">Select University</label>
                      <Select
                        ref={universityRef}
                        placeholder="Select University "
                        styles={customStyles}
                        onChange={handleUniversityChange}
                        options={universities?.map((item) => ({
                          value: item._id,
                          label: item.name,
                        }))}
                        isDisabled={!universities}
                      />
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="form-group mb-3">
                      <label htmlFor="">Select Course</label>
                      <Select
                        ref={courseRef}
                        placeholder="Select University courses"
                        styles={customStyles}
                        onChange={handleCourseChange}
                        options={displayedCourses?.map((item) => ({
                          value: item._id,
                          label: item.name,
                        }))}
                        isDisabled={!selectedUniversity}
                      />
                    </div>
                  </Col>
                  <Col lg={3} className="d-flex align-items-end">
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
