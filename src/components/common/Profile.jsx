import CountrySelectField from '@/components/common/formField/CountrySelectField';
import EmailField from '@/components/common/formField/EmailField';
import ImageField from '@/components/common/formField/ImageField';
import NumberField from '@/components/common/formField/NumberField';
import TextField from '@/components/common/formField/TextField';
import { brandlogo } from '@/utils/common/data';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import SubmitButton from './formField/SubmitButton';
const Profile = ({
  initialValues,
  validationSchema,
  handleSubmit,
  imagePreview,
  handleImageChange,
  setImagePreview,
  options,
}) => {
  return (
    <>
      <Card className="my-2">
        <CardHeader>
          <CardTitle className="fw-semibold">Profile Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <Row>
                  <Col lg={3}>
                    <div
                      id="profileimage"
                      className="mb-5 profile-img text-center"
                    >
                      <div className="mb-3 profile-user">
                        <Image
                          src={imagePreview || brandlogo}
                          alt="Profile Photo"
                          width={200}
                          height={200}
                          className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        />
                      </div>
                      <ImageField
                        name="profile_image"
                        label="Upload Photo"
                        handleImageChange={handleImageChange}
                      />
                      <button
                        className="btn btn-danger w-100 mt-4 fw-semibold fs-14"
                        onClick={() => {
                          setImagePreview(null);
                          setFieldValue('profile_image', null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </Col>
                  <Col lg={9}>
                    <Row>
                      <Col md={6}>
                        <TextField name={'first_name'} label={'First Name'} />
                      </Col>
                      <Col md={6}>
                        <TextField name={'last_name'} label={'Last Name'} />
                      </Col>

                      <Col md={6}>
                        <EmailField name={'email'} label={'Email'} />
                      </Col>

                      <Col md={6}>
                        <CountrySelectField
                          name={'country'}
                          label={'Select Country'}
                          options={options}
                        />
                      </Col>
                      <Col md={4}>
                        <NumberField name={'phone'} label={'Phone'} />
                      </Col>
                      <Col md={4}>
                        <TextField
                          name={'address_line_1'}
                          label={'Address Line 1'}
                        />
                      </Col>
                      <Col md={4}>
                        <TextField
                          name={'address_line_2'}
                          label={'Address Line 2'}
                        />
                      </Col>

                      <Col md={4}>
                        <TextField name={'city'} label={'City'} />
                      </Col>
                      <Col md={4}>
                        <TextField name={'state'} label={'State'} />
                      </Col>
                      <Col md={4}>
                        <NumberField name={'zip'} label={'Zip Code'} />
                      </Col>
                      <Col md={12} xl={12}>
                        <div className="my-4">
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            formSubmit={'Update'}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default Profile;
