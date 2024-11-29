import CountrySelectField from '@/components/common/formField/CountrySelectField';
import EmailField from '@/components/common/formField/EmailField';
import ImageField from '@/components/common/formField/ImageField';
import NumberField from '@/components/common/formField/NumberField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import Layout from '@/components/layout';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import brandLogo from '/public/edusmart-Final-Logo-Final-Logo.png';

const AddUniversityFromSuperAdmin = ({
  imagePreview,
  setImagePreview,
  options,
}) => {
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <div className="h-100">
            <div>
              <h1>Add New University</h1>
              <span>Note:Star(*)marked fields are required</span>
            </div>
            <div className="">
              <Card className="p-5">
                <Formik
                  initialValues={'initialValues'}
                  validationSchema={'validationSchema'}
                  onSubmit={'onSubmit'}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Row>
                        <Col md={4} xl={4}>
                          <Row>
                            <Col md={3} xl={3}>
                              <div className="mb-3">
                                <ImageField
                                  name="logo"
                                  label="Logo"
                                  imagePreview={imagePreview}
                                  setImagePreview={setImagePreview}
                                />
                              </div>
                            </Col>
                            <Col md={3} xl={3}>
                              {' '}
                              <div className="mb-3">
                                <ImageField
                                  name="logo"
                                  label="Logo"
                                  imagePreview={imagePreview}
                                  setImagePreview={setImagePreview}
                                />
                              </div>
                            </Col>
                            <Col md={3} xl={3}>
                              {' '}
                              <div className="mb-3">
                                <ImageField
                                  name="logo"
                                  label="Logo"
                                  imagePreview={imagePreview}
                                  setImagePreview={setImagePreview}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Col>

                        <Col md={8} xl={8}>
                          <Row>
                            <Col md={12} xl={12}>
                              <div className="mb-3">
                                <TextField
                                  name="name"
                                  label="University Name"
                                />
                              </div>
                            </Col>
                            <Col md={12} xl={12}>
                              <div className="mb-3">
                                <Col xl={6}>
                                  <TextArea
                                    name="description"
                                    label="Description"
                                  />
                                </Col>
                              </div>
                            </Col>
                            <Col md={6} xl={6}>
                              <div className="mb-3">
                                {' '}
                                <TextField
                                  name="address_line_1"
                                  label="Address Line 1 "
                                />
                              </div>
                            </Col>
                            <Col md={6} xl={6}>
                              <div className="mb-3">
                                {' '}
                                <TextField
                                  name="address_line_2"
                                  label="Address Line 2 "
                                />
                              </div>
                            </Col>
                            <Col md={6} xl={6}>
                              <div className="mb-3">
                                {' '}
                                <NumberField
                                  name="contact_number"
                                  label="Contact Number"
                                />
                              </div>
                            </Col>
                            <Col md={6} xl={6}>
                              <div className="mb-3">
                                <EmailField
                                  name="email"
                                  label="Official Email"
                                />
                              </div>
                            </Col>
                            <Col md={6} xl={6}>
                              <div className="mb-3">
                                {' '}
                                <TextField name="website" label="Website" />
                              </div>
                            </Col>
                            <Col md={6} xl={6}>
                              <div className="mb-3">
                                <CountrySelectField
                                  name="country"
                                  label="Country"
                                  options={options}
                                />
                              </div>
                            </Col>
                            <Col md={4} xl={3}>
                              <div className="mb-3">
                                <TextField name="city" label="City " />
                              </div>
                            </Col>
                            <Col md={4} xl={3}>
                              <div className="mb-3">
                                <TextField name="state" label="State " />
                              </div>
                            </Col>
                            <Col md={4} xl={3}>
                              {' '}
                              <div className="mb-3">
                                <NumberField name="zip" label="Zip Code" />
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <div className="my-5">
                        <SubmitButton
                          isSubmitting={isSubmitting}
                          formSubmit={'formSubmit'}
                        >
                          {'formSubmit'}
                        </SubmitButton>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card>
            </div>

            <Card>
              <h2>Copyright All Rights Reserved © 2022 </h2>
              <Image src={brandLogo} alt="" className="" />
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddUniversityFromSuperAdmin;
