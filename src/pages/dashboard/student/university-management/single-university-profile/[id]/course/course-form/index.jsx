/* eslint-disable no-undef */
import ImageField from '@/components/common/formField/ImageField';
import MultipleFileUpload from '@/components/common/formField/MultipleFileUpload';
import SingleFileUpload from '@/components/common/formField/SingleFileUpload';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useGetSingleStudentQuery } from '@/slice/services/public/student/publicStudentService';
import { useSubmitStudentDocumentMutation } from '@/slice/services/student/studentSubmitDocumentService';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

export default function CourseForm({ setStep, step }) {
  const router = useRouter();
  const university_id = router.query.id;
  const course_id = router.query.courseId;
  const [photographPreviewImage, setPhotographPreviewImage] = useState('');
  const [passportPreviewImage, setPassportPreviewImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    photograph: '',
    passport: '',
    offer_letter: '',
    medical_certificate: '',
    academic_certificate: [],
    personal_bond: '',
    noc: '',
    letter_of_eligibility: '',
    english_language_certificate: '',
  });

  const { data: userInfodata } = useGetUserInfoQuery();
  const [submitStudentDocument] = useSubmitStudentDocumentMutation();
  const {
    data: singleStudentData,
    isLoading: singleStudentIsLoading,
    refetch: singleStudentRefetch,
  } = useGetSingleStudentQuery(userInfodata?.data?._id, {
    skip: !userInfodata?.data?._id,
  });

  // Helper function to validate file types
  const fileTypeValidation = (allowedTypes) => {
    return (value) => {
      if (value && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          const file = value[i];
          const fileType = file.type;
          if (!allowedTypes.includes(fileType)) {
            return false;
          }
        }
      }
      return true;
    };
  };

  // File size validation (in MB)
  const fileSizeValidation = (maxSizeInMB, file) => {
    if (!file) return false; // No file selected
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
  };

  const validationSchema = Yup.object({
    photograph: Yup.mixed()
      .required('Photograph is required')
      .test('fileType', 'Photograph must be an image file', (value) =>
        fileTypeValidation(['image/jpeg', 'image/png', 'image/jpg'], value)
      )
      .test('fileSize', 'Photograph must be less than 5MB', (value) =>
        fileSizeValidation(5, value)
      ),

    passport: Yup.mixed()
      .required('Passport is required')
      .test('fileType', 'Passport must be an image file', (value) =>
        fileTypeValidation(['image/jpeg', 'image/png', 'image/jpg'], value)
      )
      .test('fileSize', 'Passport must be less than 5MB', (value) =>
        fileSizeValidation(5, value)
      ),

    offer_letter: Yup.mixed()
      .required('Offer letter is required')
      .test('fileType', 'Offer letter must be a PDF file', (value) =>
        fileTypeValidation(['application/pdf'], value)
      )
      .test('fileSize', 'Offer letter must be less than 10MB', (value) =>
        fileSizeValidation(10, value)
      ),

    medical_certificate: Yup.mixed()
      .required('Medical certificate is required')
      .test('fileType', 'Medical certificate must be a PDF file', (value) =>
        fileTypeValidation(['application/pdf'], value)
      )
      .test('fileSize', 'Medical certificate must be less than 10MB', (value) =>
        fileSizeValidation(10, value)
      ),

    academic_certificate: Yup.array()
      .of(
        Yup.mixed()
          .test(
            'fileType',
            'Academic certificate must be an image or PDF file',
            (value) =>
              fileTypeValidation(
                ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
                value
              )
          )
          .test(
            'fileSize',
            'Each academic certificate must be less than 10MB',
            (value) => fileSizeValidation(10, value)
          )
      )
      .required('Academic certificates are required'),

    personal_bond: Yup.mixed()
      .required('Personal bond is required')
      .test('fileType', 'Personal bond must be a PDF file', (value) =>
        fileTypeValidation(['application/pdf'], value)
      )
      .test('fileSize', 'Personal bond must be less than 10MB', (value) =>
        fileSizeValidation(10, value)
      ),

    noc: Yup.mixed()
      .required('NOC is required')
      .test('fileType', 'NOC must be a PDF file', (value) =>
        fileTypeValidation(['application/pdf'], value)
      )
      .test('fileSize', 'NOC must be less than 10MB', (value) =>
        fileSizeValidation(10, value)
      ),

    letter_of_eligibility: Yup.mixed()
      .required('Letter of eligibility is required')
      .test('fileType', 'Letter of eligibility must be a PDF file', (value) =>
        fileTypeValidation(['application/pdf'], value)
      )
      .test(
        'fileSize',
        'Letter of eligibility must be less than 10MB',
        (value) => fileSizeValidation(10, value)
      ),

    english_language_certificate: Yup.mixed()
      .required('English language certificate is required')
      .test(
        'fileType',
        'English language certificate must be a PDF file',
        (value) => fileTypeValidation(['application/pdf'], value)
      )
      .test(
        'fileSize',
        'English language certificate must be less than 10MB',
        (value) => fileSizeValidation(10, value)
      ),
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      if (singleStudentData?.data) {
        setLoading(true);

        const documentPromises = singleStudentData?.data?.documents?.map(
          async (student) => {
            if (student?.title === 'academic_certificate') {
              const convertedFiles = await Promise.all(
                student?.file?.map(async (file) =>
                  convertImageUrlToFile(file?.url)
                )
              );

              return {
                title: student?.title,
                convertedFiles,
              };
            } else {
              const convertedFile = await convertImageUrlToFile(
                student?.file[0]?.url
              );

              return {
                title: student?.title,
                convertedFile,
              };
            }
          }
        );

        const documentData = await Promise.all(documentPromises);

        const newValues = documentData.reduce(
          (acc, { title, convertedFiles, convertedFile }) => {
            if (title === 'academic_certificate') {
              acc.academic_certificate = [
                ...(acc.academic_certificate || []),
                ...convertedFiles.filter(
                  (file) =>
                    !acc.academic_certificate?.some(
                      (existingFile) => existingFile === file
                    )
                ),
              ];
            } else {
              acc[title] = convertedFile;

              if (title === 'photograph' || title === 'passport') {
                if (convertedFile instanceof Blob) {
                  const previewImageUrl = URL.createObjectURL(convertedFile);

                  if (title === 'photograph') {
                    setPhotographPreviewImage(previewImageUrl);
                  } else if (title === 'passport') {
                    setPassportPreviewImage(previewImageUrl);
                  }
                } else {
                  console.error(
                    'convertedFile is not a valid Blob or File:',
                    convertedFile
                  );
                }
              }
            }

            return acc;
          },
          {}
        );

        setInitialValues((prev) => ({
          ...prev,
          ...newValues,
        }));

        setLoading(false);
      }
    };

    fetchStudentData();
  }, [singleStudentData?.data]);

  const handleImageChange = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(fieldName, file);

      const imageUrl = URL.createObjectURL(file);

      if (fieldName === 'photograph') {
        setPhotographPreviewImage(imageUrl);
      } else if (fieldName === 'passport') {
        setPassportPreviewImage(imageUrl);
      }
    }
  };

  const handleAddSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      if (
        (values.academic_certificate.length < 1 ||
          !values.photograph ||
          !values.passport ||
          !values.offer_letter ||
          !values.medical_certificate ||
          !values.personal_bond ||
          !values.noc ||
          !values.letter_of_eligibility ||
          !values.english_language_certificate) &&
        (initialValues.academic_certificate.length < 1 ||
          !initialValues.photograph ||
          !initialValues.passport ||
          !initialValues.offer_letter ||
          !initialValues.medical_certificate ||
          !initialValues.personal_bond ||
          !initialValues.noc ||
          !initialValues.letter_of_eligibility ||
          !initialValues.english_language_certificate)
      ) {
        toast.error('All fields are required');
        return;
      } else {
        const finalData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === 'academic_certificate') {
            values?.academic_certificate.length > 0 &&
              values?.academic_certificate.map((ac) =>
                finalData.append('academic_certificate', ac)
              );
          } else {
            finalData.append(key, value);
          }
        });
        const result = await submitStudentDocument(finalData).unwrap();
        if (result?.success) {
          toast.success(result?.message);
          singleStudentRefetch();
          router.push(
            `/dashboard/student/university-management/single-university-profile/${university_id}/course/${course_id}/payment-options`
          );
        }
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Card>
        <div className="card-header">
          <h5 className="fs-20 text-secondary-alt fw-semibold mb-0">
            Required Documents
          </h5>
          <h5
            onClick={() => setStep(step - 1)}
            className="button px-4 py-2 fs-20 text-secondary-alt fw-semibold mb-0 cursor-pointer"
          >
            <i className="ri-arrow-left-double-line"></i>
            Previous
          </h5>
        </div>
        {loading ? (
          <LoaderSpiner />
        ) : (
          <CardBody>
            <div className="form-content">
              <div className="text-danger fw-semibold fs-2 mb-4">
                *All Fields Are Required
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleAddSubmit}
                validationSchema={validationSchema}
                enableReinitialize
              >
                {({ isSubmitting, setFieldValue, values }) => {
                  return (
                    <Form>
                      <Row>
                        <Col lg={12}>
                          <div className="ps-0">
                            <Row>
                              <Col md={6} xl={6}>
                                <h4 className="text-secondary-alt fs-2 mb-3">
                                  Passport Size Photograph
                                </h4>
                                <div className="mb-2 profile-img">
                                  <ImageField
                                    name="photograph"
                                    label="Upload Photograph"
                                    handleImageChange={handleImageChange}
                                    disabled={!!values.photograph}
                                  />
                                </div>
                                {photographPreviewImage && (
                                  <div className="img-preview">
                                    <Image
                                      src={photographPreviewImage || ''}
                                      alt="Sponsor Logo"
                                      width={200}
                                      height={200}
                                    />
                                  </div>
                                )}
                              </Col>
                              <Col lg={6}>
                                <h4 className="text-secondary-alt fs-2 mb-3">
                                  Passport
                                </h4>
                                <div className="mb-2 profile-img">
                                  <ImageField
                                    name="passport"
                                    label="Upload Passport Image"
                                    handleImageChange={handleImageChange}
                                    disabled={!!values.passport}
                                  />
                                </div>
                                {passportPreviewImage && (
                                  <div className="img-preview mb-3">
                                    <Image
                                      src={passportPreviewImage || ''}
                                      alt="Sponsor Logo"
                                      width={200}
                                      height={200}
                                    />
                                  </div>
                                )}
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Offer Letter'}
                                    field={{ name: 'offer_letter' }}
                                    disabled={!!values.offer_letter}
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Medical Certificate'}
                                    field={{ name: 'medical_certificate' }}
                                    disabled={!!values.medical_certificate}
                                  />
                                </div>
                              </Col>
                              <Col lg={12}>
                                <MultipleFileUpload
                                  form={{ setFieldValue, values }}
                                  label={
                                    'Academic Certificates and Transcripts'
                                  }
                                  field={{ name: 'academic_certificate' }}
                                  disabled={
                                    values.academic_certificate &&
                                    values.academic_certificate.length > 0
                                  }
                                />
                              </Col>

                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Personal Bond'}
                                    field={{ name: 'personal_bond' }}
                                    disabled={!!values.personal_bond}
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'No Objection Certificate'}
                                    field={{ name: 'noc' }}
                                    disabled={!!values.noc}
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Letter of Eligibility'}
                                    field={{ name: 'letter_of_eligibility' }}
                                    disabled={!!values.letter_of_eligibility}
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Proof of English proficiency'}
                                    field={{
                                      name: 'english_language_certificate',
                                    }}
                                    disabled={
                                      !!values.english_language_certificate
                                    }
                                  />
                                </div>
                              </Col>

                              <Col md={12} xl={12}>
                                <div className="my-4 text-center">
                                  <SubmitButton
                                    isSubmitting={isSubmitting}
                                    formSubmit={'Proceed to Payment'}
                                  >
                                    {'Proceed to Payment'}
                                  </SubmitButton>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>

              {/* <Formik
                initialValues={initialValues}
                onSubmit={handleAddSubmit}
                enableReinitialize
              >
                {({ isSubmitting, setFieldValue, values }) => {
                  return (
                    <Form>
                      <Row>
                        <Col lg={12}>
                          <div className="ps-0">
                            <Row>
                              <Col md={6} xl={6}>
                                <h4 className="text-secondary-alt fs-2 mb-3">
                                  Passport Size Photograph
                                </h4>
                                <div className="mb-2 profile-img">
                                  <ImageField
                                    name="photograph"
                                    label="Upload Photograph"
                                    handleImageChange={handleImageChange}
                                  />
                                </div>
                                {photographPreviewImage && (
                                  <div className="img-preview">
                                    <Image
                                      src={photographPreviewImage || ''}
                                      alt="Sponsor Logo"
                                      width={200}
                                      height={200}
                                    />
                                  </div>
                                )}
                              </Col>
                              <Col lg={6}>
                                <h4 className="text-secondary-alt fs-2 mb-3">
                                  Passport
                                </h4>
                                <div className="mb-2 profile-img">
                                  <ImageField
                                    name="passport"
                                    label="Upload Passport Image"
                                    handleImageChange={handleImageChange}
                                  />
                                </div>
                                {passportPreviewImage && (
                                  <div className="img-preview mb-3">
                                    <Image
                                      src={passportPreviewImage || ''}
                                      alt="Sponsor Logo"
                                      width={200}
                                      height={200}
                                    />
                                  </div>
                                )}
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Offer Letter'}
                                    field={{ name: 'offer_letter' }}
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Medical Certificate'}
                                    field={{ name: 'medical_certificate' }}
                                  />
                                </div>
                              </Col>
                              <Col lg={12}>
                                <MultipleFileUpload
                                  form={{ setFieldValue, values }}
                                  label={'Academic Certificates and Transcripts'}
                                  field={{ name: 'academic_certificate' }}
                                />
                              </Col>
  
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Personal Bond'}
                                    field={{ name: 'personal_bond' }}
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'No Objection Certificate'}
                                    field={{ name: 'noc' }}
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Letter of Eligibility'}
                                    field={{ name: 'letter_of_eligibility' }}
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <SingleFileUpload
                                    form={{ setFieldValue, values }}
                                    label={'Proof of English proficiency'}
                                    field={{
                                      name: 'english_language_certificate',
                                    }}
                                  />
                                </div>
                              </Col>
  
                              <Col md={12} xl={12}>
                                <div className="my-4 text-center">
                                  <SubmitButton
                                    isSubmitting={isSubmitting}
                                    formSubmit={'Complete'}
                                  >
                                    {'Complete'}
                                  </SubmitButton>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik> */}
            </div>
          </CardBody>
        )}
      </Card>
    </>
  );
}
