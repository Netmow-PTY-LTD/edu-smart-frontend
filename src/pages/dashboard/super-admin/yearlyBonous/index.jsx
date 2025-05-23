import CommonTableComponent from '@/components/common/CommonTableComponent';
import ProgressBar from '@/components/common/ProgressBar';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAgentYearlyBonusQuery } from '@/slice/services/agent/agentEarningsService';
import DataObjectComponent from '@/utils/common/data';
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

export default function AgentYarlyBonous() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;
  const router = useRouter();

  const customData = useCustomData();

  const { data: yearlyBonous, isLoading: yearlyBonousLoading } =
    useGetAgentYearlyBonusQuery();

  const { AGENT_YEARLYBONOUS_HEADERS_FOR_SUPER_ADMIN = [] } =
    DataObjectComponent();

  const AGENT_YEARLYBONOUS_HEADERS_Action = [
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
                    `/dashboard/${customData?.paneltext}/yearlyBonous/${item?._id}`
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
          {yearlyBonousLoading ? (
            <LoaderSpiner />
          ) : (
            <div className="container-fluid">
              <div>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardHeader className="text-primary fw-semibold fs-2">
                        Partner's Yearly Bonous
                      </CardHeader>
                      <CardBody className="mh-100">
                        <CommonTableComponent
                          headers={[
                            ...AGENT_YEARLYBONOUS_HEADERS_FOR_SUPER_ADMIN,
                            ...AGENT_YEARLYBONOUS_HEADERS_Action,
                          ]}
                          data={yearlyBonous?.data || []}
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
