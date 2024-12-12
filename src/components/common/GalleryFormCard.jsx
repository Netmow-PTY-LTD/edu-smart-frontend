import MultipleImageField from '@/components/common/formField/MultipleImagesField';
import SubmitButton from '@/components/common/formField/SubmitButton';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import TextArea from './formField/TextAreaField';

const GalleryFormCard = ({
  cardTitle,
  initialValues,
  validationSchema,
  onSubmit,
  buttonLabel,
  className,
}) => {
  return (
    <Card className={className}>
      <CardHeader>{cardTitle}</CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <Row>
                <Col md={12} xl={12}>
                  <TextArea label={'Description'} name={'description'} />
                </Col>
                <Col>
                  <MultipleImageField
                    form={{ setFieldValue, values }}
                    label={'Upload Image'}
                    field={{ name: 'images' }}
                  />
                </Col>

                <Col md={12} xl={12}>
                  <div className="my-4">
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      formSubmit="formSubmit"
                    >
                      {buttonLabel}
                    </SubmitButton>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

GalleryFormCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default GalleryFormCard;
