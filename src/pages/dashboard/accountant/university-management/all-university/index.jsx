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
import { useCustomData } from '@/utils/common/data/customeData';

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
  const [searchTermNew, setSearchTermNew] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [universityIdForChangeStatus, setUniversityIdForChangeStatus] =
    useState(null);
  const [checkUniversityStatus, setCheckUniversityStatus] = useState(null);
  const perPageData = 10;

  const {
    universityLogoAndNameHeaderDataForSuperAdminDashboard = [],
    universityHeadersData = [],
  } = DataObjectComponent();

  const customData = useCustomData();

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

  const handleDeleteButtonClick = (uniData) => {
    setUniversityIdForChangeStatus(uniData?.id);
    setDeleteModalIsOpen(!deleteModalIsOpen);
    setCheckUniversityStatus(uniData?.status);
  };

  const handleDeleteUniversity = async (id) => {
    try {
      const statusData = {
        id: universityIdForChangeStatus,
        status: checkUniversityStatus,
      };
      const result = await deleteUniversity(statusData).unwrap();
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
  // search input change function
  const handleSearchChangeNew = (e) => setSearchTermNew(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getUniversityData?.data?.length > 0 &&
    getUniversityData?.data.filter(
      (item) =>
        item?.status === 'active' &&
        item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  // Filter data for search option
  const isfilteredDataNew =
    getUniversityData?.data?.length > 0 &&
    getUniversityData?.data.filter(
      (item) =>
        item?.status === 'inactive' &&
        item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const alluniversityHeaderAction = {
    title: 'Action',
    key: 'actions',
    render: (item) => (
      <UncontrolledDropdown direction="end">
        <DropdownToggle
          tag="a"
          className="text-reset dropdown-btn"
          role="button"
        >
          <span className="button px-3">
            <i className="ri-more-fill align-middle"></i>
          </span>
        </DropdownToggle>
        <DropdownMenu className="me-3">
          <DropdownItem>
            <Link
              href={`/dashboard/${customData?.paneltext}/university-management/single-university-profile/${item?._id}`}
              className="text-primary"
            >
              <i className="ri-tools-fill align-start me-2 text-muted fw-bold"></i>
              Manage
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link
              href={`/dashboard/${customData?.paneltext}/university-management/edit-university/${item?._id}`}
              className="text-primary"
            >
              <i className="ri-pencil-fill align-start me-2 text-muted"></i>
              Edit
            </Link>
          </DropdownItem>
          {item?.status === 'active' ? (
            <DropdownItem>
              <div
                onClick={() =>
                  handleDeleteButtonClick({ id: item._id, status: 'inactive' })
                }
                className="text-primary"
              >
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Inactive
              </div>
            </DropdownItem>
          ) : (
            <DropdownItem>
              <div
                onClick={() =>
                  handleDeleteButtonClick({ id: item._id, status: 'active' })
                }
                className="text-primary"
              >
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Active
              </div>
            </DropdownItem>
          )}
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
            {getUniversityIsLoading ? (
              <LoaderSpiner />
            ) : (
              <div className=" d-flex flex-column gap-5">
                <Card>
                  <CardHeader className="d-flex justify-content-between align-items-center">
                    <Link
                      href={`/dashboard/${customData?.paneltext}/university-management/add-university`}
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
                <Card>
                  <CardHeader className="d-flex justify-content-between align-items-center">
                    <div className="fs-2 fw-semibold text-primary">
                      Inactive Universities
                    </div>

                    <SearchComponent
                      searchTerm={searchTermNew}
                      handleSearchChange={handleSearchChangeNew}
                    />
                  </CardHeader>

                  <CardBody>
                    <CommonTableComponent
                      headers={[
                        universityLogoAndNameHeaderDataForSuperAdminDashboard,
                        ...universityHeadersData,
                        alluniversityHeaderAction,
                      ]}
                      data={isfilteredDataNew ? isfilteredDataNew : []}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      perPageData={perPageData}
                      searchTerm={searchTermNew}
                      handleSearchChange={handleSearchChangeNew}
                      emptyMessage="No Data found yet."
                    />
                  </CardBody>
                </Card>
              </div>
            )}

            {/* Delete University */}
            <DeleteModal
              Open={deleteModalIsOpen}
              close={handleDeleteButtonClick}
              id={universityIdForChangeStatus}
              handleDelete={handleDeleteUniversity}
              isloading={deleteUniversityIsLoading}
              userStatus={checkUniversityStatus}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllUniversityForSuperAdmin;
