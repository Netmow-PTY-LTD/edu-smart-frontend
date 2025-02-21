import CommonTableComponent from '@/components/common/CommonTableComponent';
import FileViewer from '@/components/common/FileViewer';
import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import { useGetAllUserSubmittedDocumentQuery } from '@/slice/services/common/commonDocumentService';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllDocumentForAgentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const perPageData = 10;

  const {
    data: allSubmittedDocumentForAgentData,
    error: allSubmittedDocumentForAgentError,
    isLoading: allSubmittedDocumentForAgentIsLoading,
    refetch: allSubmittedDocumentForAgentRefetch,
  } = useGetAllUserSubmittedDocumentQuery();

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

  const docRequestTableHeaderDataWithoutAction = [
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
      title: 'Student Name',
      key: 'user',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.user?.first_name && item?.user?.last_name ? (
            <Link
              href={`/dashboard/agent/student-management/single-student-for-agent/${item?.user?._id}?tab=2`}
              className="text-primary text-decoration-none"
            >
              {`${item?.user?.first_name} ${item?.user?.last_name}`}
            </Link>
          ) : (
            '-'
          )}
        </span>
      ),
    },
    {
      title: 'Doc Title',
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
      title: 'Descriptions',
      key: 'description',
    },

    {
      title: 'Submitted Files',
      key: 'files',
      render: (item) => (
        <div>
          {item?.files && item?.files.length > 0 ? (
            <FileViewer files={item?.files && item?.files} />
          ) : (
            'No submission files yet'
          )}
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

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <Card>
              <CardHeader>
                <h3 className="">All Submitted Documents </h3>
                <SearchComponent
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </CardHeader>
              <CardBody>
                <CommonTableComponent
                  headers={docRequestTableHeaderDataWithoutAction}
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
      </div>
    </Layout>
  );
};

export default AllDocumentForAgentDashboard;
