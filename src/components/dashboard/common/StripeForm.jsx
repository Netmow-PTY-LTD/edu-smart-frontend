import { PaymentElement } from '@stripe/react-stripe-js';
import React from 'react';
import { Card } from 'reactstrap';
import Loader from './Loader';

const StripeForm = ({ stripePayHandler, stripe, loading, errorMessage }) => {
  return (
    <>
      <div className="w-100" id="paymentmethodCollapse">
        <Card className="p-5 border shadow-none mb-0 mt-5">
          <form onSubmit={(e) => stripePayHandler(e)}>
            <PaymentElement />

            {/* <div className="mt-4">
              <label htmlFor="couponCode" className="form-label fs-3">
                Have a coupon?
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="couponCode"
                  className="form-control"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                <button
                  type="button"
                  className="button p-3 text-white"
                  onClick={handleCouponSubmit}
                  disabled={loading}
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <div className="text-danger mt-2">{couponError}</div>
              )}
            </div> */}

            <div className="text-muted mt-4 fs-3 fst-italic">
              <i data-feather="lock" className="text-muted icon-xs"></i>
              Your transaction is secured with SSL encryption
            </div>

            <div className="hstack d-flex align-items-start gap-3 mt-4">
              {errorMessage && (
                <div className="text-danger fs-1 text-wrap">
                  *Ooops!...{errorMessage}
                </div>
              )}
              <button
                disabled={!stripe || loading}
                type="submit"
                className="button fs-3 text-light py-3 btn-label right ms-auto nexttab text-nowrap"
              >
                {loading ? <Loader /> : 'Complete Payment'}
                <i className="ri-shopping-basket-line label-icon align-middle fs-16 ms-2"></i>
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default StripeForm;
