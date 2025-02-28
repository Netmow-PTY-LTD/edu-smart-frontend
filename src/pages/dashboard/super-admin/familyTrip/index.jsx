import CommonTableComponent from '@/components/common/CommonTableComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAgentFamilyTripQuery } from '@/slice/services/agent/agentEarningsService';
import moment from 'moment';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Progress, Row } from 'reactstrap';

export default function AgentFamilyTrip() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;

  const { data: familyTrip, isLoading: familyTripLoading } =
    useGetAgentFamilyTripQuery();

  console.log('family trip data', familyTrip);

  const agentFamilyTripHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    {
      title: 'Package Name',
      key: 'package_name',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.package?.name || '-'}
        </span>
      ),
    },
    {
      title: 'Agent Name',
      key: 'agent_name',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.agent?.first_name || '-'}
        </span>
      ),
    },
    {
      title: 'Email',
      key: 'email',
      render: (item) => (
        <span className="d-flex flex-column">{item?.agent?.email || '-'}</span>
      ),
    },
    {
      title: 'Package Price ',
      key: 'package_price',
      render: (item) => (
        <span className="d-flex flex-column">
          {item?.package?.price || '-'}
        </span>
      ),
    },
    {
      title: 'Package Duration',
      key: 'package_duration',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.package?.duration || '-'}
        </span>
      ),
    },
    {
      title: 'Start Date',
      key: 'start_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.start_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },
    {
      title: 'End Date',
      key: 'end_date',
      render: (item) => (
        <span className="d-flex flex-column">
          {moment(item?.end_date).format('DD-MM-YYYY') || '-'}
        </span>
      ),
    },

    {
      title: 'Target Status',
      key: 'target_status',
      render: (item) => (
        <Progress
          className="my-2"
          style={{
            height: '13px',
            borderRadius: '20px',
            backgroundColor: 'rgba(75, 77, 70, 0.18)',
          }}
          color="success"
          value={Math.trunc(
            ((item?.target_achieved ?? 0) / (item?.target ?? 0)) * 100
          )}
        >
          <span className="fs-12 fw-semibold">
            {(item?.target_achieved ?? 0) + ' / ' + (item?.target ?? 0)}
          </span>
        </Progress>
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.status === 'active'
              ? 'bg-success-subtle text-success'
              : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.status || '-'}
        </span>
      ),
    },
    {
      title: 'Payout Status',
      key: 'payout_status',
      render: (item) => (
        <span
          className={`rounded-4 px-4 py-1 fw-medium text-capitalize ${
            item?.payout_status === 'paid'
              ? 'bg-third-color text-primary'
              : item?.payout_status === 'pending'
                ? 'bg-warning-subtle text-warning'
                : 'bg-danger-subtle text-danger'
          }`}
        >
          {item?.payout_status || '-'}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {familyTripLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <div>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardHeader className="text-primary fw-semibold fs-2">
                        Agent Family Trip
                      </CardHeader>
                      <CardBody className="mh-100">
                        <CommonTableComponent
                          headers={agentFamilyTripHeaders}
                          data={familyTrip?.data || []}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          perPageData={perPageData}
                          emptyMessage="No Data found yet."
                        />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
