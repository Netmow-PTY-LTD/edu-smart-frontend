import SubmitButton from '@/components/common/formField/SubmitButton';
import Layout from '@/components/layout';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import MultipleImageField from '@/components/common/formField/MultipleImagesField';

const UniversitySlider = () => {
  const [initialValues, setInitialValues] = useState({
    images: [], 
  });

 const validationSchema = Yup.object({
  images: Yup.array()
    .min(1, 'At least one image is required')
    .required('Image gallery is required'),
});


  const onSubmit = (value) => {
    console.log(value);
  };
  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
        <Card className='p-4 p-md-5 '>
        <CardHeader>Added Slider  Image Here</CardHeader>
        <CardBody>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting ,setFieldValue}) => (
              <Form>
                <Row>
                 <Col>
                 <MultipleImageField form={{setFieldValue}} label={'Slider Image *'} field={{name:"images"}}/>

                 </Col>
                 
                  <Col md={12} xl={12}>
                    <div className="my-4">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        formSubmit={'formSubmit'}
                      >
                        {'Add Slider Image'}
                      </SubmitButton>
                    </div>
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

export default UniversitySlider;
