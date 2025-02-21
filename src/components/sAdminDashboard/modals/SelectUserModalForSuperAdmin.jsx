import CountrySelectField from '@/components/common/formField/CountrySelectField';
import EmailField from '@/components/common/formField/EmailField';
import ImageField from '@/components/common/formField/ImageField';
import NumberField from '@/components/common/formField/NumberField';
import PasswordField from '@/components/common/formField/PasswordField';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextField from '@/components/common/formField/TextField';
import { brandlogo } from '@/utils/common/data';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useMemo } from 'react';
import countryList from 'react-select-country-list';
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

const SelectUserModalForSuperAdmin = ({
  initialValues,
  setInitialValues,
  validationSchema,
  handleSubmit,
  setImagePreview,
  submitBtn,
  openModal,
  closeModal,
  modalTitle,
  imagePreview,
}) => {
  const options = useMemo(() => countryList().getData(), []);

  const roleOptions = [
    {
      label: 'Admission Manager',
      value: 'admission_manager',
    },
    {
      label: 'Accountant',
      value: 'accountant',
    },
  ];

  const handleImageChange = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    // console.log(file);
    console.log(file);
    if (file) {
      setFieldValue(fieldName, file);

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };
  return (
    <Modal isOpen={openModal} toggle={() => closeModal()} centered size="xl">
      <ModalHeader toggle={() => closeModal()}>{modalTitle}</ModalHeader>
      <ModalBody>
        <div className="">
          <Card className="p-4 p-md-5 add-university-card">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ isSubmitting, setFieldValue, resetForm }) => (
                <Form>
                  <Row>
                    <Col lg={3}>
                      <h4>Profile Photo</h4>
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
                          name="image"
                          label="Upload Photo"
                          handleImageChange={handleImageChange}
                        />
                        <button
                          className="btn btn-danger w-100 mt-4 fw-semibold fs-14"
                          onClick={() => {
                            setImagePreview(null);
                            setFieldValue('image', null);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </Col>

                    <Col lg={9}>
                      <div className="ps-0 ps-lg-5">
                        <Row>
                          <Col md={6} xl={6}>
                            <div className="">
                              <TextField
                                name={'first_name'}
                                label={'First Name'}
                              />
                            </div>
                          </Col>
                          <Col md={6} xl={6}>
                            <div className="">
                              <TextField
                                name={'last_name'}
                                label={'Last Name'}
                              />
                            </div>
                          </Col>
                          <Col md={6} xl={6}>
                            <div className="">
                              <EmailField name="email" label="Email" />
                            </div>
                          </Col>
                          <Col md={6} xl={6}>
                            <div className="">
                              <NumberField
                                name="phone"
                                label="Contact Number"
                              />
                            </div>
                          </Col>
                          <Col md={6} xl={6}>
                            <div className="">
                              <PasswordField name="password" label="Password" />
                            </div>
                          </Col>
                          <Col md={6} xl={6}>
                            <div className="">
                              <PasswordField
                                name="confirm_password"
                                label="Confirm Password"
                              />
                            </div>
                          </Col>
                          <Col md={6} xl={6}>
                            <div className="">
                              <TextField name="address" label="Address" />
                            </div>
                          </Col>
                          <Col md={6} xl={6}>
                            <div className="mb-3 ">
                              <SingleSelectField
                                name="select_role"
                                label="Select Role"
                                options={roleOptions}
                              />
                            </div>
                          </Col>

                          <Col md={4} xl={6}>
                            <div className="">
                              <TextField name="city" label="City" />
                            </div>
                          </Col>
                          <Col md={4} xl={6}>
                            <div className="">
                              <TextField name="state" label="State" />
                            </div>
                          </Col>
                          <Col md={4} xl={6}>
                            <div className="">
                              <NumberField name="zip" label="Zip Code" />
                            </div>
                          </Col>
                          <Col md={6} xl={6}>
                            <div className="">
                              <CountrySelectField
                                name="country"
                                label="Country"
                                options={options}
                              />
                            </div>
                          </Col>
                          <Col md={12} xl={12}>
                            <div className="my-4">
                              <SubmitButton
                                isSubmitting={isSubmitting}
                                formSubmit={submitBtn}
                              >
                                {submitBtn}
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
          </Card>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SelectUserModalForSuperAdmin;
