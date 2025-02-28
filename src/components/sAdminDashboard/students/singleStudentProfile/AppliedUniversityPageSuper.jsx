import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import DataObjectComponent from '@/utils/common/data';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Row } from 'reactstrap';

const AppliedUniversityPageSuper = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const { studentSubmittedDocumentsHeaderWithoutAction } =
    DataObjectComponent();

  const perPageData = 10;

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    'allSubmittedDocumentForStudentData'?.data?.length > 0 &&
    'allSubmittedDocumentForStudentData'?.data.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const uploadAction = [
    {
      title: 'Actions',
      key: 'actions',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.title ? item?.title : '-'}`}
          </h5>
        </div>
      ),
    },
  ];

  return (
    <Row>
      <div>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            Applied University
            <SearchComponent
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </CardHeader>
          <CardBody>
            <CommonTableComponent
              headers={[
                ...studentSubmittedDocumentsHeaderWithoutAction,
                ...uploadAction,
              ]}
              data={isfilteredData ? isfilteredData : []}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              perPageData={perPageData}
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              emptyMessage="No Data found yet."
            />
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export default AppliedUniversityPageSuper;
