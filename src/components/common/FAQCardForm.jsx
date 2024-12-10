import React from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Button, Card, CardBody, CardHeader } from 'reactstrap';

const FAQCardForm = ({
  initialValues = { faqs: [{ question: '', answer: '' }] },
  validationSchema = Yup.object().shape({
    faqs: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required('Question is required'),
        answer: Yup.string().required('Answer is required'),
      })
    ),
  }),
  onSubmit = (values) => console.log('Submitted FAQs:', values.faqs),
  questionPlaceholder = 'Enter your question here',
  answerPlaceholder = 'Provide a detailed answer',
  className
}) => {
  return (
    <Card className={className?className:''} >
      <CardHeader>Manage FAQs</CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="faqs">
                {({ insert, remove, push }) => (
                  <div>
                    {values.faqs.map((faq, index) => (
                      <Card key={index} className="mb-4">
                        <CardBody>
                          <Row className="align-items-center">
                            <Col md={10}>
                              <div className="mb-3">
                                <Field
                                  name={`faqs.${index}.question`}
                                  placeholder={questionPlaceholder}
                                  className="form-control"
                                />
                              </div>
                              <Field
                                as="textarea"
                                name={`faqs.${index}.answer`}
                                placeholder={answerPlaceholder}
                                className="form-control"
                                rows="3"
                              />
                            </Col>
                            <Col md={2}>
                              <Button
                                color="danger"
                                type="button"
                                onClick={() => remove(index)}
                                className="mt-2"
                              >
                                Delete
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ))}
                    <div className="text-center mb-4">
                      <Button
                        color="primary"
                        type="button"
                        onClick={() => push({ question: '', answer: '' })}
                      >
                        + Add Another FAQ
                      </Button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="text-center">
                <Button type="submit" color="success">
                  Submit FAQs
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default FAQCardForm;
