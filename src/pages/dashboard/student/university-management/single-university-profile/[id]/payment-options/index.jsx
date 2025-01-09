import PaymentOption from '@/components/common/PaymentOption';
import Layout from '@/components/layout';
import { useSslCommerzPaymentIntendMutation } from '@/slice/services/common/paymentService';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

export default function StudentApplicationPaymentOption() {
  const router = useRouter();
  const courseId = router.query.courseId;

  const [sslCommerzPaymentIntend] = useSslCommerzPaymentIntendMutation();

  const sslCommerzPaymentHandler = async () => {
    const price = 15000;
    const faild_url =
      'http://localhost:3005/dashboard/student/university-management/single-university-profile/67624977986876cb913fad6a/?payemt_status=faild';
    const success_url =
      'http://localhost:3005/dashboard/student/university-management/single-university-profile/67624977986876cb913fad6a/?payemt_status=success';
    const cancel_url =
      'http://localhost:3005/dashboard/student/university-management/single-university-profile/67624977986876cb913fad6a?payemt_status=cancel';
    const course_id = courseId;
    const package_id = '';

    try {
      const response = await sslCommerzPaymentIntend({
        price,
        faild_url,
        success_url,
        cancel_url,
        course_id,
        package_id,
      }).unwrap();

      if (response.success && response?.data?.gatewayPageURL) {
        window.location.href = response?.data?.gatewayPageURL;
      } else {
        toast.error('Payment failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Layout>
      <div className="page-content">
        <div className="h-100">
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
