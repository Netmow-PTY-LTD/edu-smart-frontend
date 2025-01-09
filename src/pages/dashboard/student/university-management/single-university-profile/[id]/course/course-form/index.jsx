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

export default function CourseForm({ setStep, step }) {
  const router = useRouter();
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

  console.log(initialValues);

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

  // const handleAddSubmit = async (values, { setSubmitting }) => {
  //   setSubmitting(true);

  //   try {
  //     const finalData = new FormData();
  //     Object.entries(values).forEach(([key, value]) => {
  //       if (key === 'academic_certificate') {
  //         values?.academic_certificate.length > 0 &&
  //           values?.academic_certificate.map((ac) =>
  //             finalData.append('academic_certificate', ac)
  //           );
  //       } else {
  //         finalData.append(key, value);
  //       }
  //     });
  //     const result = await submitStudentDocument(finalData).unwrap();
  //     if (result) {
  //       toast.success(result?.message);
  //       singleStudentRefetch();
  //     }
  //   } catch (error) {
  //     const errorMessage = error?.data?.message;
  //     toast.error(errorMessage);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleAddSubmit = async (values, { setSubmitting }) => {
    router.push(
      `/dashboard/student/university-management/single-university-profile/${course_id}/payment-options`
    );
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
              <Formik
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
