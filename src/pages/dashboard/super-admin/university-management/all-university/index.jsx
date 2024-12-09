import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import UniversityModalForm from '@/components/sAdminDashboard/modals/UniversityModalForm';
import {
  useAddUniversityMutation,
  useDeleteUniversityMutation,
  useGetUniversityQuery,
  useUpdateUniversityMutation,
} from '@/slice/services/super admin/universityService';
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

const AllUniversityForSuperAdmin = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [universityIdForEdit, setUniversityIdForEdit] = useState(null);
  const [universityIdForDelete, setUniversityIdForDelete] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const perPageData = 10;

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    code: '',
    description: '',
    logo: '',
  });

  const [
    addUniversity,
    {
      data: addUniversityData,
      error: addUniversityError,
      isLoading: addUniversityIsLoading,
      isSuccess: addUniversityIsSuccess,
    },
  ] = useAddUniversityMutation();

  const {
    data: getUniversityData,
    error: getUniversityError,
    isLoading: getUniversityIsLoading,
    refetch: getUniversityRefetch,
  } = useGetUniversityQuery();

  // const { data: getSingleUniversityData, refetch: getSingleUniversityRefetch } =
  //   useGetSingleUniversityQuery(universityId, {
  //     skip: !universityId,
  //   });

  const [
    updateUniversity,
    {
      data: editUniversityData,
      error: editUniversityError,
      isLoading: editUniversityIsLoading,
      isSuccess: editUniversityIsSuccess,
    },
  ] = useUpdateUniversityMutation();

  const [
    deleteUniversity,
    {
      data: deleteUniversityData,
      error: deleteUniversityError,
      isLoading: deleteUniversityIsLoading,
    },
  ] = useDeleteUniversityMutation();

  useEffect(() => {
    if (getUniversityData?.data && universityIdForEdit) {
      const getSingleUniversityData =
        getUniversityData?.data?.length > 0 &&
        getUniversityData?.data.find(
          (item) => item?._id === universityIdForEdit
        );

      const fetchData = async () => {
        try {
          const file = await convertImageUrlToFile(
            getSingleUniversityData?.logo?.url
          );

          setInitialValues({
            name: getSingleUniversityData?.name || '',
            address_line_1: getSingleUniversityData?.address_line_1 || '',
            address_line_2: getSingleUniversityData?.address_line_2 || '',
            city: getSingleUniversityData?.city || '',
            state: getSingleUniversityData?.state || '',
            country: getSingleUniversityData?.country || '',
            zip: getSingleUniversityData?.zip || '',
            code: getSingleUniversityData?.code || '',
            description: getSingleUniversityData?.description || '',
            logo: file,
          });
          setImagePreview(URL.createObjectURL(file));
          setEditModalIsOpen(true);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

      fetchData();
    }
  }, [getUniversityData?.data, universityIdForEdit]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, 'maximum use 30 letters')
      .required('Name is required'),
    address_line_1: Yup.string().required('address_line_1 is required'),
    address_line_2: Yup.string().required('address_line_2 is required'),
    city: Yup.string().required('city is required'),
    state: Yup.string().required('state is required'),
    country: Yup.string().required('country is required'),
    zip: Yup.string().required('zip is required'),
    code: Yup.string().required('code is required'),
    description: Yup.string().required('description is required'),
    logo: Yup.string().required('logo is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const finalData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const result = await addUniversity(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getUniversityRefetch();
        setImagePreview(null);
        setAddModalIsOpen(!addModalIsOpen);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditButtonClick = (itemId) => {
    setUniversityIdForEdit(itemId);
  };

  const handleEditModalClose = () => {
    // getSingleUniversityRefetch();
    setImagePreview(null);
    setUniversityIdForEdit(null);
    setInitialValues({
      name: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      code: '',
      description: '',
      logo: '',
    });
    setEditModalIsOpen(false);
  };

  const handleUpdateUniversity = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const finalData = {
      ...values,
      id: universityIdForEdit,
    };

    try {
      const editedData = new FormData();
      Object.entries(finalData).forEach(([key, value]) => {
        editedData.append(key, value);
      });
      const result = await updateUniversity(editedData).unwrap();
      if (result) {
        toast.success(result?.message);
        getUniversityRefetch();
        handleEditModalClose();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

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

  // Define table headers with custom render functions
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
              <div
                onClick={() => handleEditButtonClick(item?._id)}
                className="text-primary"
              >
                <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                Edit
              </div>
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
                  <button
                    className="button px-3 py-2"
                    onClick={() => setAddModalIsOpen(!addModalIsOpen)}
                  >
                    Add New
                  </button>
                  <UniversityModalForm
                    formHeader={'Add New'}
                    isOpen={addModalIsOpen}
                    onClose={() => {
                      setImagePreview(null), setAddModalIsOpen(!addModalIsOpen);
                    }}
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    formSubmit={'Submit'}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                  />
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

            {/* for update university */}
            <UniversityModalForm
              formHeader="Update Data"
              isOpen={editModalIsOpen}
              onClose={handleEditModalClose}
              onSubmit={handleUpdateUniversity}
              initialValues={initialValues}
              formSubmit="Update"
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />

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
