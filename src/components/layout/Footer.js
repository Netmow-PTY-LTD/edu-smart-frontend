import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Footer = () => {
  return (
    <>
      <footer id="dashboardFooter" className="footer-dh admin_footer ">
        <Container fluid>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} &copy; EduSmart.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Develop by Inleads It.
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
