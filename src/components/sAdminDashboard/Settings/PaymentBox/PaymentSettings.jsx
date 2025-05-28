import React from 'react';
import { Col, Row } from 'reactstrap';
import SSLCommerzSettings from './SSLCommerzSettings';
import StripeSettings from './StripeSettings';

const PaymentSettings = () => {
  return (
    <Row>
      <Col lg={6}>
        <StripeSettings />
      </Col>
      <Col lg={6}>
        <SSLCommerzSettings />
      </Col>
      <Col lg={6}>{/* <PaypalSettings/> */}</Col>
    </Row>
  );
};

export default PaymentSettings;
