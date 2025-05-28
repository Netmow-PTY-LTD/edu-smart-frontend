import CommonTableComponent from '@/components/common/CommonTableComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetSingleStudentApplicationQuery } from '@/slice/services/agent/agentApplicationService';
import DataObjectComponent from '@/utils/common/data';

import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
const AppliedUniversityPage = ({ id }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

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
                          headers={[...studentApplicationsHeaders]}
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
    </>
  );
};

export default AppliedUniversityPage;
