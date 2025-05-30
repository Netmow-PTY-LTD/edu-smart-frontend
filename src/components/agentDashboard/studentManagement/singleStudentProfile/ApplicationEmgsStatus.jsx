import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

import CommonTableComponent from '@/components/common/CommonTableComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetAllEmgsStatusQuery } from '@/slice/services/common/applicationService';
import DataObjectComponent from '@/utils/common/data';
import { ToastContainer } from 'react-toastify';
import ApplicationEmgsStatusTimeline from './ApplicationEmgsStatusTimeline';

const ApplicationEmgsStatus = ({ student_id }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [currentTimeline, setCurrentTimeline] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;

  const { EmgsStatusListHeaders } = DataObjectComponent();

  const { data: allEmgsStatusData, isLoading: allEmgsStatusLoading } =
    useGetAllEmgsStatusQuery(student_id, {
      skip: !student_id,
    });

  const sortedEmgsStatusData = Array.isArray(allEmgsStatusData?.data)
    ? [...allEmgsStatusData.data].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt).getTime();
        const dateB = new Date(b.createdAt || b.updatedAt).getTime();
        return dateB - dateA; // Descending
      })
    : [];

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
              onClick={() => handleViewEmgsStatus(item._id)}
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
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer />
          {activeTab === '1' &&
            (allEmgsStatusLoading ? (
              <LoaderSpiner />
            ) : (
              <div>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardHeader className="text-primary fw-semibold fs-2">
                        Student's EMGS Status List
                      </CardHeader>
                      <CardBody className="mh-100">
                        <CommonTableComponent
                          headers={[
                            ...EmgsStatusListHeaders,
                            EmgsStatusActionData,
                          ]}
                          data={sortedEmgsStatusData || []}
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
            ))}

          {activeTab === '2' && (
            <ApplicationEmgsStatusTimeline
              setActiveTab={setActiveTab}
              currentTimeline={currentTimeline}
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ApplicationEmgsStatus;
