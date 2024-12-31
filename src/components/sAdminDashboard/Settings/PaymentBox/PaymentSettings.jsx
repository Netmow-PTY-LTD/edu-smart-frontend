import React from 'react';
import StripeSettings from './StripeSettings';
import { Col, Row } from 'reactstrap';

const PaymentSettings = () => {
  return (
    <Row>
     <Col lg={6} >
     <StripeSettings/>
     </Col>
    
    </Row>
  );
};

export default PaymentSettings;