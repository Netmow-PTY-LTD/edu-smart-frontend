import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AllCoursesLayout from '@/components/StudentDashboard/components/AllCourses/AllCoursesLayout';

import { useGetsingleUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Nav, NavItem, NavLink, Row } from 'reactstrap';

const SingleuniversityProfileForAgent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1');
  const university_id = router.query.id;

  const {
    data: getSingleUniversityDataForAgent,
    isLoading: getSingleUniversityIsLoadingForAgent,
    refetch: getSingleUniversityForAgentRefetch,
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
        <div className="h-100">
          {getSingleUniversityIsLoadingForAgent ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <ProfileBgCover
                profileData={getSingleUniversityDataForAgent?.data}
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
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SingleuniversityProfileForAgent;
