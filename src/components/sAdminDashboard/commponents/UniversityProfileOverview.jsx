import AllOverviewInfoCard from '@/components/common/alldashboardCommon/AllOverviewInfoCard';
import CommonTableComponent from '@/components/common/CommonTableComponent';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const UniversityProfileOverview = ({
  profileData,
  headers,
  categoryHeaders,
  courseHeaders,
  allDepartmentData,
  allCategoryData,
  allCourseData,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  console.log(allCourseData);
  return (
    <>
      <Row className="grid g-5 pb-2">
        <Col xxl={3}>
          <AllOverviewInfoCard data={profileData} />
        </Col>
        <Col xl={9} className="">
          <Row className="g-5">
            <Col xl={12}>
              <div>
                <Card>
                  <CardHeader className="fs-2 fw-semibold">
                    All Department
                  </CardHeader>
                  <CardBody>
                    <CommonTableComponent
                      headers={headers}
                      data={allDepartmentData ? allDepartmentData : []}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      perPageData={5}
                      emptyMessage="No Data found yet."
                    />
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="g-5">
        <Col xl={6}>
          <div>
            <Card>
              <CardHeader></CardHeader>
              <CardBody>
                <CommonTableComponent
                  headers={categoryHeaders}
                  data={allCategoryData ? allCategoryData : []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPageData={5}
                  emptyMessage="No Data found yet."
                />
              </CardBody>
            </Card>
          </div>
        </Col>
        <Col xl={6}>
          <div>
            <Card>
              <CardHeader></CardHeader>
              <CardBody>
                <CommonTableComponent
                  headers={courseHeaders}
                  data={allCourseData ? allCourseData : []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPageData={5}
                  emptyMessage="No Data found yet."
                />
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UniversityProfileOverview;
