import CommonTableComponent from '@/components/common/CommonTableComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetAgentFamilyTripQuery } from '@/slice/services/agent/agentEarningsService';
import DataObjectComponent from '@/utils/common/data';
import { useCustomData } from '@/utils/common/data/customeData';
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
  const { AGENT_FAMILYTRIP_HEADERS_FOR_SUPER_ADMIN = [] } =
    DataObjectComponent();

  const AGENT_FAMILYTRIP_HEADERS_Action = [
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
                        Partner Family Trip
                      </CardHeader>
                      <CardBody className="mh-100">
                        <CommonTableComponent
                          headers={[
                            ...AGENT_FAMILYTRIP_HEADERS_FOR_SUPER_ADMIN,
                            ...AGENT_FAMILYTRIP_HEADERS_Action,
                          ]}
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
