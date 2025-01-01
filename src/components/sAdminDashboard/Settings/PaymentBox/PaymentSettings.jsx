import React from 'react';
import { Col, Row } from 'reactstrap';
import StripeSettings from './StripeSettings';
import SSLCommerceSettings from './SSLCommerceSettings';
import PaypalSettings from './PaypalSettings';

const PaymentSettings = () => {
  return (
    <Row>
      <Col lg={6}>
        <StripeSettings />
      </Col>
      <Col lg={6}>
        <PaypalSettings/>
      </Col>
      <Col lg={6}>
        <SSLCommerceSettings />
      </Col>
    </Row>
  );
};

export default PaymentSettings;
