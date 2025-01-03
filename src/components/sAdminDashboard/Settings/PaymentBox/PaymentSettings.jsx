import React from 'react';
import { Col, Row } from 'reactstrap';
import StripeSettings from './StripeSettings';

const PaymentSettings = () => {
  return (
    <Row>
      <Col lg={12}>
        <StripeSettings />
      </Col>
      <Col lg={6}>{/* <PaypalSettings/> */}</Col>
      <Col lg={6}>{/* <SSLCommerceSettings /> */}</Col>
    </Row>
  );
};

export default PaymentSettings;
