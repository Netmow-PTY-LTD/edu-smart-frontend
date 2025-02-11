import PageBanner from '@/components/main/common/PageBanner';
import OurServices from '@/components/main/home/OurServices';
import MainLayout from '@/components/main/layout';
import Link from 'next/link';
import React from 'react';
import { Col, Row } from 'reactstrap';

export default function About() {
  return (
    <MainLayout>
      <PageBanner
        title="About"
        bgImage="/assets/images/agent/agent_slider_bg.png"
      />

      <section className="about-content-main">
        <div className="container">
          <Row>
            <Col lg={6}>
              <div className="ed-about-content">
                <h2>About Edusmart</h2>
                <div className="edu-about-text">
                  EduSmart is an advanced and dynamic online learning platform
                  designed with the aim of empowering students throughout their
                  educational journey. The platform offers an extensive
                  collection of courses across various fields, ensuring that
                  learners have access to high-quality educational resources
                  that cater to their individual needs and learning preferences.
                  Whether students are looking to enhance their knowledge in a
                  specific subject area, improve their skills, or pursue
                  entirely new fields of interest, EduSmart provides a wide
                  array of learning opportunities to support their aspirations.{' '}
                  <br />
                  <br />
                  The platform is built to serve a diverse student body,
                  recognizing that every learner has different goals,
                  backgrounds, and academic levels. It offers flexibility and
                  convenience, enabling learners to access educational content
                  at their own pace and according to their schedules. This
                  adaptability ensures that EduSmart is suitable for students
                  from various walks of life, whether they are high schoolers,
                  university students, working professionals, or lifelong
                  learners looking to develop new skills. EduSmart’s mission is
                  to make learning more accessible and engaging for everyone.
                </div>
                <Link href="/contact" className="btn-contact-main">
                  Contact Us
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-img">
                <img src="/assets/images/about.png" alt="Edusmart" />
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <OurServices />
    </MainLayout>
  );
}
