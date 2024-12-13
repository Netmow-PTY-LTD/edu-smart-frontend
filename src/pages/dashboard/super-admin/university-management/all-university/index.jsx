import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import {
  useDeleteUniversityMutation,
  useGetUniversityQuery,
} from '@/slice/services/super admin/universityService';
import { userDummyImage } from '@/utils/common/data';

import Image from 'next/image';
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

  // university table data
  const headers = [
    {
      title: 'Logo',
      key: 'logo',
      render: (item) => (
        <div className="d-flex align-items-center me-5">
          <div className="flex-shrink-0 me-1">
            <Link
              href={`/dashboard/super-admin/university-management/single-university-profile/${item?._id}`}
              className="text-reset"
            >
              <Image
                src={item?.logo?.url ? item?.logo?.url : `${userDummyImage}`}
                alt="User"
                height={60}
                width={60}
                className="avatar-md p-1 me-3 align-middle rounded-circle"
              />
            </Link>
          </div>
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              <Link
                href={`/dashboard/super-admin/university-management/single-university-profile/${item?._id}`}
                className="text-reset"
              >
                {`${item.name} `}
              </Link>
            </h5>
          </div>
        </div>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      render: (item) => (
        <p className="text-wrap me-5">
          {`${item.description.split(' ').slice(0, 20).join(' ')}...`}
        </p>
      ),
    },
    { title: 'Code', key: 'code' },
    {
      title: 'Address',
      key: 'address',
      render: (item) => (
        <div className="d-flex gap-2">
          <div className="text-capitalize">
            <span className="me-2">
              {item?.address_line_1 ? item?.address_line_1 + ',' : '' || '-'}
            </span>
            <span className="me-2">
              {item?.address_line_2 ? item?.address_line_2 + ',' : '' || '-'}
            </span>
          </div>
          <div className="text-capitalize">
            <span className="me-2">
              {item?.city ? item?.city + ',' : '' || '-'}
            </span>
            <span className="me-2">
              {item?.state ? item?.state + ',' : '' || '-'}
            </span>
          </div>
          <div className="text-capitalize">
            <span className="me-2">
              {item?.zip ? item?.zip + ',' : '' || '-'}
            </span>
            <span className="me-2">{item?.country || '-'}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (item) => (
        <>
          <span
            className={`border rounded-4 px-4 py-2 fw-medium text-capitalize ${item?.status === 'active' ? 'bg-third-color text-primary' : 'bg-fourth-color text-white'}`}
          >
            {item?.status ?? '-'}
          </span>
        </>
      ),
    },
    {
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
                href={`/dashboard/super-admin/university-management/single-university-profile/${item?._id}`}
                className="text-primary"
              >
                <i className="ri-tools-fill align-start me-2 text-muted fw-bold"></i>
                Manage
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link
                href={`/dashboard/super-admin/university-management/edit-university/${item?._id}`}
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
    },
  ];

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
                    headers={headers}
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
