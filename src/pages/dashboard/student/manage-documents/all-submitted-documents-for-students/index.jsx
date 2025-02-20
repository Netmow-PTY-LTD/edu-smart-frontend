import CommonTableComponent from '@/components/common/CommonTableComponent';
import FileViewer from '@/components/common/FileViewer';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useAllSubmittedDocumentForStudentQuery } from '@/slice/services/student/studentSubmitDocumentService';

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
  const studentSubmittedDocumentsHeaderWithoutAction = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">{index + 1}</h5>
        </div>
      ),
    },
    {
      title: 'Title',
      key: 'title',
      render: (item) => {
        const newTitle = item?.title?.replace(/_/g, ' ');

        return (
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              {newTitle || '-'}
            </h5>
          </div>
        );
      },
    },

    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.description ? item?.description : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Notes',
      key: 'notes',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.notes ? item?.notes : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          <FileViewer files={item?.files && item?.files} />
        </div>
      ),
    },

    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <span
          className={`d-flex flex-column text-capitalize fw-semibold ${
            item?.status === 'accepted'
              ? 'text-success'
              : item?.status === 'rejected'
                ? 'text-danger'
                : item?.status === 'pending'
                  ? 'text-warning'
                  : item?.status === 'requested'
                    ? 'text-primary'
                    : ''
          }`}
        >
          {item?.status ? <span>{item?.status}</span> : '-'}
        </span>
      ),
    },
  ];

  useEffect(() => {
    setAllUploadDocumentsForStudentsData([
      ...studentSubmittedDocumentsHeaderWithoutAction,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          {allSubmittedDocumentForStudentIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h1>Submitted Docs</h1>
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
