import ImageField from '@/components/common/formField/ImageField';
import TextField from '@/components/common/formField/TextField';
import Layout from '@/components/layout';
import { Formik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
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

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Card className="my-2">
            <CardHeader>
              <CardTitle tag="h5"> Profile Settings</CardTitle>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                      <Col sm={12} md={6} xl={6}>
                        <TextField label={'Full Name'} name={'fullName'} />
                      </Col>
                      <Col sm={12} md={6} xl={6}>
                        <TextField
                          label={'Emaill Address'}
                          name={'emailAddress'}
                        />
                      </Col>
                      <Col sm={12} md={6} xl={6}>
                        <TextField label={'Password'} name={'password'} />
                      </Col>
                      <Col sm={12} md={6} xl={6}>
                        <TextField
                          label={'Change Password'}
                          name={'changePassword'}
                        />
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
