import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import Layout from '@/components/layout';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import TextField from '@/components/common/formField/TextField';

const UniversitySocailLinks = () => {
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
        <CardHeader>Added Social Link Here</CardHeader>
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
                    <TextField
                      name={'facebook'}
                      label={'Facebook:'}
                    />
                  </Col>
                <Col lg={6}>
                    <TextField
                      name={'twitter'}
                      label={'Twitter:'}
                    />
                  </Col>
                <Col lg={6}>
                    <TextField
                      name={'instagram'}
                      label={'Instagram:'}
                    />
                  </Col>
                <Col lg={6}>
                    <TextField
                      name={'youtube'}
                      label={'Youtube:'}
                    />
                  </Col>
                 
                  <Col md={12} xl={12}>
                    <div className="my-4">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        formSubmit={'formSubmit'}
                      >
                        {'Add Social Links'}
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

export default UniversitySocailLinks;
