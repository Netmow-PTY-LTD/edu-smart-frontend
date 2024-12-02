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
import React, { useState } from 'react';
import { Card, Col, Row } from 'reactstrap';
import brandLogo from '/public/edusmart-Final-Logo-Final-Logo.png';
import FileUpload from '@/components/common/formField/FileUpload';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';

const AddUniversityFromSuperAdmin = ({ options }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [ssmFilePreview, setSsmFilePreview] = useState(null);
  const [govtFilePreview, setGovtFilePreview] = useState(null);

  const [initialValues, setInitialValues] = useState({
    logo: null,
  });

  const validationSchema = Yup.object({
    logo: Yup.string().required('Logo is required'),
  });

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(file);

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  const handleSsmFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          'Invalid file type. Only PDF, DOCX, DOC, or Excel files are allowed.'
        );
        return;
      }

      setFieldValue('ssm_file_upload', file);
      setSsmFilePreview(file.name);
    }
  };

  const handleGovtFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          'Invalid file type. Only PDF, DOCX, DOC, or Excel files are allowed.'
        );
        return;
      }

      setFieldValue('govt_file_upload', file);
      setGovtFilePreview(file.name);
    }
  };

  return (
    <Layout>
      <div className="page-content">
        <ToastContainer />
        <div className="container-fluid">
          <div className="h-100">
            <div className="mb-4">
              <h1 className="text-secondary-alt fw-semibold mb-3 d-flex align-items-center gap-4">
                Add New University
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="34"
                  viewBox="0 0 33 34"
                  fill="none"
                >
                  <path
                    d="M31.1132 30.601V15.2371C31.1132 14.4352 30.4633 13.7852 29.6614 13.7852H22.7669V9.60494C22.7669 9.21011 22.5529 8.84623 22.2083 8.65396L16.6102 5.53198C16.5794 5.51473 16.5475 5.4996 16.5155 5.48566V3.70405H19.53C19.7705 3.70405 19.9655 3.50898 19.9655 3.26843V1.06811C19.9655 0.827562 19.7705 0.632487 19.53 0.632487H16.5155V0.435626C16.5155 0.195075 16.3206 0 16.0799 0C15.8393 0 15.6444 0.195075 15.6444 0.435626V5.48566C15.6123 5.49968 15.5805 5.51481 15.5495 5.53198L9.9514 8.65404C9.60647 8.84623 9.39269 9.2102 9.39269 9.60502V13.7852H2.49799C1.69609 13.7852 1.04618 14.4352 1.04618 15.2371V30.6009C0.429336 30.8801 0 31.5005 0 32.2214C0 33.2038 0.796282 34 1.77854 34H30.3808C31.363 34 32.1593 33.2038 32.1593 32.2214C32.1592 31.5005 31.73 30.8801 31.1132 30.601ZM25.5012 18.8459C25.5012 18.3788 25.8798 18.0002 26.3473 18.0002H27.9287C28.3957 18.0002 28.7744 18.3788 28.7744 18.8459V20.4275C28.7744 20.8946 28.3957 21.2733 27.9287 21.2733H26.3473C25.8799 21.2733 25.5013 20.8946 25.5013 20.4275V18.8459H25.5012ZM25.5012 23.9276C25.5012 23.4605 25.8798 23.0818 26.3473 23.0818H27.9287C28.3957 23.0818 28.7744 23.4605 28.7744 23.9276V25.509C28.7744 25.9761 28.3957 26.3547 27.9287 26.3547H26.3473C25.8799 26.3547 25.5013 25.9761 25.5013 25.509V23.9276H25.5012ZM20.4198 18.8459C20.4198 18.3788 20.7983 18.0002 21.2654 18.0002H22.847C23.3138 18.0002 23.6926 18.3788 23.6926 18.8459V20.4275C23.6926 20.8946 23.3138 21.2733 22.847 21.2733H21.2654C20.7983 21.2733 20.4198 20.8946 20.4198 20.4275V18.8459ZM20.4198 23.9276C20.4198 23.4605 20.7983 23.0818 21.2654 23.0818H22.847C23.3138 23.0818 23.6926 23.4605 23.6926 23.9276V25.509C23.6926 25.9761 23.3138 26.3547 22.847 26.3547H21.2654C20.7983 26.3547 20.4198 25.9761 20.4198 25.509V23.9276ZM16.0797 9.60834C17.4028 9.60834 18.4754 10.6809 18.4754 12.004C18.4754 13.3271 17.4029 14.3995 16.0797 14.3995C14.7565 14.3995 13.684 13.327 13.684 12.0039C13.684 10.6808 14.7565 9.60834 16.0797 9.60834ZM13.6807 23.3611C13.6807 22.894 14.0593 22.5154 14.5267 22.5154H17.6327C18.0999 22.5154 18.4785 22.894 18.4785 23.3611V30.0243C18.4785 30.1768 18.4377 30.3197 18.3669 30.4433H13.7927C13.7219 30.3197 13.681 30.1768 13.681 30.0243L13.6807 23.3611ZM8.46653 18.8459C8.46653 18.3788 8.84512 18.0002 9.3122 18.0002H10.8937C11.3608 18.0002 11.7394 18.3788 11.7394 18.8459V20.4275C11.7394 20.8946 11.3608 21.2733 10.8937 21.2733H9.3122C8.84512 21.2733 8.46653 20.8946 8.46653 20.4275V18.8459ZM8.46653 23.9276C8.46653 23.4605 8.84512 23.0818 9.3122 23.0818H10.8937C11.3608 23.0818 11.7394 23.4605 11.7394 23.9276V25.509C11.7394 25.9761 11.3608 26.3547 10.8937 26.3547H9.3122C8.84512 26.3547 8.46653 25.9761 8.46653 25.509V23.9276ZM3.38462 18.8459C3.38462 18.3788 3.76321 18.0002 4.23055 18.0002H5.81189C6.27914 18.0002 6.65781 18.3788 6.65781 18.8459V20.4275C6.65781 20.8946 6.27914 21.2733 5.81189 21.2733H4.23063C3.7633 21.2733 3.38471 20.8946 3.38471 20.4275L3.38462 18.8459ZM3.38462 23.9276C3.38462 23.4605 3.76321 23.0818 4.23055 23.0818H5.81189C6.27914 23.0818 6.65781 23.4605 6.65781 23.9276V25.509C6.65781 25.9761 6.27914 26.3547 5.81189 26.3547H4.23063C3.7633 26.3547 3.38471 25.9761 3.38471 25.509L3.38462 23.9276Z"
                    fill="var(--color--secondary)"
                  />
                </svg>
              </h1>
              <span>Note: Star(*) marked fields are required</span>
            </div>
            <div className="">
              <Card className="p-4 p-md-5 add-university-card">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={'onSubmit'}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
                      <Row>
                        <Col lg={3}>
                          <h4>University Logo</h4>
                          <div className="mb-5 profile-img">
                            <div className="img-preview mb-3">
                              <Image
                                src={imagePreview || brandLogo}
                                alt="Brand Logo"
                                width={200}
                                height={200}
                              />
                            </div>
                            <ImageField
                              name="logo"
                              label="Upload Logo"
                              setImagePreview={setImagePreview}
                              setFieldValue={setFieldValue}
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
                          <h4>SSM File Upload</h4>
                          <div className="mb-5">
                            {ssmFilePreview && (
                              <div className="file-preview mb-3">
                                <p>{ssmFilePreview}</p>
                              </div>
                            )}
                            <FileUpload
                              name="ssm_file_upload"
                              label="Upload SSM File"
                              handleFileChange={handleSsmFileChange}
                            />
                          </div>
                          <h4>Govt. File Upload</h4>
                          <div className="mb-4">
                            {govtFilePreview && (
                              <div className="file-preview mb-3">
                                <p>{govtFilePreview}</p>
                              </div>
                            )}
                            <FileUpload
                              name="govt_file_upload"
                              label="Upload Govt. File"
                              handleFileChange={handleGovtFileChange}
                            />
                          </div>
                        </Col>

                        <Col lg={9}>
                          <div className="ps-0 ps-lg-5">
                            <Row>
                              <Col md={12} xl={12}>
                                <div className="">
                                  <TextField
                                    name="name"
                                    label="University Name *"
                                  />
                                </div>
                              </Col>
                              <Col md={12} xl={12}>
                                <div className="">
                                  <TextArea
                                    name="description"
                                    label="Description *"
                                  />
                                </div>
                              </Col>
                              <Col md={6} xl={6}>
                                <div className="">
                                  {' '}
                                  <TextField
                                    name="address_line_1"
                                    label="Address Line 1 *"
                                  />
                                </div>
                              </Col>
                              <Col md={6} xl={6}>
                                <div className="">
                                  {' '}
                                  <TextField
                                    name="address_line_2"
                                    label="Address Line 2 "
                                  />
                                </div>
                              </Col>
                              <Col md={6} xl={6}>
                                <div className="">
                                  {' '}
                                  <NumberField
                                    name="contact_number"
                                    label="Contact Number *"
                                  />
                                </div>
                              </Col>
                              <Col md={6} xl={6}>
                                <div className="">
                                  <EmailField
                                    name="email"
                                    label="Official Email *"
                                  />
                                </div>
                              </Col>
                              <Col md={6} xl={6}>
                                <div className="">
                                  {' '}
                                  <TextField name="website" label="Website *" />
                                </div>
                              </Col>
                              <Col md={6} xl={6}>
                                <div className="">
                                  <CountrySelectField
                                    name="country"
                                    label="Country *"
                                    options={options}
                                  />
                                </div>
                              </Col>
                              <Col md={4} xl={4}>
                                <div className="">
                                  <TextField name="city" label="City *" />
                                </div>
                              </Col>
                              <Col md={4} xl={4}>
                                <div className="">
                                  <TextField name="state" label="State *" />
                                </div>
                              </Col>
                              <Col md={4} xl={4}>
                                {' '}
                                <div className="">
                                  <NumberField name="zip" label="Zip Code *" />
                                </div>
                              </Col>
                              <Col md={12} xl={12}>
                                <div className="my-4">
                                  <SubmitButton
                                    isSubmitting={isSubmitting}
                                    formSubmit={'formSubmit'}
                                  >
                                    {'Add University'}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddUniversityFromSuperAdmin;
