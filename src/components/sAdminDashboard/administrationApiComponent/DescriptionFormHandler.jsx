import DescriptionCardForm from '@/components/common/DescriptionFormCardCom';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetSingleUniversityQuery } from '@/slice/services/super admin/universityService';
import { useUpdateUniversityDescriptionMutation } from '@/slice/services/university-administration/api/universityAdministrationDescriptionService';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Col } from 'reactstrap';
import * as Yup from 'yup';
const DescriptionFormHandler = ({ university_id }) => {
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    course_section_description: '',
    faq_section_description: '',
    review_section_description: '',
  });

  const [updateDescription] = useUpdateUniversityDescriptionMutation();

  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setInitialValues({
          course_section_description:
            getSingleUniversityData?.data?.course_section_description || '',
          faq_section_description:
            getSingleUniversityData?.data?.faq_section_description || '',
          review_section_description:
            getSingleUniversityData?.data?.review_section_description || '',
        });
      } catch (error) {
        console.error('Error loading data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [
    getSingleUniversityData?.data?.course_section_description,
    getSingleUniversityData?.data?.faq_section_description,
    getSingleUniversityData?.data?.review_section_description,
  ]);

  const validationSchema = Yup.object({});

  // const onSubmit = async (values, { setSubmitting }) => {
  //   console.log(values);
  //   setSubmitting(true);
  //   try {
  //     const result = await updateDescription({
  //       data: values,
  //       university_id: university_id,
  //     }).unwrap();
  //     if (result) {
  //       toast.success(result?.message);
  //       getSingleUniversityRefetch();
  //     }
  //   } catch (error) {
  //     const errorMessage = error?.data?.message;
  //     toast.error(errorMessage);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values);

    // Iterate over all fields in values and replace empty strings with "&nbsp;"
    const updatedValues = Object.keys(values).reduce((acc, key) => {
      acc[key] = values[key] === '' ? ' ' : values[key];
      return acc;
    }, {});

    setSubmitting(true);
    try {
      const result = await updateDescription({
        data: updatedValues, // Use the updated values here
        university_id: university_id,
      }).unwrap();

      if (result) {
        toast.success(result?.message);
        getSingleUniversityRefetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const descriptionFields = [
    { name: 'course_section_description', label: 'Course Description' },
    { name: 'faq_section_description', label: 'FAQ Description' },
    { name: 'review_section_description', label: 'Testimonial Description' },
  ];

  return (
    <Col>
      <ToastContainer />
      {getSingleUniversityIsLoading || loading ? (
        <LoaderSpiner />
      ) : (
        <DescriptionCardForm
          title="Added All Description Here"
          fields={descriptionFields}
          submitButtonText="Add Description"
          className={'p-3'}
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      )}
    </Col>
  );
};

export default DescriptionFormHandler;
