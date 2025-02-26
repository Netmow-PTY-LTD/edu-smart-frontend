import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import SubmitButton from '@/components/common/formField/SubmitButton';

import TextField from '@/components/common/formField/TextField';
import { useGetRecentApplicationsQuery } from '@/slice/services/common/applicationService';
import Select from 'react-select';

const AirTicketDocumentRequestModalFormForSuper = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
}) => {
  const {
    data: getAllRecentApplicationsData,
    error: getAllRecentApplicationsError,
    isLoading: getAllRecentApplicationsIsLoading,
    refetch: getAllRecentApplicationsRefetch,
  } = useGetRecentApplicationsQuery();

  const recentApplicantStudentOptions =
    getAllRecentApplicationsData?.data?.map((item) => ({
      value: item.student._id,
      label: `${item.student.first_name} ${item.student.last_name}- ${item._id}`,
      // label: `${item.student.first_name} ${item.student.last_name} - ${item._id}`,
      applicationId: item._id,
    })) || [];

  return (
    <Modal isOpen={isOpen} centered size="md">
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        {formHeader}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => {
            return (
              <Form>
                <Row>
                  <Col lg={12}>
                    <Row>
                      {/* Title Select Field */}
                      <Col md={12} xl={12}>
                        <div className="mb-4">
                          <label className="form-label mb-2">
                            Applicant Student *
                          </label>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable
                            isSearchable
                            placeholder="Select Applicant Student"
                            name="student_id"
                            options={recentApplicantStudentOptions}
                            onChange={(option) => {
                              setFieldValue(
                                'student_id',
                                option ? option.value : ''
                              );
                              setFieldValue(
                                'application_id',
                                option ? option.applicationId : ''
                              );
                            }}
                            value={
                              recentApplicantStudentOptions.find(
                                (opt) => opt.value === values.student_id
                              ) || null
                            }
                          />
                        </div>
                      </Col>
                      <Col md={12} xl={12}>
                        <TextField label={'Title'} name={'title'} readOnly />
                      </Col>
                      <Col md={12} xl={12}>
                        <TextField
                          as="textarea"
                          rows={4}
                          label={'Description'}
                          name={'description'}
                        />
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

export default AirTicketDocumentRequestModalFormForSuper;
