import SubmitButton from '@/components/common/formField/SubmitButton';
import { Form, Formik } from 'formik';
import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

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

  console.log('get recent application value', getAllRecentApplicationsData);
  const recentApplicantStudentOptions =
    getAllRecentApplicationsData?.data?.map((item) => ({
      value: item?._id,
      label: `${item?.student?.first_name} ${item?.student?.last_name}- ${item?._id}`,
      student_id: item?.student?._id,
      applied_by: item?.applied_by,
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
            console.log('seleted values=>', values);
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
                            name="application_id"
                            options={recentApplicantStudentOptions}
                            onChange={(option) => {
                              setFieldValue(
                                'application_id',
                                option ? option.value : ''
                              );
                              setFieldValue(
                                'student_id',
                                option ? option.student_id : ''
                              );
                              setFieldValue(
                                'applied_by',
                                option ? option.applied_by : ''
                              );
                            }}
                            value={
                              recentApplicantStudentOptions.find(
                                (opt) => opt.value === values?.application_id
                              ) || null
                            }
                          />
                        </div>
                      </Col>
                      {values.applied_by &&
                      values.applied_by.role == 'agent' ? (
                        <Col md={12} xl={12}>
                          <Card className="shadow-sm border-0">
                            <CardBody className="d-flex  align-items-center p-4">
                              <h6 className="fw-bold fs-3 text-primary mb-0 me-2">
                                Also, retrieve the request{' '}
                                <span className="text-capitalize">
                                  {values?.applied_by?.role}
                                </span>
                              </h6>
                            </CardBody>
                          </Card>
                        </Col>
                      ) : (
                        <></>
                      )}
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
