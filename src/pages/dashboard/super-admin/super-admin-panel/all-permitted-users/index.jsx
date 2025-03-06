import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import SelectUserModalForSuperAdmin from '@/components/sAdminDashboard/modals/SelectUserModalForSuperAdmin';
import {
  useAddStaffMemberInSuperAdminMutation,
  useGetSingleStaffMemberInSuperAdminQuery,
  useGetStaffMemberInSuperAdminQuery,
  useUpdateStaffMemberInSuperAdminMutation,
  useUpdateStaffMemberStatusInSuperAdminMutation,
} from '@/slice/services/super admin/staffMemberService';
import { userDummyImage } from '@/utils/common/data';
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
import * as Yup from 'yup';

const AllPermittedUserForSuperAdmin = () => {
  const [userStatusModalIsOpen, setUserStatusModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [permittedUserIdForDelete, setPermittedUserIdForDelete] =
    useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userIdForUpdate, setUserIdForUpdate] = useState('');
  const [editFormIsLoading, setEditFormIsLoading] = useState(false);
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

  const [
    updateStaffMemberInSuperAdmin,
    {
      data: updateStaffMemberData,
      error: updateStaffMemberError,
      isLoading: updateStaffMemberIsLoading,
    },
  ] = useUpdateStaffMemberInSuperAdminMutation();

  const [
    updateStaffMemberStatusInSuperAdmin,
    {
      data: updateStaffMemberStatusData,
      error: updateStaffMemberStatusError,
      isLoading: updateStaffMemberStatusIsLoading,
    },
  ] = useUpdateStaffMemberStatusInSuperAdminMutation();

  const {
    data: getAllStaffMemberData,
    error: getAllStaffMemberError,
    isLoading: getAllStaffMemberIsLoading,
    refetch: getAllStaffMemberRefetch,
  } = useGetStaffMemberInSuperAdminQuery();

  const {
    data: getSingleStaffMemberInSuperAdminData,
    error: getSingleStaffMemberInSuperAdminError,
    isLoading: getSingleStaffMemberInSuperAdminIsLoading,
    refetch: getSingleStaffMemberInSuperAdminRefetch,
  } = useGetSingleStaffMemberInSuperAdminQuery(userIdForUpdate, {
    skip: !userIdForUpdate,
    refetchOnMountOrArgChange: true,
  });

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

  useEffect(() => {
    if (!userIdForUpdate || !getSingleStaffMemberInSuperAdminData?.data?._id)
      return;

    setEditFormIsLoading(true);

    const fetchData = async () => {
      try {
        const { data } = getSingleStaffMemberInSuperAdminData;

        const file = data?.profile_image?.url
          ? await convertImageUrlToFile(data.profile_image.url)
          : new File([], 'default.jpg');

        setInitialValues({
          image: file,
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          password: '',
          confirm_password: '',
          address: data.address_line_1 || '',
          select_role: data.role || '',
          city: data.city || '',
          state: data.state || '',
          zip: data.zip || '',
          country: data.country || '',
        });

        setImagePreview(URL.createObjectURL(file));
      } catch (error) {
        console.error('Error loading staff member data:', error);
      } finally {
        setEditFormIsLoading(false);
      }
    };

    fetchData();
  }, [
    getSingleStaffMemberInSuperAdminData,
    setEditFormIsLoading,
    userIdForUpdate,
  ]);

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

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

  const handleUpdateSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updatedata = {
      image: values?.image ?? '',
      first_name: values?.first_name ?? '',
      last_name: values?.last_name ?? '',
      email: values?.email ?? '',
      phone: values?.phone ?? '',
      address: values?.address ?? '',
      role: values?.select_role ?? '',
      city: values?.city ?? '',
      state: values?.state ?? '',
      zip: values?.zip ?? '',
      country: values?.country ?? '',
      user_id: userIdForUpdate,
    };

    try {
      const finalData = new FormData();
      Object.entries(updatedata).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const result = await updateStaffMemberInSuperAdmin(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getAllStaffMemberRefetch();
        setImagePreview(null);
        setUserIdForUpdate('');
        setUpdateModalIsOpen(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUserStatusModal = (userData) => {
    setPermittedUserIdForDelete(userData);
    setUserStatusModalIsOpen(true);
  };

  const handleChangeUserStatus = async (statusData) => {
    try {
      const result =
        await updateStaffMemberStatusInSuperAdmin(statusData).unwrap();
      if (result) {
        toast.success(result?.message);
        setPermittedUserIdForDelete('');
        setUserStatusModalIsOpen(false);
        getAllStaffMemberRefetch();
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
        <DropdownMenu className="me-2 ">
          <DropdownItem>
            <div
              onClick={() => {
                setUpdateModalIsOpen(true);
                setUserIdForUpdate(item?._id);
              }}
              className="text-primary d-flex align-items-center fw-medium"
            >
              <i className="ri-edit-circle-fill align-start me-2 fs-1 text-primary"></i>
              Edit
            </div>
          </DropdownItem>
          {item?.status === 'active' ? (
            <DropdownItem>
              <div
                onClick={() =>
                  handleUserStatusModal({ id: item?._id, status: 'inactive' })
                }
                className="text-primary d-flex align-items-center fw-medium"
                aria-label="Inactive Admission Manager"
              >
                <i className="ri-close-circle-fill align-start me-2 fs-1 text-danger"></i>
                Inactive
              </div>
            </DropdownItem>
          ) : (
            <DropdownItem>
              <div
                onClick={() =>
                  handleUserStatusModal({ id: item?._id, status: 'active' })
                }
                className="text-primary d-flex align-items-center fw-medium"
                aria-label="Active Admission Manager"
              >
                <i className="ri-checkbox-circle-fill align-start me-2 third-color fs-1"></i>
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
            {getAllStaffMemberIsLoading ? (
              <LoaderSpiner />
            ) : (
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
            )}

            {
              // Update user
              <SelectUserModalForSuperAdmin
                openModal={updateModalIsOpen}
                closeModal={() => {
                  setUpdateModalIsOpen(false);
                  setUserIdForUpdate('');
                }}
                modalTitle={'Update Permission Role'}
                submitBtn={'Update Data'}
                setInitialValues={setInitialValues}
                initialValues={initialValues}
                handleSubmit={handleUpdateSubmit}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                isLoading={editFormIsLoading}
              />
            }

            {/* user active/inactive */}
            <DeleteModal
              Open={userStatusModalIsOpen}
              close={() => {
                setUserStatusModalIsOpen(false);
                setPermittedUserIdForDelete('');
              }}
              id={permittedUserIdForDelete}
              handleDelete={handleChangeUserStatus}
              isloading={updateStaffMemberStatusIsLoading}
              userStatus={permittedUserIdForDelete?.status}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllPermittedUserForSuperAdmin;
