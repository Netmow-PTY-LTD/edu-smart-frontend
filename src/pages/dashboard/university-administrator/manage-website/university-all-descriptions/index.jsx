
import Layout from '@/components/layout';
import React, { useState } from 'react';
import * as Yup from 'yup';

import DescriptionCardForm from '@/components/common/DescriptionFormCardCom';

const UniversityAllDescriptions = () => {
  const [initialValues, setInitialValues] = useState({});
  const validationSchema = Yup.object({});

  const onSubmit = (e) => {
    console.log(e);
  };

  const fields = [
    { name: 'faculty_description', label: 'Faculty Description *' },
    { name: 'gallery_description', label: 'Gallery Description *' },
    { name: 'faq_description', label: 'FAQ Description *' },
    { name: 'testimonial_description', label: 'Testimonial Description *' },
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
            fields={fields}
            submitButtonText="Add Description"
            className="p-4 p-md-5"
          />
        </div>
      </div>
    </Layout>
  );
};

export default UniversityAllDescriptions;
