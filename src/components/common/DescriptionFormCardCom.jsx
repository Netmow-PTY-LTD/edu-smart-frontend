import { Form, Formik } from 'formik';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import SubmitButton from './formField/SubmitButton';
import TextArea from './formField/TextAreaField';

const DescriptionCardForm = ({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText,
  className,
}) => {
  return (
    <Col>
      <Card className={className}>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  {fields.map((field, index) => (
                    <Col lg={12} key={index}>
                      <TextArea name={field.name} label={field.label} />
                    </Col>
                  ))}
                  <Col md={12} xl={12}>
                    <div className="my-4">
                      <SubmitButton isSubmitting={isSubmitting}>
                        {submitButtonText}
                      </SubmitButton>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DescriptionCardForm;
