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

export default function HeroHome({ university }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  // console.log(university);
  // console.log(university?.sliders);

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
                  <div className="search-container">
                    <label htmlFor="search" className="searchIcon-conatiner">
                      <i className="ri-search-line fs-1"></i>
                    </label>
                    <input
                      id="search"
                      type="text"
                      className="hero-search-input"
                      placeholder="Search a course"
                    />
                  </div>
                  <div className="dropdownContainer">
                    <select className="select">
                      <option value="">Browse Courses</option>
                      {university?.courses?.length > 0
                        ? university?.courses?.map((course, i) => {
                            return (
                              <option key={i} value={course?.id}>
                                {course?.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
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
