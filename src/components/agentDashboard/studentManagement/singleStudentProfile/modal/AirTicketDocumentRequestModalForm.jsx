import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import { useGetAllDocumentListQuery } from '@/slice/services/common/commonDocumentService';
import CreatableSelect from 'react-select/creatable';

const AirTicketDocumentRequestModalForm = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
}) => {
  const { data: documentData } = useGetAllDocumentListQuery();
  const [customDescriptions, setCustomDescriptions] = useState({});

  // Generate document options from API response
  const documentOptions =
    documentData?.data?.map((item) => ({
      value: item.title,
      label: item.title,
      description: item.description,
    })) || [];

  // Add "Select All" option at the beginning
  const options = [
    { value: 'select_all', label: 'Select All' },
    ...documentOptions,
  ];

  return (
    <Modal isOpen={isOpen} centered size="md">
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        {formHeader}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            let formattedData = [];

            if (values.titles && values.titles.length > 0) {
              formattedData = values.titles.map((titleObj) => {
                const existingDocument = documentOptions.find(
                  (doc) => doc.value === titleObj.value
                );

                return {
                  title: titleObj.value,
                  description: existingDocument
                    ? existingDocument.description
                    : customDescriptions[titleObj.value] || '',
                };
              });
            }

            onSubmit(formattedData);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => {
            const selectedValues = values.titles || [];

            return (
              <Form>
                <Row>
                  <Col lg={12}>
                    <Row>
                      {/* Title Select Field */}
                      <Col md={12} xl={12}>
                        <div className="mb-3">
                          <label className="form-label mb-2">
                            Document Title *
                          </label>
                          <CreatableSelect
                            isClearable
                            isMulti
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={selectedValues}
                            onChange={(selectedOptions) => {
                              // Check if "Select All" is chosen
                              const isSelectAllSelected = selectedOptions.some(
                                (option) => option.value === 'select_all'
                              );

                              if (isSelectAllSelected) {
                                // Select all available document options (excluding "Select All" itself)
                                setFieldValue(
                                  'titles',
                                  documentOptions.map((opt) => ({
                                    value: opt.value,
                                    label: opt.label,
                                  }))
                                );
                              } else {
                                // Otherwise, update with selected options
                                setFieldValue('titles', selectedOptions);
                              }
                            }}
                            onCreateOption={(inputValue) => {
                              const newOption = {
                                value: inputValue,
                                label: inputValue,
                              };
                              setFieldValue('titles', [
                                ...selectedValues,
                                newOption,
                              ]);

                              // Ensure a new description field appears for this new tag
                              setCustomDescriptions((prev) => ({
                                ...prev,
                                [inputValue]: '',
                              }));
                            }}
                          />
                        </div>
                      </Col>

                      {/* Show "Description" field for newly created tags */}
                      {selectedValues.map((selected) => {
                        const isNewTag = !documentOptions.some(
                          (opt) => opt.value === selected.value
                        );

                        return (
                          isNewTag && (
                            <Col md={12} xl={12} key={selected.value}>
                              <div className="mb-3">
                                <TextArea
                                  name={`customDescriptions.${selected.value}`}
                                  label={`Description for "${selected.label}" *`}
                                  value={
                                    customDescriptions[selected.value] || ''
                                  }
                                  onChange={(e) => {
                                    setCustomDescriptions((prev) => ({
                                      ...prev,
                                      [selected.value]: e.target.value,
                                    }));
                                  }}
                                />
                              </div>
                            </Col>
                          )
                        );
                      })}

                      <Col md={12} xl={12}>
                        <p>
                          <span className="text-success fw-semibold">NB:</span>{' '}
                          If you need a new document request, type it into the
                          select field.
                        </p>
                      </Col>

                      {/* Submit Button */}
                      <Col md={12} xl={12}>
                        <div className="my-4">
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            formSubmit="formSubmit"
                          >
                            {formSubmit}
                          </SubmitButton>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default AirTicketDocumentRequestModalForm;
