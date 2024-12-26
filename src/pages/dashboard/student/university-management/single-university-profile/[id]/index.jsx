import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AllCoursesLayout from '@/components/StudentDashboard/components/AllCourses/AllCoursesLayout';
import { useGetsingleUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Container, Nav, NavItem, NavLink, Row } from 'reactstrap';

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

  return (
    <Layout>
      <div className="page-content">
        {getSingleUniversityIsLoadingForStudent ? (
          <LoaderSpiner />
        ) : (
          <div className="h-100">
            <Container fluid>
              <ProfileBgCover
                profileData={getSingleUniversityDataForStudent?.data}
              />
              <Row>
                <div style={{ marginTop: '10rem' }} className="d-flex">
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
                  </Nav>
                  <div className="d-flex gap-3 flex-shrink-1 "></div>
                </div>

                {activeTab === '1' && (
                  <div style={{ marginTop: '50px' }}>
                    <AllCoursesLayout university_id={university_id} />
                  </div>
                )}
              </Row>
            </Container>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SingleuniversityProfileForStudent;
