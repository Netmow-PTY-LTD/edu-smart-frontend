import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import DepartmentModalForm from '@/components/sAdminDashboard/modals/DepartmentModalForm';
import {
  useAddDepartmentForAdmissionManagerMutation,
  useDeleteDepartmentForAdmissionManagerMutation,
  useGetDepartmentForAdmissionManagerQuery,
  useUpdateDepartmentForAdmissionManagerMutation,
} from '@/slice/services/admission manager/departmentServiceForAdmissionManager';

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

const AllDepartmentForAdmissionManager = ({ university_id }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [departmentIdForEdit, setDepartmentIdForEdit] = useState(null);
  const [departmentIdForDelete, setDepartmentIdForDelete] = useState(null);

  const perPageData = 10;

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
  });

  const [addDepartmentForAdmissionManager] =
    useAddDepartmentForAdmissionManagerMutation();

  const {
    data: getDepartmentForAdmissionManagerData,
    error: getDepartmentForAdmissionManagerError,
    isLoading: getDepartmentForAdmissionManagerIsLoading,
    refetch: getDepartmentForAdmissionManagerRefetch,
  } = useGetDepartmentForAdmissionManagerQuery(university_id, {
    skip: !university_id,
  });

  // const { data: getSingleDepartmentData, refetch: getSingleDepartmentRefetch } =
  //   useGetSingleDepartmentQuery(departmentIdForEdit, {
  //     skip: !departmentIdForEdit,
  //   });

  const [updateDepartmentForAdmissionManager] =
    useUpdateDepartmentForAdmissionManagerMutation();

  const [
    deleteDepartmentForAdmissionManager,
    {
      data: deleteDepartmentForAdmissionManagerData,
      error: deleteDepartmentForAdmissionManagerError,
      isLoading: deleteDepartmentForAdmissionManagerIsLoading,
    },
  ] = useDeleteDepartmentForAdmissionManagerMutation();

  useEffect(() => {
    if (getDepartmentForAdmissionManagerData?.data && departmentIdForEdit) {
      const getSingleDepartmentData =
        getDepartmentForAdmissionManagerData?.data?.length > 0 &&
        getDepartmentForAdmissionManagerData?.data.find(
          (item) => item?._id === departmentIdForEdit
        );

      const fetchData = async () => {
        try {
          setInitialValues({
            name: getSingleDepartmentData?.name || '',
            description: getSingleDepartmentData?.description || '',
          });
          setEditModalIsOpen(true);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

      fetchData();
    }
  }, [getDepartmentForAdmissionManagerData?.data, departmentIdForEdit]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(60, 'maximum use 60 letters')
      .required('Name is required'),
    description: Yup.string().required('description is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const finalData = { ...values, university_id: university_id };
      const result = await addDepartmentForAdmissionManager(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getDepartmentForAdmissionManagerRefetch();
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
    setDepartmentIdForEdit(itemId);
  };

  const handleEditModalClose = () => {
    // getSingleDepartmentRefetch();
    setDepartmentIdForEdit(null);
    setInitialValues({
      name: '',
      description: '',
    });
    setEditModalIsOpen(false);
  };

  const handleUpdateDepartment = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const finalData = {
      ...values,
      id: departmentIdForEdit,
    };

    try {
      const result =
        await updateDepartmentForAdmissionManager(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getDepartmentForAdmissionManagerRefetch();
        handleEditModalClose();
        setDepartmentIdForEdit(null);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteButtonClick = (itemId) => {
    setDepartmentIdForDelete(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteDepartment = async (id) => {
    console.log(id);
    try {
      const result = await deleteDepartmentForAdmissionManager({
        university_id: university_id,
        department_id: id,
      }).unwrap();
      if (result) {
        toast.success(result?.message);
        getDepartmentForAdmissionManagerRefetch();
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
    getDepartmentForAdmissionManagerData?.data?.length > 0 &&
    getDepartmentForAdmissionManagerData?.data.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Define table headers with custom render functions
  const headers = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize ">{index + 1}</span>
      ),
    },

    { title: 'Department Name', key: 'name' },
    {
      title: 'Course Category',
      key: 'categories',
      render: (item, index) =>
        item?.categories?.length > 0
          ? item?.categories?.map((category) => (
              <span
                key={index}
                className="d-flex flex-column text-capitalize me-5"
              >
                {category?.name}
              </span>
            ))
          : '-',
    },
    {
      title: 'Courses',
      key: 'courses',
      render: (item, index) =>
        item?.courses?.length > 0
          ? item?.courses.map((course) => (
              <span
                key={index}
                className="d-flex flex-column text-capitalize me-5"
              >
                {course?.name}
              </span>
            ))
          : '-',
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
    <div className="h-100">
      <ToastContainer />
      {getDepartmentForAdmissionManagerIsLoading ? (
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
            <DepartmentModalForm
              formHeader={'Add New'}
              isOpen={addModalIsOpen}
              onClose={() => {
                setAddModalIsOpen(!addModalIsOpen);
              }}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              formSubmit={'Submit'}
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

      {/* for update department */}
      <DepartmentModalForm
        formHeader="Update Data"
        isOpen={editModalIsOpen}
        onClose={handleEditModalClose}
        onSubmit={handleUpdateDepartment}
        initialValues={initialValues}
        formSubmit="Update"
      />

      {/* Delete Department */}
      <DeleteModal
        Open={deleteModalIsOpen}
        close={handleDeleteButtonClick}
        id={departmentIdForDelete}
        handleDelete={handleDeleteDepartment}
        isloading={deleteDepartmentForAdmissionManagerIsLoading}
      />
    </div>
  );
};

export default AllDepartmentForAdmissionManager;
