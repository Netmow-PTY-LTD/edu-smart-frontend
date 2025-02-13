import { Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import CheckboxField from '../common/formField/CheckBoxField';
import EmailFieldWithVerification from '../common/formField/EmailFieldWithVerification';
import PasswordField from '../common/formField/PasswordField';
import SingleSelectField from '../common/formField/SingleSelectField';
import SubmitButton from '../common/formField/SubmitButton';
import { usePathname, useSearchParams } from 'next/navigation';
import Select from 'react-select';

const InitialInfo = ({
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
  setInitialValues,
  setCheckExistingUser,
}) => {
  const roleOptions = [
    {
      label: 'Agent',
      value: 'Agent',
    },
    {
      label: 'Student',
      value: 'Student',
    },
    // {
    //   label: 'University',
    //   value: 'University',
    // },
  ];

  return (
    <>
      <div className="row justify-content-center g-0">
        <div className="col-lg-6">
          <div className={`p-lg-5 p-4 auth-one-bg h-100`}>
            <div className="bg-overlay-login"></div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="p-4 p-lg-5">
            <h5 className="fs-1 fw-semibold mb-5">Register To EduSmart</h5>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Row>
                      <Col xl={12}>
                        <div className="mb-3 ">
                          <SingleSelectField
                            name="user_role"
                            label="Select User"
                            options={roleOptions}
                            setInitialValues={setInitialValues}
                            user_role={'tuhin'}
                          />
                        </div>
                      </Col>
                      <Col xl={12}>
                        <div className="mb-3">
                          <EmailFieldWithVerification
                            name="email"
                            label="Email"
                            setCheckExistingUser={setCheckExistingUser}
                          />
                        </div>
                      </Col>

                      <Col xl={12}>
                        <PasswordField name="password" label="Password" />
                      </Col>
                      <Col xl={12}>
                        <CheckboxField
                          name="terms_and_conditions"
                          termsText={'I agree to the terms and conditions'}
                          termsLink={`/terms-service`}
                        />
                      </Col>
                    </Row>
                    <div className="hstack gap-2 justify-content-start mx-auto mt-5 mb-2">
                      <SubmitButton
                        isSubmitting={isSubmitting}
                        formSubmit={formSubmit}
                      >
                        {formSubmit}
                      </SubmitButton>
                    </div>
                  </Form>
                )}
              </Formik>
              {/* Social registration part */}

              {/* register part */}
              <div className="mt-5 fs-2 text-start">
                <p className="mb-0 fw-medium">
                  Already have an account ?
                  <Link
                    href="/auth/login"
                    className="fw-semibold text-primary text-decoration-underline ms-2"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InitialInfo;
