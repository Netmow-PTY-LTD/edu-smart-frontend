import Layout from '@/components/layout';
import React, { useState } from 'react';
import * as Yup from 'yup';

import DescriptionCardForm from '@/components/common/DescriptionFormCardCom';

const UniversityAllDescriptions = () => {
  const [initialValues, setInitialValues] = useState({});
  const validationSchema = Yup.object({});

  const onSubmit = (e) => {
    // console.log(e);
  };

  const descriptionFields = [
    {
      name: 'course_section_description',
      label: 'Course Section Description *',
    },
    { name: 'faq_section_description', label: 'FAQ Section Description *' },
    {
      name: 'review_section_description',
      label: 'Review Section Description *',
    },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <DescriptionCardForm
            title="Added All Description Here"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            fields={descriptionFields}
            submitButtonText="Add Description"
            className="p-4 p-md-5"
          />
        </div>
      </div>
    </Layout>
  );
};

export default UniversityAllDescriptions;
