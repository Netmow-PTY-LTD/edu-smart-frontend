import SingleImageField from '@/components/common/formField/SingleImageField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import TextField from '@/components/common/formField/TextField';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import Layout from '@/components/layout';
import {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
} from '@/slice/services/public/blogs/publicBlogsServices';
import { useUpdateBlogMutation } from '@/slice/services/super admin/superAdminBlogServices';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

export default function EditBlog() {
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    image: null,
  });

  const router = useRouter();
  const { slug } = router.query;

  const { data: getSingleBlogData, refetch: singleBlogDataRefetch } =
    useGetSingleBlogQuery(slug);
  const { data: getAllBlogData, refetch: allBlogDataRefetch } =
    useGetAllBlogsQuery();
  const blogId = getSingleBlogData?.data?._id;
  const [updateBlog] = useUpdateBlogMutation();

  // Set the initial values when getSingleBlogData is fetched
  useEffect(() => {
    const fetchBlogData = async () => {
      if (getSingleBlogData?.data) {
        const imageFiles = await convertImageUrlToFile(
          getSingleBlogData?.data?.image?.url
        );

        setInitialValues({
          title: getSingleBlogData?.data?.title || '',
          description: getSingleBlogData?.data?.description || '',
          image: imageFiles || null,
        });
      }
    };
    fetchBlogData();
  }, [getSingleBlogData]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.mixed().required('Blog Image is required'),
  });

  const handleUpdateBlog = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const updatedBlogData = {
      ...values,
      id: blogId, // Pass the blogId so we know which blog to update
    };

    //console.log(updatedBlogData);

    try {
      const formData = new FormData();
      Object.keys(updatedBlogData).forEach((key) => {
        // If it's not an image, append it to formData
        if (key !== 'image') {
          formData.append(key, updatedBlogData[key]);
        }
      });

      // If there's an image, append it separately to formData
      if (values.image) {
        formData.append('image', values.image);
      }

      // Call the mutation and pass formData as the payload
      const result = await updateBlog({ id: blogId, formData }).unwrap();

      if (result) {
        toast.success(result?.message);
        allBlogDataRefetch();
        setTimeout(() => {
          router.push('/dashboard/super-admin/blog/blog-list');
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  //console.log(getSingleBlogData?.data?.image?.url);

  return (
    <Layout>
      <div className="page-content">
        <h1 className="mb-4">Edit Blog</h1>
        <ToastContainer />
        <div className="">
          <Card className="p-4 p-md-5 add-university-card">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleUpdateBlog}
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
                          label="Update Image"
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
