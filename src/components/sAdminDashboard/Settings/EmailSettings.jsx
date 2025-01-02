import EmailField from '@/components/common/formField/EmailField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import OtpComponent from '@/components/common/OtpComponent';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

const EmailSettings = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const { data: userInfodata, refetch: userInfoRefetch } =
    useGetUserInfoQuery();

  const [initialValues, setInitialValues] = useState({
    email: '',
  });

  useEffect(() => {
    if (step === 1) {
      setInitialValues({
        email: userInfodata?.data?.email,
      });
    }
  }, [step, userInfodata]);

  const validationSchema = Yup.object({});

  const handleSubmit = async (values, { setSubmitting }) => {
    // setSubmitting(true);
    try {
      {
        step === 1 && setStep(step + 1);
        setInitialValues({
          email: '',
        });
      }

      {
        step === 2 && setStep(step + 1);
      }

      {
        step === 3 && setStep(step + 1);
      }

      console.log(values);
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      // setSubmitting(false);
    }
  };

  const handlePaste = (e, index) => {
    const inputElements = document.querySelectorAll('input.code-input');
    const data = e.clipboardData.getData('Text').split('').slice(0, 6);
    const newData = [...data, '', '', '', '', ''].slice(0, 6);
    setOtp((prevValues) => {
      const newValues = [...prevValues];
      newValues.splice(index, newData.length, ...newData);
      return newValues.slice(0, 6);
    });

    if (index < otp.length - 1) {
      inputElements[index + 1].focus();
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
                    {step === 1 && (
                      <Col>
                        <EmailField
                          name={'email'}
                          label={'Current Email'}
                          disabled={true}
                        />
                      </Col>
                    )}
                    {step === 2 && (
                      <Col>
                        <h2 className="text-center text-primary">Enter OTP</h2>
                        <OtpComponent
                          otp={otp}
                          handlePaste={handlePaste}
                          isLoading={'isLoading'}
                          handleSubmit={handleSubmit}
                          setOtp={setOtp}
                        />
                      </Col>
                    )}
                    {step === 3 && (
                      <Col>
                        <EmailField
                          name={'email'}
                          label={'Change Email'}
                          disabled={false}
                        />
                      </Col>
                    )}

                    <Col sm={12} className="text-center mt-3">
                      {step === 1 && (
                        <SubmitButton
                          isSubmitting={isSubmitting}
                          formSubmit={'Next'}
                        />
                      )}

                      {step === 2 && (
                        <>
                          <button
                            className="button px-3 py-2 me-3 fw-semibold"
                            onClick={() => setStep(step - 1)}
                          >
                            <p>Previous</p>
                          </button>
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            formSubmit={'Verify OTP'}
                          />
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <button
                            className="button px-3 py-2 me-3 fw-semibold"
                            onClick={() => setStep(step - 1)}
                          >
                            <p>Previous</p>
                          </button>
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            formSubmit={'Change Email'}
                          />
                        </>
                      )}
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
