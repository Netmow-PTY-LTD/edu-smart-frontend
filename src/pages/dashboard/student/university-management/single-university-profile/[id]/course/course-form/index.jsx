import ProfileBgCover from '@/components/common/alldashboardCommon/ProfileBgCover';
import ImageField from '@/components/common/formField/ImageField';
import MultipleFileUpload from '@/components/common/formField/MultipleFileUpload';
import MultipleImageField from '@/components/common/formField/MultipleImagesField';
import SingleFileUpload from '@/components/common/formField/SingleFileUpload';
import SingleImageField from '@/components/common/formField/SingleImageField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import Layout from '@/components/layout';
import { Formik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Form, Row } from 'reactstrap';
import * as Yup from 'yup';

export default function CourseForm() {
  const [previewImage, setPreviewImage] = useState('');
  const [initialValues, setInitialValues] = useState({
    name: '',
    link: '',
    start_date: '',
    end_date: '',
    logo: '',
  });

  const handleImageChange = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(fieldName, file);

      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const validationSchema = Yup.object({});
  return (
    <Layout>
      <div className="page-content">
        <ProfileBgCover profileData={''} />
        <Card>
          <div className="card-header">
            <h5 className="fs-20 text-secondary-alt fw-semibold mb-0">
              Required Documents
            </h5>
          </div>
          <CardBody>
            <div className="form-content">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
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
                              <div className="mb-5 profile-img">
                                <ImageField
                                  name="logo"
                                  label="Upload Photo"
                                  handleImageChange={handleImageChange}
                                />
                              </div>
                              {previewImage && (
                                <div className="img-preview">
                                  <Image
                                    src={previewImage || ''}
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
                              <div className="profile-img">
                                <ImageField
                                  name="logo"
                                  label="Upload Passport Image"
                                  handleImageChange={handleImageChange}
                                />
                              </div>
                              {previewImage && (
                                <div className="img-preview mb-3">
                                  <Image
                                    src={previewImage || ''}
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
                                  field={{ name: 'offer-letter' }}
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <SingleFileUpload
                                  form={{ setFieldValue, values }}
                                  label={'Medical Certificate'}
                                  field={{ name: 'medical-certificate' }}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <MultipleFileUpload
                                form={{ setFieldValue, values }}
                                label={'Academic Certificates and Transcripts'}
                                field={{ name: 'certificates' }}
                              />
                            </Col>

                            <Col lg={6}>
                              <div className="mb-3">
                                <SingleFileUpload
                                  form={{ setFieldValue, values }}
                                  label={'No Objection Certificate'}
                                  field={{ name: 'no-objection-certificate' }}
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mb-3">
                                <SingleFileUpload
                                  form={{ setFieldValue, values }}
                                  label={'Letter of Eligibility'}
                                  field={{ name: 'letter-of-eligibility' }}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <SingleFileUpload
                                  form={{ setFieldValue, values }}
                                  label={'Proof of English proficiency'}
                                  field={{ name: 'english-proficiency' }}
                                />
                              </div>
                            </Col>
                            <Col lg={12}>
                              <MultipleFileUpload
                                form={{ setFieldValue, values }}
                                label={'Additional Documents'}
                                field={{ name: 'additional-documents' }}
                              />
                            </Col>

                            <Col md={12} xl={12}>
                              <div className="my-4 text-center">
                                <SubmitButton
                                  isSubmitting={isSubmitting}
                                  formSubmit="formSubmit"
                                >
                                  Complete
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
      </div>
    </Layout>
  );
}
