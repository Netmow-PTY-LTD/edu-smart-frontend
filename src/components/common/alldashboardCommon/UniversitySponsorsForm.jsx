import { Formik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardHeader, Col, Form, Row } from 'reactstrap';
import ImageField from '../formField/ImageField';
import TextField from '../formField/TextField';
import TextArea from '../formField/TextAreaField';
import NumberField from '../formField/NumberField';
import EmailField from '../formField/EmailField';
import CountrySelectField from '../formField/CountrySelectField';
import SubmitButton from '../formField/SubmitButton';
import * as Yup from 'yup';

export default function UniversitySponsorsForm() {
  const [initialValues, setInitialValues] = useState({
    logo: null,
  });

  const validationSchema = Yup.object({
    logo: Yup.string().required('Logo is required'),
  });

  return (
    <div className="">
      <Card className="p-4 p-md-5 add-university-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={'onSubmit'}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Row>
                <Col lg={12}>
                  <div className="ps-0">
                    <Row>
                      <Col md={12} xl={12}>
                        <div className="">
                          <TextField name="name" label="Sponsor Name *" />
                        </div>
                      </Col>
                      <Col md={12} xl={12}>
                        <div className="">
                          <TextArea name="description" label="Description *" />
                        </div>
                      </Col>
                      <Col md={12} xl={12}>
                        <div className="">
                          {' '}
                          <TextField name="website" label="Website *" />
                        </div>
                      </Col>
                      <Col md={12} xl={12}>
                        <h4>Sponsor Logo</h4>
                        <div className="mb-5 profile-img">
                          <ImageField
                            name="logo"
                            label="Upload Logo"
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className="img-preview mb-3">
                          <Image
                            src={''}
                            alt="Brand Logo"
                            width={200}
                            height={200}
                          />
                        </div>
                      </Col>
                      <Col md={12} xl={12}>
                        <div className="my-4">
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            formSubmit={'formSubmit'}
                          >
                            {'Add Sponsor'}
                          </SubmitButton>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
