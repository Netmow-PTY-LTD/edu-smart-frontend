import { useGetSingleUniversityQuery } from '@/slice/services/super admin/universityService';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import * as Yup from 'yup';
import LoaderSpiner from '../constants/Loader/LoaderSpiner';
import MultipleImageField from './formField/MultipleImagesField';
import SubmitButton from './formField/SubmitButton';
import TextArea from './formField/TextAreaField';
import TextField from './formField/TextField';

const SliderCardComponent = ({ university_id }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [sliderIdForEdit, setSliderIdForEdit] = useState(null);
  const [sliderIdForDelete, setSliderIdForDelete] = useState(null);

  const perPageData = 10;

  // Define initial form values
  const [initialValues, setInitialValues] = useState({
    title: '',
    sub_title: '',
    description: '',
    button_1_text: '',
    button_1_link: '',
    button_2_text: '',
    button_2_link: '',
    images: [],
  });

  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  useEffect(() => {
    if (getSingleUniversityData?.data?.slider && sliderIdForEdit) {
      const getSingleSliderData =
        getSingleUniversityData?.data?.slider?.length > 0 &&
        getSingleUniversityData?.data?.slider.find(
          (item) => item?._id === sliderIdForEdit
        );

      const fetchData = async () => {
        try {
          setInitialValues({
            name: getSingleSliderData?.name || '',
            description: getSingleSliderData?.description || '',
          });
          setEditModalIsOpen(true);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

      fetchData();
    }
  }, [getSingleUniversityData?.data?.slider, sliderIdForEdit]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(60, 'Maximum 60 characters allowed')
      .required('Name is required'),

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

    images: Yup.array()
      .of(
        Yup.mixed()
          .test('fileSize', 'File size too large', (value) => {
            // Example for checking image file size
            return value ? value.size <= 5000000 : true; // 5MB size limit
          })
          .test('fileType', 'Unsupported file format', (value) => {
            // Example for checking file type (only images)
            return value
              ? ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
              : true;
          })
      )
      .min(1, 'At least one image is required')
      .required('Images are required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    // try {
    //   const finalData = { ...values, university_id: university_id };
    //   const result = await addSlider(finalData).unwrap();
    //   if (result) {
    //     toast.success(result?.message);
    //     getSliderRefetch();
    //     setAddModalIsOpen(!addModalIsOpen);
    //   }
    // } catch (error) {
    //   const errorMessage = error?.data?.message;
    //   toast.error(errorMessage);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const sliderFields = [
    { name: 'title', label: 'Title:' },
    { name: 'sub_title', label: 'Sub Title:' },
    { name: 'button_1_text', label: 'Button One Text:' },
    { name: 'button_1_link', label: 'Button One Link:' },
    { name: 'button_2_text', label: 'Button Two Text:' },
    { name: 'button_2_link', label: 'Button Two Link:' },
  ];

  return (
    <Col lg={10}>
      <ToastContainer />
      {getSingleUniversityIsLoading ? (
        <LoaderSpiner />
      ) : (
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center"></CardHeader>

          <CardBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <Row>
                    {sliderFields?.length > 0 &&
                      sliderFields.map((field, index) => (
                        <Col lg={6} key={index}>
                          <TextField name={field.name} label={field.label} />
                        </Col>
                      ))}

                    <Col lg={12}>
                      <TextArea label="Description" name="description" />
                    </Col>
                    <Col lg={12}>
                      <MultipleImageField
                        form={{ setFieldValue, values }}
                        label="Images"
                        field={{ name: 'images' }}
                      />
                    </Col>
                  </Row>

                  <SubmitButton
                    isSubmitting={isSubmitting}
                    formSubmit={'Update'}
                  >
                    {}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      )}
    </Col>
  );
};

export default SliderCardComponent;
