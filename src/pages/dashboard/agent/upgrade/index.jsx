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
  useGetAllActiveCouponQuery,
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
  const [packagePaidDuration, setPackagePaidDuration] = useState('');
  const [packageDuration, setPackageDuration] = useState('');
  const [totalPricePackage, setTotalPricePackage] = useState('');
  const [pricePackage, setPricePackage] = useState('');
  const [couponId, setCouponId] = useState('');
  const [renewStatus, setRenewStatus] = useState('no');
  const [subscriptionType, setSubscriptionType] = useState('upgraded');
  const router = useRouter();
  const payment_status = router.query?.payment_status;
  const transaction_id = router.query?.transaction_id;
  const package_id = router.query?.package_id;
  const payment_method = router.query.payment_method;
  const paid_amount = router.query.paid_amount;
  const coupon_id = router.query.coupon_id;
  const getDuration = router.query.duration;
  const getRenewStatus = router.query.renew;
  const getDiscount = router.query.discount;
  const getTotalPackageAmount = router.query.totalPackAmount;
  const getsubsType = router.query.subsType;

  const [sslCommerzPaymentIntend] = useSslCommerzPaymentIntendMutation();
  const { data: allCouponData } = useGetAllActiveCouponQuery();

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
    if (userInfodata?.data?.package_choice) {
      const selectedPackage = getAllPackageData?.data?.find(
        (item) => item._id === userInfodata?.data?.package_choice
      );
      if (
        userInfodata?.data?.package_choice &&
        selectedPackage?.isDefault === false
      ) {
        handleUpgradeNew(selectedPackage, userInfodata?.data?.package_choice);
      } else {
        setOpenPaymentModal(false);
      }
    }
  }, [userInfodata?.data?.package_choice, getAllPackageData]);

  const handleUpgrade = (data) => {
    setPackageDuration(data?.package_duration);
    setSubscriptionType('upgraded');
    setPricePackage((data?.price * data?.package_duration).toFixed(2));
    setUpgradePackageName(data?.name);
    setUpgradePackageId(data?.id);
    setOpenPaymentModal(!openPaymentModal);
  };

  const handleUpgradeNew = (data, packageId) => {
    setUpgradePackageName(data?.name);
    setSubscriptionType('upgraded');
    setUpgradePackageId(packageId);
    setPackageDuration(data?.package_duration);
    setPricePackage((data?.price * data?.package_duration).toFixed(2));
    setOpenPaymentModal(true);
  };

  useEffect(() => {
    const handlePayment = async () => {
      setUpgradePackageIsLoading(true);
      if (payment_status === 'success' && transaction_id) {
        try {
          const finalData = {
            transaction_id: transaction_id,
            package_id: package_id,
            payment_method: payment_method,
            paid_amount: paid_amount,
            coupon_duration: getDuration,
            coupon: couponId
              ? couponId
              : coupon_id && coupon_id != 'none'
                ? coupon_id
                : '',
            renew: getRenewStatus,
            total_package_amount: getTotalPackageAmount,
            discount: getDiscount,
            subscription_type: getsubsType,
          };

          const response = await upgradePackageForAgent(finalData).unwrap();

          if (response) {
            toast.success(response?.message);
            setUpgradePackageId('');
            setUpgradePackageName('');
            setCouponCode('');
            setCouponError('');
            setTotalCouponAmount('');
            setCouponDuration('');
            setTotalPricePackage('');
            setPricePackage('');
            setPackageDuration('');
            setPackagePaidDuration('');
            setCouponId('');
            userInfoRefetch();
            setOpenPaymentModal(false);
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
    couponId,
    coupon_id,
    getDiscount,
    getDuration,
    getRenewStatus,
    getTotalPackageAmount,
    getsubsType,
    package_id,
    paid_amount,
    payment_method,
    payment_status,
    router,
    transaction_id,
    upgradePackageForAgent,
    userInfoRefetch,
  ]);

  const sslCommerzPaymentHandler = async () => {
    const price = couponAmount ? Number(couponAmount) : Number(pricePackage);
    const faild_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/agent/upgrade?payment_status=failed`
        : `https://edusmart.study/dashboard/agent/upgrade?payment_status=failed`;
    const success_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/agent/upgrade?payment_status=success&duration=${packagePaidDuration || packageDuration}&package_id=${upgradePackageId}&coupon_id=${couponId ? couponId : 'none'}&renew=${renewStatus}&subsType=${subscriptionType}&discount=${(totalPricePackage - couponAmount).toFixed(2)}&totalPackAmount=${totalPricePackage ? totalPricePackage : pricePackage}`
        : `https://edusmart.study/dashboard/agent/upgrade?payment_status=success&duration=${packagePaidDuration || packageDuration}&package_id=${upgradePackageId}&coupon_id=${couponId ? couponId : 'none'}&renew=${renewStatus}&subsType=${subscriptionType}&discount=${(totalPricePackage - couponAmount).toFixed(2)}&totalPackAmount=${totalPricePackage ? totalPricePackage : pricePackage}`;
    const cancel_url =
      process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development'
        ? `http://localhost:3005/dashboard/agent/upgrade?payment_status=cancel`
        : `https://edusmart.study/dashboard/agent/upgrade?payment_status=cancel`;
    const transaction_reason = 'agent_package';
    const package_id = upgradePackageId;
    const currency = 'MYR';
    const payment_method = 'sslcommerz';
    const agent_package = null;

    try {
      const response = await sslCommerzPaymentIntend({
        price,
        faild_url,
        success_url,
        cancel_url,
        package_id,
        transaction_reason,
        currency,
        payment_method,
        agent_package,
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
        auth_id: userInfodata?.data?._id,
      }).unwrap();

      const { package_duration, packages, discount_percentage } =
        response?.data || {};

      setCouponId(response?.data?._id);

      const [packagePrice] = packages;
      const [duration] = package_duration.split('_').map(Number);

      const totalPrice =
        duration > packageDuration
          ? packagePrice?.price * duration
          : packagePrice?.price * packageDuration;

      const discount = parseFloat(discount_percentage);
      setTotalPricePackage(totalPrice.toFixed(2));

      const discountAmount =
        duration > packageDuration
          ? (packagePrice?.price * duration * discount) / 100
          : (packagePrice?.price * duration * discount) / 100;

      const packagePaidDuration =
        duration > packageDuration ? duration : packageDuration;

      const totalAmount = totalPrice - discountAmount;

      setPackagePaidDuration(packagePaidDuration);
      setCouponDuration(duration);
      setTotalCouponAmount(parseFloat(totalAmount));
      toast.success('Applied Coupon Successfully');
      setApplyPackageIsLoading(true);
    } catch (error) {
      setApplyPackageIsLoading(false);
      toast.error(error?.data?.message || 'Invalid Coupon.');
      setCouponError(error?.data?.message || 'Invalid Coupon.');
      setTotalCouponAmount('');
      setCouponId('');
    } finally {
      setApplyPackageIsLoading(false);
    }
  };

  const handleUpgradePackageWithCoupon = async () => {
    try {
      const finalData = {
        package_id: upgradePackageId,
        coupon_duration: packagePaidDuration,
        transaction_id: transaction_id,
        payment_method: 'Coupon',
        paid_amount: couponAmount.toFixed(2),
        coupon: couponId,
        renew: renewStatus,
        total_package_amount: totalPricePackage
          ? totalPricePackage
          : pricePackage,
        discount: (totalPricePackage - couponAmount).toFixed(2),
        subscription_type: subscriptionType,
      };

      const upgradeResponse = await upgradePackageForAgent(finalData).unwrap();

      if (upgradeResponse) {
        toast.success(upgradeResponse?.message);
        setUpgradePackageId('');
        setUpgradePackageName('');
        setCouponCode('');
        setCouponError('');
        setTotalCouponAmount('');
        setCouponDuration('');
        setCouponId('');
        setTotalPricePackage('');
        setPricePackage('');
        setPackageDuration('');
        setPackagePaidDuration('');
        userInfoRefetch();
        setOpenPaymentModal(false);
      }
    } catch (upgradeError) {
      const upgradeErrorMessage =
        upgradeError?.data?.message ||
        'Something went wrong during package upgrade!';
      toast.error(upgradeErrorMessage);
    }
  };

  //shadik working
  const token = Cookies.get('token');

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = async () => {
    const newCheckedState = !isChecked;

    if (newCheckedState) {
      const confirmAction = window.confirm(
        "Are you sure you don't want to upgrade now?"
      );
      if (!confirmAction) {
        return;
      }
    }
    setIsChecked(newCheckedState);

    if (newCheckedState && typeof setOpenPaymentModal === 'function') {
      setOpenPaymentModal(false);
    }
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
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const renewPackagehandler = (data) => {
    setRenewStatus('yes');
    setSubscriptionType(data?.subscripType);
    setPackageDuration(data?.package_duration);
    setPricePackage((data?.price * data?.package_duration).toFixed(2));
    setUpgradePackageName(data?.name);
    setUpgradePackageId(data?.id);
    setOpenPaymentModal(!openPaymentModal);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          <div className="h-100">
            <Row>
              <Col xl={10}>
                <div className=" d-flex justify-content-center my-5 gap-5">
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
                                package_duration: item?.duration.split('_')[0],
                              })
                            }
                            renewHandler={() =>
                              renewPackagehandler({
                                price: item?.price,
                                name: item?.name,
                                id: item?._id,
                                package_duration: item?.duration.split('_')[0],
                                subscripType: 'renewed',
                              })
                            }
                            renewButton={
                              item?.price > 0 &&
                              item?._id ===
                                userInfodata?.data?.agent_package?.package?._id
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
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Col>
              <Col lg={10}>
                <div className="coupon-area">
                  {allCouponData?.data?.length > 0 &&
                    allCouponData?.data?.map((coupon, i) => (
                      <div className="single-coupon" key={i}>
                        <div className="coupon-code">
                          <b>Code:</b>{' '}
                          <b>
                            {''}
                            {coupon?.code}
                          </b>
                        </div>
                        <div className="coupon-discount">
                          <b>Discount: </b>
                          {''}
                          {coupon?.discount_percentage}%
                        </div>
                        <div className="coupon-packages">
                          <b>Packages:</b>{' '}
                          {coupon?.packages?.length > 0
                            ? coupon?.packages?.map((pkg, i) => (
                                <span key={i}>
                                  {pkg?.name}
                                  {i !== coupon?.packages?.length - 1
                                    ? ', '
                                    : ''}
                                </span>
                              ))
                            : null}
                        </div>
                        <div className="coupon-expiry-date">
                          <b>Expiry Date:</b>{' '}
                          {coupon?.expiry_date &&
                            new Date(coupon?.expiry_date).toLocaleDateString(
                              'en-GB',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                        </div>
                        {coupon?.package_duration && (
                          <div className="package-duration">
                            <b>Package Duration:</b>{' '}
                            <span>
                              {coupon?.package_duration?.replace(/_/g, ' ')}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </Col>
            </Row>
          </div>
          {openPaymentModal && (
            <Modal isOpen={openPaymentModal} centered size="lg">
              <ModalHeader
                toggle={() => {
                  setRenewStatus('no');
                  setSubscriptionType('upgraded');
                  setUpgradePackageId('');
                  setCouponCode('');
                  setCouponError('');
                  setTotalCouponAmount('');
                  setPackageDuration('');
                  setPackagePaidDuration('');
                  setOpenPaymentModal(!openPaymentModal);
                }}
              >
                Select Payment Option {}
              </ModalHeader>
              <ModalBody>
                <Card>
                  <div className="text-center fs-1 text-primary fw-medium">
                    {upgradePackageName ?? ''} {totalPricePackage ?? ''}
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
                            setCouponId('');
                          }
                        }}
                        onPaste={(e) => {
                          if (e.target.value) {
                            setCouponError('');
                            setCouponCode(e.target.value);
                          } else {
                            setTotalCouponAmount('');
                            setCouponCode('');
                            setCouponId('');
                          }
                        }}
                        placeholder="Enter coupon code"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCouponSubmit();
                          }
                        }}
                      />
                      <div className="hstack mx-auto button px-4 py-3 fw-medium">
                        {applyPackageIsLoading ? (
                          <Loader />
                        ) : (
                          <div
                            onClick={() => handleCouponSubmit()}
                            disabled={applyPackageIsLoading}
                          >
                            Apply
                          </div>
                        )}
                      </div>
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
                          {(totalPricePackage - couponAmount)?.toFixed(2)}{' '}
                          {totalPricePackage != null &&
                            totalPricePackage !== '' &&
                            totalPricePackage !== undefined &&
                            'MYR'}
                        </span>
                        <span>
                          Payment amount : {couponAmount.toFixed(2)}{' '}
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
                          {(totalPricePackage - couponAmount)?.toFixed(2)}{' '}
                          {totalPricePackage != null &&
                            totalPricePackage !== '' &&
                            totalPricePackage !== undefined &&
                            'MYR'}
                        </span>
                        <span>
                          Payment amount : {couponAmount.toFixed(2)}{' '}
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
                        <div className="hstack mx-auto d-flex justify-content-center align-items-center button px-3 py-2 w-25">
                          {upgradePackageForAgentIsLoading ? (
                            <Loader />
                          ) : (
                            <div
                              disabled={upgradePackageForAgentIsLoading}
                              onClick={() => handleUpgradePackageWithCoupon()}
                            >
                              Continue
                            </div>
                          )}
                        </div>
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
                  {userInfodata?.data?.package_choice && (
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
