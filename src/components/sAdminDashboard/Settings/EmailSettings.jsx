import EmailField from '@/components/common/formField/EmailField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

const EmailSettings = () => {
  const [step, setStep] = useState(1);

  const { data: userInfodata } = useGetUserInfoQuery();

  const [initialValues, setInitialValues] = useState({
    email: userInfodata?.data?.email,
  });

  const validationSchema = Yup.object({});

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      console.log(values);
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Col xl={6} lg={8} md={10}>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle className="fs-2 fw-semibold text-primary">
              Change Email
            </CardTitle>
          </CardHeader>
          <CardBody className="p-5">
            <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <Row>
                    <Col>
                      <EmailField
                        name={'email'}
                        label={'Current Email'}
                        disabled={true}
                      />
                    </Col>

                    <Col sm={12} className="text-center mt-3">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        formSubmit="Next"
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

export default EmailSettings;
