import Image from 'next/image';
import React from 'react';
import { Card } from 'reactstrap';
import sslcommerzicon from '../../../public/assets/images/payments/sslcommerz_logo.png';
import stripeicondark from '../../../public/assets/images/payments/stripe_logo_dark.png';

export default function PaymentOption({ sslCommerzPaymentHandler }) {
  return (
    <div>
      <h3 className="fs-22 mb-5 text-center text-nowrap text-primary">
        Select a Payment method
      </h3>
      <div>
        <Card
          className="rouded rounded-4 cursor-pointer card-animate bg-secondary-subtle"
          onClick={sslCommerzPaymentHandler}
        >
          <div className="d-flex gap-4 justify-content-center align-items-center p-4">
            <div>
              <Image
                src={sslcommerzicon}
                alt="sslcommerz"
                width={200}
                height={200}
              />
            </div>
            <div>
              <h5 className="fs-2">Pay with SSLCOMMERZ</h5>
            </div>
          </div>
        </Card>
        <Card className="rouded rounded-4 bg-danger-subtle">
          <div className="d-flex gap-4 justify-content-center align-items-center p-4">
            <div>
              <Image
                src={stripeicondark}
                alt="sslcommerz"
                width={200}
                height={400}
              />
            </div>
            <div>
              <h5 className="fs-2 text-primary">Stripe Comming Soon..</h5>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
