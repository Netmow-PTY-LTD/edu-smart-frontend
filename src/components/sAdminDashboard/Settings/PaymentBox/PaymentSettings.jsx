import React from 'react';
import StripeSettings from './StripeSettings';
import { Col, Row } from 'reactstrap';
import SSLCommerceSettings from './SSLCommerceSettings';

const PaymentSettings = () => {
  return (
    <Row>
     <Col lg={6} >
     <StripeSettings/>
     </Col>
     <Col lg={6} >
     <SSLCommerceSettings/>
     </Col>
    
    </Row>
  );
};

export default PaymentSettings;