import React, { useState } from 'react';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import { toast } from 'react-toastify';
import * as Yup from 'yup';

import CommonTableComponent from '@/components/common/CommonTableComponent';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import SearchComponent from '@/components/common/SearchComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetSingleUniversityQuery } from '@/slice/services/super admin/universityService';
import {
  useDeleteUniversitySliderMutation,
  useUpdateUniversitySliderMutation,
} from '@/slice/services/university-administration/api/universityAdministrationSliderService';
import { userDummyImage } from '@/utils/common/data';
import Image from 'next/image';
import UniversitysliderModalForm from './modals/UniversitysliderModalForm';

export default function UniversitySliderList({ university_id }) {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(5);
  const [sliderId, setsliderId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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

  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  const [updateUniversitySlider] = useUpdateUniversitySliderMutation();
  const [deleteUniversitySlider] = useDeleteUniversitySliderMutation();

  const validationSchema = Yup.object({
    title: Yup.string().notRequired(), // Optional field
    sub_title: Yup.string().notRequired(), // Optional field
    description: Yup.string().notRequired(), // Optional field
    // button_1_text: Yup.string().notRequired(), // Optional field
    // button_1_link: Yup.string()
    //   .url('Button 1 link must be a valid URL')
    //   .notRequired(), // Optional field
    // button_2_text: Yup.string().notRequired(), // Optional field
    // button_2_link: Yup.string()
    //   .url('Button 2 link must be a valid URL')
    //   .notRequired(), // Optional field
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleEditButtonClick = (id) => {
    const fetchAndSetSliderData = async () => {
      try {
        const sliderItem = getSingleUniversityData?.data?.sliders?.find(
          (item) => item._id === id
        );

        if (!sliderItem) {
          console.error(`Slider item with ID ${id} not found.`);
          return;
        }

        const imageFiles = await convertImageUrlToFile(sliderItem.image.url);

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

    fetchAndSetSliderData();
    setsliderId(id);
    setEditModalIsOpen(true);
  };

  const handleDeleteButtonClick = async (id) => {
    const deleteData = { university_id, slider_id: id };
    try {
      const result = await deleteUniversitySlider(deleteData).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleUniversityRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    }
  };

  const handleSliderSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    // Extract the image file from values
    const imageFile = values.image; // Assuming 'image' is the field name for the image

    console.log(imageFile);

    // Validate the image before submission
    if (imageFile) {
      // Check file size (5MB limit)
      if (imageFile.size > 5000000) {
        toast.error('File size too large. Maximum allowed size is 5MB.');
        setSubmitting(false);
        return;
      }

      // Check file type (only images)
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(imageFile.type)) {
        toast.error('Unsupported file format. Please upload a valid image.');
        setSubmitting(false);
        return;
      }
    } else {
      // If no image selected, show an error toast
      toast.error('An Uploaded Picture is required.');
      setSubmitting(false);
      return;
    }

    // If the image passes validation, proceed with form submission
    const updatedData = { ...values, university_id: university_id };

    // try {
    //   const finalData = new FormData();
    //   Object.entries(updatedData).forEach(([key, value]) => {
    //     if (value instanceof File) {
    //       finalData.append(key, value); // Append the image file
    //     } else {
    //       finalData.append(key, value); // Append other form values
    //     }
    //   });

    //   // Perform the actual submission (e.g., sending to API)
    //   const result = await updateUniversitySlider(finalData);

    //   if (result.success) {
    //     toast.success('Form submitted successfully!');
    //   } else {
    //     toast.error('Failed to submit form.');
    //   }
    // } catch (error) {
    //   toast.error('An error occurred during submission.');
    // } finally {
    //   setSubmitting(false);
    // }
    try {
      const finalData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        if (value instanceof File) {
          finalData.append(key, value);
        } else {
          finalData.append(key, value);
        }
      });

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

      const result = await updateUniversitySlider(finalData).unwrap();
      if (result) {
        toast.success(result?.message);
        getSingleUniversityRefetch();
        setEditModalIsOpen(!editModalIsOpen);
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
      title: 'Picture',
      key: 'image',
      render: (item, index) => {
        return (
          <span className="d-flex flex-column text-capitalize">
            <Image
              width={80}
              height={80}
              // src={item?.image?.url || userDummyImage}
              src={item?.image?.url || userDummyImage}
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
    {
      title: 'Button One',
      key: 'button_1_text',
      render: (item) => {
        return (
          <span className="d-flex flex-column">
            {item?.button_1_text}
            {item?.button_1_link ? ' (' + item?.button_1_link + ')' : ''}
          </span>
        );
      },
    },
    {
      title: 'Button Two',
      key: 'button_2_text',
      render: (item) => {
        return (
          <span className="d-flex flex-column">
            {item?.button_2_text}
            {item?.button_2_link ? ' (' + item?.button_2_link + ')' : ''}
          </span>
        );
      },
    },
    // { title: 'Button One Text', key: 'button_1_text' },
    // { title: 'Button One Link', key: 'button_1_link' },
    // { title: 'Button Two Text', key: 'button_2_text' },
    // { title: 'Button Two Link', key: 'button_2_link' }

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
            <DropdownItem>
              <div
                className="text-primary"
                onClick={() => handleDeleteButtonClick(item?._id)}
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

  const filteredData =
    getSingleUniversityData?.data?.sliders?.length > 0 &&
    getSingleUniversityData?.data?.sliders.filter((item) =>
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Col lg={10}>
      {getSingleUniversityIsLoading ? (
        <LoaderSpiner />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-2 gap-md-0 card-header">
            <div className="d-flex align-items-center gap-4">
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
                Add Slider Info
              </button>
            </div>
            <SearchComponent
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
          </div>
          <CommonTableComponent
            headers={slidersHeaders}
            data={filteredData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
            emptyMessage="No Data found yet."
          />
        </>
      )}

      {/* creating slider */}
      <UniversitysliderModalForm
        formHeader={'Add Slider Info'}
        onClose={() => {
          setAddModalIsOpen(!addModalIsOpen);
        }}
        isOpen={addModalIsOpen}
        onSubmit={handleSliderSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        formSubmit={'Add'}
        setInitialValues={setInitialValues}
      />

      {/* For updating slider */}

      <UniversitysliderModalForm
        formHeader={'Edit Slider Info'}
        onClose={() => {
          setEditModalIsOpen(!editModalIsOpen);
        }}
        isOpen={editModalIsOpen}
        onSubmit={handleUpdateSlider}
        initialValues={initialValues}
        formSubmit={'Update'}
        setInitialValues={setInitialValues}
      />
    </Col>
  );
}
