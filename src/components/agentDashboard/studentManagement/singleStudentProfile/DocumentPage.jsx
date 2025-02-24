import CommonTableComponent from '@/components/common/CommonTableComponent';
import FileViewer from '@/components/common/FileViewer';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetSingleUserSubmittedDocumentQuery } from '@/slice/services/common/commonDocumentService';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, Row } from 'reactstrap';
const DocumentPage = ({ student_id }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPageData = 10;

  const {
    data: singleStudentAllSubmittedDoc,
    isLoading: getSingleStudentDocLoading,
    isFetching: getSingleStudenDocRefetch,
  } = useGetSingleUserSubmittedDocumentQuery({
    student_id,
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  // Filter data for search option
  const isFilteredData =
    singleStudentAllSubmittedDoc?.data?.length > 0 &&
    singleStudentAllSubmittedDoc?.data?.filter(
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

  return (
    <Row>
      {getSingleStudentDocLoading ? (
        <LoaderSpiner />
      ) : (
        <div>
          <Card>
            <ToastContainer />
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
      )}
    </Row>
  );
};

export default DocumentPage;
