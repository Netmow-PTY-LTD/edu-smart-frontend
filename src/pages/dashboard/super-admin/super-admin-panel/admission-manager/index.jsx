import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import AdmissionManagerModal from '@/components/sAdminDashboard/modals/SelectUserModalForSuperAdmin';
import {
  useDeleteUniversityMutation,
  useGetUniversityQuery,
} from '@/slice/services/super admin/universityService';
import {
  superAdminNameAndLogoData,
  universityHeadersWithoutAction,
  userDummyImage,
} from '@/utils/common/data';
import Image from 'next/image';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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

const AllAdmissionManagerForSuperAdmin = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [admissionManagerIdForDelete, setAdmissionManagerIdForDelete] =
    useState(null);
  const [allAdmissionManagerHeaderdata, setAllAdmissionManagerHeaderdata] =
    useState('');
  const perPageData = 10;

  const [initialValues, setInitialValues] = useState({
    image: null,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    address: '',
    select_role: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  //   const {
  //     data: getAdmissionManagerData,
  //     error: getAdmissionManagerError,
  //     isLoading: getAdmissionManagerIsLoading,
  //     refetch: getAdmissionManagerRefetch,
  //   } = useGetAdmissionManagerQuery();

  //   const [
  //     deleteAdmissionManager,
  //     {
  //       data: deleteAdmissionManagerData,
  //       error: deleteAdmissionManagerError,
  //       isLoading: deleteAdmissionManagerIsLoading,
  //     },
  //   ] = useDeleteAdmissionManagerMutation();

  const handleDeleteButtonClick = (itemId) => {
    setAdmissionManagerIdForDelete(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  //   const handleDeleteAdmissionManager = async (id) => {
  //     try {
  //       const result = await deleteAdmissionManager(id).unwrap();
  //       if (result) {
  //         toast.success(result?.message);
  //         getAdmissionManagerRefetch();
  //         handleDeleteButtonClick();
  //       }
  //     } catch (error) {
  //       const errorMessage = error?.data?.message;
  //       toast.error(errorMessage);
  //     } finally {
  //       //
  //     }
  //   };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  //   const isfilteredData =
  //     getAdmissionManagerData?.data?.length > 0 &&
  //     getAdmissionManagerData?.data.filter((item) =>
  //       item?.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );

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
              href={`/dashboard/super-admin/university-management/edit-university/${item?._id}`}
              className="text-primary"
            >
              <i className="ri-pencil-fill align-start me-2 text-muted"></i>
              Edit
            </Link>
          </DropdownItem>
          {item?.status === 'active' ? (
            <DropdownItem>
              <div
                // onClick={() => {
                //   if (!item?._id) {
                //     toast.error('Invalid item ID');
                //     return;
                //   }

                //   deleteAdmissionManager({ id: item._id, status: 'inactive' })
                //     .then((res) => {
                //       if (res.error) {
                //         toast.error(
                //           res.payload ||
                //             'Failed to delete the Admission Manager.'
                //         );
                //       } else {
                //         toast.success(
                //           res.payload?.message ||
                //             'Admission Manager deleted successfully.'
                //         );
                //       }
                //     })
                //     .catch(() => toast.error('An unexpected error occurred.'));
                // }}
                className="text-primary"
                aria-label="Inactive Admission Manager"
              >
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Inactive
              </div>
            </DropdownItem>
          ) : (
            <DropdownItem>
              <div
                // onClick={() => {
                //   if (!item?._id) {
                //     toast.error('Invalid item ID');
                //     return;
                //   }

                //   deleteAdmissionManager({ id: item._id, status: 'active' })
                //     .then((res) => {
                //       if (res.error) {
                //         toast.error(
                //           res.payload ||
                //             'Failed to delete the Admission Manager.'
                //         );
                //       } else {
                //         toast.success(
                //           res.payload?.message ||
                //             'Admission Manager deleted successfully.'
                //         );
                //       }
                //     })
                //     .catch(() => toast.error('An unexpected error occurred.'));
                // }}
                className="text-primary"
                aria-label="Active Admission Manager"
              >
                <i className="ri-check-circle-fill align-start me-2 text-success"></i>
                Active
              </div>
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  };

  const admissionManagerHeaders = [
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
      title: 'Name',
      key: 'profile_image',
      render: (item) => (
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0 me-1">
            <Link href={``} className="text-reset">
              <Image
                src={
                  item?.profile_image?.url
                    ? item?.profile_image?.url
                    : `${userDummyImage}`
                }
                alt="User"
                height={60}
                width={60}
                className="avatar-md p-1 me-3 align-middle rounded-circle"
              />
            </Link>
          </div>
          <div>
            <h5 className="fs-14 fw-medium text-capitalize">
              <Link href={``} className="text-reset">
                {`${item.first_name ? item.first_name : ''} ${item.last_name ? item.last_name : ''}`}
              </Link>
            </h5>
          </div>
        </div>
      ),
    },

    {
      title: 'User Role',
      key: 'select_role',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.select_role ? item?.select_role : '-'}`}
          </h5>
        </div>
      ),
    },
    {
      title: 'Email',
      key: 'email',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.email ? item?.email : '-'}`}
          </h5>
        </div>
      ),
    },
    { title: 'Phone', key: 'phone' },
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
            className={`border rounded-4 px-4 py-1 fw-medium text-capitalize ${item?.status === 'active' ? 'bg-third-color text-primary' : 'bg-fourth-color text-white'}`}
          >
            {item?.status ?? '-'}
          </span>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {/* {getAllAdmissionManagerData ? (
              <LoaderSpiner />
            ) : ( */}
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <button
                  onClick={() => setAddModalIsOpen(true)}
                  className="button px-3 py-2"
                >
                  Add New
                </button>
                {
                  <AdmissionManagerModal
                    openModal={addModalIsOpen}
                    closeModal={() => setAddModalIsOpen(false)}
                    modalTitle={'Add Permission Role'}
                    submitBtn={'Add New'}
                    setInitialValues={setInitialValues}
                    initialValues={initialValues}
                  />
                }
                <SearchComponent
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                />
              </CardHeader>

              <CardBody>
                <CommonTableComponent
                  headers={[
                    ...admissionManagerHeaders,
                    alluniversityHeaderAction,
                  ]}
                  // data={'isfilteredData' ? 'isfilteredData' : []}
                  data={[]}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPageData={perPageData}
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  emptyMessage="No Data found yet."
                />
              </CardBody>
            </Card>
            {/* )} */}

            {/* Delete University */}
            <DeleteModal
              Open={deleteModalIsOpen}
              close={handleDeleteButtonClick}
              id={admissionManagerIdForDelete}
              handleDelete={'handleDeleteAdmissionManager'}
              isloading={'deleteAdmissionManagerIsLoading'}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllAdmissionManagerForSuperAdmin;
