import Image from 'next/image';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import brandLogo from '/public/edusmart-Final-Logo-Final-Logo.png';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer id="dashboardFooter" className="footer-dh admin_footer ">
        <Container fluid>
          <Row>
            <Col sm={6}>
              Copyright &copy; {new Date().getFullYear()} &nbsp; |&nbsp; All
              Rights Reserved by{' '}
              <Link href="/super-admin">
                <Image
                  src={brandLogo}
                  width={100}
                  height={30}
                  alt=""
                  className=""
                />
              </Link>
            </Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                Design & Developed with{' '}
                <i className="ri-heart-fill text-danger"></i> by Inleads IT
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
