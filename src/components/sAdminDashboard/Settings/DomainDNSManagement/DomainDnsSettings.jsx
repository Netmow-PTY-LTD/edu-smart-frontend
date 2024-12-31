import React from 'react';
import DomainForm from './DomainForm';
import DNSRecords from './DNSRecords';
import { Col, Row } from 'reactstrap';
import DNSModal from '../modals/DNSModal';

const DomainDnsSettings = () => {
  return (
    <Row>
      <Row>
        <Col lg={12} sm={12}>
          <DomainForm />
        </Col>
      </Row>
      <Row lg={12} sm={12}>
        <Col lg={3} md={6} sm={12}>
          <DNSRecords />
        </Col>
      </Row>
    </Row>
  );
};

export default DomainDnsSettings;
