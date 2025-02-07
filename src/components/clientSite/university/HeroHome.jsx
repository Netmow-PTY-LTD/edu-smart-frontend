import React, { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import heroImage from '../../../../public/assets/images/landing/hero/hero-image.png';
import logoMmu from '../../../../public/assets/images/landing/hero/logo-mmu.png';
import Link from 'next/link';
import { Col, Row } from 'reactstrap';
import useDebounce from '@/utils/Hooks/useDebounce';
import { useFilterUniversityCoursesQuery } from '@/slice/services/public/university/publicUniveristyService';

export default function HeroHome({ university }) {
  const [selectedValue, setSelectedValue] = useState('');
  const debouncedValue = useDebounce(selectedValue, 500);

  const {
    data: universityCourses,
    isLoading: universityCourseIsLoading,
    refetch: universityCoursesRefetch,
  } = useFilterUniversityCoursesQuery(
    {
      university_id: university?._id,
      args: [
        {
          name: 'course',
          value: debouncedValue,
        },
      ],
    },
    {
      skip: !university?._id,
    }
  );

  // console.log(universityCourses);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <section className="hero-section">
      <Swiper className="mySwiper" navigation={true} modules={[Navigation]}>
        {university?.sliders?.length > 0 ? (
          university?.sliders?.map((slider, i) => {
            return (
              <SwiperSlide key={i}>
                <div
                  className="single-slide"
                  style={{
                    backgroundImage: `url(${slider?.image?.url ? slider?.image?.url : '/assets/images/landing/hero/hero-image.png'})`,
                  }}
                >
                  <div className="container">
                    <Row>
                      <Col md={9} xl={6}>
                        <div className="slider-content">
                          <h3>{slider?.sub_title || ''}</h3>
                          <h1>{slider?.title || ''}</h1>
                          <div className="slider-desc">
                            {slider?.description || ''}
                          </div>
                          <div className="btns">
                            <Link
                              href={slider?.button_1_link || ''}
                              className="button py-3 px-5 fw-semibold text-center"
                            >
                              {slider?.button_1_text
                                ? slider?.button_1_text
                                : 'Apply Now'}
                            </Link>
                            <Link
                              href={slider?.button_2_link || ''}
                              className="button py-3 px-5 fw-semibold text-center"
                            >
                              {slider?.button_2_text
                                ? slider?.button_2_text
                                : 'Apply Now'}
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <div
            className="single-slide"
            style={{
              backgroundImage: `url('/assets/images/landing/hero/hero-image.png')`,
            }}
          >
            <div className="container">
              <Row>
                <Col md={9} xl={6}>
                  <div className="slider-content">
                    <h3>Discover Our Achievements and Spirit</h3>
                    <h1>Welcome to Our University</h1>
                    <div className="slider-desc">
                      Explore the journey, victories, and spirit of our team.
                      Stay updated and connected with every milestone.
                    </div>
                    <div className="btns">
                      <Link
                        href="#"
                        className="button py-3 px-5 fw-semibold text-center"
                      >
                        Apply Now
                      </Link>
                      <Link
                        href="#"
                        className="button py-3 px-5 fw-semibold text-center"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Swiper>

      <div className="hero-search-area">
        <div className="container">
          <div className="search-content">
            <div className="row align-items-center justify-content-center justify-content-md-start">
              <div className="col-lg-6">
                <div className="university-intro">
                  <Image
                    className="university-logo"
                    alt="logoMmu"
                    src={university?.logo?.url || logoMmu}
                    width={50}
                    height={50}
                  />
                  <h4 className="d-none d-md-block">{university?.name}</h4>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex flex-wrap justify-content-lg-end justify-content-start align-items-center gap-5 mt-5 mt-lg-0">
                  <div className="search-container position-relative">
                    <label htmlFor="search" className="searchIcon-conatiner">
                      <i className="ri-search-line fs-1"></i>
                    </label>
                    <input
                      id="search"
                      type="text"
                      className="hero-search-input"
                      placeholder="Search a course"
                      onChange={handleChange}
                    />
                    <div className="search-result-container position-absolute top-100 right-0 w-100 rounded mt-2 z-1">
                      {universityCourseIsLoading ? (
                        <div>Loading...</div>
                      ) : (
                        <div className="search-result px-4">
                          {debouncedValue &&
                            universityCourses?.data?.length > 0 &&
                            universityCourses?.data?.map((course, i) => {
                              return (
                                <Link
                                  href={`${university?._id}/course/${course?._id}`}
                                  key={i}
                                  className="search-result-item d-flex flex-column gap-1 p-2 my-4 justify-content-start align-items-start rounded"
                                >
                                  <span>{course?.name}</span>
                                  <span>{course?.department?.name}</span>
                                  <span>{course?.category?.name}</span>
                                </Link>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
