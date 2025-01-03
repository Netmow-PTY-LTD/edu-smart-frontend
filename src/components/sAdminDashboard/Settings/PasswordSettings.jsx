import PasswordField from '@/components/common/formField/PasswordField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { Form, Formik } from 'formik';
import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

const PasswordSettings = () => {
  return (
    <div className="d-flex justify-content-center">
      <Col xl={6} lg={8} md={10}>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="fs-2 fw-semibold text-primary">
              Change Password
            </CardTitle>
          </CardHeader>
          <CardBody className="p-5">
            <Formik
              initialValues={'initialValues'}
              // validationSchema={validationSchema}
              onSubmit={'handleSubmit'}
              enableReinitialize={true}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <Row>
                    <Col>
                      <PasswordField name={'password'} label={'New Password'} />
                    </Col>
                    <Col>
                      <PasswordField
                        name={'confirm_password'}
                        label={'Confirm Password'}
                      />
                    </Col>

                    <Col sm={12} className="text-center mt-3">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        formSubmit={'Save Change'}
                      />
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default PasswordSettings;
