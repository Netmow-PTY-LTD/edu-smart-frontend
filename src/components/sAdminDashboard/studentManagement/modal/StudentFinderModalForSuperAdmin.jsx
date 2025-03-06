import SubmitButton from '@/components/common/formField/SubmitButton';
import { Form, Formik } from 'formik';
import React from 'react';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';

import Select from 'react-select';
import { useGetAllUserDocRequestQuery } from '@/slice/services/common/commonDocumentService';
const StudentFinderModalForSuperAdmin = ({
  formHeader,
  isOpen,
  onClose,

  validationSchema,
  onSubmit,
  formSubmit,
}) => {
  const {
    data: allDocumentRequestForSuperAdminData,
    error: allDocumentRequestForSuperAdminError,
    isLoading: allDocumentRequestForSuperAdminIsLoading,
    refetch: allDocumentRequestForSuperAdminRefetch,
  } = useGetAllUserDocRequestQuery();

  const requstedStudentDataOptions =
    allDocumentRequestForSuperAdminData?.data?.map((item) => ({
      value: item?._id,
      // label: `${item?.user?.first_name} ${item?.user?.last_name}- ${item?.user?._id}`,
      label: `${item?.user?.first_name} ${item?.user?.last_name}`,
      student_id: item?.user?._id,
    })) || [];

  return (
    <Modal isOpen={isOpen} centered size="md">
      <ModalHeader toggle={onClose} className="fw-semibold text-black">
        {formHeader}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{ request_doc: '' }}
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
                            name="request_doc"
                            options={requstedStudentDataOptions}
                            onChange={(option) => {
                              setFieldValue(
                                'request_doc',
                                option ? option.value : ''
                              );
                              setFieldValue(
                                'student_id',
                                option ? option.student_id : ''
                              );
                            }}
                            value={
                              requstedStudentDataOptions?.find(
                                (opt) => opt.value === values?.request_doc
                              ) || null
                            }
                          />
                        </div>
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

export default StudentFinderModalForSuperAdmin;
