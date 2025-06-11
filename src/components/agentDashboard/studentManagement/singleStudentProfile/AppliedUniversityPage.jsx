import CommonTableComponent from '@/components/common/CommonTableComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import ApplicationDocumentsModal from '@/components/sAdminDashboard/modals/ApplicationDocumentsModal';
import ApplicationEmgsStatusTimelineModal from '@/components/sAdminDashboard/modals/ApplicationEmgsStatusTimelineModal';
import { useGetSingleStudentApplicationQuery } from '@/slice/services/agent/agentApplicationService';
import DataObjectComponent from '@/utils/common/data';

import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
const AppliedUniversityPage = ({ id }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;
    const [applicationId, setApplicationId] = useState('');
    const [emgsId, setEmgsId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);

  const { studentApplicationsHeaders } = DataObjectComponent();

  const { data: applicationData, isLoading: applicationLoading } =
    useGetSingleStudentApplicationQuery(id, {
      skip: !id,
    });

  const sortedApplications = useMemo(() => {
    return applicationData?.data?.slice()?.sort((a, b) => {
      const dateA = new Date(b.updatedAt || b.createdAt);
      const dateB = new Date(a.updatedAt || a.createdAt);
      return dateA - dateB;
    });
  }, [applicationData]);

    const ActionData = {
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
                onClick={() => {
                  setEmgsId(item?.emgs_status);
                  setIsTimelineModalOpen(true);
                }}
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
    <>
      {applicationLoading ? (
        <LoaderSpiner />
      ) : (
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
                          headers={[...studentApplicationsHeaders, ActionData]}
                          data={sortedApplications || []}
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
      )}

            <ApplicationEmgsStatusTimelineModal
              isOpen={isTimelineModalOpen}
              onClose={() => setIsTimelineModalOpen(false)}
              currentTimeline={emgsId}
            />
            <ApplicationDocumentsModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              applicationId={applicationId}
            />
      
    </>
  );
};

export default AppliedUniversityPage;
