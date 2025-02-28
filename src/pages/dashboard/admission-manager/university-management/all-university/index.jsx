import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useDeleteUniversityMutation,
  useGetUniversityQuery,
} from '@/slice/services/super admin/universityService';
import DataObjectComponent from '@/utils/common/data';

import Link from 'next/link';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader } from 'reactstrap';

const AllUniversityForSuperAdmin = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [universityIdForDelete, setUniversityIdForDelete] = useState(null);

  const perPageData = 10;

  const {
    universityLogoAndNameHeaderDataForSuperAdminDashboard,
    universityHeadersData,
  } = DataObjectComponent();

  const {
    data: getUniversityData,
    error: getUniversityError,
    isLoading: getUniversityIsLoading,
    refetch: getUniversityRefetch,
  } = useGetUniversityQuery();

  const [
    deleteUniversity,
    {
      data: deleteUniversityData,
      error: deleteUniversityError,
      isLoading: deleteUniversityIsLoading,
    },
  ] = useDeleteUniversityMutation();

  const handleDeleteButtonClick = (itemId) => {
    setUniversityIdForDelete(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteUniversity = async (id) => {
    try {
      const result = await deleteUniversity(id).unwrap();
      if (result) {
        toast.success(result?.message);
        getUniversityRefetch();
        handleDeleteButtonClick();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      //
    }
  };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getUniversityData?.data?.length > 0 &&
    getUniversityData?.data.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {getUniversityIsLoading ? (
              <LoaderSpiner />
            ) : (
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <Link
                    href={
                      '/dashboard/super-admin/university-management/add-university'
                    }
                    className="button px-3 py-2"
                  >
                    Add New
                  </Link>

                  <SearchComponent
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                  />
                </CardHeader>

                <CardBody>
                  <CommonTableComponent
                    headers={[
                      universityLogoAndNameHeaderDataForSuperAdminDashboard,
                      ...universityHeadersData,
                    ]}
                    data={isfilteredData ? isfilteredData : []}
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

            {/* Delete University */}
            <DeleteModal
              Open={deleteModalIsOpen}
              close={handleDeleteButtonClick}
              id={universityIdForDelete}
              handleDelete={handleDeleteUniversity}
              isloading={deleteUniversityIsLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUniversityForSuperAdmin;
