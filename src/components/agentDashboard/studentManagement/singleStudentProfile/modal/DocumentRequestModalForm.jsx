import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import SubmitButton from '@/components/common/formField/SubmitButton';
import SingleSelectField from '@/components/common/formField/SingleSelectField';
import TextArea from '@/components/common/formField/TextAreaField';
import SingleSelectFieldForAgent from './SingleSelectFieldForAgent';
import { useGetAllDocumentListQuery } from '@/slice/services/common/commonDocumentService';

const DocumentRequestModalForm = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
  setInitialValues,
}) => {
  const { data: documentData, isLoading: documentLoading } =
    useGetAllDocumentListQuery();

  console.log();
  const options = documentData.data.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  // const options = [
  //   { value: 'photograph', label: 'Photograph' },
  //   { value: 'passport', label: 'Passport' },
  //   { value: 'offer_letter', label: 'Offer Letter' },
  //   { value: 'medical_certificate', label: 'Medical Certificate' },
  //   { value: 'academic_certificate', label: 'Academic Certificate' },
  //   { value: 'personal_bond', label: 'Personal Bond' },
  //   { value: 'noc', label: 'NOC' },
  //   { value: 'letter_of_eligibility', label: 'Letter of Eligibility' },
  //   {
  //     value: 'english_language_certificate',
  //     label: 'English Language Certificate',
  //   },
  //   { value: 'others', label: 'Others' },
  // ];
  return (
    <div>
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
            {({ isSubmitting }) => (
              <Form>
                <Row>
                  <Col lg={12}>
                    <div className="ps-0">
                      <Row>
                        <Col md={12} xl={12}>
                          <div className="mb-4">
                            <SingleSelectFieldForAgent
                              options={options}
                              name="title"
                              label="Document Title *"
                              setInitialValues={setInitialValues}
                            />
                          </div>
                        </Col>
                        <Col md={12} xl={12}>
                          <div className="">
                            <TextArea
                              name="description"
                              label="Description *"
                            />
                          </div>
                        </Col>
                        <Col md={12} xl={12}>
                          <div className="">
                            <TextArea name="notes" label="Notes *" />
                          </div>
                        </Col>
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
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DocumentRequestModalForm;
