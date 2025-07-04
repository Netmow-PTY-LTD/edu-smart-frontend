import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import DepartmentModalForm from '@/components/sAdminDashboard/modals/DepartmentModalForm';

import {
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from '@/slice/services/super admin/departmentService';
import DataObjectComponent from '@/utils/common/data';
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

const AllDepartmentForSuperAdmin = ({ university_id }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [departmentIdForEdit, setDepartmentIdForEdit] = useState(null);
  const [departmentIdForDelete, setDepartmentIdForDelete] = useState(null);
  const [checkChangeStatus, setCheckChangeStatus] = useState(null);

  const perPageData = 10;

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
  });

  const { allDepartmentsWithoutAction } = DataObjectComponent();

  const [
    addDepartment,
    {
      data: addDepartmentData,
      error: addDepartmentError,
      isLoading: addDepartmentIsLoading,
      isSuccess: addDepartmentIsSuccess,
    },
  ] = useAddDepartmentMutation();

  const {
    data: getDepartmentData,
    error: getDepartmentError,
    isLoading: getDepartmentIsLoading,
    refetch: getDepartmentRefetch,
  } = useGetDepartmentQuery(university_id, { skip: !university_id });

  // const { data: getSingleDepartmentData, refetch: getSingleDepartmentRefetch } =
  //   useGetSingleDepartmentQuery(departmentIdForEdit, {
  //     skip: !departmentIdForEdit,
  //   });

  const [
    updateDepartment,
    {
      data: editDepartmentData,
      error: editDepartmentError,
      isLoading: editDepartmentIsLoading,
      isSuccess: editDepartmentIsSuccess,
    },
  ] = useUpdateDepartmentMutation();

  const [
    deleteDepartment,
    {
      data: deleteDepartmentData,
      error: deleteDepartmentError,
      isLoading: deleteDepartmentIsLoading,
    },
  ] = useDeleteDepartmentMutation();

  useEffect(() => {
    if (getDepartmentData?.data && departmentIdForEdit) {
      const getSingleDepartmentData =
        getDepartmentData?.data?.length > 0 &&
        getDepartmentData?.data.find(
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
  }, [getDepartmentData?.data, departmentIdForEdit]);

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
      const result = await addDepartment(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getDepartmentRefetch();
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
      const result = await updateDepartment(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getDepartmentRefetch();
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

  const handleDeleteButtonClick = (itemData) => {
    setDepartmentIdForDelete(itemData?.id);
    setCheckChangeStatus(itemData?.status);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteDepartment = async (id) => {
    try {
      const result = await deleteDepartment({
        university_id: university_id,
        department_id: id,
        status: checkChangeStatus,
      }).unwrap();
      if (result) {
        toast.success(result?.message);
        getDepartmentRefetch();
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
    getDepartmentData?.data?.length > 0 &&
    getDepartmentData?.data.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Define table headers with custom render functions
  const headers = [
    {
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
              <div
                onClick={() => handleEditButtonClick(item?._id)}
                className="text-primary"
              >
                <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                Edit
              </div>
            </DropdownItem>
            {item?.status === 'active' ? (
              <DropdownItem>
                <div
                  onClick={() =>
                    handleDeleteButtonClick({
                      id: item._id,
                      status: 'inactive',
                    })
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
    },
  ];

  return (
    <div className="h-100">
      <ToastContainer />
      {getDepartmentIsLoading ? (
        <LoaderSpiner />
      ) : (
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-2 gap-md-0">
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
              headers={[...allDepartmentsWithoutAction, ...headers]}
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
        isloading={deleteDepartmentIsLoading}
        userStatus={checkChangeStatus}
      />
    </div>
  );
};

export default AllDepartmentForSuperAdmin;
