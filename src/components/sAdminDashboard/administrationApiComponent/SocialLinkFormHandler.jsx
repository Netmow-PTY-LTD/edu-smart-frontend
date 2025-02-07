import SocialLinksCardForm from '@/components/common/SocialLinksCardFormComponent';
import { useUpdateUniversitySocialLinkMutation } from '@/slice/services/university-administration/api/universityAdministrationSocialLinkService';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Col } from 'reactstrap';
import * as Yup from 'yup';

const SocialLinkFormHandler = ({ className, apiData }) => {
  const [updateSocailLinks] = useUpdateUniversitySocialLinkMutation();
  const [initialValues, setInitialValues] = useState({});
  const validationSchema = Yup.object({});

  const onSubmit = async (value, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const result = await await updateSocailLinks({
        data: value,
        university_id: apiData,
      }).unwrap();
      // console.log(result)
      if (result) {
        toast.success(result?.message);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const socialLinkFields = [
    { name: 'facebook', label: 'Facebook:' },
    { name: 'twitter', label: 'Twitter:' },
    { name: 'instagram', label: 'Instagram:' },
    { name: 'youtube', label: 'Youtube:' },
    { name: 'linkedin', label: 'Linkedin:' },
    { name: 'whatsapp', label: 'Whatsapp:' },
  ];

  return (
    <Col>
      <SocialLinksCardForm
        title="Add Social Links Here"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        fields={socialLinkFields}
        submitButtonText="Add Social Links"
        className={className}
      />
    </Col>
  );
};

export default SocialLinkFormHandler;
