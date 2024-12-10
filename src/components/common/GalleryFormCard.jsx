import React from 'react';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import MultipleImageField from '@/components/common/formField/MultipleImagesField';
import SubmitButton from '@/components/common/formField/SubmitButton';


const GalleryFormCard = ({
  cardTitle,
  initialValues,
  validationSchema,
  onSubmit,
  buttonLabel,
  inputLabel,
}) => {
  return (
    <Col lg={9}>
    
    <Card className="p-4 p-md-5">
      <CardHeader>{cardTitle}</CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({isSubmitting, setFieldValue ,values}) => (
            <Form>
              <Row>
                <Col>
                  <MultipleImageField
                    form={{ setFieldValue ,values}}
                    label={inputLabel}
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
    </Col>
  );
};

GalleryFormCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  inputLabel:PropTypes.string.isRequired,
};

export default GalleryFormCard;
