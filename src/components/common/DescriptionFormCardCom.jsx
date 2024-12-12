import React from 'react';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import TextArea from './formField/TextAreaField';
import SubmitButton from './formField/SubmitButton';

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
    <Col lg={10}>
      <Card className={className}>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  {fields.map((field, index) => (
                    <Col lg={6} key={index}>
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
