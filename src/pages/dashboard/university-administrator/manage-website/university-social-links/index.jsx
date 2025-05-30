import SocialLinksCardForm from '@/components/common/SocialLinksCardFormComponent';
import Layout from '@/components/layout';
import React, { useState } from 'react';
import * as Yup from 'yup';

const UniversitySocailLinks = () => {
  const [initialValues, setInitialValues] = useState({});
  const validationSchema = Yup.object({});

  const onSubmit = (e) => {};

  const fields = [
    { name: 'facebook', label: 'Facebook:' },
    { name: 'twitter', label: 'Twitter:' },
    { name: 'instagram', label: 'Instagram:' },
    { name: 'youtube', label: 'Youtube:' },
  ];

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <SocialLinksCardForm
            title="Add Social Links Here"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            fields={fields}
            submitButtonText="Add Social Links"
            className="p-4 p-md-5"
          />
        </div>
      </div>
    </Layout>
  );
};

export default UniversitySocailLinks;
