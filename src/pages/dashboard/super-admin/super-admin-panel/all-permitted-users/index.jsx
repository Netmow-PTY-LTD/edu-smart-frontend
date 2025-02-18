import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import Layout from '@/components/layout';
import SelectUserModalForSuperAdmin from '@/components/sAdminDashboard/modals/SelectUserModalForSuperAdmin';
import {
  useAddStaffMemberInSuperAdminMutation,
  useGetStaffMemberInSuperAdminQuery,
} from '@/slice/services/super admin/staffMemberService';
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
import * as Yup from 'yup';

const AllPermittedUserForSuperAdmin = () => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [permittedUserIdForDelete, setPermittedUserIdForDelete] =
    useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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

  const [
    addStaffMemberInSuperAdmin,
    {
      data: addStaffMemberData,
      error: addStaffMemberError,
      isLoading: addStaffMemberIsLoading,
    },
  ] = useAddStaffMemberInSuperAdminMutation();

  const {
    data: getAllStaffMemberData,
    error: getAllStaffMemberError,
    isLoading: getAllStaffMemberIsLoading,
    refetch: getAllStaffMemberRefetch,
  } = useGetStaffMemberInSuperAdminQuery();

  //   const [
  //     deletePermittedUser,
  //     {
  //       data: deletePermittedUserData,
  //       error: deletePermittedUserError,
  //       isLoading: deletePermittedUserIsLoading,
  //     },
  //   ] = useDeletePermittedUserMutation();

  const validationSchema = Yup.object({
    image: Yup.mixed().required('Image is required'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Contact number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], `Passwords doesn't matched`),
    country: Yup.string().required('Country is required'),
    select_role: Yup.string().required('Role is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip: Yup.number().required('Zip is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    console.log('formData', values);

    try {
      const finalData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const result = await addStaffMemberInSuperAdmin(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getAllStaffMemberRefetch();
        setImagePreview(null);
        setAddModalIsOpen(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteButtonClick = (itemId) => {
    setPermittedUserIdForDelete(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  //   const handleDeletePermittedUser = async (id) => {
  //     try {
  //       const result = await deletePermittedUser(id).unwrap();
  //       if (result) {
  //         toast.success(result?.message);
  //         getPermittedUserRefetch();
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
  const isfilteredData =
    getAllStaffMemberData?.data?.length > 0 &&
    getAllStaffMemberData?.data.filter(
      (item) =>
        item?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.last_name.toLowerCase().includes(searchTerm.toLowerCase())
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

                //   deletePermittedUser({ id: item._id, status: 'inactive' })
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

                //   deletePermittedUser({ id: item._id, status: 'active' })
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
      key: 'role',
      render: (item) => (
        <div>
          <h5 className="fs-14 fw-medium text-capitalize">
            {`${item?.role ? item?.role.split('_').join(' ') : '-'}`}
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
            {/* {getAllPermittedUserData ? (
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
                  <SelectUserModalForSuperAdmin
                    openModal={addModalIsOpen}
                    closeModal={() => setAddModalIsOpen(false)}
                    modalTitle={'Add Permission Role'}
                    submitBtn={'Add New'}
                    setInitialValues={setInitialValues}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    handleSubmit={handleSubmit}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
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
            {/* )} */}

            {/* Delete University */}
            <DeleteModal
              Open={deleteModalIsOpen}
              close={handleDeleteButtonClick}
              id={permittedUserIdForDelete}
              handleDelete={'handleDeletePermittedUser'}
              isloading={'deletePermittedUserIsLoading'}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllPermittedUserForSuperAdmin;
