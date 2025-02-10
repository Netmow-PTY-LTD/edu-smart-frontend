import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Col, Row } from 'reactstrap';
import { footerLogo, footerShape } from '@/utils/common/data';
import Subscription from './Subscription';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-top">
          <Row>
            <Col lg={5} md={12}>
              <Link href="/" className="ft-logo">
                <Image
                  src={footerLogo}
                  width={191}
                  height={48}
                  alt="Footer Logo"
                />
              </Link>
              <p className="footer-text">
                EduSmart is a comprehensive online platform designed to empower
                students in their educational journey by providing them with
                access to a wide variety of high-quality courses. EduSmart
                offers a diverse range of learning opportunities. Our platform
                is dedicated to helping students of all backgrounds and academic
                levels to achieve their goals and reach their full potential,
                making learning more accessible, flexible, and engaging.
              </p>
              <div className="address-main">
                <b>Address: </b> Parklane OUG Block B1 Block B2, Jalan 1/152,
                Taman Perindustrian Oug, 58200 Kuala Lumpur, Wilayah Persekutuan
                Kuala Lumpur
              </div>
            </Col>
            <Col lg={2} md={12}>
              <h3>Quick Links</h3>
              <div className="footer-menu">
                <ul>
                  <li>
                    <Link href="/university/courses">All Courses</Link>
                  </li>
                  <li>
                    <Link href="/universities">Universities</Link>
                  </li>
                  <li>
                    <Link href="/blogs">Blogs</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={5} md={12}>
              <h3>Subscribe</h3>

              <p>
                Join our newsletter to stay up to date on features and releases.
              </p>

              <Subscription />
              <p>
                By subscribing you agree to our Privacy Policy and provide
                consent to receive updates from our company.
              </p>
            </Col>
          </Row>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>
              Copyright &copy; {new Date().getFullYear()} || All rights reserved
              by <Link href="/">EduSmart</Link>
            </p>
          </div>
          <div className="footer-bottom-middle">
            <Link href="#">Terms of Service</Link>
            <Link href="#">Privacy Policy</Link>
          </div>
          <div className="footer-bottom-right">
            <Link href="#" className="fb">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M22 13.1661C22 7.60949 17.5229 3.10498 12 3.10498C6.47715 3.10498 2 7.60949 2 13.1661C2 18.1878 5.65684 22.3502 10.4375 23.105V16.0744H7.89844V13.1661H10.4375V10.9495C10.4375 8.42794 11.9305 7.0351 14.2146 7.0351C15.3088 7.0351 16.4531 7.23161 16.4531 7.23161V9.70759H15.1922C13.95 9.70759 13.5625 10.4832 13.5625 11.2789V13.1661H16.3359L15.8926 16.0744H13.5625V23.105C18.3432 22.3502 22 18.188 22 13.1661Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16 4.10498H8C5.23858 4.10498 3 6.34356 3 9.10498V17.105C3 19.8664 5.23858 22.105 8 22.105H16C18.7614 22.105 21 19.8664 21 17.105V9.10498C21 6.34356 18.7614 4.10498 16 4.10498ZM19.25 17.105C19.2445 18.8976 17.7926 20.3495 16 20.355H8C6.20735 20.3495 4.75549 18.8976 4.75 17.105V9.10498C4.75549 7.31233 6.20735 5.86047 8 5.85498H16C17.7926 5.86047 19.2445 7.31233 19.25 9.10498V17.105ZM16.75 9.35498C17.3023 9.35498 17.75 8.90726 17.75 8.35498C17.75 7.8027 17.3023 7.35498 16.75 7.35498C16.1977 7.35498 15.75 7.8027 15.75 8.35498C15.75 8.90726 16.1977 9.35498 16.75 9.35498ZM12 8.60498C9.51472 8.60498 7.5 10.6197 7.5 13.105C7.5 15.5903 9.51472 17.605 12 17.605C14.4853 17.605 16.5 15.5903 16.5 13.105C16.5027 11.9107 16.0294 10.7646 15.1849 9.92006C14.3404 9.07557 13.1943 8.60232 12 8.60498ZM9.25 13.105C9.25 14.6238 10.4812 15.855 12 15.855C13.5188 15.855 14.75 14.6238 14.75 13.105C14.75 11.5862 13.5188 10.355 12 10.355C10.4812 10.355 9.25 11.5862 9.25 13.105Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M17.1761 5.10498H19.9362L13.9061 11.8824L21 21.105H15.4456L11.0951 15.5116L6.11723 21.105H3.35544L9.80517 13.8558L3 5.10498H8.69545L12.6279 10.2176L17.1761 5.10498ZM16.2073 19.4804H17.7368L7.86441 6.64426H6.2232L16.2073 19.4804Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.5 4.10498C3.67157 4.10498 3 4.77655 3 5.60498V20.605C3 21.4334 3.67157 22.105 4.5 22.105H19.5C20.3284 22.105 21 21.4334 21 20.605V5.60498C21 4.77655 20.3284 4.10498 19.5 4.10498H4.5ZM8.52076 8.1077C8.52639 9.06395 7.81061 9.65317 6.96123 9.64895C6.16107 9.64473 5.46357 9.0077 5.46779 8.10911C5.47201 7.26395 6.13998 6.58473 7.00764 6.60442C7.88795 6.62411 8.52639 7.26958 8.52076 8.1077ZM12.2797 10.8667H9.75971H9.7583V19.4266H12.4217V19.2269C12.4217 18.847 12.4214 18.467 12.4211 18.0869C12.4203 17.0731 12.4194 16.0582 12.4246 15.0447C12.426 14.7986 12.4372 14.5427 12.5005 14.3078C12.7381 13.4303 13.5271 12.8636 14.4074 13.0029C14.9727 13.0914 15.3467 13.4191 15.5042 13.9521C15.6013 14.2853 15.6449 14.6439 15.6491 14.9913C15.6605 16.0389 15.6589 17.0865 15.6573 18.1342C15.6567 18.504 15.6561 18.874 15.6561 19.2438V19.4252H18.328V19.2199C18.328 18.7679 18.3278 18.316 18.3275 17.8641C18.327 16.7346 18.3264 15.6051 18.3294 14.4752C18.3308 13.9647 18.276 13.4613 18.1508 12.9677C17.9638 12.2336 17.5771 11.6261 16.9485 11.1874C16.5027 10.8752 16.0133 10.6741 15.4663 10.6516C15.404 10.649 15.3412 10.6456 15.2781 10.6422C14.9984 10.6271 14.7141 10.6117 14.4467 10.6656C13.6817 10.8189 13.0096 11.1691 12.5019 11.7864C12.4429 11.8572 12.3852 11.9291 12.2991 12.0364L12.2797 12.0607V10.8667ZM5.68164 19.4294H8.33242V10.8723H5.68164V19.4294Z"
                  fill="white"
                />
              </svg>
            </Link>
            <Link href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M21.593 8.06531C21.4791 7.64271 21.2565 7.25732 20.9474 6.94748C20.6383 6.63764 20.2534 6.41417 19.831 6.29931C18.265 5.86931 12 5.86231 12 5.86231C12 5.86231 5.73602 5.85531 4.16902 6.26631C3.74695 6.38646 3.36285 6.61309 3.05359 6.92445C2.74433 7.2358 2.52031 7.62143 2.40302 8.04431C1.99002 9.61031 1.98602 12.8583 1.98602 12.8583C1.98602 12.8583 1.98202 16.1223 2.39202 17.6723C2.62202 18.5293 3.29702 19.2063 4.15502 19.4373C5.73702 19.8673 11.985 19.8743 11.985 19.8743C11.985 19.8743 18.25 19.8813 19.816 19.4713C20.2385 19.3567 20.6238 19.1337 20.9337 18.8245C21.2436 18.5153 21.4674 18.1305 21.583 17.7083C21.997 16.1433 22 12.8963 22 12.8963C22 12.8963 22.02 9.63131 21.593 8.06531ZM9.99603 15.8673L10.001 9.86731L15.208 12.8723L9.99603 15.8673Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-shape">
        <Image
          src={footerShape}
          width={177}
          height={177}
          alt="Footer Shape"
          style={{ width: '17.7rem', height: '17.7rem' }}
        />
      </div>
    </footer>
  );
}
