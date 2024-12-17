import { Field, FieldArray } from 'formik';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';

const MultipleTextField = ({
  name,
  questionPlaceholder,
  adDNewButtonText = 'Add New Entry',
  errors,
  touched,
  values,
}) => {
  return (
    <FieldArray name={name}>
      {({ insert, remove, push }) => (
        <div>
          {values[name]?.map((item, index) => (
            <Row key={index} className="align-items-center">
              <Col md={10}>
                <div className="mb-3">
                  <Field
                    name={`${name}[${index}].title`}
                    label={`${name}[${index}].title`}
                    placeholder={questionPlaceholder}
                    className={`form-control ${
                      errors[name]?.[index]?.title &&
                      touched[name]?.[index]?.title
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {errors[name]?.[index]?.title &&
                    touched[name]?.[index]?.title && (
                      <div className="invalid-feedback">
                        {errors[name][index].title}
                      </div>
                    )}
                </div>
              </Col>
              <Col md={2}>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="third-btn"
                >
                  <i class="ri-delete-bin-fill"></i>
                </Button>
              </Col>
            </Row>
          ))}
          <div className="text-center mb-4">
            <Button
              type="button"
              onClick={() => push('')}
              className="button d-flex align-items-center"
            >
              <i className="ri-add-line fw-bold fs-1"></i>
              <span>{adDNewButtonText}</span>
            </Button>
          </div>
        </div>
      )}
    </FieldArray>
  );
};

export default MultipleTextField;
