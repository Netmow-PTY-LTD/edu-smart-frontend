import CountrySelectFieldByIp from '@/components/common/formField/CountrySelectFieldByIp';
import EmailField from '@/components/common/formField/EmailField';
import ImageField from '@/components/common/formField/ImageField';
import NumberField from '@/components/common/formField/NumberField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import DataObjectComponent, { brandlogo } from '@/utils/common/data';
import axios from 'axios';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import { values } from 'pdf-lib';
import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';
import { Card, Col, Row } from 'reactstrap';

const UniversityForm = ({
  initialValues,
  validationSchema,
  handleSubmit,
  formSubmit,
  imagePreview,
  setImagePreview,
  setSsmFilePreview,
  setGovtFilePreview,
  ssmFilePreview,
  govtFilePreview,
  headTitle,
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const { allowedFileTypes } = DataObjectComponent();

  const [defaultCountry, setDefaultCountry] = useState('');

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await axios.get('https://ipwho.is/');
        if (response.data && response.data.country_code) {
          const matchedCountry = options.find(
            (country) => country.value === response.data.country_code
          );

          if (matchedCountry) {
            setDefaultCountry(matchedCountry.value);
          }
        }
      } catch (error) {
        console.error('Error fetching IP-based country:', error);
      }
    };

    fetchUserCountry();
  }, [options]);

  const updatedInitialValues = {
    ...initialValues, // Spread existing initialValues
    country: defaultCountry || initialValues.country || '', // Add or update the `country` field
  };

  const handleImageChange = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(fieldName, file);

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSsmFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
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
      if (!allowedFileTypes.includes(file.type)) {
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
    <div className="h-100">
      <div className="mb-4">
        <h1 className="text-secondary-alt fw-semibold mb-3 d-flex align-items-center gap-4">
          {headTitle}
          {headTitle === 'Add New University' ? (
            <i className="ri-school-fill text-primary fw-bold fs-1"></i>
          ) : (
            ''
          )}
        </h1>
        {headTitle === 'Add New University' ? (
          <span>Note: Star(*) marked fields are required</span>
        ) : (
          ''
        )}
      </div>
      <div className="">
        <Card className="p-4 p-md-5 add-university-card">
          <Formik
            initialValues={updatedInitialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <Row>
                  <Col lg={3}>
                    <h4>University Logo</h4>
                    <div className="mb-5 profile-img">
                      <div className="img-preview mb-3">
                        <Image
                          src={imagePreview || brandlogo}
                          alt="Brand Logo"
                          width={200}
                          height={200}
                        />
                      </div>
                      <ImageField
                        name="logo"
                        label="Upload Logo"
                        handleImageChange={handleImageChange}
                      />
                      <button
                        className="btn btn-danger w-100 mt-4 fw-semibold fs-14"
                        onClick={() => {
                          setImagePreview(null);
                          setFieldValue('logo', null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      <TextField
                        name="registration_no"
                        label="Registration No *"
                      />
                    </div>
                    <div>
                      <TextField
                        name="moe_registration_certificate_no"
                        label="MOE Registration Certification No *"
                      />
                    </div>
                    {/* <h4>SSM File Upload</h4> */}
                    {/* <div className="mb-5">
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
                    </div> */}
                    {/* <h4>Govt. File Upload</h4> */}
                    {/* <div className="mb-4">
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
                    </div> */}
                  </Col>

                  <Col lg={9}>
                    <div className="ps-0 ps-lg-5">
                      <Row>
                        <Col md={12} xl={12}>
                          <div className="">
                            <TextField name="name" label="University Name *" />
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
                              name="text"
                              label="Contact Number *"
                              inputProps={{
                                pattern: '[+0-9]*', // Only allow numbers and the '+' symbol
                                title:
                                  'Phone number can only contain numbers and +',
                                onChange: (e) => {
                                  // Replace anything other than numbers and "+" with an empty string
                                  const sanitizedValue = e.target.value.replace(
                                    /[^0-9+]/g,
                                    ''
                                  );
                                  e.target.value = sanitizedValue; // Set the sanitized value to the input field
                                },
                              }}
                            />
                          </div>
                        </Col>
                        <Col md={6} xl={6}>
                          <div className="">
                            <EmailField name="email" label="Official Email *" />
                          </div>
                        </Col>
                        <Col md={6} xl={6}>
                          <div className="">
                            {' '}
                            <TextField name="website" label="Website *" />
                          </div>
                        </Col>

                        <Col md={6} xl={6}>
                          <CountrySelectFieldByIp
                            name="country"
                            label="Country *"
                            options={options}
                            //defaultCountry={defaultCountry}
                          />
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
                              formSubmit={formSubmit}
                            >
                              {formSubmit}
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
  );
};

export default UniversityForm;
