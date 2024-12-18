import ImageField from '@/components/common/formField/ImageField';
import MultipleFileUpload from '@/components/common/formField/MultipleFileUpload';
import SingleFileUpload from '@/components/common/formField/SingleFileUpload';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { useSubmitStudentDocumentMutation } from '@/slice/services/student/studentSubmitDocumentService';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

export default function CourseForm({ setStep, step }) {
  const [photographPreviewImage, setPhotographPreviewImage] = useState('');
  const [passportPreviewImage, setPassportPreviewImage] = useState('');
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

  const [submitStudentDocument] = useSubmitStudentDocumentMutation();

  const validationSchema = Yup.object({});

  const handleImageChange = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(fieldName, file);

      const imageUrl = URL.createObjectURL(file);

      console.log(fieldName);
      if (fieldName === 'photograph') {
        setPhotographPreviewImage(imageUrl);
      } else if (fieldName === 'passport') {
        setPassportPreviewImage(imageUrl);
      }
    }
  };

  const handleAddSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    console.log(values);

    try {
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
      if (result) {
        toast.success(result?.message);
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
            <i class="ri-arrow-left-double-line"></i>
            Previous
          </h5>
        </div>
        <CardBody>
          <div className="form-content">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleAddSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
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
                                field={{ name: 'english_language_certificate' }}
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
              )}
            </Formik>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
