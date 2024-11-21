import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import DepartmentModalForm from '@/components/sAdminDashboard/modals/DepartmentModalForm';

import {
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from '@/slice/services/departmentService';
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

const AllDepartmentForSuperAdmin = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [departmentId, setDepartmentId] = useState(null);

  const perPageData = 10;

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
  });

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
  } = useGetDepartmentQuery();

  // const { data: getSingleDepartmentData, refetch: getSingleDepartmentRefetch } =
  //   useGetSingleDepartmentQuery(departmentId, {
  //     skip: !departmentId,
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
    if (getDepartmentData?.data && departmentId) {
      const getSingleDepartmentData =
        getDepartmentData?.data?.length > 0 &&
        getDepartmentData?.data.find((item) => item?._id === departmentId);

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
  }, [getDepartmentData?.data, departmentId]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, 'maximum use 30 letters')
      .required('Name is required'),
    description: Yup.string().required('description is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const finalData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        finalData.append(key, value);
      });
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
    setDepartmentId(itemId);
  };

  const handleEditModalClose = () => {
    // getSingleDepartmentRefetch();
    setDepartmentId(null);
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
      id: departmentId,
    };

    try {
      const editedData = new FormData();
      Object.entries(finalData).forEach(([key, value]) => {
        editedData.append(key, value);
      });
      const result = await updateDepartment(editedData).unwrap();
      if (result) {
        toast.success(result?.message);
        getDepartmentRefetch();
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
    setDepartmentId(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteDepartment = async (id) => {
    try {
      const result = await deleteDepartment(id).unwrap();
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
      title: 'SN',
      key: 'key',
      render: (item) => (
        <span className="d-flex flex-column text-capitalize">{item + 1}</span>
      ),
    },

    { title: 'Department Name', key: 'name' },
    { title: 'Description', key: 'description' },
    
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
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <ToastContainer />
            {getDepartmentIsLoading ? (
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
              id={departmentId}
              handleDelete={handleDeleteDepartment}
              isloading={deleteDepartmentIsLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllDepartmentForSuperAdmin;
