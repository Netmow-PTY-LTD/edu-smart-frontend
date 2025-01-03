import { Form, Formik } from 'formik';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import countryList from 'react-select-country-list';
import { ToastContainer } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import CountrySelectField from '../common/formField/CountrySelectField';
import NumberField from '../common/formField/NumberField';
import SubmitButton from '../common/formField/SubmitButton';
import TextField from '../common/formField/TextField';

const DetailsInfo = ({
  formSubmit,
  initialValues,
  agentRegistrationValidationSchema,
  handleRegistrationSubmit,
}) => {
  const dispatch = useDispatch();

  const options = useMemo(() => countryList().getData(), []);

  return (
    <>
      <div className="fs-3">
        <ToastContainer />
        <div className="m-5">
          <div>
            <h5 className="quote-color fs-22 pb-2 fw-semibold text-secondary-alt">
              Let’s fill the form to complete your registration successfully.
            </h5>
            <p className="text-danger text-bold">
              All fields are required to fill.
            </p>
          </div>

          <div className="mt-3">
            <Formik
              initialValues={initialValues}
              validationSchema={agentRegistrationValidationSchema}
              onSubmit={handleRegistrationSubmit}
              validateOnChange={true}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <Row>
                    <Col md={6}>
                      <TextField name={'first_name'} label={'First Name'} />
                    </Col>
                    <Col md={6}>
                      <TextField name={'last_name'} label={'Last Name'} />
                    </Col>

                    {values?.user_role === 'Student' ||
                    values?.user_role === 'University' ? (
                      ''
                    ) : (
                      <>
                        <Col md={6}>
                          <TextField
                            name={'subdomain'}
                            label={
                              'Subdomain Name (part of URL, cannot be changed)'
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <TextField
                            name={'organization_name'}
                            label={'Organization Name )'}
                          />
                        </Col>
                      </>
                    )}

                    <Col md={6}>
                      <CountrySelectField
                        name={'country'}
                        label={'Select Country'}
                        options={options}
                      />
                    </Col>
                    <Col md={6}>
                      <NumberField name={'phone'} label={'Phone'} />
                    </Col>
                    <Col md={4}>
                      <TextField
                        name={'address_line_1'}
                        label={'Address Line 1'}
                      />
                    </Col>
                    <Col md={4}>
                      <TextField
                        name={'address_line_2'}
                        label={'Address Line 2'}
                      />
                    </Col>

                    <Col md={4}>
                      <TextField name={'city'} label={'City'} />
                    </Col>
                    <Col md={4}>
                      <TextField name={'state'} label={'State'} />
                    </Col>
                    <Col md={4}>
                      <NumberField name={'zip'} label={'Zip Code'} />
                    </Col>
                  </Row>

                  <div className="hstack gap-2 justify-content-start mx-auto mt-5 fs-2 ">
                    <SubmitButton
                      formSubmit={formSubmit}
                      isSubmitting={isSubmitting}
                      className={'fw-semibold'}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsInfo;
