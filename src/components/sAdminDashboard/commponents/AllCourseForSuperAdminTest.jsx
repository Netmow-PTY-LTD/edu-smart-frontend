// All course Selected

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
import { useGetDocumentInSuperAdminQuery } from '@/slice/services/super admin/documentService';

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
import CourseModalFormTest from '../modals/CourseModalFormTest';

const AllCourseForSuperAdminTest = ({
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
  const [price, setPrice] = useState(2400);
  const [checkFreeAcommodation, SetCheckFreeAcommodation] = useState(false);
  const [checkChangeStatus, setCheckChangeStatus] = useState(null);
  const [key, setKey] = useState('quill'); // State to toggle between editors

  const perPageData = 10;

  const currentDate = new Date().toISOString().split('T')[0];

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    name: '',
    available_seats: '',
    price: '2400',
    emgs_fee: '2400',
    gst: '',
    agent_commission_percentage: '',
    university_price: '25000',
    tuition_fee: '25000',
    after_emgs_fee: '22600',
    others_fee: '2600',
    tuition_fee_put: '20000',
    fee_duration: '',
    incentive_amount: '0',
    description: '',
    department: '',
    category: '',
    brochure: null,
    document_requirements: [],
    entry_requirements: [''],
    english_requirements: [''],
    program_duration: '',
    image: null,
    free_accommodation: false,
    accommodation_start_date: currentDate, // Set current date as default value
    accommodation_end_date: currentDate, // Set current date as default value
    free_accessories: false,
    accessories: [],
    scholarship_on_tuition_fee: false,
    scholarship_amount: '',
    scholarship_auto_deduct: false,
    auto_deduct: false,
    free_air_ticket: false,
  });

  const { allCoursesWithoutAction, allowedFileTypes } = DataObjectComponent();

  // document_list_id:
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

  // document Related api
  const {
    data: getDocumentData,
    error: getDocumentError,
    isLoading: getDocumentIsLoading,
    refetch: getDocuemtnRefetch,
  } = useGetDocumentInSuperAdminQuery();

  const getSingleCourseDataForDocumentData =
    getCourseData?.data?.length > 0 &&
    getCourseData?.data.find((item) => item?._id === courseIdForEdit);

  // Create a new variable to hold the merged data
  let mergedData = [];

  // Check if getDocumentData has a data property that is an array
  if (getDocumentData && Array.isArray(getDocumentData.data)) {
    // Copy existing data
    mergedData = [...getDocumentData.data];

    // Ensure document_requirements is valid and contains meaningful data
    if (
      Array.isArray(
        getSingleCourseDataForDocumentData?.document_requirements
      ) &&
      getSingleCourseDataForDocumentData.document_requirements.length > 0 &&
      !getSingleCourseDataForDocumentData.document_requirements.includes('') &&
      getSingleCourseDataForDocumentData.document_requirements !== undefined // Check for undefined
    ) {
      getSingleCourseDataForDocumentData.document_requirements.forEach(
        (requirement) => {
          // Check if the _id already exists in mergedData
          const existingRequirement = mergedData.find(
            (item) => item._id === requirement?.document_list_id
          );
          if (!existingRequirement) {
            mergedData.push({
              ...requirement,
              _id: requirement?.document_list_id,
            });
          }
        }
      );
    }
  } else {
    console.error('getDocumentData.data is not an array');
  }

  const documentOptions = mergedData?.map((item) => ({
    value: item._id,
    label: item.title,
    description: item.description,
  }));

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

      const filterDoc = getSingleCourseData?.document_requirements.map(
        (item) => item?.title
      );

      const fetchData = async () => {
        try {
          let brochureFile = null;
          if ('brochure' in getSingleCourseData) {
            brochureFile = await convertImageUrlToFile(
              getSingleCourseData?.brochure?.url
            );
          }
          let imageFiles = null;
          if ('image' in getSingleCourseData) {
            imageFiles = await convertImageUrlToFile(
              getSingleCourseData?.image.url
            );
          }

          setInitialValues({
            name: getSingleCourseData?.name || '',
            available_seats: getSingleCourseData?.available_seats || '',
            price:
              getSingleCourseData?.emgs_fee || getSingleCourseData?.price || 0,
            emgs_fee:
              getSingleCourseData?.emgs_fee || getSingleCourseData?.price || 0,
            //after_emgs_fee: getSingleCourseData?.after_emgs_fee || 0,
            incentive_amount: getSingleCourseData?.incentive_amount || 0,
            tuition_fee_put: getSingleCourseData?.tuition_fee_put || 0,
            others_fee: getSingleCourseData?.others_fee || 0,
            fee_duration: getSingleCourseData?.fee_duration || '',
            scholarship_on_tuition_fee:
              getSingleCourseData?.scholarship_on_tuition_fee || false,
            scholarship_amount: getSingleCourseData?.scholarship_amount || 0,
            scholarship_auto_deduct:
              getSingleCourseData?.scholarship_auto_deduct || false,
            auto_deduct: getSingleCourseData?.auto_deduct || false,
            free_air_ticket: getSingleCourseData?.free_air_ticket || false,
            free_accommodation:
              getSingleCourseData?.free_accommodation || false,
            accommodation_start_date:
              getSingleCourseData?.accommodation_start_date || '',
            accommodation_end_date:
              getSingleCourseData?.accommodation_end_date || '',
            free_accessories: getSingleCourseData?.free_accessories || false,
            accessories: getSingleCourseData?.accessories || [],
            gst: getSingleCourseData?.gst || 0,

            agent_commission_percentage:
              getSingleCourseData?.agent_commission_percentage || 0,
            university_price:
              getSingleCourseData?.tuition_fee ||
              getSingleCourseData?.university_price ||
              0,
            tuition_fee:
              getSingleCourseData?.tuition_fee ||
              getSingleCourseData?.university_price ||
              0,
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
              getSingleCourseData?.document_requirements?.filter(
                (value, index, self) =>
                  value?.document_list_id && // Check if document_list_id is defined
                  index ===
                    self.findIndex(
                      (t) => t.document_list_id === value.document_list_id
                    )
              ) || [],
            english_requirements:
              getSingleCourseData?.english_requirements || '',
            program_duration: getSingleCourseData?.program_duration || '',
            image: imageFiles || '',
            document_select: Array.isArray(
              getSingleCourseData?.document_requirements
            )
              ? getSingleCourseData.document_requirements
                  .filter((item) => item && item.title && item.document_list_id) // Filter out invalid items
                  .map((item) => ({
                    label: item.title,
                    value: item.document_list_id,
                  }))
              : [],
          });

          SetCheckFreeAcommodation(getSingleCourseData?.free_accommodation);
          setEditModalIsOpen(true);
          setFilePreview(brochureFile?.name);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

      fetchData();
    }
  }, [getCourseData?.data, courseIdForEdit]);

  // validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Course Name is required'),
    available_seats: Yup.number()
      .typeError('Available Seats must be a number')
      .min(1, 'At least 1 seat is required')
      .required('Available Seats is required'),
    department: Yup.string().required('Department selection is required'),
    category: Yup.string().required('Course Category selection is required'),

    program_duration: Yup.string().required('Program Duration is required'),
    brochure: Yup.mixed().required('Brochure file is required'),
    image: Yup.mixed().required('Course Picture is required'),
    document_select: Yup.array().optional(),
    description: Yup.string()
      .min(20, 'Description must be at least 20 characters')
      .required('Course Description is required'),
    document_requirements: Yup.array().optional(),

    // entry_requirements: Yup.array()
    //   .of(Yup.string().required('Entry requirement is required'))
    //   .min(1, 'At least one entry requirement is required'),

    // english_requirements: Yup.array()
    //   .of(Yup.string().required('English requirement is required'))
    //   .min(1, 'At least one English requirement is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const filteredData = getDocumentData?.data
      ?.filter((doc) => values.document_requirements?.includes(doc._id))
      .map((item) => ({
        title: item.title,
        description: item.description,
        isRequired: item.isRequired,
        document_list_id: item.document_list_id,
      }));

    const allData = {
      name: values?.name,
      available_seats: values?.available_seats,
      price: values?.emgs_fee || values?.price,
      gst: values?.gst || 0,
      emgs_fee: values?.emgs_fee || values?.price,
      after_emgs_fee: values?.after_emgs_fee || 0,
      tuition_fee_put: values?.tuition_fee_put || 0,
      others_fee: values?.others_fee || 0,
      fee_duration: values?.fee_duration || '',
      agent_commission_percentage: values?.agent_commission_percentage || 0,
      description: values?.description,
      //      course_id: courseIdForEdit,
      university_id: university_id,
      department_id: values?.department,
      category_id: values?.category,
      brochure: values?.brochure,
      university_price: values?.tuition_fee || values?.university_price || 0,
      tuition_fee: values?.tuition_fee || values?.university_price || 0,
      entry_requirements: values?.entry_requirements,
      english_requirements: values?.english_requirements,
      program_duration: values?.program_duration,
      image: values?.image,
      incentive_amount: values?.incentive_amount || 0,
      scholarship_on_tuition_fee: values?.scholarship_on_tuition_fee || false,
      scholarship_amount: values?.scholarship_amount || 0,
      scholarship_auto_deduct: values?.scholarship_auto_deduct || false,
      auto_deduct: values?.auto_deduct || false,
      free_air_ticket: values?.free_air_ticket || false,
      free_accessories: values?.free_accessories || false,
      accessories: values?.accessories || [],

      free_accommodation: checkFreeAcommodation,
      // Conditionally add accommodation_start_date and accommodation_end_date
      ...(checkFreeAcommodation && {
        accommodation_start_date: values?.accommodation_start_date,
        accommodation_end_date: values?.accommodation_end_date,
      }),

      document_requirements: [...filteredData, ...values.document_requirements],
    };

    try {
      const finalData = new FormData();

      Object.entries(allData).forEach(([key, value]) => {
        //   if (Array.isArray(value)) {
        //     if (key === 'document_requirements' && value.length === 0) {
        //       // Ensure an empty array by appending an empty key
        //       finalData.append(`${key}[]`, []);
        //     } else if (key === 'accessories' && value.length === 0) {
        //       // If 'accessories' is an empty array, append an empty array
        //       finalData.append(`${key}[]`, []);
        //     } else {
        //       value.forEach((item, index) => {
        //         if (
        //           key === 'entry_requirements' ||
        //           key === 'english_requirements' ||
        //           key === 'accessories'
        //         ) {
        //           // Append each item in the array as an indexed field
        //           finalData.append(`${key}[${index}]`, item);
        //         } else if (key === 'document_requirements') {
        //           // Append only fields that are not null or undefined
        //           if (item.title != null)
        //             finalData.append(`${key}[${index}][title]`, item.title);
        //           if (item.description != null)
        //             finalData.append(
        //               `${key}[${index}][description]`,
        //               item.description
        //             );
        //           if (item.isRequired != null)
        //             finalData.append(
        //               `${key}[${index}][isRequired]`,
        //               item.isRequired
        //             );
        //           if (item.document_list_id != null) {
        //             finalData.append(
        //               `${key}[${index}][document_list_id]`,
        //               item.document_list_id
        //             );
        //           }
        //         }
        //       });
        //     }
        //   } else {
        //     finalData.append(key, value);
        //   }
        // });
        if (Array.isArray(value)) {
          if (
            (key === 'document_requirements' || key === 'accessories') &&
            value.length === 0
          ) {
            finalData.append(`${key}[]`, []);
          } else {
            value.forEach((item, index) => {
              if (
                key === 'entry_requirements' ||
                key === 'english_requirements' ||
                key === 'accessories'
              ) {
                finalData.append(`${key}[${index}]`, item);
              } else if (key === 'document_requirements') {
                // Skip item if title is missing or null
                if (!item.title) return;

                if (item.title != null)
                  finalData.append(`${key}[${index}][title]`, item.title);
                if (item.description != null)
                  finalData.append(
                    `${key}[${index}][description]`,
                    item.description
                  );
                if (item.isRequired != null)
                  finalData.append(
                    `${key}[${index}][isRequired]`,
                    item.isRequired
                  );
                if (item.document_list_id != null)
                  finalData.append(
                    `${key}[${index}][document_list_id]`,
                    item.document_list_id
                  );
              }
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
      price: '2400',
      emgs_fee: '2400',
      gst: '',
      agent_commission_percentage: '',
      university_price: '25000',
      tuition_fee: '25000',
      after_emgs_fee: '22600',
      others_fee: '2600',
      tuition_fee_put: '20000',
      fee_duration: '',
      description: '',
      department: '',
      category: '',
      brochure: null,
      document_requirements: [''],
      entry_requirements: [''],
      english_requirements: [''],
      program_duration: '',
      image: null,
      free_accommodation: false,
      accommodation_start_date: '', // Set current date as default value
      accommodation_end_date: '', // Set current date as default value
      free_accessories: false,
      accessories: [],
      scholarship_on_tuition_fee: false,
      scholarship_amount: '',
      scholarship_auto_deduct: false,
      auto_deduct: false,
      free_air_ticket: false,
    });
    setFilePreview(null);
    setEditModalIsOpen(false);
  };

  const handleUpdateCourse = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const filteredData = getDocumentData?.data
      ?.filter((doc) => values?.document_select?.includes(doc._id))
      .map((item) => ({
        title: item.title,
        document_list_id: item._id,
        description: item.description,
        isRequired: item.isRequired,
      }));

    const documentRequirements = values?.document_requirements?.map((item) => ({
      title: item.title,
      description: item.description,
      isRequired: item.isRequired,
      document_list_id: item.document_list_id,
    }));

    const allData = {
      name: values?.name,
      available_seats: values?.available_seats,
      price: values?.emgs_fee || values?.price,
      gst: values?.gst || 0,
      emgs_fee: values?.emgs_fee || values?.price,
      after_emgs_fee: values?.after_emgs_fee || 0,
      tuition_fee_put: values?.tuition_fee_put || 0,
      others_fee: values?.others_fee || 0,
      fee_duration: values?.fee_duration || '',
      agent_commission_percentage: values?.agent_commission_percentage || 0,
      description: values?.description,
      course_id: courseIdForEdit,
      university_id: university_id,
      department_id: values?.department?.value,
      category_id: values?.category?.value,
      brochure: values?.brochure,
      university_price: values?.tuition_fee || values?.university_price || 0,
      tuition_fee: values?.tuition_fee || values?.university_price || 0,
      entry_requirements: values?.entry_requirements,
      english_requirements: values?.english_requirements,
      program_duration: values?.program_duration,
      image: values?.image,
      incentive_amount: values?.incentive_amount || 0,
      scholarship_on_tuition_fee: values?.scholarship_on_tuition_fee || false,
      scholarship_amount: values?.scholarship_amount || 0,
      scholarship_auto_deduct: values?.scholarship_auto_deduct || false,
      auto_deduct: values?.auto_deduct || false,
      free_air_ticket: values?.free_air_ticket || false,
      free_accessories: values?.free_accessories || false,
      accessories: values?.accessories || [],

      free_accommodation: checkFreeAcommodation,
      // Conditionally add accommodation_start_date and accommodation_end_date
      ...(checkFreeAcommodation && {
        accommodation_start_date: values?.accommodation_start_date,
        accommodation_end_date: values?.accommodation_end_date,
      }),

      document_requirements: [...filteredData, ...documentRequirements],
    };

    try {
      const finalData = new FormData();

      Object.entries(allData).forEach(([key, value]) => {
        //   if (Array.isArray(value)) {
        //     if (key === 'document_requirements' && value.length === 0) {
        //       // Ensure an empty array by appending an empty key
        //       finalData.append(`${key}[]`, []);
        //     } else if (key === 'accessories' && value.length === 0) {
        //       // If 'accessories' is an empty array, append an empty array
        //       finalData.append(`${key}[]`, []);
        //     } else {
        //       value.forEach((item, index) => {
        //         if (
        //           key === 'entry_requirements' ||
        //           key === 'english_requirements' ||
        //           key === 'accessories'
        //         ) {
        //           // Append each item in the array as an indexed field
        //           finalData.append(`${key}[${index}]`, item);
        //         } else if (key === 'document_requirements') {
        //           // Append only fields that are not null or undefined
        //           if (item.title != null)
        //             finalData.append(`${key}[${index}][title]`, item.title);
        //           if (item.description != null)
        //             finalData.append(
        //               `${key}[${index}][description]`,
        //               item.description
        //             );
        //           if (item.isRequired != null)
        //             finalData.append(
        //               `${key}[${index}][isRequired]`,
        //               item.isRequired
        //             );
        //           if (item.document_list_id != null) {
        //             finalData.append(
        //               `${key}[${index}][document_list_id]`,
        //               item.document_list_id
        //             );
        //           }
        //         }
        //       });
        //     }
        //   } else {
        //     finalData.append(key, value);
        //   }
        // });

        if (Array.isArray(value)) {
          if (
            (key === 'document_requirements' || key === 'accessories') &&
            value.length === 0
          ) {
            finalData.append(`${key}[]`, []);
          } else {
            value.forEach((item, index) => {
              if (
                key === 'entry_requirements' ||
                key === 'english_requirements' ||
                key === 'accessories'
              ) {
                finalData.append(`${key}[${index}]`, item);
              } else if (key === 'document_requirements') {
                // Skip item if title is missing or null
                if (!item.title) return;

                if (item.title != null)
                  finalData.append(`${key}[${index}][title]`, item.title);
                if (item.description != null)
                  finalData.append(
                    `${key}[${index}][description]`,
                    item.description
                  );
                if (item.isRequired != null)
                  finalData.append(
                    `${key}[${index}][isRequired]`,
                    item.isRequired
                  );
                if (item.document_list_id != null)
                  finalData.append(
                    `${key}[${index}][document_list_id]`,
                    item.document_list_id
                  );
              }
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

  const handleDeleteButtonClick = (itemData) => {
    setCourseIdForDelete(itemData?.id);
    setCheckChangeStatus(itemData?.status);
    setDeleteModalIsOpen(!deleteModalIsOpen);
  };

  const handleDeleteCourse = async (id) => {
    try {
      const result = await deleteCourse({
        university_id: university_id,
        course_id: id,
        status: checkChangeStatus,
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
            <DropdownItem>
              <div
                onClick={() =>
                  window.open(
                    `/university/${item?.university?._id}/course/${item?._id}`,
                    '_blank'
                  )
                }
                className="text-primary"
              >
                <i className="ri-eye-fill align-start me-2 text-muted"></i>
                View Course
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
            <CourseModalFormTest
              SelectOption={documentOptions}
              //SelectOption={mergedData}
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
              allCategoryName={allCategoryName}
              setInitialValues={setInitialValues}
              handleFileChange={handleFileChange}
              filePreview={filePreview}
              setFilePreview={setFilePreview}
              SetCheckFreeAcommodation={SetCheckFreeAcommodation}
              checkFreeAcommodation={checkFreeAcommodation}
            />
            <SearchComponent
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </CardHeader>

          <CardBody>
            <CommonTableComponent
              headers={[...allCoursesWithoutAction, ...headers]}
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
      <CourseModalFormTest
        SelectOption={documentOptions}
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
        SetCheckFreeAcommodation={SetCheckFreeAcommodation}
        checkFreeAcommodation={checkFreeAcommodation}
      />

      {/* Delete Course */}
      <DeleteModal
        Open={deleteModalIsOpen}
        close={handleDeleteButtonClick}
        id={courseIdForDelete}
        handleDelete={handleDeleteCourse}
        isloading={deleteCourseIsLoading}
        userStatus={checkChangeStatus}
      />
    </div>
  );
};

export default AllCourseForSuperAdminTest;
