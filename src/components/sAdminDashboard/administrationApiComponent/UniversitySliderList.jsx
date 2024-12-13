import React, { useEffect, useState } from 'react';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { useGetSingleUniversityQuery } from '@/slice/services/super admin/universityService';
import CommonTableComponent from '@/components/common/CommonTableComponent';

import { useUpdateUniversityFaqMutation } from '@/slice/services/university-administration/api/universityAdministrationFaqService';
import UniversitysliderModalForm from './modals/UniversitysliderModalForm';
import { useUpdateUniversitySliderMutation } from '@/slice/services/university-administration/api/universityAdministrationSliderService';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import Image from 'next/image';

export default function UniversitySliderList({ university_id }) {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(5);
  const [sliderId, setsliderId] = useState('');
  const [initialValues, setInitialValues] = useState({
    title: '',
    sub_title: '',
    description: '',
    button_1_text: '',
    button_1_link: '',
    button_2_text: '',
    button_2_link: '',
    images: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('Titlle is required'),
    sub_title: Yup.string().required('Sub-title is required'),
    description: Yup.string().required('Description is required'),
    button_1_text: Yup.string().required('Button 1 text is required'),
    button_1_link: Yup.string()
      .url('Button 1 link must be a valid URL')
      .required('Button 1 link is required'),
    button_2_text: Yup.string().required('Button 2 text is required'),
    button_2_link: Yup.string()
      .url('Button 2 link must be a valid URL')
      .required('Button 2 link is required'),
    image: Yup.mixed()
      .test('fileSize', 'File size too large', (value) => {
        // Example for checking image file size
        return value ? value.size <= 5000000 : true; // 5MB size limit
      })
      .test('fileType', 'Unsupported file format', (value) => {
        // Example for checking file type (only images)
        return value
          ? ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif'].includes(
              value.type
            )
          : true;
      })
      .required('An image is required'),
  });

  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  console.log('get sigle university data==>', getSingleUniversityData);

  const [updateUniversitySlider] = useUpdateUniversitySliderMutation();

  const handleEditButtonClick = (id) => {
    const fetchAndSetSliderData = async () => {
      try {
        // Find the slider item by ID
        const sliderItem = getSingleUniversityData?.data?.sliders?.find(
          (item) => item._id === id
        );

        if (!sliderItem) {
          console.error(`Slider item with ID ${id} not found.`);
          return;
        }

        // Convert the image URL to a File object
        const imageFiles = await convertImageUrlToFile(sliderItem.image.url);

        console.log('Converted Image Files:', imageFiles);

        // Set the initial form values
        setInitialValues({
          title: sliderItem.title || '',
          sub_title: sliderItem.sub_title || '',
          description: sliderItem.description || '',
          button_1_text: sliderItem.button_1_text || '',
          button_1_link: sliderItem.button_1_link || '',
          button_2_text: sliderItem.button_2_text || '',
          button_2_link: sliderItem.button_2_link || '',
          image: imageFiles || '',
        });
      } catch (error) {
        console.error('Error fetching or processing slider data:', error);
      }
    };
    // Fetch data and update state
    fetchAndSetSliderData();
    // Update component state to open modal and set ID
    setsliderId(id);
    setEditModalIsOpen(true);
  };

  const handleSliderSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const updatedData = { ...values, university_id: university_id };
    try {
      const finalData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        if (value instanceof File) {
          finalData.append(key, value);
        } else {
          finalData.append(key, value);
        }
      });

      // for (let [key, value] of finalData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      const result = await updateUniversitySlider(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleUniversityRefetch();
        setAddModalIsOpen(!addModalIsOpen);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSlider = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updatesliderData = {
      ...values,
      id: sliderId,
      university_id: university_id,
    };

    try {
      const finalData = new FormData();
      Object.entries(updatesliderData).forEach(([key, value]) => {
        if (value instanceof File) {
          finalData.append(key, value);
        } else {
          finalData.append(key, value);
        }
      });

      // for (let [key, value] of finalData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      const result = await updateUniversitySlider(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleUniversityRefetch();
        setAddModalIsOpen(!addModalIsOpen);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const slidersHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    {
      title: 'Slider Picture',
      key: 'image',
      render: (item, index) => {
        return (
          <span className="d-flex flex-column text-capitalize">
            <Image
              width={80}
              height={80}
              src={item?.image?.url}
              alt="slider-Image"
              key={index + 1}
            />
          </span>
        );
      },
    },
    { title: 'Title', key: 'title' },
    { title: 'Sub Title', key: 'sub_title' },
    { title: 'Description', key: 'description' },
    { title: 'Button_1 Text', key: 'button_1_text' },
    { title: 'Button_1 Link', key: 'button_1_link' },
    { title: 'Button_1 Link', key: 'button_2_text' },
    { title: 'Button_2 Link', key: 'button_2_link' },

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
                className="text-primary"
                onClick={() => handleEditButtonClick(item?._id)}
              >
                <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                Edit
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  return (
    <Col lg={10}>
      <div className="align-items-center d-flex fw-semibold card-header">
        <h4 className="fw-semibold fs-20 text-black mb-0">sliders List</h4>
        <button
          className="button px-4 py-3"
          onClick={() => {
            setInitialValues({
              title: '',
              sub_title: '',
              description: '',
              button_1_text: '',
              button_1_link: '',
              button_2_text: '',
              button_2_link: '',
              images: '',
            });
            setAddModalIsOpen(!addModalIsOpen);
          }}
        >
          Add Slider info
        </button>
      </div>
      <CommonTableComponent
        headers={slidersHeaders}
        data={getSingleUniversityData?.data?.sliders}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        perPageData={perPageData}
        emptyMessage="No Data found yet."
      />

      {/* creating slider */}
      <UniversitysliderModalForm
        formHeader={'Add Slider info'}
        onClose={() => {
          setAddModalIsOpen(!addModalIsOpen);
        }}
        isOpen={addModalIsOpen}
        onSubmit={handleSliderSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        formSubmit={'Add Slider info'}
        setInitialValues={setInitialValues}
      />

      {/* For updating slider */}

      <UniversitysliderModalForm
        formHeader={'Edit Slider info'}
        onClose={() => {
          setEditModalIsOpen(!editModalIsOpen);
        }}
        isOpen={editModalIsOpen}
        onSubmit={handleUpdateSlider}
        initialValues={initialValues}
        validationSchema={validationSchema}
        formSubmit={'Update Slider info'}
        setInitialValues={setInitialValues}
      />
    </Col>
  );
}
