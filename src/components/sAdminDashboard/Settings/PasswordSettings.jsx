import PasswordField from '@/components/common/formField/PasswordField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { useChangePasswordMutation } from '@/slice/services/common/settingsService';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

const PasswordSettings = () => {
  const [initialValues, setInitialValues] = useState({
    current_password: '',
    new_password: '',
  });
  const [changePassword] = useChangePasswordMutation();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await changePassword(values).unwrap();
      if (response.data) {
        toast.success('Password changed successfully');
        resetForm();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
      // console.log(error);
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
              Change Password
            </CardTitle>
          </CardHeader>
          <CardBody className="p-5">
            <Formik
              initialValues={initialValues}
              // validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ isSubmitting, setFieldValue, values, resetForm }) => (
                <Form>
                  <Row>
                    <Col>
                      <PasswordField
                        name={'current_password'}
                        label={'Current Password'}
                      />
                    </Col>
                    <Col>
                      <PasswordField
                        name={'new_password'}
                        label={'New Password'}
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
