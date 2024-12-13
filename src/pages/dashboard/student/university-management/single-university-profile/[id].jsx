import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import CourseCardComponent from '@/components/common/CourseCardComponent';
import Layout from '@/components/layout';
import { useGetsingleUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';

const SingleuniversityProfileForStudent = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('1');

  const university_id = router.query.id;

  const {
    data: getSingleUniversityDataForStudent,
    isLoading: getSingleUniversityIsLoadingForStudent,
    refetch: getSingleUniversityForStudentRefetch,
  } = useGetsingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  console.log(getSingleUniversityDataForStudent?.data?.courses);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Container fluid>
            <ProfileBgCover
              profileData={getSingleUniversityDataForStudent?.data}
            />

            <Row>
              <div className="d-flex mb-5">
                <Nav
                  pills
                  className="animation-nav profile-nav gap-4 gap-lg-4 flex-grow-1"
                  role="tablist"
                >
                  <NavItem className="fs-14">
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({
                        active: activeTab === '1',
                      })}
                      onClick={() => {
                        toggleTab('1');
                      }}
                    >
                      <i className="ri-airplay-fill d-inline-block d-md-none"></i>{' '}
                      <span className="d-none d-md-inline-block">
                        All Courses
                      </span>
                    </NavLink>
                  </NavItem>

                  <NavItem className="fs-14">
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({
                        active: activeTab === '3',
                      })}
                      onClick={() => {
                        toggleTab('3');
                      }}
                    >
                      <i className="ri-airplay-fill d-inline-block d-md-none"></i>{' '}
                      <span className="d-none d-md-inline-block">
                        By Programs
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <div className="d-flex gap-3 flex-shrink-1 "></div>
              </div>

              {activeTab === '1' && (
                <Row>
                  {getSingleUniversityDataForStudent?.data?.courses?.length >
                    0 &&
                    getSingleUniversityDataForStudent?.data?.courses.map(
                      (item, index) => (
                        <Col key={index} lg={3}>
                          <CourseCardComponent item={item} />
                        </Col>
                      )
                    )}
                </Row>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default SingleuniversityProfileForStudent;
