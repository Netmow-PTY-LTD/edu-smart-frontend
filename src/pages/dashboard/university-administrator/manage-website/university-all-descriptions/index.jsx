import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import Layout from '@/components/layout';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const UniversityAllDescriptions = () => {
  const [initialValues, setInitialValues] = useState({});
  const validationSchema = Yup.object({});

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">



       <Card className='p-4 p-md-5 '>
        <CardHeader>Added All Description Here</CardHeader>
        <CardBody>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col lg={6}>
                    <TextArea
                      name={'faculty_description'}
                      label={'Faculty Description *'}
                    />
                  </Col>

                  <Col lg={6}>
                    {' '}
                    <TextArea
                      name={'gallery_description'}
                      label={'Gallery Description *'}
                    />
                  </Col>
                  <Col lg={6}>
                    <TextArea
                      name={'faq_description'}
                      label={'FAQ Description *'}
                    />
                  </Col>
                  <Col lg={6}>
                    <TextArea
                      name={'testimonial_description'}
                      label={'Testimonial Description *'}
                    />
                  </Col>

                  <Col md={12} xl={12}>
                    <div className="my-4">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        formSubmit={'formSubmit'}
                      >
                        {'Add Description'}
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

export default UniversityAllDescriptions;
