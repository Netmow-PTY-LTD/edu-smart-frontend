import SubmitButton from '@/components/common/formField/SubmitButton';
import Layout from '@/components/layout';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import * as Yup from 'yup';

const UniversityTestimonials = () => {
  const [initialValues, setInitialValues] = useState({});
  const validationSchema = Yup.object({});

  const onSubmit = (e) => {};

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col md={12} xl={12}>
                    <div className="my-4">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        formSubmit={'formSubmit'}
                      >
                        {'Add Testimonals'}
                      </SubmitButton>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default UniversityTestimonials;
