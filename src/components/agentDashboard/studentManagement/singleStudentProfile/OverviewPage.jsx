import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import WelcomingMessage from '@/components/common/allDashboardHome/WelcomingMessage';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllUniversityQuery } from '@/slice/services/public/university/publicUniveristyService';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

const OverviewPage = () => {
  // -------------------- Just for UI example this data will come from API -----------------------
  const [allRegisteredUniversitydata, setAllRegisteredUniversitydata] =
  useState('');
const { data: userInfodata } = useGetUserInfoQuery();
const { data: universityData } = useGetAllUniversityQuery();
  return (
    <Row>
       <Col>
              <div className="h-100">
                <WelcomingMessage data={userInfodata?.data} />

                <Row xxl={12} className="g-5">
                  <Col xxl={12}>
                    <LatestRegistered
                      tableHead={'All Registered University'}
                      headers={allRegisteredUniversitydata}
                      data={universityData?.data ? universityData?.data : []}
                    />
                  </Col>
                  <Col xxl={6}>
                    <LatestRegistered
                      tableHead={'My Applied Universities'}
                      // headers={}
                      // data={}
                    />
                  </Col>
                  <Col xxl={6}>
                    <LatestRegistered
                      tableHead={'Document Upload Request'}
                      // headers={}
                      // data={}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
    </Row>
  );
};

export default OverviewPage;
