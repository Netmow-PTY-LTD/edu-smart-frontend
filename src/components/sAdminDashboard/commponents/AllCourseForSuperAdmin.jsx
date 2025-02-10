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
import Image from 'next/image';

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
    price: '',
    gst: '',
    agent_commission: '',
    description: '',
    department: '',
    category: '',
    brochure: null,
    document_requirements: [{ title: '', description: '' }],
    entry_requirements: [''],
    english_requirements: [''],
    program_duration: '',
    image: '',
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
            price: getSingleCourseData?.price || '',
            gst: getSingleCourseData?.gst || '',
            agent_commission: getSingleCourseData?.agent_commission || '',
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
            document_requirements:
              getSingleCourseData?.document_requirements || '',
            english_requirements:
              getSingleCourseData?.english_requirements || '',
            program_duration: getSingleCourseData?.program_duration || '',
            image: getSingleCourseData?.image || '',
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
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Course Name is required'),
    available_seats: Yup.number()
      .typeError('Available Seats must be a number')
      .min(1, 'Available Seats must be at least 1')
      .required('Available Seats is required'),
    department: Yup.string().required('Department selection is required'),
    category: Yup.string().required('Course Category selection is required'),
    price: Yup.number()
      .typeError('Course Fee must be a number')
      .min(0, 'Course Fee cannot be negative')
      .required('Course Fee is required'),
    university_price: Yup.number()
      .typeError('Course Fee must be a number')
      .min(0, 'Course Fee cannot be negative')
      .required('Course Fee is required'),
    gst: Yup.number()
      .typeError('GST must be a number')
      .min(0, 'GST cannot be negative')
      .max(100, 'GST cannot be more than 100%'),
    agent_commission: Yup.number()
      .typeError('Agent Commission must be a number')
      .min(0, 'Commission cannot be negative')
      .max(100, 'Commission cannot be more than 100%'),
    program_duration: Yup.string()
      .trim()
      .required('Program Duration is required'),
    brochure: Yup.mixed().required('Brochure file is required'),
    description: Yup.string().trim().required('Course Description is required'),

    document_requirements: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().trim().required('Document title is required'),
        description: Yup.string().trim(),
      })
    ),

    entry_requirements: Yup.array().of(
      Yup.string().trim().required('Entry requirement is required')
    ),

    english_requirements: Yup.array().of(
      Yup.string().trim().required('English requirement is required')
    ),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    console.log('values from handle Submit==>', values);
    const allData = {
      ...values,
      university_id: university_id,
      department_id: values?.department,
      category_id: values?.category,
    };

    try {
      const finalData = new FormData();

      Object.entries(allData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (
              key === 'entry_requirements' ||
              key === 'english_requirements'
            ) {
              finalData.append(`${key}[${index}]`, item);
            } else if (key === 'document_requirements') {
              finalData.append(`${key}[${index}][title]`, item.title);
              finalData.append(
                `${key}[${index}][description]`,
                item.description
              );
              finalData.append(
                `${key}[${index}][isRequired]`,
                item.isRequired ?? true
              );
            }
          });
        } else {
          finalData.append(key, value);
        }
      });

      const result = await addCourse(finalData).unwrap();
      if (result) {
        console.log(result);
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
      price: '',
      gst: '',
      agent_commission: '',
      description: '',
      department: '',
      category: '',
      brochure: null,
      document_requirements: [{ title: '', description: '' }],
      entry_requirements: [''],
      english_requirements: [''],
      program_duration: '',
      image: '',
    });
    setFilePreview(null);
    setEditModalIsOpen(false);
  };

  const handleUpdateCourse = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const allData = {
      name: values?.name,
      available_seats: values?.available_seats,
      price: values?.price,
      gst: values?.gst,
      agent_commission: values?.agent_commission,
      description: values?.description,
      course_id: courseIdForEdit,
      university_id: university_id,
      department_id: values?.department?.value,
      category_id: values?.category?.value,
      brochure: values?.brochure,
      document_requirements: [
        {
          title: values?.document_requirements.title,
          description: values?.document_requirements.description,
        },
      ],
      entry_requirements: values?.entry_requirements,
      english_requirements: values?.english_requirements,
      program_duration: values?.program_duration,
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

        console.log(key, value);
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

  console.log(isfilteredData);
  // Define table headers with custom render functions
  const headers = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    {
      title: 'Course Picture',
      key: 'img',
      render: (item, index) => (
        <div className="d-flex flex-column text-capitalize">
          {item.image && (
            <Image
              src={item.image.url}
              alt={`Course ${index + 1}`}
              width={40}
              height={40}
              className="mt-2 rounded"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
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
      title: 'Course Fee',
      key: 'price',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.price}
        </span>
      ),
    },
    {
      title: 'University Fee',
      key: 'university_price',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.price}
        </span>
      ),
    },
    {
      title: 'GST In Course Fee (%)',
      key: 'gst',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{item?.gst}</span>
      ),
    },
    {
      title: 'Agent Commission (%)',
      key: 'agent_commission',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.agent_commission}
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
