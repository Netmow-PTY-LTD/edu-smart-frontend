import React, { useState } from 'react';
import {
  Button,
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

//import Images
import avatar5 from '../../../../../public/assets/images/users/user-dummy-img.jpg';
import avatar4 from '../../../../../public/assets/images/users/user-dummy-img.jpg';
import avatar3 from '../../../../../public/assets/images/users/user-dummy-img.jpg';

import small2 from '../../../../../public/assets/images/users/user-dummy-img.jpg';
import small3 from '../../../../../public/assets/images/users/user-dummy-img.jpg';
import small4 from '../../../../../public/assets/images/users/user-dummy-img.jpg';
import small6 from '../../../../../public/assets/images/users/user-dummy-img.jpg';
import {
  useGetAllEmgsStatusQuery,
  useGetEmgsStatusTimelineQuery,
} from '@/slice/services/common/applicationService';
import ApplicationEmgsStatusTimeline from './ApplicationEmgsStatusTimeline';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import {
  agentEarnigsHeaders,
  EmgsStatusListHeaders,
} from '@/utils/common/data';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';

const ApplicationEmgsStatus = ({ student_id }) => {
  const data = [0, 1, 2, 3, 4, 5];
  const [activeTab, setActiveTab] = useState('1');
  const [currentTimeline, setCurrentTimeline] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 9;

  const { data: allEmgsStatusData, isLoading: allEmgsStatusLoading } =
    useGetAllEmgsStatusQuery(student_id, {
      skip: !student_id,
    });

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
                          data={allEmgsStatusData?.data || []}
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
