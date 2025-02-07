import Link from 'next/link';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HomeSlider() {
  return (
    <section className="hero-section">
      <Swiper className="mySwiper" navigation={true} modules={[Navigation]}>
        <SwiperSlide>
          <div
            className="single-slide"
            style={{
              backgroundImage: `url('/assets/images/agent/agent_slider_bg.png')`,
            }}
          >
            <div className="container">
              <Row>
                <Col md={9} xl={6}>
                  <div className="slider-content">
                    <h1>
                      Unwrap Your Career Goal With EduSmart Study Guideline
                    </h1>
                    <div className="slider-desc">
                      Edusmart is dedicated to empowering students worldwide
                      with comprehensive guidance for studying abroad. From
                      selecting the right course to securing your study visa, we
                      make your journey seamless.
                    </div>
                    <div className="btns">
                      <Link
                        href="/auth/register"
                        className="button py-3 px-5 fw-semibold text-center"
                      >
                        Apply For Free
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="single-slide"
            style={{
              backgroundImage: `url('/assets/images/agent/agent_slider_bg.png')`,
            }}
          >
            <div className="container">
              <Row>
                <Col md={9} xl={6}>
                  <div className="slider-content">
                    <h1>
                      Unwrap Your Career Goal With EduSmart Study Guideline
                    </h1>
                    <div className="slider-desc">
                      Edusmart is dedicated to empowering students worldwide
                      with comprehensive guidance for studying abroad. From
                      selecting the right course to securing your study visa, we
                      make your journey seamless.
                    </div>
                    <div className="btns">
                      <Link
                        href="#"
                        className="button py-3 px-5 fw-semibold text-center"
                      >
                        Apply For Free
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="single-slide"
            style={{
              backgroundImage: `url('/assets/images/agent/agent_slider_bg.png')`,
            }}
          >
            <div className="container">
              <Row>
                <Col md={9} xl={6}>
                  <div className="slider-content">
                    <h1>
                      Unwrap Your Career Goal With EduSmart Study Guideline
                    </h1>
                    <div className="slider-desc">
                      Edusmart is dedicated to empowering students worldwide
                      with comprehensive guidance for studying abroad. From
                      selecting the right course to securing your study visa, we
                      make your journey seamless.
                    </div>
                    <div className="btns">
                      <Link
                        href="#"
                        className="button py-3 px-5 fw-semibold text-center"
                      >
                        Apply For Free
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
