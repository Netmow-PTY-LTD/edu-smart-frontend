import Footer from '@/components/main/common/Footer';
import Header from '@/components/main/common/Header';
import Link from 'next/link';
import React from 'react';

const TermsAndConditions = () => {
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
              <h1 className="text-nowrap">Edu Smart : Terms of Service</h1>
            </div>
            <div className="sqdk-breadcrumb fs-2">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>TERMS AND Service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <main>
        <div className="container">
          <style>{`
            .terms_and_policy {
              padding: 8rem 0 10rem;
            }

            .terms_and_policy h3 {
              color: #000;
              font-size: 3.8rem;
              font-weight: 600;
              line-height: 1;
              margin: 1rem 0;
            }

            .terms_and_policy h4 {
              font-size: 28px;
              color: #000;
            }

            .terms_and_policy p {
              color: #000;
              font-size: 1.8rem;
              font-weight: 400;
              line-height: 2rem;
              margin-top: 10px;
              margin-bottom: 1.5rem !important;
            }

            .terms_and_policy b {
              font-weight: 600;
              margin-bottom: 3rem;
            }

            .terms_and_policy a {
              text-decoration: underline;
              color: inherit;
            }
            
          `}</style>
          
          <div className="container my-5">
            <div className="text-center mb-4">
              <h1 className="fw-bold">Terms and Conditions</h1>
              <p className="text-muted">
                Effective Date: <strong>12 February 2025</strong>
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="fw-semibold mb-2 fs-15">1. Overview</h3>
              <p className="text-muted mb-0">
                Edusmart provides students worldwide with comprehensive guidance on
                studying abroad, from selecting the right course to securing a study visa.
                Our platform offers resources, articles, blog posts, and expert advice to
                make the application process easier and more efficient.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="fw-semibold mb-2 fs-15">2. Eligibility</h3>
              <p className="text-muted mb-0">
                To use Edusmart, you must be at least 18 years old or have the consent of
                a legal guardian. By using our services, you confirm that you meet the
                eligibility requirements.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="fw-semibold mb-2 fs-15">3. User Account</h3>
              <p className="text-muted mb-0">
                To access certain features of Edusmart, you may be required to create a
                user account. You agree to provide accurate, current, and complete
                information during the registration process and maintain the security of
                your login credentials.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="fw-semibold mb-2 fs-15">4. Use of Services</h3>
              <p className="text-muted mb-0">
                Edusmart’s services are intended solely for individuals seeking guidance
                on studying abroad. You agree not to use our platform for any unlawful,
                harmful, or unauthorized purpose.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="fw-semibold mb-2 fs-15">5. Content</h3>
              <p className="text-muted mb-0">
                All content on the Edusmart platform, including articles, blogs,
                resources, and advice, is for informational purposes only. While we strive
                to provide accurate and up-to-date information, Edusmart does not
                guarantee the completeness, accuracy, or reliability of any content
                provided.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="fw-semibold mb-2 fs-15">6. Third-Party Links</h3>
              <p className="text-muted mb-0">
                Edusmart may contain links to third-party websites or services that are
                not owned or controlled by us. We are not responsible for the content,
                privacy practices, or services provided by third-party websites.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="fw-semibold mb-2 fs-15">7. Privacy Policy</h3>
              <p className="text-muted mb-0">
                Your use of Edusmart is also governed by our Privacy Policy, which
                outlines how we collect, use, and protect your personal data.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h3 className="fw-semibold mb-2 fs-15">8. Fees and Payments</h3>
              <p className="text-muted mb-0">
                Some services provided by Edusmart may involve fees. If you choose to
                subscribe to premium features or services, you agree to pay the applicable
                fees and comply with the payment terms.
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="fw-semibold mb-2 fs-15">9. Disclaimer of Warranties</h3>
              <p className="text-muted mb-0">
                Edusmart provides its services "as-is" without any warranties, express or
                implied. We do not guarantee that the platform will be error-free or
                uninterrupted.
              </p>
            </div>
          </div>

          {/* <div className="terms_and_policy">
            <div className="container my-5">
              <h3
                className="code-line border-bottom pb-4"
                data-line-start="0"
                data-line-end="1"
              >
                <a id="Terms_and_Conditions_0"></a>
                <strong>Terms and Conditions</strong>
              </h3>

              <p
                className="has-line-data fw-bold"
                data-line-start="2"
                data-line-end="3"
              >
                Effective Date: 12 February 2025
              </p>

              <p
                className="has-line-data"
                data-line-start="4"
                data-line-end="5"
              >
                Welcome to Edusmart! By accessing or using our website and
                services, you agree to be bound by the following Terms and
                Conditions. Please read them carefully. If you do not agree to
                these terms, you should not use the Edusmart platform.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="6"
                data-line-end="7"
              >
                <a id="1_Overview_6"></a>
                <strong>1. Overview</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="7"
                data-line-end="8"
              >
                Edusmart provides students worldwide with comprehensive guidance
                on studying abroad, from selecting the right course to securing
                a study visa. Our platform offers resources, articles, blog
                posts, and expert advice to make the application process easier
                and more efficient.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="9"
                data-line-end="10"
              >
                <a id="2_Eligibility_9"></a>
                <strong>2. Eligibility</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="10"
                data-line-end="11"
              >
                To use Edusmart, you must be at least 18 years old or have the
                consent of a legal guardian. By using our services, you confirm
                that you meet the eligibility requirements.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="12"
                data-line-end="13"
              >
                <a id="3_User_Account_12"></a>
                <strong>3. User Account</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="13"
                data-line-end="14"
              >
                To access certain features of Edusmart, you may be required to
                create a user account. You agree to provide accurate, current,
                and complete information during the registration process and
                maintain the security of your login credentials.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="15"
                data-line-end="16"
              >
                <a id="4_Use_of_Services_15"></a>
                <strong>4. Use of Services</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="16"
                data-line-end="17"
              >
                Edusmart’s services are intended solely for individuals seeking
                guidance on studying abroad. You agree not to use our platform
                for any unlawful, harmful, or unauthorized purpose.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="18"
                data-line-end="19"
              >
                <a id="5_Content_18"></a>
                <strong>5. Content</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="19"
                data-line-end="20"
              >
                All content on the Edusmart platform, including articles, blogs,
                resources, and advice, is for informational purposes only. While
                we strive to provide accurate and up-to-date information,
                Edusmart does not guarantee the completeness, accuracy, or
                reliability of any content provided.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="21"
                data-line-end="22"
              >
                <a id="6_ThirdParty_Links_21"></a>
                <strong>6. Third-Party Links</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="22"
                data-line-end="23"
              >
                Edusmart may contain links to third-party websites or services
                that are not owned or controlled by us. We are not responsible
                for the content, privacy practices, or services provided by
                third-party websites.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="24"
                data-line-end="25"
              >
                <a id="7_Privacy_Policy_24"></a>
                <strong>7. Privacy Policy</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="25"
                data-line-end="26"
              >
                Your use of Edusmart is also governed by our Privacy Policy,
                which outlines how we collect, use, and protect your personal
                data.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="27"
                data-line-end="28"
              >
                <a id="8_Fees_and_Payments_27"></a>
                <strong>8. Fees and Payments</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="28"
                data-line-end="29"
              >
                Some services provided by Edusmart may involve fees. If you
                choose to subscribe to premium features or services, you agree
                to pay the applicable fees and comply with the payment terms.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="30"
                data-line-end="31"
              >
                <a id="9_Disclaimer_of_Warranties_30"></a>
                <strong>9. Disclaimer of Warranties</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="31"
                data-line-end="32"
              >
                Edusmart provides its services “as is” and “as available.” We do
                not warrant that the platform will be error-free or that access
                to the platform will be uninterrupted.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="33"
                data-line-end="34"
              >
                <a id="10_Limitation_of_Liability_33"></a>
                <strong>10. Limitation of Liability</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="34"
                data-line-end="35"
              >
                In no event shall Edusmart be liable for any direct, indirect,
                incidental, special, or consequential damages arising from your
                use of our services.
              </p>

              <h4
                className="code-line text-dark mt-4"
                data-line-start="36"
                data-line-end="37"
              >
                <a id="11_Indemnification_36"></a>
                <strong>11. Indemnification</strong>
              </h4>

              <p
                className="has-line-data"
                data-line-start="37"
                data-line-end="38"
              >
                You agree to indemnify, defend, and hold harmless Edusmart, its
                affiliates, employees, and partners from any claims, losses, or
                damages.
              </p>
            </div>
          </div> */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
