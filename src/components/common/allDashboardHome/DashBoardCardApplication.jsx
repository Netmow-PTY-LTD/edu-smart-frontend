import { useGetRecentApplicationsQuery } from '@/slice/services/common/applicationService';
import { useCustomData } from '@/utils/common/data/customeData';
import Link from 'next/link';
import React from 'react';
import CountUp from 'react-countup';
import { Card, CardBody, Col, Row } from 'reactstrap';

const DashBoardCardApplication = () => {
    const customData = useCustomData();
  
  const {
    data: recentApplicationData,
    isLoading: recentApplicationLoading,
  } = useGetRecentApplicationsQuery();

  const allStatuses = [
    'pending',
    'review_in',
    'file_requested',
    'ready_for_emgs',
    'file_under_emgs',
    'ready_for_tuition',
    'tuition_under_processed',
    'accepted',
    'rejected',
  ];

  const statusIcons = {
    pending: 'ri-hourglass-line',
    review_in: 'ri-search-eye-line',
    file_requested: 'ri-folder-received-line',
    ready_for_emgs: 'ri-send-plane-line',
    file_under_emgs: 'ri-file-search-line',
    ready_for_tuition: 'ri-graduation-cap-line',
    tuition_under_processed: 'ri-loop-right-line',
    accepted: 'ri-checkbox-circle-line',
    rejected: 'ri-close-circle-line',
  };


const isAgentOrStudent =
  customData?.paneltext === 'agent' || customData?.paneltext === 'student';
const basePath = isAgentOrStudent ? 'applications' : 'recent-application';
const statusLinks = {
  pending: `/dashboard/${customData?.paneltext}/${basePath}?search=pending`,
  review_in: `/dashboard/${customData?.paneltext}/${basePath}?search=review_in`,
  file_requested: `/dashboard/${customData?.paneltext}/${basePath}?search=file_requested`,
  ready_for_emgs: `/dashboard/${customData?.paneltext}/${basePath}?search=ready_for_emgs`,
  file_under_emgs: `/dashboard/${customData?.paneltext}/${basePath}?search=file_under_emgs`,
  ready_for_tuition: `/dashboard/${customData?.paneltext}/${basePath}?search=ready_for_tuition`,
  tuition_under_processed: `/dashboard/${customData?.paneltext}/${basePath}?search=tuition_under_processed`,
  accepted: `/dashboard/${customData?.paneltext}/${basePath}?search=accepted`,
  rejected: `/dashboard/${customData?.paneltext}/${basePath}?search=rejected`,
};

  const statusCounts =
    recentApplicationData?.data?.reduce((acc, item) => {
      const status = item.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {}) || {};

  const normalizedCounts = {};
  allStatuses.forEach((status) => {
    normalizedCounts[status] = statusCounts[status] || 0;
  });

  const formatLabel = (status) =>
    status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  if (recentApplicationLoading) return <p>Loading...</p>;

  return (
    <Col md={12}>
      <Row className="grid g-5">
        {allStatuses.map((status, index) => {
          const count = normalizedCounts[status];
          return (
            <Col xl={3} md={6} key={index}>
              <Card className="card-animate p-4">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="fs-2 text-uppercase fw-medium text-black text-truncate mb-0">
                        {formatLabel(status)}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-18 fw-semibold ff-secondary my-3 text-black">
                        <span className="counter-value">
                          <CountUp start={0} end={count} duration={2} />
                        </span>
                      </h4>

                      {count > 0 ? (
                        <Link
                          href={statusLinks[status] || '#'}
                          className="text-decoration-underline text-black"
                        >
                          View {formatLabel(status)}
                        </Link>
                      ) : (
                        <span className="text-muted">No Applications</span>
                      )}
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span style={{ fontSize: 35 }}>
                        <i
                          className={`${statusIcons[status] || 'ri-file-list-line'} third-color`}
                        />
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Col>
  );
};

export default DashBoardCardApplication;
