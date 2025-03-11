import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetSingleUserSubmittedDocumentQuery } from '@/slice/services/common/commonDocumentService';
import DataObjectComponent from '@/utils/common/data';
import { currentUser } from '@/utils/currentUserHandler';
import { downloadFiles } from '@/utils/downloadFiles';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';

const AllSubmittedDocumentsForStudents = () => {
  const user = currentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

  const { studentSubmittedDocumentsHeaderWithoutAction = [] } =
    DataObjectComponent();

  const {
    data: singleStudentAllSubmittedDoc,
    isLoading: getSingleStudentDocLoading,
    isFetching: getSingleStudenDocRefetch,
  } = useGetSingleUserSubmittedDocumentQuery({ student_id: user?.id });

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    singleStudentAllSubmittedDoc?.data?.length > 0 &&
    singleStudentAllSubmittedDoc?.data.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDownloadAllDocument = () => {
    if (!singleStudentAllSubmittedDoc?.data) {
      toast.error('No documents available to download');
      return;
    }

    const allFileUrls = singleStudentAllSubmittedDoc.data
      .flatMap((item) => item.files.map((file) => file.url))
      .filter(Boolean); // Remove undefined/null values
    downloadFiles(allFileUrls, 'Downloading all documents...');
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {getSingleStudentDocLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <Button
                  className="button px-4 py-3 fw-bold"
                  onClick={handleDownloadAllDocument}
                >
                  Download All Document
                </Button>
                <h1>Submitted Docs</h1>
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllSubmittedDocumentsForStudents;
