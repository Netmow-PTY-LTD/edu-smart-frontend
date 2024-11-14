import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';

const PrivacyPolicyMain = () => {
  return (
    <>
      <Header />

      <section
        className="sqdk-page-banner"
        style={{ backgroundImage: `url('/assets/img/hero-bg.png')` }}
      >
        <div className="main-container">
          <div className="sqdk-page-banner-content">
            <div className="sqdk-page-banner-text-content">
              <h1>Privacy Policy</h1>
            </div>
            <div className="sqdk-breadcrumb fs-2">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <main>
        <div class="container">
          <style>
            {`.terms_and_policy {
              padding: 5rem 0 10rem;
          }
      
          .terms_and_policy h3 {
              color: #000;
              font-size: 2rem;
              font-weight: 600;
              line-height: 1;
              margin: 1rem 0;
          }
      
          .terms_and_policy p {
              color: #000;
              font-size: 1.4rem;
              font-weight: 400;
              line-height: 2rem;
              margin-bottom: 3rem;
          }`}
          </style>
          <div class="terms_and_policy">
            <h3>Privacy Policy for SquadDeck</h3>
            <p>
              At SquadDeck, we are committed to protecting the privacy of our
              users. This Privacy Policy applies to all information collected or
              submitted through our software, including personal information,
              and explains how we use and protect that information.
            </p>
            <h3>In terms of Information Collection and Use</h3>
            <p>
              We collect personal information from our users, such as name,
              email address, and phone number, and card information in order to
              provide our services and communicate with our users. We also
              collect information about our users' sports club and team
              preferences in order to personalise their experience and provide
              relevant content. We use this information to provide our services,
              communicate with our users, and improve our software.
            </p>
            <h3>Sharing of Information</h3>
            <p>
              We will never share personal information with third parties
              without your explicit consent, except in cases where we are
              required by law to do so. We may share aggregate or
              non-identifying information with partners or other third parties
              for research or marketing purposes.
            </p>
            <h3>Security Issues</h3>
            <p>
              We take reasonable measures to protect personal information from
              loss, misuse, unauthorised access, disclosure, alteration, and
              destruction. We use industry-standard encryption and other
              security measures to protect personal information.
            </p>
            <h3>Changes to the Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify our users of any changes by posting the new Privacy Policy
              on our website. Users will be responsible for regularly reviewing
              the Privacy Policy to stay informed about our information
              collection and use practices.
            </p>
            <h3>Acceptance of the Privacy Policy</h3>
            <p>
              By using our software and system, you acknowledge that you have
              read and understood this Privacy Policy and agree to be bound by
              its terms. If you do not agree to the terms of this Privacy
              Policy, please Contact Us for more information and use our
              software.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicyMain;
