import CommonTableComponent from '@/components/common/CommonTableComponent';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import StudentFinderModalForSuperAdmin from '@/components/sAdminDashboard/studentManagement/modal/StudentFinderModalForSuperAdmin';
import { useGetAllUserDocRequestQuery } from '@/slice/services/common/commonDocumentService';
import DataObjectComponent from '@/utils/common/data';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const StudentDocumentUploadRquestForSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const perPageData = 10;
  const router = useRouter();

  const { docRequestTableHeaderDataWithoutActionForSuperAdmin = [] } =
    DataObjectComponent();

  const {
    data: allDocumentRequestForSuperAdminData,
    error: allDocumentRequestForSuperAdminError,
    isLoading: allDocumentRequestForSuperAdminIsLoading,
    refetch: allDocumentRequestForSuperAdminRefetch,
  } = useGetAllUserDocRequestQuery();

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isFilteredData =
    allDocumentRequestForSuperAdminData?.data?.length > 0 &&
    allDocumentRequestForSuperAdminData?.data.filter(
      (item) =>
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    const student_id = values.student_id;

    // Redirect to the student profile page
    router.push({
      pathname: `/dashboard/super-admin/students/${student_id}`,
      query: { tab: 3, request: true },
    });
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card>
            <CardHeader>
              <button
                className="button fs-3 py-3 px-4"
                onClick={() => setOpenModal(!openModal)}
              >
                Create Request
              </button>
              <h3>All Student Document Upload Requests from Agent</h3>
              <SearchComponent
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
              />
            </CardHeader>
            <CardBody>
              {allDocumentRequestForSuperAdminIsLoading ? (
                <LoaderSpiner />
              ) : allDocumentRequestForSuperAdminError ? (
                <div>Error loading data....</div>
              ) : (
                <CommonTableComponent
                  headers={docRequestTableHeaderDataWithoutActionForSuperAdmin}
                  data={isFilteredData ? isFilteredData : []}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPageData={perPageData}
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  emptyMessage="No Data found yet."
                />
              )}
            </CardBody>
          </Card>

          {
            <StudentFinderModalForSuperAdmin
              formHeader={' Find And Select Student *'}
              isOpen={openModal}
              onClose={() => {
                setOpenModal(!openModal);
              }}
              onSubmit={handleSubmit}
              formSubmit={'Submit for Request'}
            />
          }
        </div>
      </div>
    </Layout>
  );
};

export default StudentDocumentUploadRquestForSuperAdmin;
