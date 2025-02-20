import CommonTableComponent from '@/components/common/CommonTableComponent';
import FileViewer from '@/components/common/FileViewer';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useAllSubmittedDocumentForStudentQuery } from '@/slice/services/student/studentSubmitDocumentService';
import { studentSubmittedDocumentsHeaderWithoutAction } from '@/utils/common/data';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllSubmittedDocumentsForStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');
  const perPageData = 10;

  const {
    data: allSubmittedDocumentForStudentData,
    error: allSubmittedDocumentForStudentError,
    isLoading: allSubmittedDocumentForStudentIsLoading,
    refetch: allSubmittedDocumentForStudentRefetch,
  } = useAllSubmittedDocumentForStudentQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  console.log(
    'allSubmittedDocumentForStudentData',
    allSubmittedDocumentForStudentData
  );
  // Filter data for search option
  const isFilteredData =
    allSubmittedDocumentForStudentData?.data?.length > 0 &&
    allSubmittedDocumentForStudentData?.data.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    setAllUploadDocumentsForStudentsData([
      ...studentSubmittedDocumentsHeaderWithoutAction,
      ...uploadAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadAction = [
    {
      title: 'Preview',
      key: 'files',
      render: (item) => <FileViewer files={item?.files && item?.files} />,
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {allSubmittedDocumentForStudentIsLoading ? (
            <LoaderSpiner />
          ) : (
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
                  headers={AllUploadDocumentsForStudentsData}
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllSubmittedDocumentsForStudents;
