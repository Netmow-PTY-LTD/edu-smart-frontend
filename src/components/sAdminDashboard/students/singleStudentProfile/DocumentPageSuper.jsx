import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import { useAllSubmittedDocumentForStudentQuery } from '@/slice/services/student/studentSubmitDocumentService';
import DataObjectComponent from '@/utils/common/data';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Row } from 'reactstrap';
const DocumentPageSuper = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

  const { studentSubmittedDocumentsHeaderWithoutAction } =
    DataObjectComponent();

  // -------------------- Just for UI example this data will come from API -----------------------
  const {
    data: allSubmittedDocumentForStudentData,
    error: allSubmittedDocumentForStudentError,
    isLoading: allSubmittedDocumentForStudentIsLoading,
    refetch: allSubmittedDocumentForStudentRefetch,
  } = useAllSubmittedDocumentForStudentQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    allSubmittedDocumentForStudentData?.data?.length > 0 &&
    allSubmittedDocumentForStudentData?.data.filter(
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

export default DocumentPageSuper;
