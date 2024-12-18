import CommonTableComponent from '@/components/common/CommonTableComponent';
import DeleteModal from '@/components/common/DeleteModal';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';

import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import {
  useAddCourseMutation,
  useDeleteCourseMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
} from '@/slice/services/super admin/courseService';
import { allowedFileTypes } from '@/utils/common/data';
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
import CourseModalForm from '../modals/CourseModalForm';

const AllCourseForSuperAdmin = ({
  university_id,
  allDepartmentData,
  allCategoryData,
}) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [courseIdForEdit, setCourseIdForEdit] = useState(null);
  const [courseIdForDelete, setCourseIdForDelete] = useState(null);
  const [allDepartmentName, setAllDepartmentName] = useState(null);
  const [allCategoryName, setAllCategoryName] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const perPageData = 10;

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    name: '',
    available_seats: '',
    price_for_student: '',
    gst_for_student: '',
    price_for_agent: '',
    gst_for_agent: '',
    description: '',
    department: '',
    category: '',
    brochure: null,
    entry_requirements: [''],
    english_requirements: [''],
  });

  const [
    addCourse,
    {
      data: addCourseData,
      error: addCourseError,
      isLoading: addCourseIsLoading,
      isSuccess: addCourseIsSuccess,
    },
  ] = useAddCourseMutation();

  const {
    data: getCourseData,
    error: getCourseError,
    isLoading: getCourseIsLoading,
    refetch: getCourseRefetch,
  } = useGetCourseQuery(university_id, { skip: !university_id });

  const [
    updateCourse,
    {
      data: editCourseData,
      error: editCourseError,
      isLoading: editCourseIsLoading,
      isSuccess: editCourseIsSuccess,
    },
  ] = useUpdateCourseMutation();

  const [
    deleteCourse,
    {
      data: deleteCourseData,
      error: deleteCourseError,
      isLoading: deleteCourseIsLoading,
    },
  ] = useDeleteCourseMutation();

  useEffect(() => {
    const allDept =
      allDepartmentData?.length > 0 &&
      allDepartmentData.map((dept) => ({
        label: dept?.name,
        value: dept?._id,
      }));

    const allCategory =
      allCategoryData?.length > 0 &&
      allCategoryData.map((dept) => ({
        label: dept?.name,
        value: dept?._id,
      }));

    setAllCategoryName(allCategory ? allCategory : []);
    setAllDepartmentName(allDept ? allDept : []);
  }, [allDepartmentData, allCategoryData]);

  useEffect(() => {
    if (getCourseData?.data && courseIdForEdit) {
      const getSingleCourseData =
        getCourseData?.data?.length > 0 &&
        getCourseData?.data.find((item) => item?._id === courseIdForEdit);

      const fetchData = async () => {
        try {
          const brochureFile = await convertImageUrlToFile(
            getSingleCourseData?.brochure?.url
          );

          setInitialValues({
            name: getSingleCourseData?.name || '',
            available_seats: getSingleCourseData?.available_seats || '',
            price_for_student: getSingleCourseData?.price_for_student || '',
            gst_for_student: getSingleCourseData?.gst_for_student || '',
            price_for_agent: getSingleCourseData?.price_for_agent || '',
            gst_for_agent: getSingleCourseData?.gst_for_agent || '',
            department: getSingleCourseData?.department?._id
              ? {
                  label: getSingleCourseData?.department?.name,
                  value: getSingleCourseData?.department?._id,
                }
              : '' || '',
            category: getSingleCourseData?.category?._id
              ? {
                  label: getSingleCourseData?.category?.name,
                  value: getSingleCourseData?.category?._id,
                }
              : '' || '',
            brochure: brochureFile || '',
            description: getSingleCourseData?.description || '',
            entry_requirements: getSingleCourseData?.entry_requirements || '',
            english_requirements:
              getSingleCourseData?.english_requirements || '',
          });

          setEditModalIsOpen(true);
          setFilePreview(brochureFile?.name);
        } catch (error) {
          // console.error('Error loading data:', error);
        }
      };

      fetchData();
    }
  }, [getCourseData?.data, courseIdForEdit]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'maximum use 50 letters')
      .required('Name is required'),
    department: Yup.string().required('department is required'),
    category: Yup.string().required('category is required'),
    available_seats: Yup.string()
      .max(12, 'maximum use 12 letters')
      .required('available_seats is required'),
    price_for_student: Yup.string()
      .max(12, 'maximum use 12 letters')
      .required('price_for_student is required'),
    gst_for_student: Yup.string()
      .max(12, 'maximum use 12 letters')
      .required('gst_for_student is required'),
    price_for_agent: Yup.string()
      .max(12, 'maximum use 12 letters')
      .required('price_for_agent is required'),
    gst_for_agent: Yup.string()
      .max(12, 'maximum use 12 letters')
      .required('gst_for_agent is required'),
    description: Yup.string().required('description is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const allData = {
      ...values,
      university_id: university_id,
      department_id: values?.department,
      category_id: values?.category,
    };

    try {
      const finalData = new FormData();
      Object.entries(allData).forEach(([key, value]) => {
        if (key === 'entry_requirements' || key === 'english_requirements') {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              finalData.append(`${key}[${index}]`, item);
            });
          }
        } else {
          finalData.append(key, value);
        }
      });

      const result = await addCourse(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getCourseRefetch();
        setAddModalIsOpen(!addModalIsOpen);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage || 'An Error Occured');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditButtonClick = (itemId) => {
    setCourseIdForEdit(itemId);
  };

  const handleEditModalClose = () => {
    setCourseIdForEdit(null);
    setInitialValues({
      name: '',
      available_seats: '',
      price_for_student: '',
      gst_for_student: '',
      price_for_agent: '',
      gst_for_agent: '',
      description: '',
      department: '',
      category: '',
      brochure: null,
      entry_requirements: [''],
      english_requirements: [''],
    });
    setFilePreview(null);
    setEditModalIsOpen(false);
  };

  const handleUpdateCourse = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const allData = {
      name: values?.name,
      available_seats: values?.available_seats,
      price_for_student: values?.price_for_student,
      gst_for_student: values?.gst_for_student,
      price_for_agent: values?.price_for_agent,
      gst_for_agent: values?.gst_for_agent,
      description: values?.description,
      course_id: courseIdForEdit,
      university_id: university_id,
      department_id: values?.department?.value,
      category_id: values?.category?.value,
      brochure: values?.brochure,
      entry_requirements: values?.entry_requirements,
      english_requirements: values?.english_requirements,
    };

    try {
      const finalData = new FormData();
      Object.entries(allData).forEach(([key, value]) => {
        if (key === 'entry_requirements' || key === 'english_requirements') {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              finalData.append(`${key}[${index}]`, item);
            });
          }
        } else {
          finalData.append(key, value);
        }
      });
      const result = await updateCourse(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getCourseRefetch();
        handleEditModalClose();
        setCourseIdForEdit(null);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteButtonClick = (itemId) => {
    setCourseIdForDelete(itemId);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteCourse = async (id) => {
    try {
      const result = await deleteCourse({
        university_id: university_id,
        course_id: id,
      }).unwrap();
      if (result) {
        toast.success(result?.message);
        getCourseRefetch();
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

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(
          'Invalid file type. Only PDF, DOCX, DOC, or Excel files are allowed.'
        );
        return;
      }

      setFieldValue('brochure', file);
      setFilePreview(file.name);
    }
  };

  // Filter data for search option
  const isfilteredData =
    getCourseData?.data?.length > 0 &&
    getCourseData?.data.filter((item) =>
      item?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Define table headers with custom render functions
  const headers = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Course Name', key: 'name' },
    {
      title: 'Available Seats',
      key: 'available_seats',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.available_seats}
        </span>
      ),
    },
    {
      title: 'Price For Student',
      key: 'price_for_student',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.price_for_student}
        </span>
      ),
    },
    {
      title: 'GST For Student',
      key: 'gst_for_student',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.gst_for_student}
        </span>
      ),
    },
    {
      title: 'Price For Agent',
      key: 'price_for_agent',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.price_for_agent}
        </span>
      ),
    },
    {
      title: 'GST For Agent',
      key: 'gst_for_agent',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.gst_for_agent}
        </span>
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
      {getCourseIsLoading ? (
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
            <CourseModalForm
              formHeader={'Add New'}
              isOpen={addModalIsOpen}
              onClose={() => {
                setAddModalIsOpen(!addModalIsOpen);
              }}
              onSubmit={handleSubmit}
              initialValues={initialValues}
              // validationSchema={validationSchema}
              formSubmit={'Submit'}
              allDepartmentName={allDepartmentName}
              allCategoryName={allCategoryName}
              setInitialValues={setInitialValues}
              handleFileChange={handleFileChange}
              filePreview={filePreview}
              setFilePreview={setFilePreview}
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

      {/* for update Course */}
      <CourseModalForm
        formHeader="Update Data"
        isOpen={editModalIsOpen}
        onClose={handleEditModalClose}
        onSubmit={handleUpdateCourse}
        initialValues={initialValues}
        formSubmit="Update"
        allCategoryName={allCategoryName}
        allDepartmentName={allDepartmentName}
        setInitialValues={setInitialValues}
        handleFileChange={handleFileChange}
        filePreview={filePreview}
        setFilePreview={setFilePreview}
      />

      {/* Delete Course */}
      <DeleteModal
        Open={deleteModalIsOpen}
        close={handleDeleteButtonClick}
        id={courseIdForDelete}
        handleDelete={handleDeleteCourse}
        isloading={deleteCourseIsLoading}
      />
    </div>
  );
};

export default AllCourseForSuperAdmin;
