import PaymentOption from '@/components/common/PaymentOption';
import Layout from '@/components/layout';
import { useSslCommerzPaymentIntendMutation } from '@/slice/services/common/paymentService';
import { useGetSingleCourseQuery } from '@/slice/services/public/university/publicUniveristyService';
import { useRouter } from 'next/router';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function StudentApplicationPaymentOption() {
  const router = useRouter();
  const universityId = router.query.id;
  const courseId = router.query.courseId;
  const application_id = router.query.application_id;

  const [sslCommerzPaymentIntend] = useSslCommerzPaymentIntendMutation();

  const {
    data: getSingleCourseData,
    isLoading: getSingleCourseIsLoading,
    refetch: getSingleCourseRefetch,
  } = useGetSingleCourseQuery({
    university_id: universityId,
    course_id: courseId,
  });

  const sslCommerzPaymentHandler = async () => {
    const price =
      getSingleCourseData?.data?.emgs_fee ||
      getSingleCourseData?.data?.price ||
      0;
    const faild_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/student/university-management/single-university-profile/${universityId}/course/${courseId}?payment_status=failed`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/student/university-management/single-university-profile/${universityId}/course/${courseId}?payment_status=faild`;
    const success_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/student/university-management/single-university-profile/${universityId}/course/${courseId}?payment_status=success`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/student/university-management/single-university-profile/${universityId}/course/${courseId}?payment_status=success`;
    const cancel_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/student/university-management/single-university-profile/${universityId}/course/${courseId}?payment_status=cancel`
        : `https://${process.env.NEXT_PUBLIC_REDIRECT_URL}/dashboard/student/university-management/single-university-profile/${universityId}/course/${courseId}?payment_status=cancel`;
    const course_id = courseId;

    const currency = 'MYR';
    const transaction_reason = 'application_emgs';
    const payment_method = 'sslcommerz';

    try {
      const response = await sslCommerzPaymentIntend({
        price,
        faild_url,
        success_url,
        cancel_url,
        course_id,
        currency,
        application_id,
        transaction_reason,
        payment_method,
      }).unwrap();

      if (response.success && response?.data?.gatewayPageURL) {
        window.location.href = response?.data?.gatewayPageURL;
      } else {
        toast.error('Payment failed');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
          <ToastContainer />
          <div className="container-fluid">
            <div className="w-50 mx-auto">
              <PaymentOption
                sslCommerzPaymentHandler={sslCommerzPaymentHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
