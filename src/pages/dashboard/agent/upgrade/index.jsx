import PaymentOption from '@/components/common/PaymentOption';
import SinglePackageComponent from '@/components/common/SinglePackageComponent';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useUpgradePackageForAgentMutation } from '@/slice/services/agent/agentEarningsService';
import { useSslCommerzPaymentIntendMutation } from '@/slice/services/common/paymentService';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useCheckCouponVerifyMutation,
  useGetAllActiveCouponQuery,
  useGetAllHotOfferQuery,
  useGetAllPackageQuery,
} from '@/slice/services/public/package/publicPackageService';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

const UpgradePackageInAgentdashboard = () => {
  const [upgradePackageId, setUpgradePackageId] = useState('');
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [upgradePackageIsLoading, setUpgradePackageIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponAmount, setTotalCouponAmount] = useState('');
  const router = useRouter();

  const payment_status = router.query?.payment_status;
  const transaction_id = router.query?.transaction_id;
  const package_id = router.query?.package_id;

  const [sslCommerzPaymentIntend] = useSslCommerzPaymentIntendMutation();
  const [upgradePackageForAgent] = useUpgradePackageForAgentMutation();

  const [checkCouponVerify, { data: matchedCouponData }] =
    useCheckCouponVerifyMutation();

  // console.log(matchedCouponData);

  const { data: userInfodata, refetch: userInfoRefetch } =
    useGetUserInfoQuery();
  const {
    data: getAllPackageData,
    isLoading: getAllPackageIsLoading,
    refetch: getAllPackageRefetch,
  } = useGetAllPackageQuery();

  const {
    data: getAllActiveCouponData,
    isLoading: getAllActiveCouponIsLoading,
    refetch: getAllActiveCouponRefetch,
  } = useGetAllActiveCouponQuery();

  const {
    data: getAllHotOfferData,
    isLoading: getAllHotOfferIsLoading,
    refetch: getAllHotOfferRefetch,
  } = useGetAllHotOfferQuery();

  useEffect(() => {
    const handlePayment = async () => {
      setUpgradePackageIsLoading(true);
      if (payment_status === 'success' && transaction_id) {
        try {
          const finalData = {
            transaction_id: transaction_id,
            package_id: package_id,
            coupon: 'yes',
          };
          const response = await upgradePackageForAgent(finalData).unwrap();
          if (response) {
            toast.success(response?.message);
            userInfoRefetch();
            setTimeout(() => {
              router.replace(
                {
                  pathname: router.pathname,
                  query: '',
                },
                undefined,
                { shallow: true }
              );
            }, 3000);
          }
        } catch (error) {
          const errorMessage = error?.data?.message || 'Something went wrong!';
          toast.error(errorMessage);
          setTimeout(() => {
            router.replace(
              {
                pathname: router.pathname,
                query: '',
              },
              undefined,
              { shallow: true }
            );
          }, 3000);
        }
      }
      if (payment_status === 'failed') {
        toast.error('Payment Failed! Please Try Again.');
        router.replace(
          {
            pathname: router.pathname,
            query: '',
          },
          undefined,
          { shallow: true }
        );
      }
      if (payment_status === 'cancel') {
        toast.error('Payment Cancelled! Please Try Again.');
        router.replace(
          {
            pathname: router.pathname,
            query: '',
          },
          undefined,
          { shallow: true }
        );
      }
      setUpgradePackageIsLoading(false);
    };
    handlePayment();
  }, [
    package_id,
    payment_status,
    router,
    transaction_id,
    upgradePackageForAgent,
    userInfoRefetch,
  ]);

  const handleUpgrade = (id) => {
    setUpgradePackageId(id);
    setOpenPaymentModal(!openPaymentModal);
  };

  const sslCommerzPaymentHandler = async () => {
    const price = 15000;
    const faild_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/agent/upgrade?payment_status=failed`
        : `https://edusmart.study/dashboard/agent/upgrade?payment_status=failed`;
    const success_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/agent/upgrade?payment_status=success&package_id=${upgradePackageId}`
        : `https://edusmart.study/dashboard/agent/upgrade?payment_status=success&package_id=${upgradePackageId}`;
    const cancel_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/agent/upgrade?payment_status=cancel`
        : `https://edusmart.study/dashboard/agent/upgrade?payment_status=cancel`;

    const package_id = upgradePackageId;

    try {
      const response = await sslCommerzPaymentIntend({
        price,
        faild_url,
        success_url,
        cancel_url,
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

  const handleCouponSubmit = () => {
    const verifyCoupon = async () => {
      try {
        // Await the response and unwrap to get the value directly
        const response = await checkCouponVerify({
          code: couponCode,
          package_id: upgradePackageId,
        }).unwrap();

        // Extract package duration and price
        const packageDuration = response?.data?.package_duration?.split('_')[0];
        const packagePrice = response?.data?.packages[0]?.price;
        const discountPercentage = response?.data?.discount_percentage;

        // Log the extracted values for debugging
        console.log('Package Duration:', packageDuration);
        console.log('Package Price:', packagePrice);
        console.log('Discount Percentage:', discountPercentage);

        if (packageDuration && packagePrice && discountPercentage) {
          // Perform calculations if data is available
          const priceCalculation = packagePrice * packageDuration; // Total price before discount
          console.log('Price Calculation:', priceCalculation);

          const couponCalculation =
            (priceCalculation * discountPercentage) / 100; // Calculate the discount
          console.log('Coupon Calculation (Discount):', couponCalculation);

          const totalCalculation = priceCalculation - couponCalculation; // Subtract the discount from the total price
          console.log('Total Calculation (After Discount):', totalCalculation);

          // Now you can use the totalCalculation as needed
        } else {
          console.log('Missing required data for calculation');
        }
      } catch (error) {
        toast.error('Something went wrong');
        console.error('Error:', error);
      }
    };

    verifyCoupon();

    // console.log(upgradePackageId);
    // console.log(matchedPackage);

    // if (!couponCode) {
    //   toast.error('Coupon code is required.');
    //   setCouponError('Coupon code is required.');
    //   return;
    // }

    // if (matchedPackage) {
    //   toast.success('Coupon applied successfully.');

    //   const singlePackageData =
    //     getAllPackageData?.data?.length > 0 &&
    //     getAllPackageData?.data.find((item) => item?._id === upgradePackageId);
    //   // console.log(singlePackageData);
    //   const couponCalculation = 12 * singlePackageData?.price;
    //   setTotalCouponAmount(couponCalculation);
    //   console.log(couponCalculation);
    // } else {
    //   toast.error('Not A Valid Coupon');
    //   setCouponError('Not A Valid Coupon');
    // }
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          <div className="h-100">
            <Row>
              <Col xl={10}>
                <div className=" d-flex align-items-center justify-content-center my-5 gap-5">
                  {getAllPackageIsLoading || upgradePackageIsLoading ? (
                    <LoaderSpiner />
                  ) : (
                    <>
                      {getAllPackageData?.data?.length > 0 ? (
                        getAllPackageData?.data.map((item, index) => (
                          <SinglePackageComponent
                            key={index}
                            data={item}
                            handleUpgrade={handleUpgrade}
                            style={
                              item?._id ===
                              userInfodata?.data?.agent_package?.package?._id
                                ? { border: '5px solid #13C9BF' }
                                : {}
                            }
                            unselectedPackage={
                              item?.price <
                              userInfodata?.data?.agent_package?.package?.price
                            }
                          />
                        ))
                      ) : (
                        <div className="d-flex flex-column justify-content-center align-items-center text-center text-capitalize">
                          <h1 className="text-primary">
                            No package found right now
                          </h1>
                          <p className="text-primary">Please add a package.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Col>
              {/* <Col xl={2}>
                <div className="my-5 gap-5">
                  {getAllHotOfferData?.data?.length > 0
                    ? getAllHotOfferData?.data.map((item, index) => (
                        <HotOfferBanner
                          key={index}
                          height="120px"
                          width="230px"
                          data={item}
                        />
                      ))
                    : ''}
                </div>
              </Col> */}
            </Row>
          </div>
          {openPaymentModal && (
            <Modal isOpen={openPaymentModal} centered size="lg">
              <ModalHeader
                toggle={() => {
                  setUpgradePackageId('');
                  setCouponCode('');
                  setCouponError('');
                  setTotalCouponAmount('');
                  setOpenPaymentModal(!openPaymentModal);
                }}
              >
                Select Payment Option
              </ModalHeader>
              <ModalBody>
                <Card>
                  <div className="m-4">
                    <label htmlFor="couponCode" className="form-label fs-3">
                      Do You Have A Coupon?
                    </label>
                    <div className="d-flex gap-3">
                      <input
                        type="text"
                        id="couponCode"
                        className="form-control fs-3 text-primary fw-medium"
                        value={couponCode}
                        onChange={(e) => {
                          if (e.target.value) {
                            setCouponError('');
                            setCouponCode(e.target.value);
                          } else {
                            setTotalCouponAmount('');
                            setCouponCode(e.target.value);
                          }
                        }}
                        onPaste={(e) => {
                          if (e.target.value) {
                            setCouponError('');
                            setCouponCode(e.target.value);
                          } else {
                            setTotalCouponAmount('');
                            setCouponCode(e.target.value);
                          }
                        }}
                        placeholder="Enter coupon code"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCouponSubmit();
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="button px-3 fw-medium"
                        onClick={() => handleCouponSubmit()}
                        // disabled={'loading'}
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <div className="text-danger mt-2">{couponError}</div>
                    )}
                    {couponAmount && (
                      <div className="my-3 text-primary fs-2 fw-semibold text-center text-capitalize">
                        Total amount : {couponAmount}{' '}
                        {couponAmount != null &&
                          couponAmount !== '' &&
                          couponAmount !== undefined &&
                          'MYR'}
                      </div>
                    )}
                    {couponAmount && (
                      <div className="text-primary fs-2 fw-semibold text-center">
                        Get It for FREE with Our Exclusive Coupon!
                      </div>
                    )}
                    {couponAmount && (
                      <div
                        onClick={''}
                        className="my-3 text-primary fs-2 fw-semibold text-center "
                      >
                        <button className="button px-4 py-2">Continue</button>
                      </div>
                    )}
                  </div>

                  <CardBody>
                    <div className="w-50 mx-auto">
                      <PaymentOption
                        sslCommerzPaymentHandler={sslCommerzPaymentHandler}
                      />
                    </div>
                  </CardBody>
                </Card>
              </ModalBody>
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UpgradePackageInAgentdashboard;
