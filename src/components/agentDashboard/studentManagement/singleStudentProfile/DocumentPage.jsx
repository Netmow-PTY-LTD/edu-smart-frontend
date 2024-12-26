import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Row } from 'reactstrap';
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';
import { useSingleStudentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
const DocumentPage = ({ student_id }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

  const {
    data: getSingleStudent,
    isLoading: getSingleStudenIsLoadingForStudent,
    refetch: getSingleStudenRefetch,
  } = useSingleStudentForAgentQuery(student_id, {
    skip: !student_id,
  });

 

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    getSingleStudent?.data?.documents?.length > 0 &&
    getSingleStudent?.data?.documents?.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Row>
      <div>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            Submitted Docs
            <SearchComponent
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </CardHeader>
          <CardBody>
            <CommonTableComponent
              headers={studentSubmittedDocumentsHeaderWithoutAction}
              data={isFilteredData ? isFilteredData : []}
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

export default DocumentPage;
