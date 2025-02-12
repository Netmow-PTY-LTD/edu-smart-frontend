import ImageField from '@/components/common/formField/ImageField';
import SingleImageField from '@/components/common/formField/SingleImageField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import Layout from '@/components/layout';
import { useAddBlogMutation } from '@/slice/services/super admin/superAdminBlogServices';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

export default function AddBlog() {
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    image: null,
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().required('Blog Image is required'),
  });

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0]; // get the selected file
  //   setFieldValue("image", file); // set it in Formik state
  // };

  const [addBlog] = useAddBlogMutation();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, values[key]);
        }
      });

      // Explicitly append the image field to formData
      if (values.image) {
        formData.append('image', values.image); // 'image' is the key expected by the backend
      }

      const result = await addBlog(formData).unwrap();
      if (result?.success) {
        toast.success('Blog Added Successfully');
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Layout>
      <div className="page-content">
        <h1>Add Blog</h1>
        <div className="">
          <Card className="p-4 p-md-5 add-university-card">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <Row>
                    <Col lg={12}>
                      <div>
                        <TextField name="title" label="Title" />
                      </div>
                    </Col>
                    <Col md={12} xl={12}>
                      <div className="">
                        <TextArea name="description" label="Description *" />
                      </div>
                    </Col>
                    <Col md={12} xl={12}>
                      <div className="">
                        <SingleImageField
                          form={{ setFieldValue, values }}
                          label="Upload Image"
                          field={{ name: 'image' }}
                        />
                      </div>
                    </Col>
                    <Col md={12} xl={12}>
                      <div className="my-4">
                        <SubmitButton
                          isSubmitting={isSubmitting}
                          formSubmit="formSubmit"
                        >
                          Save
                        </SubmitButton>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
