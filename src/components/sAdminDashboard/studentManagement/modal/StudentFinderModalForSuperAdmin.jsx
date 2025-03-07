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

import Select from 'react-select';
import { useGetAllStudentQuery } from '@/slice/services/public/student/publicStudentService';
const StudentFinderModalForSuperAdmin = ({
  formHeader,
  isOpen,
  onClose,

  validationSchema,
  onSubmit,
  formSubmit,
}) => {
  const { data: allStudentsData, isLoading: allStudentsIsLoading } =
    useGetAllStudentQuery();
  const allStudentDataOptions =
    allStudentsData?.data?.map((item) => ({
      value: item?._id,
      label: `${item?.first_name} ${item?.last_name}- ${item?._id.toUpperCase()}`,
      agent: item?.agent ? item?.agent : '',
    })) || [];

  return (
    <Modal isOpen={isOpen} centered size="md">
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        {formHeader}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{ student_id: '' }}
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
                            Find And Select Student *
                          </label>

                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable
                            isSearchable
                            placeholder="Select Student"
                            name="student_id"
                            options={allStudentDataOptions}
                            onChange={(option) => {
                              setFieldValue(
                                'student_id',
                                option ? option.value : ''
                              );
                              setFieldValue(
                                'agent',
                                option ? option.agent : ''
                              );
                            }}
                            value={
                              allStudentDataOptions?.find(
                                (opt) => opt.value === values?.student_id
                              ) || null
                            }
                          />
                        </div>
                      </Col>

                      {values.agent && values.agent.role == 'agent' ? (
                        <Col md={12} xl={12}>
                          <Card className="shadow-sm border-0">
                            <CardBody className="d-flex  align-items-center p-4">
                              <h6 className="fw-bold fs-3 text-primary mb-0 me-2">
                                Also, retrieve the request{' '}
                                <span className="text-capitalize">
                                  {values?.agent?.role}
                                </span>
                              </h6>
                            </CardBody>
                          </Card>
                        </Col>
                      ) : (
                        <></>
                      )}

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

export default StudentFinderModalForSuperAdmin;
