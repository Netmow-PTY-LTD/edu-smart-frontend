import CommonTableComponent from '@/components/common/CommonTableComponent';
import FileViewer from '@/components/common/FileViewer';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useGetSingleUserSubmittedDocumentQuery } from '@/slice/services/common/commonDocumentService';
import { currentUser } from '@/utils/currentUserHandler';
import { downloadFiles } from '@/utils/downloadFiles';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';

const AllSubmittedDocumentsForStudents = () => {
  const user = currentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [
    AllUploadDocumentsForStudentsData,
    setAllUploadDocumentsForStudentsData,
  ] = useState('');
  const perPageData = 10;

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
      title: 'Requested From',
      key: 'requested_by',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.requested_by?.first_name && item?.requested_by?.last_name
            ? `${
                item?.requested_by?.first_name
                  ? item?.requested_by?.first_name
                  : ''
              } ${
                item?.requested_by?.last_name
                  ? item?.requested_by?.last_name
                  : ''
              }`
            : '-'}
        </span>
      ),
    },
    {
      title: 'Requester Email',
      key: 'email',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium ">
            {`${item?.requested_by?.email ? item?.requested_by?.email : '-'}`}
          </h5>
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
                    : item?.status === 'submitted'
                      ? 'text-info'
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
