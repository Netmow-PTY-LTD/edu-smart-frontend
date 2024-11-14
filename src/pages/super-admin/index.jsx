import DashBoardCountOptions from '@/components/dashboard/home/DashBoardCountOptions';
import LatestRegisteredPlayer from '@/components/dashboard/home/LatestRegisteredPlayer';
import LatestTeams from '@/components/dashboard/home/LatestTeams';
import WelcomingMessage from '@/components/dashboard/home/WelcomingMessage';
import Layout from '@/components/dashboard/layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [totalSum, setTotalSum] = useState(0);
  const [paidSum, setPaidSum] = useState(0);
  const [unPaidSum, setUnpaidSum] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [talkToExpertOpenModal, setTalkToExpertOpenModal] = useState(false);
  const maxEffectRuns = 3;

  useEffect(() => {
    const storedCount =
      parseInt(localStorage.getItem('effectRunCount'), 10) || 0;

    if (storedCount <= maxEffectRuns) {
      if (Object.keys(router.query).length === 0) {
        setOpenModal(true);
      } else {
        setOpenModal(false);
      }
      localStorage.setItem('effectRunCount', storedCount + 1);
    }
  }, [router.query]);

  // useEffect(() => {
  //   if (router?.query?.token) {
  //     localStorage.setItem('token', router.query.token);
  //   }
  //   if (localStorage.getItem('token') && router.query.token) {
  //     window?.location?.assign(
  //       window?.location?.origin + window?.location?.pathname
  //     );
  //   }
  // }, [router?.query?.token]);

  return (
    <Layout>
      <div className="page-content">
        <div className="px-4 mb-4 container-fluid">
          <Row>
            <Col>
              <div className="h-100">
                <WelcomingMessage data={''} />
                <Row>
                  <DashBoardCountOptions
                    userInfoData={{ role: 'super-admin' }}
                    firstElementData={''}
                    secondElementData={''}
                    thirdElementData={''}
                    gstAndCurrencyData={''}
                    fourthElementData={''}
                    paidSum={''}
                    unPaidSum={''}
                  />
                </Row>
                {/* <Revenue /> */}
                <Row id="quickdatatable" xxl={12} className="grid g-5">
                  <Col xxl={6}>
                    <LatestRegisteredPlayer userInfoData={''} data={''} />
                  </Col>

                  <LatestTeams />
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

// export default ProtectedRoute(AdminDashboard);
export default AdminDashboard;
