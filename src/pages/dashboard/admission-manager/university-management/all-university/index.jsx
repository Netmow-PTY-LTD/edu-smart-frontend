import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useDeleteUniversityForAdmissionManagerMutation,
  useGetUniversityForAdmissionManagerQuery,
} from '@/slice/services/admission manager/universityServiceForAdmissionManager';
import {
  universityHeadersData,
  universityLogoAndNameHeaderDataForAdmissionManagerDashboard,
} from '@/utils/common/data';

import Link from 'next/link';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

const AllUniversityForSuperAdmin = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [universityIdForDelete, setUniversityIdForDelete] = useState(null);

  const perPageData = 10;

  const {
    data: getUniversityForAdmissionManagerData,
    error: getUniversityForAdmissionManagerError,
    isLoading: getUniversityForAdmissionManagerIsLoading,
    refetch: getUniversityForAdmissionManagerRefetch,
  } = useGetUniversityForAdmissionManagerQuery();

  const [
    deleteUniversityForAdmissionManager,
    {
      data: deleteUniversityForAdmissionManagerData,
      error: deleteUniversityForAdmissionManagerError,
      isLoading: deleteUniversityForAdmissionManagerIsLoading,
    },
  ] = useDeleteUniversityForAdmissionManagerMutation();

  const handleDeleteButtonClick = (itemId) => {
    setUniversityIdForDelete(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteUniversity = async (id) => {
    try {
      const result = await deleteUniversityForAdmissionManager(id).unwrap();
      if (result) {
        toast.success(result?.message);
        getUniversityForAdmissionManagerRefetch();
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
    getUniversityForAdmissionManagerData?.data?.length > 0 &&
    getUniversityForAdmissionManagerData?.data.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const alluniversityHeaderAction = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      <UncontrolledDropdown className="card-header-dropdown">
        <DropdownToggle
          tag="a"
          className="text-reset dropdown-btn"
          role="button"
        >
          <span className="button px-3">
            <i className="ri-more-fill align-middle"></i>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu dropdown-menu-end">
          <DropdownItem>
            <Link
              href={`/dashboard/admission-manager/university-management/single-university-profile/${item?._id}`}
              className="text-primary"
            >
              <i className="ri-tools-fill align-start me-2 text-muted fw-bold"></i>
              Manage
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              href={`/dashboard/admission-manager/university-management/edit-university/${item?._id}`}
              className="text-primary"
            >
              <i className="ri-pencil-fill align-start me-2 text-muted"></i>
              Edit
            </Link>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => handleDeleteButtonClick(item._id)}
              className="text-primary"
            >
              <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
              Delete
            </div>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {getUniversityForAdmissionManagerIsLoading ? (
              <LoaderSpiner />
            ) : (
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <Link
                    href={
                      '/dashboard/admission-manager/university-management/add-university'
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
                      universityLogoAndNameHeaderDataForAdmissionManagerDashboard,
                      ...universityHeadersData,
                      alluniversityHeaderAction,
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
              isloading={deleteUniversityForAdmissionManagerIsLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUniversityForSuperAdmin;
