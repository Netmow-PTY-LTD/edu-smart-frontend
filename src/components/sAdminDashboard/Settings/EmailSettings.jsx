import EmailField from '@/components/common/formField/EmailField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import OtpComponent from '@/components/common/OtpComponent';
import { useChangeEmailMutation } from '@/slice/services/common/settingsService';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useGenerateOtpMutation,
  useVerifyOtpMutation,
} from '@/slice/services/public/auth/authService';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import * as Yup from 'yup';

const EmailSettings = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const { data: userInfodata, refetch: userInfoRefetch } =
    useGetUserInfoQuery();

  const [generateOtp, { isLoading: generateOtpIsloading }] =
    useGenerateOtpMutation();

  const [verifyOtp] = useVerifyOtpMutation();

  const [changeEmail] = useChangeEmailMutation();

  const [initialValues, setInitialValues] = useState({
    current_email: '',
    new_email: '',
    otp: '',
  });

  useEffect(() => {
    if (step === 1) {
      setInitialValues({
        current_email: userInfodata?.data?.email,
      });
    }
  }, [step, userInfodata]);

  useEffect(() => {
    if (step === 2) {
      const inputElements = document.querySelectorAll('input.code-input');

      const handleKeyDown = (e, index) => {
        if (e.keyCode === 8 && e.target.value === '' && index > 0) {
          const newIndex = Math.max(0, index - 1);
          inputElements[newIndex].focus();
          setOtp((prevValues) => {
            const newValues = [...prevValues];
            newValues[newIndex] = '';
            return newValues;
          });
        }
      };

      const handleInput = (e, index) => {
        const newValue = e.target.value;
        const [first, ...rest] = newValue;

        setOtp((prevValues) => {
          const newValues = [...prevValues];
          newValues[index] = first ?? '';
          return newValues;
        });

        if (first !== undefined && index < otp.length - 1) {
          inputElements[index + 1].focus();
        }
      };

      inputElements.forEach((ele, index) => {
        ele.addEventListener('keydown', (e) => handleKeyDown(e, index));
        ele.addEventListener('input', (e) => handleInput(e, index));
      });

      return () => {
        inputElements.forEach((ele, index) => {
          ele.removeEventListener('keydown', (e) => handleKeyDown(e, index));
          ele.removeEventListener('input', (e) => handleInput(e, index));
        });
      };
    }
  }, [otp.length, step]);

  const validationSchema = Yup.object({});

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      {
        if (step === 1) {
          const response = await generateOtp({
            email: values.current_email,
          }).unwrap();
          if (response?.success) {
            toast.success('OTP sent successfully');
            setStep(step + 1);
          }
        }
      }

      {
        if (step === 2) {
          const response = await verifyOtp({
            email: values.current_email,
            otp: otp.join(''),
          }).unwrap();
          if (response?.success) {
            toast.success(response?.message);
            setOtp(['', '', '', '', '', '']);
            setStep(step + 1);
          }
        }
      }

      {
        if (step === 3) {
          const response = await changeEmail({
            current_email: initialValues.current_email,
            new_email: values.new_email,
          }).unwrap();
          if (response?.success) {
            userInfoRefetch();
            toast.success('Email changed successfully');
            setStep(1);
          }
        }
      }

      // console.log(values);
    } catch (error) {
      toast.error('Error during form submission');
      console.error('Error during form submission:', error);
    } finally {
      setSubmitting(false);
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
                          name={'current_email'}
                          label={'Current Email'}
                          disabled={true}
                        />
                      </Col>
                    )}
                    {step === 2 && (
                      <Col>
                        <h2 className="text-center text-primary">Enter OTP</h2>
                        <h4 className="text-center text-primary">
                          We have send and OTP to your current email. Please
                          check your inbox and verify.{' '}
                        </h4>
                        <OtpComponent
                          otp={otp}
                          handlePaste={handlePaste}
                          isLoading={generateOtpIsloading}
                          handleSubmit={handleSubmit}
                          setOtp={setOtp}
                          showBtn={false}
                        />
                      </Col>
                    )}
                    {step === 3 && (
                      <Col>
                        <EmailField
                          name={'new_email'}
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
