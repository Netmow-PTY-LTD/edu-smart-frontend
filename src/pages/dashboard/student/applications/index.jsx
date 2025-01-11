import CommonTableComponent from '@/components/common/CommonTableComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import StudentApplicationEmgsStatusTimeline from '@/components/StudentDashboard/components/StudentApplicationEmgsStatusTimeline';
import { useGetApplicationsQuery } from '@/slice/services/common/applicationService';
import {
  agentEarnigsHeaders,
  studentApplicationsHeaders,
} from '@/utils/common/data';
import React from 'react';
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

export default function StudentApplications() {
  const [activeTab, setActiveTab] = React.useState('1');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentTimeline, setCurrentTimeline] = React.useState('');
  const perPageData = 9;

  const { data: applicationData, isLoading: applicationLoading } =
    useGetApplicationsQuery();

  const handleViewEmgsStatus = (id) => {
    setCurrentTimeline(id);
    setActiveTab('2');
  };

  const EmgsStatusActionData = {
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
        <DropdownMenu className="ms-2">
          <DropdownItem>
            <div
              onClick={() => handleViewEmgsStatus(item?.emgs_status)}
              className="text-primary"
            >
              <i className="ri-eye-fill me-2"></i>
              View EMGS Status
            </div>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  return (
    <Layout>
      {applicationLoading ? (
        <LoaderSpiner />
      ) : activeTab === '1' ? (
        <div className="page-content">
          <div className="h-100">
            <div className="container-fluid">
              <div>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardHeader className="text-primary fw-semibold fs-2">
                        Student's University Applications
                      </CardHeader>
                      <CardBody className="mh-100">
                        <CommonTableComponent
                          headers={[
                            ...studentApplicationsHeaders,
                            EmgsStatusActionData,
                          ]}
                          data={applicationData?.data || []}
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
          </div>
        </div>
      ) : (
        <div className="page-content">
          <div className="h-100">
            <div className="container-fluid">
              <div>
                <StudentApplicationEmgsStatusTimeline
                  setActiveTab={setActiveTab}
                  currentTimeline={currentTimeline}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
