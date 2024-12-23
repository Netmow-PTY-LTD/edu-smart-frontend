import AddStudentComponentForAgent from '@/components/agentDashboard/AddStudentComponent';
import { convertImageUrlToFile } from '@/components/common/helperFunctions/ConvertImgUrlToFile';
import Layout from '@/components/layout';
import {
  useAllStudentForAgentQuery,
  useSingleStudentForAgentQuery,
  useUpdateStudentForAgentMutation,
} from '@/slice/services/agent/studentDocRelatedServiceForAgent';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const EditStudentForAgent = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const student_id = router.query.id;
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    last_name: '',
    profile_image: null,
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [updateStudentForAgent] = useUpdateStudentForAgentMutation();
  const { refetch: allStudentForAgentRefetch } = useAllStudentForAgentQuery();

  const { data: singleStudentForAgentData } = useSingleStudentForAgentQuery(
    student_id,
    { skip: !student_id }
  );

  useEffect(() => {
    const fetchStudentData = async () => {
      if (singleStudentForAgentData?.data) {
        const student = singleStudentForAgentData?.data
          ? singleStudentForAgentData?.data
          : null;

        console.log(student);

        const profile_image = await convertImageUrlToFile(
          student?.profile_image?.url
        );

        setInitialValues({
          first_name: student?.first_name || '',
          last_name: student?.last_name || '',
          email: student?.email || '',
          phone: student?.phone || '',
          address_line_1: student?.address_line_1 || '',
          address_line_2: student?.address_line_2 || '',
          city: student?.city || '',
          state: student?.state || '',
          zip: student?.zip || '',
          country: student?.country || '',
          profile_image: profile_image,
        });
        const imageUrl = URL.createObjectURL(profile_image);
        setImagePreview(imageUrl);
      }
    };
    fetchStudentData();
  }, [singleStudentForAgentData]);

  console.log(initialValues);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const editData = {
      ...values,
      student_id,
    };

    try {
      const finalData = new FormData();
      Object.entries(editData).forEach(([key, value]) => {
        finalData.append(key, value);
      });
      const response = await updateStudentForAgent(finalData).unwrap();
      if (response) {
        toast.success(response?.message);
        allStudentForAgentRefetch();
        setImagePreview(null);
        resetForm();
        router.push(
          '/dashboard/agent/student-management/all-student-for-agent'
        );
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />

          <div className="h-100">
            <AddStudentComponentForAgent
              headTitle={'Update Student'}
              initialValues={initialValues}
              handleSubmit={handleSubmit}
              formSubmit={'Update Student'}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditStudentForAgent;
