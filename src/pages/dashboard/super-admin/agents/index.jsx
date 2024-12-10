import LatestRegistered from '@/components/common/allDashboardHome/LatestRegistered';
import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetAllAgentQuery } from '@/slice/services/public/agent/publicAgentService';
import { userDummyImage } from '@/utils/common/data';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

// import ProtectedRoute from '@/components/protectedRoutes';

const AllAgentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: userInfodata } = useGetUserInfoQuery();

  const { data: allAgentsData } = useGetAllAgentQuery();

  const agentsHeaders = [
    {
      title: 'Name',
      key: 'profile_image',
      render: (item) => (
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0 me-1">
            <Link href={``} className="text-reset">
              <Image
                src={
                  item?.profile_image?.url
                    ? item?.profile_image?.url
                    : `${userDummyImage}`
                }
                alt="User"
                height={60}
                width={60}
                className="avatar-md p-1 me-3 align-middle rounded-circle"
              />
            </Link>
          </div>
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              <Link href={``} className="text-reset">
                {`${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`}
              </Link>
            </h5>
          </div>
        </div>
      ),
    },

    { title: 'Email', key: 'email' },
    { title: 'Phone', key: 'phone' },
    {
      title: 'Country',
      key: 'country',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.country ? <span>{item.country}</span> : '-'}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="h-100">
                <LatestRegistered
                  tableHead={'Latest Registered Agents'}
                  headers={agentsHeaders}
                  data={allAgentsData?.data ? allAgentsData?.data : []}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

// export default ProtectedRoute(AdminDashboard);
export default AllAgentsPage;
