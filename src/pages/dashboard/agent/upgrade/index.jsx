import PaymentOption from '@/components/common/PaymentOption';
import SinglePackageComponent from '@/components/common/SinglePackageComponent';
import Loader from '@/components/constants/Loader/Loader';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import Layout from '@/components/layout';
import { useUpgradePackageForAgentMutation } from '@/slice/services/agent/agentEarningsService';
import { useSslCommerzPaymentIntendMutation } from '@/slice/services/common/paymentService';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import {
  useCheckCouponVerifyMutation,
  useGetAllPackageQuery,
} from '@/slice/services/public/package/publicPackageService';
import Cookies from 'js-cookie';
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
  const [upgradePackageName, setUpgradePackageName] = useState('');
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [upgradePackageIsLoading, setUpgradePackageIsLoading] = useState(false);
  const [applyPackageIsLoading, setApplyPackageIsLoading] = useState(false);
  const [continuePackageIsLoading, setContinuePackageIsLoading] =
    useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponAmount, setTotalCouponAmount] = useState('');
  const [couponDuration, setCouponDuration] = useState('');
  const [totalPricePackage, setTotalPricePackage] = useState('');
  const [pricePackage, setPricePackage] = useState('');

  const router = useRouter();

  const payment_status = router.query?.payment_status;
  const transaction_id = router.query?.transaction_id;
  const package_id = router.query?.package_id;

  const [sslCommerzPaymentIntend] = useSslCommerzPaymentIntendMutation();
  const [
    upgradePackageForAgent,
    { isLoading: upgradePackageForAgentIsLoading },
  ] = useUpgradePackageForAgentMutation();
  const [checkCouponVerify] = useCheckCouponVerifyMutation();

  const { data: userInfodata, refetch: userInfoRefetch } =
    useGetUserInfoQuery();
  const {
    data: getAllPackageData,
    isLoading: getAllPackageIsLoading,
    refetch: getAllPackageRefetch,
  } = useGetAllPackageQuery();

  useEffect(() => {
    const handlePayment = async () => {
      setUpgradePackageIsLoading(true);
      if (payment_status === 'success' && transaction_id) {
        try {
          const finalData = {
            transaction_id: transaction_id,
            package_id: package_id,
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

  const handleUpgrade = (data) => {
    console.log(data);
    setPricePackage(data?.price);
    setUpgradePackageName(data?.name);
    setUpgradePackageId(data?.id);
    setOpenPaymentModal(!openPaymentModal);
  };

  const handleUpgradeNew = (data) => {
    console.log(data);
    setUpgradePackageId(data?.id);
    setOpenPaymentModal(true);
    setPricePackage(data?.price);
    setUpgradePackageName(data?.name);
  };

  useEffect(() => {
    if (userInfodata?.data?.package_choice) {
      const selectedPackage = getAllPackageData?.data?.find(
        (item) => item._id === userInfodata?.data?.package_choice
      );

      console.log(selectedPackage?.price);

      if (userInfodata?.data?.package_choice && selectedPackage?.price != 0) {
        handleUpgradeNew(userInfodata?.data?.package_choice);
      } else {
        setOpenPaymentModal(false);
      }
    }
  }, [userInfodata?.data?.package_choice, getAllPackageData]);

  const sslCommerzPaymentHandler = async () => {
    const price = couponAmount ? couponAmount : pricePackage;
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

  const handleCouponSubmit = async () => {
    if (!couponCode) {
      toast.error('Coupon code is required.');
      setCouponError('Coupon code is required.');
      return;
    }

    setApplyPackageIsLoading(true);

    try {
      const response = await checkCouponVerify({
        code: couponCode,
        package_id: upgradePackageId,
      }).unwrap();

      console.log('Coupon verification response:', response);

      const { package_duration, packages, discount_percentage } =
        response?.data || {};

      const [packagePrice] = packages;
      const [duration] = package_duration.split('_').map(Number);
      const discount = parseFloat(discount_percentage);

      const totalPrice = packagePrice?.price * duration;
      setTotalPricePackage(totalPrice.toFixed(2));
      const discountAmount = (totalPrice * discount) / 100;
      const totalAmount = (totalPrice - discountAmount).toFixed(2);

      setCouponDuration(duration);
      setTotalCouponAmount(parseFloat(totalAmount));
      toast.success('Applied Coupon Successfully');
      setApplyPackageIsLoading(true);
    } catch (error) {
      setApplyPackageIsLoading(false);
      toast.error(error?.data?.message || 'Invalid Coupon.');
      setCouponError(error?.data?.message || 'Invalid Coupon.');
    } finally {
      setApplyPackageIsLoading(false);
    }
  };

  const handleUpgradePackageWithCoupon = async () => {
    try {
      const finalData = {
        package_id: upgradePackageId,
        coupon_duration: couponDuration,
      };

      const upgradeResponse = await upgradePackageForAgent(finalData).unwrap();
      if (upgradeResponse) {
        toast.success(upgradeResponse?.message);
        userInfoRefetch();
      }
    } catch (upgradeError) {
      const upgradeErrorMessage =
        upgradeError?.data?.message ||
        'Something went wrong during package upgrade!';
      toast.error(upgradeErrorMessage);
      console.error('Package upgrade error:', upgradeError);
    }
  };

  //shadik working
  const token = Cookies.get('token');

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = async () => {
    const newCheckedState = !isChecked;

    // Show confirmation only when checking the box
    if (newCheckedState) {
      const confirmAction = window.confirm(
        "Are you sure you don't want to upgrade now?"
      );
      if (!confirmAction) {
        return; // Do nothing if the user cancels
      }
    }

    setIsChecked(newCheckedState);

    // Close modal if checkbox is checked
    if (newCheckedState && typeof setOpenPaymentModal === 'function') {
      setOpenPaymentModal(false);
    }

    // Determine the correct body based on checkbox state
    const requestBody = JSON.stringify({
      package_choice: newCheckedState
        ? null
        : userInfodata?.data?.package_choice,
    });

    try {
      const response = await fetch(
        'https://api.edusmart.study/api/v1/agent/package-choice',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`, // Fix capitalization
          },
          body: requestBody,
        }
      );

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  //

  console.log(
    couponAmount !== '' && couponAmount !== null && Number(couponAmount) === 0
  );

  console.log(couponAmount);

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
                            handleUpgrade={() =>
                              handleUpgrade({
                                price: item?.price,
                                name: item?.name,
                                id: item?._id,
                              })
                            }
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
                Select Payment Option {}
              </ModalHeader>
              <ModalBody>
                <Card>
                  <div className="text-center fs-1 text-primary fw-medium">
                    {upgradePackageName ?? ''}
                  </div>
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
                            setCouponCode('');
                          }
                        }}
                        onPaste={(e) => {
                          if (e.target.value) {
                            setCouponError('');
                            setCouponCode(e.target.value);
                          } else {
                            setTotalCouponAmount('');
                            setCouponCode('');
                          }
                        }}
                        placeholder="Enter coupon code"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCouponSubmit();
                          }
                        }}
                      />
                      {applyPackageIsLoading ? (
                        <Loader />
                      ) : (
                        <button
                          type="button"
                          className="button px-3 fw-medium"
                          onClick={() => handleCouponSubmit()}
                          disabled={applyPackageIsLoading}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                    {couponError && (
                      <div className="text-danger mt-2">{couponError}</div>
                    )}
                    {couponAmount !== '' &&
                    couponAmount !== null &&
                    Number(couponAmount) === 0 ? (
                      <div className="d-flex flex-column my-3 text-primary fs-2 fw-semibold text-center text-capitalize">
                        <span>
                          Package Price : {totalPricePackage} {''}
                          {totalPricePackage != null &&
                            totalPricePackage !== '' &&
                            totalPricePackage !== undefined &&
                            'MYR'}
                        </span>
                        <span>
                          Discount Amount :{' '}
                          {(totalPricePackage - couponAmount).toFixed(2)}{' '}
                          {totalPricePackage != null &&
                            totalPricePackage !== '' &&
                            totalPricePackage !== undefined &&
                            'MYR'}
                        </span>
                        <span>
                          Payment amount : {couponAmount}{' '}
                          {couponAmount != null &&
                            couponAmount !== '' &&
                            couponAmount !== undefined &&
                            'MYR'}
                        </span>
                      </div>
                    ) : Number(couponAmount) !== 0 ? (
                      <div className="d-flex flex-column my-3 text-primary fs-2 fw-semibold text-center text-capitalize">
                        <span>
                          Package Price : {totalPricePackage} {''}
                          {totalPricePackage != null &&
                            totalPricePackage !== '' &&
                            totalPricePackage !== undefined &&
                            'MYR'}
                        </span>
                        <span>
                          Discount Amount :{' '}
                          {(totalPricePackage - couponAmount).toFixed(2)}{' '}
                          {totalPricePackage != null &&
                            totalPricePackage !== '' &&
                            totalPricePackage !== undefined &&
                            'MYR'}
                        </span>
                        <span>
                          Payment amount : {couponAmount}{' '}
                          {couponAmount != null &&
                            couponAmount !== '' &&
                            couponAmount !== undefined &&
                            'MYR'}
                        </span>
                      </div>
                    ) : (
                      ''
                    )}

                    {couponAmount !== '' &&
                    couponAmount !== null &&
                    Number(couponAmount) === 0 ? (
                      <div className="my-3 text-primary fs-2 fw-semibold text-center">
                        <div className="text-primary fs-2 fw-semibold text-center mb-2">
                          Get It for FREE with Our Exclusive Coupon!
                        </div>
                        {upgradePackageForAgentIsLoading ? (
                          <Loader />
                        ) : (
                          <button
                            disabled={upgradePackageForAgentIsLoading}
                            onClick={() => handleUpgradePackageWithCoupon()}
                            className="button px-4 py-2"
                          >
                            Continue
                          </button>
                        )}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>

                  {couponAmount !== '' &&
                  couponAmount !== null &&
                  Number(couponAmount) === 0 ? (
                    ''
                  ) : (
                    <CardBody>
                      <div className="w-50 mx-auto">
                        <PaymentOption
                          sslCommerzPaymentHandler={() =>
                            sslCommerzPaymentHandler()
                          }
                        />
                      </div>
                    </CardBody>
                  )}
                  {!userInfodata?.data?.package_choice && (
                    <CardBody>
                      <div className="w-full text-center d-flex gap-2 justify-content-center">
                        <input
                          type="checkbox"
                          id="no-upgrade"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          className="w-5 h-5 mr-2 align-middle"
                        />
                        <label
                          htmlFor="no-upgrade"
                          className="fs-18 fw-semibold text-primary text-nowrap"
                        >
                          Don't want to upgrade now.
                        </label>
                      </div>
                    </CardBody>
                  )}
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
