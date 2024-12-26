import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import { useSingleStudentSubmittedDocumentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Row } from 'reactstrap';

const DocumentRequestPage = ({ student_id }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // -------------------- Just for UI example this data will come from API -----------------------
  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');

  const { data: useSingleStudentSubmittedDocumentForAgent } =
    useSingleStudentSubmittedDocumentForAgentQuery(student_id);

  console.log(useSingleStudentSubmittedDocumentForAgent);

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

  useEffect(() => {
    setAllUploadDocumentsForStudentsData([
      ...studentSubmittedDocumentsHeaderWithoutAction,
      ...uploadAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <div>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            Rquested Docs
            <SearchComponent
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </CardHeader>
          <CardBody>
            <CommonTableComponent
              headers={AllUploadDocumentsForStudentsData}
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

export default DocumentRequestPage;
