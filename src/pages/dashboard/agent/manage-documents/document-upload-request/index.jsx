import CommonTableComponent from '@/components/common/CommonTableComponent';
import Layout from '@/components/layout';
import { useAllSubmittedDocumentForAgentQuery } from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const StudentDocumentUploadRquestForAgent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const perPageData = 10;

  const {
    data: allSubmittedDocumentForAgentData,
    error: allSubmittedDocumentForAgentError,
    isLoading: allSubmittedDocumentForAgentIsLoading,
    refetch: allSubmittedDocumentForAgentRefetch,
  } = useAllSubmittedDocumentForAgentQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    allSubmittedDocumentForAgentData?.data?.length > 0 &&
    allSubmittedDocumentForAgentData?.data.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  console.log(allSubmittedDocumentForAgentData);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card>
            <CardHeader>
              <h3>Student Document Upload Requests</h3>
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
      </div>
    </Layout>
  );
};

export default StudentDocumentUploadRquestForAgent;
