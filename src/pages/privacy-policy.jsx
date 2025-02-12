import Footer from '@/components/main/common/Footer';
import Header from '@/components/main/common/Header';
import Link from 'next/link';
import React from 'react';

const PrivacyPolicy = () => {
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
              <h1 className="text-nowrap">Edu Smart : Privacy Policy</h1>
            </div>
            <div className="sqdk-breadcrumb fs-18">
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
        <div className="container">
          <style>{`
            .privacy_policy {
              padding: 8rem 0 10rem;
            }

            .privacy_policy h3 {
              color: #000;
              font-size: 3.8rem;
              font-weight: 600;
              line-height: 1;
              margin: 1rem 0;
            }

            .privacy_policy h4 {
              font-size: 28px;
              color: #000;
            }

            .privacy_policy p {
              color: #000;
              font-size: 1.8rem;
              font-weight: 400;
              line-height: 2rem;
              margin-top: 10px;
              margin-bottom: 1.5rem !important;
            }

            .privacy_policy b {
              font-weight: 600;
              margin-bottom: 3rem;
            }

            .privacy_policy a {
              text-decoration: underline;
              color: inherit;
            }
            
             .privacy_policy ul li {
             font-size: 20px;
              line-height: 1.5;
              margin-bottom: 5px;
             }
          `}</style>

          <div className="privacy_policy">
            <div className="container">
              <h3 className="border-bottom pb-4">
                <strong>Privacy Policy</strong>
              </h3>

              <div className="fw-bold fs-20">
                Effective Date: 12 February 2025
              </div>

              <p className="mt-4">
                At Edusmart, we are committed to protecting and respecting your
                privacy. This Privacy Policy explains how we collect, use, and
                protect your personal information when you use our website and
                services. By using Edusmart, you agree to the terms of this
                policy.
              </p>

              <h4 className="text-dark mt-4">
                <strong>1. Information We Collect</strong>
              </h4>
              <p>
                We collect different types of information to provide you with an
                efficient and personalized experience on our platform:
              </p>
              <ul>
                <li>
                  <strong>Personal Information:</strong> Name, email, phone
                  number, and academic background.
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages visited, time spent, and
                  platform interactions.
                </li>
                <li>
                  <strong>Cookies & Tracking Technologies:</strong> Used to
                  enhance site performance.
                </li>
              </ul>

              <h4 className="text-dark mt-4">
                <strong>2. How We Use Your Information</strong>
              </h4>
              <p>We use the collected data for:</p>
              <ul>
                <li>
                  <strong>Providing Services:</strong> Personalized study-abroad
                  guidance.
                </li>
                <li>
                  <strong>Communication:</strong> Newsletters and promotional
                  content (opt-out available).
                </li>
                <li>
                  <strong>Improvement of Services:</strong> Analyzing user
                  trends for better offerings.
                </li>
                <li>
                  <strong>Security:</strong> Protecting accounts and data
                  integrity.
                </li>
              </ul>

              <h4 className="text-dark mt-4">
                <strong>3. How We Share Your Information</strong>
              </h4>
              <p>We do not sell or rent your data but may share it with:</p>
              <ul>
                <li>
                  <strong>Service Providers:</strong> Trusted third-party
                  partners like payment processors.
                </li>
                <li>
                  <strong>Legal Compliance:</strong> If required by law or
                  regulatory authorities.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the case of mergers or
                  acquisitions.
                </li>
              </ul>

              <h4 className="text-dark mt-4">
                <strong>4. Data Security</strong>
              </h4>
              <p>
                We use industry-standard encryption (SSL) and secure servers to
                protect your data. However, no online platform is 100% secure.
              </p>

              <h4 className="text-dark mt-4">
                <strong>5. Your Rights and Choices</strong>
              </h4>
              <p>You have the right to:</p>
              <ul>
                <li>
                  <strong>Access & Update:</strong> Modify your account details.
                </li>
                <li>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing emails
                  anytime.
                </li>
                <li>
                  <strong>Data Deletion:</strong> Request account and data
                  removal.
                </li>
              </ul>

              <h4>
                <strong>6. Third-Party Links</strong>
              </h4>
              <p>
                Our website may contain links to external sites. We are not
                responsible for their privacy policies.
              </p>

              <h4 className="text-dark mt-4">
                <strong>7. Cookies and Tracking Technologies</strong>
              </h4>
              <p>
                We use cookies to improve user experience. You can disable them
                through your browser settings, but some features may not
                function properly.
              </p>

              <h4 className="text-dark mt-4">
                <strong>8. International Data Transfers</strong>
              </h4>
              <p>
                Your information may be stored in countries outside your
                residence, adhering to applicable data protection laws.
              </p>

              <h4 className="text-dark mt-4">
                <strong>9. Children’s Privacy</strong>
              </h4>
              <p>
                Our services are not intended for children under 13. If we
                inadvertently collect data from minors, we will delete it.
              </p>

              <h4 className="text-dark mt-4">
                <strong>10. Changes to This Privacy Policy</strong>
              </h4>
              <p>
                We may update this policy, and changes will be reflected with a
                revised "Effective Date."
              </p>

              <h4 className="text-dark mt-4">
                <strong>11. Contact Us</strong>
              </h4>
              <p>If you have any questions, contact us at:</p>
              <ul>
                <li>
                  <strong>Email:</strong> support@edusmart.com
                </li>
                <li>
                  <strong>Phone:</strong> 0123456789
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
