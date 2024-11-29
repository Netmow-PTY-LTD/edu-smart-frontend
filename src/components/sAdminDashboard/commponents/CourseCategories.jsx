import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import CourseCategoryModalForm from '@/components/sAdminDashboard/modals/CourseCategoriesModalForm';
import {
  useAddCourseCategoryMutation,
  useDeleteCourseCategoryMutation,
  useGetAllCourseCategoriesQuery,
  useUpdateCourseCategoryMutation,
} from '@/slice/services/super admin/courseCategoriesService';

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

const AllCategoriesForSuperAdmin = ({ university_id, allDepartmentData }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryIdForEdit, setCategoryIdForEdit] = useState(null);
  const [categoryIdForDelete, setCategoryIdForDelete] = useState(null);
  const [allDepartmentName, setAllDepartmentName] = useState(null);

  const perPageData = 10;

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    department: '',
  });

  const [
    addCourseCategory,
    {
      data: addCourseCategoryData,
      error: addCourseCategoryError,
      isLoading: addCourseCategoryIsLoading,
      isSuccess: addCourseCategoryIsSuccess,
    },
  ] = useAddCourseCategoryMutation();

  const {
    data: getAllCategoriesData,
    error: getAllCategoriesError,
    isLoading: getAllCategoriesIsLoading,
    refetch: getAllCategoriesRefetch,
  } = useGetAllCourseCategoriesQuery(university_id, { skip: !university_id });

  // const { data: getSingleCategoryData, refetch: getSingleCategoryRefetch } =
  //   useGetSingleCategoryQuery(departmentId, {
  //     skip: !departmentId,
  //   });

  const [
    updateCourseCategory,
    {
      data: editCategoryData,
      error: editCategoryError,
      isLoading: editCategoryIsLoading,
      isSuccess: editCategoryIsSuccess,
    },
  ] = useUpdateCourseCategoryMutation();

  const [
    deleteCourseCategory,
    {
      data: deleteCategoryData,
      error: deleteCategoryError,
      isLoading: deleteCategoryIsLoading,
    },
  ] = useDeleteCourseCategoryMutation();

  useEffect(() => {
    const allDept =
      allDepartmentData?.length > 0 &&
      allDepartmentData.map((dept) => {
        return {
          label: dept?.name,
          value: dept?._id,
        };
      });

    setAllDepartmentName(allDept ? allDept : []);
  }, [allDepartmentData]);

  useEffect(() => {
    if (getAllCategoriesData?.data && categoryIdForEdit) {
      const getSingleCategoryData =
        getAllCategoriesData?.data?.length > 0
          ? getAllCategoriesData?.data.find(
              (item) => item?._id === categoryIdForEdit
            )
          : [];

      const fetchData = async () => {
        try {
          setInitialValues({
            name: getSingleCategoryData?.name || '',
            description: getSingleCategoryData?.description || '',
            department: getSingleCategoryData?.department?._id
              ? {
                  label: getSingleCategoryData?.department?.name,
                  value: getSingleCategoryData?.department?._id,
                }
              : '' || '',
          });
          setEditModalIsOpen(true);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

      fetchData();
    }
  }, [getAllCategoriesData?.data, categoryIdForEdit]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'maximum use 50 letters')
      .required('Name is required'),
    description: Yup.string().required('description is required'),
    department: Yup.string().required('department is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const result = await addCourseCategory({
        ...values,
        university_id: university_id,
      }).unwrap();
      if (result) {
        toast.success(result?.message);
        getAllCategoriesRefetch();
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
    setCategoryIdForEdit(itemId);
  };

  const handleEditModalClose = () => {
    // getSingleCategoryRefetch();
    setCategoryIdForEdit(null);
    setInitialValues({
      name: '',
      description: '',
      department: '',
    });
    setEditModalIsOpen(false);
  };

  const handleUpdateCategory = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const finalData = {
      name: values?.name,
      description: values?.description,
      department_id: values?.department?.value
        ? values?.department?.value
        : values?.department,
      category_id: categoryIdForEdit,
      university_id: university_id,
    };

    try {
      const result = await updateCourseCategory(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getAllCategoriesRefetch();
        handleEditModalClose();
        setCategoryIdForEdit(null);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteButtonClick = (itemId) => {
    setCategoryIdForDelete(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const result = await deleteCourseCategory({
        university_id: university_id,
        category_id: id,
      }).unwrap();
      if (result) {
        toast.success(result?.message);
        getAllCategoriesRefetch();
        handleDeleteButtonClick();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage || 'An Error Occured');
    } finally {
      //
    }
  };

  // search input change function
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter data for search option
  const isfilteredData =
    getAllCategoriesData?.data?.length > 0 &&
    getAllCategoriesData?.data.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Define table headers with custom render functions
  const headers = [
    {
      title: 'SN',
      key: 'key',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Course Category ', key: 'name' },
    {
      title: 'Department ',
      key: 'department',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.department?.name}
        </span>
      ),
    },
    { title: 'Description', key: 'description' },

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
          <DropdownMenu className="ms-2">
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
    <>
      <div className="container-fluid">
        <div className="h-100">
          <ToastContainer />
          {getAllCategoriesIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <button
                  className="button px-3 py-2 "
                  onClick={() => setAddModalIsOpen(!addModalIsOpen)}
                >
                  Add New
                </button>
                <CourseCategoryModalForm
                  formHeader={'Add New'}
                  isOpen={addModalIsOpen}
                  onClose={() => {
                    setAddModalIsOpen(!addModalIsOpen);
                  }}
                  onSubmit={handleSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  formSubmit={'Submit'}
                  allDepartmentName={allDepartmentName}
                  setInitialValues={setInitialValues}
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

          {/* for update category */}

          <CourseCategoryModalForm
            formHeader={'Update Data'}
            isOpen={editModalIsOpen}
            onClose={handleEditModalClose}
            onSubmit={handleUpdateCategory}
            initialValues={initialValues}
            formSubmit={'Update'}
            allDepartmentName={allDepartmentName}
            setInitialValues={setInitialValues}
          />

          {/* Delete Category */}
          <DeleteModal
            Open={deleteModalIsOpen}
            close={handleDeleteButtonClick}
            id={categoryIdForDelete}
            handleDelete={handleDeleteCategory}
            isloading={deleteCategoryIsLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AllCategoriesForSuperAdmin;
