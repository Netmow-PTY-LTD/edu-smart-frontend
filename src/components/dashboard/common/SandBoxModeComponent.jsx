import { getAdminStripeSandboxMode } from '@/slices/dashboard/commonApi/Actions/invoiceActions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SandBoxModeComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [stripeKeyStatus, setStripeKeyStatus] = useState();
  const [stripeSecretStatus, setStripeSecretStatus] = useState();

  const { data: stripeKeyData } = useSelector(
    (state) => state.CommonApi.getAdminStripeSandboxMode
  );

  useEffect(() => {
    dispatch(getAdminStripeSandboxMode());
  }, [dispatch]);

  useEffect(() => {
    if (stripeKeyData?._id) {
      const stripeKeyStatusData = stripeKeyData?.stripe_key.split('_');
      const stripeSecretStatusData = stripeKeyData?.stripe_secret.split('_');
      setStripeKeyStatus(
        stripeKeyData?.stripe_key === '' ? '' : stripeKeyStatusData[1]
      );
      setStripeSecretStatus(
        stripeKeyData?.stripe_secret === '' ? '' : stripeSecretStatusData[1]
      );
    }
  }, [stripeKeyData, stripeKeyData?.stripe_key, stripeKeyData?.stripe_secret]);

  const goToPaymentSettingsHandler = () => {
    router.push('/admin/settings?paymentSettingsKeys=true');
  };

  return (
    <>
      <div
        style={{
          padding: '9px 11px',
          borderRadius: '5px',
          fontSize: '1.2rem',
          fontWeight: 500,
          lineHeight: 1.5,
        }}
        className={`me-2 badge d-none d-md-block ${stripeKeyStatus && stripeSecretStatus === 'test' ? 'bg-danger-subtle text-danger' : stripeKeyStatus && stripeSecretStatus === 'live' ? 'bg-success-subtle text-success' : 'third-color qoute_color cursor-pointer sandbox-btn'} `}
        onClick={
          stripeKeyData?.stripe_key === '' &&
          stripeKeyData?.stripe_secret === ''
            ? goToPaymentSettingsHandler
            : null
        }
      >
        {stripeKeyStatus && stripeSecretStatus === 'test'
          ? 'Stripe Test Mode'
          : stripeKeyStatus && stripeSecretStatus === 'live'
            ? 'Stripe Live Mode'
            : `Set Your Stripe Keys`}
        {
          <i
            className={`${
              stripeKeyStatus && stripeSecretStatus === 'test'
                ? 'ri-circle-fill ms-2'
                : stripeKeyStatus && stripeSecretStatus === 'live'
                  ? 'ri-circle-fill ms-2'
                  : ''
            }`}
          ></i>
        }
      </div>
    </>
  );
};

export default SandBoxModeComponent;
