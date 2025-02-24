import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Formik, Form } from 'formik';
import SubmitButton from '@/components/common/formField/SubmitButton';
import TextArea from '@/components/common/formField/TextAreaField';
import { useGetAllDocumentListQuery } from '@/slice/services/common/commonDocumentService';
import CreatableSelect from 'react-select/creatable';

const DocumentRequestModalForm = ({
  formHeader,
  isOpen,
  onClose,
  initialValues,
  validationSchema,
  onSubmit,
  formSubmit,
}) => {
  const { data: documentData } = useGetAllDocumentListQuery();

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
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log('values', values);

            let formattedData = [];

            if (!values.description) {
              // If no description, process titles
              const selectedTitles = values.title
                ? values.title.split(', ')
                : [];

              formattedData =
                selectedTitles.length > 0
                  ? selectedTitles.map((title) => {
                      const document = documentOptions.find(
                        (doc) => doc.value === title
                      );
                      return {
                        title,
                        description: document ? document.description : '', // Assign description if available
                      };
                    })
                  : []; // In case no titles are selected, keep it empty
            } else {
              // If description is provided, create a single object with title and description
              formattedData = [
                { title: values.title, description: values.description },
              ];
            }

            onSubmit(formattedData); // Pass the formatted array to the submit function
            // Set submitting to false once submission is complete
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => {
            const selectedValues = values.title ? values.title.split(', ') : [];
            const isSelectAll = selectedValues.includes('select_all');

            useEffect(() => {
              if (isSelectAll) {
                const allTitles = documentOptions.map((opt) => opt.value);
                setFieldValue('title', allTitles.join(', '));

                const allDescriptions = documentOptions.map(
                  (opt) => opt.description || ''
                );
                setFieldValue('description', allDescriptions.join(', '));
              } else {
                const selectedDocument = documentOptions.find(
                  (option) => option.value === values.title
                );
                setFieldValue(
                  'description',
                  selectedDocument?.description || ''
                );
              }
            }, [values.title, isSelectAll, documentOptions, setFieldValue]);

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
                            value={selectedValues.map((val) => ({
                              label: val,
                              value: val,
                            }))}
                            onChange={(selectedOptions) => {
                              const selectedTitles =
                                selectedOptions?.map((opt) => opt.value) || [];

                              if (selectedTitles.includes('select_all')) {
                                const allTitles = documentOptions.map(
                                  (opt) => opt.value
                                );
                                setFieldValue('title', allTitles.join(', '));

                                const allDescriptions = documentOptions.map(
                                  (opt) => opt.description || ''
                                );
                                setFieldValue(
                                  'description',
                                  allDescriptions.join(', ')
                                );
                              } else {
                                setFieldValue(
                                  'title',
                                  selectedTitles.join(', ')
                                );
                              }
                            }}
                            onCreateOption={(inputValue) => {
                              setFieldValue(
                                'title',
                                [...selectedValues, inputValue].join(', ')
                              );
                            }}
                          />
                        </div>
                      </Col>

                      {/* Show "Description" only if a new title is created */}
                      {!isSelectAll &&
                        selectedValues.length > 0 &&
                        !documentOptions.some((opt) =>
                          selectedValues.includes(opt.value)
                        ) && (
                          <Col md={12} xl={12}>
                            <div className="mb-3">
                              <TextArea
                                name="description"
                                label="Document Description *"
                              />
                            </div>
                          </Col>
                        )}

                      <Col md={12} xl={12}>
                        <p>
                          <span className="text-success fw-semibold">NB:</span>{' '}
                          If you need a new document request, write it into the
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

export default DocumentRequestModalForm;

// This old file
// import React, { useEffect } from 'react';
// import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
// import { Formik, Form } from 'formik';
// import SubmitButton from '@/components/common/formField/SubmitButton';
// import TextArea from '@/components/common/formField/TextAreaField';
// import { useGetAllDocumentListQuery } from '@/slice/services/common/commonDocumentService';
// import CreatableSelect from 'react-select/creatable';

// const DocumentRequestModalForm = ({
//   formHeader,
//   isOpen,
//   onClose,
//   initialValues,
//   validationSchema,
//   onSubmit,
//   formSubmit,
// }) => {
//   const { data: documentData } = useGetAllDocumentListQuery();

//   // Generate document options from API response
//   const options =
//     documentData?.data?.map((item) => ({
//       value: item.title,
//       label: item.title,
//       description: item.description, // Store description for auto-fill
//     })) || [];

//   return (
//     <Modal isOpen={isOpen} centered size="md">
//       <ModalHeader toggle={onClose} className="fw-semibold text-black">
//         {formHeader}
//       </ModalHeader>
//       <ModalBody>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           {({ isSubmitting, values, setFieldValue, submitForm }) => {
//             // Find selected document from API
//             const selectedDocument = options.find(
//               (option) => option.value === values.title
//             );

//             // Auto-fill description when a known document is selected
//             useEffect(() => {
//               if (selectedDocument) {
//                 setFieldValue('description', selectedDocument.description);
//               } else {
//                 setFieldValue('description', '');
//               }
//             }, [values.title, selectedDocument, setFieldValue, submitForm]);

//             // Check if a new title is created
//             const isNewTitle =
//               values.title &&
//               !options.some((option) => option.value === values.title);

//             return (
//               <Form>
//                 <Row>
//                   <Col lg={12}>
//                     <Row>
//                       {/* Title Select Field */}
//                       <Col md={12} xl={12}>
//                         <div className="mb-3">
//                           <label className="form-label  mb-2">
//                             Document Title *
//                           </label>
//                           <CreatableSelect
//                             isClearable
//                             options={options}
//                             className="basic-multi-select"
//                             classNamePrefix="select"
//                             value={
//                               values.title
//                                 ? { label: values.title, value: values.title }
//                                 : null
//                             }
//                             onChange={(selectedOption) => {
//                               setFieldValue(
//                                 'title',
//                                 selectedOption ? selectedOption.value : ''
//                               );
//                             }}
//                             onCreateOption={(inputValue) => {
//                               setFieldValue('title', inputValue);
//                             }}
//                           />
//                         </div>
//                       </Col>

//                       {/* Show "Description" & "Notes" when a new title is created */}
//                       {isNewTitle && (
//                         <>
//                           <Col md={12} xl={12}>
//                             <div className="mb-3">
//                               <TextArea
//                                 name="description"
//                                 label="Document Description *"
//                               />
//                             </div>
//                           </Col>
//                         </>
//                       )}
//                       <Col md={12} xl={12}>
//                         <p>
//                           <span className="text-success fw-semibold">NB:</span>{' '}
//                           NB: If you need a new document request, write it into
//                           the select field.
//                         </p>
//                       </Col>
//                       {/* Submit Button */}
//                       <Col md={12} xl={12}>
//                         <div className="my-4">
//                           <SubmitButton
//                             isSubmitting={isSubmitting}
//                             formSubmit="formSubmit"
//                           >
//                             {formSubmit}
//                           </SubmitButton>
//                         </div>
//                       </Col>
//                     </Row>
//                   </Col>
//                 </Row>
//               </Form>
//             );
//           }}
//         </Formik>
//       </ModalBody>
//     </Modal>
//   );
// };

// export default DocumentRequestModalForm;
