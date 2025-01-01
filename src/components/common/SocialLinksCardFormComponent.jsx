import { useGetSingleUniversityQuery } from '@/slice/services/super admin/universityService';
import { useUpdateUniversitySocialLinkMutation } from '@/slice/services/university-administration/api/universityAdministrationSocialLinkService';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import * as Yup from 'yup';
import LoaderSpiner from '../constants/Loader/LoaderSpiner';
import SubmitButton from './formField/SubmitButton';
import TextField from './formField/TextField';

const SocialLinksCardFormComponent = ({ university_id }) => {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    facebook: '',
    whatsapp: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  });

  const [updateUniversitySocialLink] = useUpdateUniversitySocialLinkMutation();

  const {
    data: getSingleUniversityData,
    isLoading: getSingleUniversityIsLoading,
    refetch: getSingleUniversityRefetch,
  } = useGetSingleUniversityQuery(university_id, {
    skip: !university_id,
  });

  useEffect(() => {
    if (getSingleUniversityData?.data?.social_links) {
      const fetchData = async () => {
        setLoading(true);
        try {
          setInitialValues({
            facebook:
              getSingleUniversityData?.data?.social_links?.facebook || '',
            whatsapp:
              getSingleUniversityData?.data?.social_links?.whatsapp || '',
            twitter: getSingleUniversityData?.data?.social_links?.twitter || '',
            linkedin:
              getSingleUniversityData?.data?.social_links?.linkedin || '',
            instagram:
              getSingleUniversityData?.data?.social_links?.instagram || '',
            youtube: getSingleUniversityData?.data?.social_links?.youtube || '',
          });
        } catch (error) {
          console.error('Error loading data:', error);
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [getSingleUniversityData?.data?.social_links]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    facebook: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.com'
      )
      .required('Name is required'),
    whatsapp: Yup.string()
      .matches(
        /^\+?(\d{1,4})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/,
        'Please enter a valid WhatsApp number, e.g., +1234567890 or +1-234-567-890'
      )
      .required('WhatsApp number is required'),
    twitter: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.com'
      )
      .required('Name is required'),
    linkedin: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.com'
      )
      .required('Name is required'),
    instagram: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.com'
      )
      .required('Name is required'),
    youtube: Yup.string()
      .matches(
        /^https:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid URL, e.g., https://www.domain.com'
      )
      .required('Name is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const finalData = { ...values, university_id: university_id };

      const result = await updateUniversitySocialLink(finalData).unwrap();

      if (result) {
        toast.success(result?.message || 'Social link added successfully!');
        getSingleUniversityRefetch();
        resetForm();
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message || 'An error occurred while submitting the form';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinkFields = [
    { name: 'facebook', label: 'Facebook:' },
    { name: 'whatsapp', label: 'Whatsapp:' },
    { name: 'twitter', label: 'Twitter:' },
    { name: 'instagram', label: 'Instagram:' },
    { name: 'linkedin', label: 'Linkedin:' },
    { name: 'youtube', label: 'Youtube:' },
  ];

  return (
    <Col lg={10}>
      <ToastContainer />
      {getSingleUniversityIsLoading || loading ? (
        <LoaderSpiner />
      ) : (
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            University Social Links
          </CardHeader>

          <CardBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Row>
                    {socialLinkFields?.length > 0 &&
                      socialLinkFields.map((field, index) => (
                        <Col lg={6} key={index}>
                          <TextField name={field.name} label={field.label} />
                        </Col>
                      ))}
                    <Col md={12} xl={12}>
                      <div className="my-4">
                        <SubmitButton
                          isSubmitting={isSubmitting}
                          formSubmit={'Update'}
                        >
                          {'Update'}
                        </SubmitButton>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      )}
    </Col>
  );
};

export default SocialLinksCardFormComponent;
