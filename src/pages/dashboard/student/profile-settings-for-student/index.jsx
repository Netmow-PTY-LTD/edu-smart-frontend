import ImageField from '@/components/common/formField/ImageField';
import TextField from '@/components/common/formField/TextField';
import Layout from '@/components/layout';
import { Formik } from 'formik';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Row,
} from 'reactstrap';
import { brandlogo } from '@/utils/common/data';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import EmailField from '@/components/common/formField/EmailField';
import CountrySelectField from '@/components/common/formField/CountrySelectField';
import NumberField from '@/components/common/formField/NumberField';
import countryList from 'react-select-country-list';
const StudentProfile = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const [initialValues, setInitialValues] = useState({
    fullName: '',
    logo: null,
  });

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    logo: Yup.mixed().required('Logo is required'),
  });

  const handleImageChange = (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(fieldName, file);

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log('formData', values);

    try {
      const finalData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        finalData.append(key, value);
      });
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  const options = useMemo(() => countryList().getData(), []);
  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card className="my-2">
            <CardHeader>
              <CardTitle tag="h5"> Profiles </CardTitle>
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
                      </Col>
                    </Row>
                    <Row>
                    <Col md={6}>
                      <TextField name={'first_name'} label={'First Name'} />
                    </Col>
                    <Col md={6}>
                      <TextField name={'last_name'} label={'Last Name'} />
                    </Col>

                    <Col md={6}>
                      <EmailField
                        name={'secondary_email'}
                        label={'Secondary Email'}
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        name={'subdomain'}
                        label={
                          'Subdomain Name (part of URL, cannot be changed)'
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <TextField
                        name={'organization_name'}
                        label={'Organization Name )'}
                      />
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
                    <Col sm={12} className="text-end">
                        <Button className="button">Save Change</Button>
                      </Col>
                  </Row>

               
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
