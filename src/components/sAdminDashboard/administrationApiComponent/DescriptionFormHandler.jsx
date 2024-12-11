
import DescriptionCardForm from '@/components/common/DescriptionFormCardCom';
import { useUpdateUniversityDescriptionMutation } from '@/slice/services/university-administration/api/universityAdministrationDescriptionService';
import React, { useState } from 'react';
import { Col } from 'reactstrap';
import * as Yup from 'yup';
const DescriptionFormHandler = ({ className ,apiData}) => {
    const [updateDescription,{data}]=useUpdateUniversityDescriptionMutation();

    console.log('description update mutation data ==>', data);
    const [initialValues, setInitialValues] = useState({});
    const validationSchema = Yup.object({});

    
    const descriptionFields = [
        { name: 'course_section_description', label: 'Course Section Description *' },
        { name: 'faq_section_description', label: 'FAQ Section Description *' },
        { name: 'review_section_description', label: 'Review Section Description *' },
      ];

   
  const onSubmit = (value,{ setSubmitting }) => {
    console.log(value);
    setTimeout(() => {
        updateDescription({data:value ,university_id:apiData})
        setSubmitting(false);
      }, 1000);
    
  };

 


    return (
        <Col>
             <DescriptionCardForm
                    title="Added All Description Here"
                    fields={descriptionFields}
                    submitButtonText="Add Description"
                    className={className}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                  />
        </Col>
    );
};

export default DescriptionFormHandler;