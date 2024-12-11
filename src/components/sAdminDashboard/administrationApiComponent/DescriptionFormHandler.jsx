
import DescriptionCardForm from '@/components/common/DescriptionFormCardCom';
import { useUpdateUniversityDescriptionMutation } from '@/slice/services/university-administration/api/universityAdministrationDescriptionService';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Col } from 'reactstrap';
import * as Yup from 'yup';
const DescriptionFormHandler = ({ className ,apiData}) => {
    const [updateDescription,{data}]=useUpdateUniversityDescriptionMutation();
    // const [initialValues, setInitialValues] = useState({});
   

    const validationSchema = Yup.object({});

    console.log(apiData);

    
    const descriptionFields = [
        { name: 'course_section_description', label: 'Course Section Description *' },
        { name: 'faq_section_description', label: 'FAQ Section Description *' },
        { name: 'review_section_description', label: 'Review Section Description *' },
      ];

      const initialValues = {
        course_section_description: 'Default description for field 1',
        faq_section_description: 'Default description for field 2',
        review_section_description: 'Default description for field 3',
      };
  
   
  const onSubmit = async(value,{ setSubmitting }) => {
      setSubmitting(true);
      try {
        const result = await updateDescription({data:value ,university_id:apiData._id}).unwrap();
        console.log(result)
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

 


    return (
        <Col>
          <ToastContainer/>
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