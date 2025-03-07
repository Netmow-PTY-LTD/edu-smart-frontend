import CommonTableComponent from '@/components/common/CommonTableComponent';
import ProgressBar from '@/components/common/ProgressBar';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAgentFamilyTripQuery } from '@/slice/services/agent/agentEarningsService';
import { useCustomData } from '@/utils/common/data/customeData';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

export default function AgentFamilyTrip() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const router = useRouter();

  const customData = useCustomData();

  const { data: familyTrip, isLoading: familyTripLoading } =
    useGetAgentFamilyTripQuery();

  const agentFamilyTripHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    // {
    //   title: 'Package Name',
    //   key: 'package_name',
    //   render: (item) => (
    //     <span className="d-flex flex-column text-capitalize">
    //       {item?.package?.name || '-'}
    //     </span>
    //   ),
    // },
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
    // {
    //   title: 'Package Price ',
    //   key: 'package_price',
    //   render: (item) => (
    //     <span className="d-flex flex-column">
    //       {item?.package?.price || '-'}
    //     </span>
    //   ),
    // },
    // {
    //   title: 'Package Duration',
    //   key: 'package_duration',
    //   render: (item) => (
    //     <span className="d-flex flex-column text-capitalize">
    //       {item?.package?.duration || '-'}
    //     </span>
    //   ),
    // },
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
        <ProgressBar
          target={item?.target ?? 0}
          targetAchieved={item?.target_achieved ?? 0}
        />
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
    {
      title: 'Action',
      key: 'actions',
      render: (item) => (
        <UncontrolledDropdown direction="end">
          <DropdownToggle
            tag="a"
            className="text-reset dropdown-btn"
            role="button"
          >
            <span className="button px-3">
              <i className="ri-more-fill align-middle"></i>
            </span>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu dropdown-menu-end">
            <DropdownItem>
              <div
                onClick={() =>
                  router.push(
                    `/dashboard/${customData?.paneltext}/familyTrip/${item?._id}`
                  )
                }
                className="text-primary"
              >
                <i className="ri-eye-fill me-2"></i>
                View Application
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
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
