/* eslint-disable react/no-unescaped-entities */
import Footer from '@/components/Footer/footer';
import Header from '@/components/Header/header';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
// import bannerImg from '@/public/assets/img/hero-bg.png';

import validator from 'validator';

import { seoMetaForSuperAdmin } from '@/slices/dashboard/superAdminDashboard/superAdminActions/seoMetaDataActions';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TemplateBanner from './common/TemplateBanner';

const MainContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');

  const onInputBlur = (event) => {
    const { name, value } = event.target;
    if (name == 'name') {
      if (value?.trim() === '') {
        setName('');
        setNameError('Name is required.');
      } else if (value?.trim().length < 3) {
        setNameError('Name must be at least 3 characters long.');
      } else {
        setNameError('');
      }
    }
    if (name == 'email') {
      if (validator.isEmail(value)) {
        setEmailError('');
      } else {
        setEmailError('Invalid email.');
      }
    }
    if (name == 'phone') {
      if (validator.isMobilePhone(value)) {
        setPhoneError('');
      } else {
        setPhoneError('Invalid phone number.');
      }
    }
    if (name == 'subject') {
      if (value?.trim() === '') {
        setSubjectError('Subject is required.');
      } else {
        setSubjectError('');
      }
    }
    if (name == 'message') {
      if (value?.trim() === '') {
        setMessageError('Message is required.');
      } else {
        setMessageError('');
      }
    }
  };

  const handleContactMessageSubmit = async (e) => {
    e.preventDefault();
    resetErrors();
    const formErrors = {};
    if (name === '') {
      setNameError('Name is required.');
      formErrors.name = true;
    }
    if (name.length < 3) {
      setNameError('Name must be at least 3 characters long.');
      formErrors.name = true;
    }
    if (email === '') {
      setEmailError('Email is required.');
      formErrors.email = true;
    }
    if (phone === '') {
      setPhoneError('Phone is required.');
      formErrors.phone = true;
    }
    if (subject === '') {
      setSubjectError('Subject is required.');
      formErrors.subject = true;
    }
    if (message === '') {
      setMessageError('Message is required.');
      formErrors.message = true;
    }
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    const data = {
      name,
      email,
      phone,
      subject,
      message,
    };
    try {
      axios
        .post(
          process.env.NEXT_PUBLIC_BASE_URL_PROD +
            `/public/api/v1/sadmin/website/contact-message/`,
          data
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data.message);
          }
          resetInputs();
          resetErrors();
        })
        .catch((error) => {
          if (error.response.status === 400 || error.response.status === 404) {
            toast.error('Data missing! All fields are required!');
          } else {
            toast.error('Server Error! Please try again later.');
          }
          // Reset Fields
          resetErrors();
        });
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const resetInputs = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };
  const resetErrors = () => {
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setSubjectError('');
    setMessageError('');
  };

  //Meta Data

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(seoMetaForSuperAdmin());
  }, [dispatch]);

  const {
    data: SEOMetaData,
    isLoading: seoMetaIsLoading,
    error: seoMetaError,
  } = useSelector((state) => state.SuperAdminDashboard.seoMetaForSuperAdmin);

  // Meta data
  let metaTitle =
    'Contact Us to Claim your FREE Sports Club Management Software';
  let metaDescription =
    'Claim you FREE Sports Club Management Software for Sports Clup and High School Sports Team. Manage Unlimited Coaches, Trainers, Students with SquadDeck.';
  let metaKeywords =
    'SquadDeck, Sports Management Software, Sports Management Software for FREE, Sports Team management app, FREE Sports Club Management Software, Best Sports Club Management Software, High School Sports team management app, sports team management software';
  let metaImage = '/images/meta/default_meta_image.jpg';

  if (SEOMetaData) {
    metaTitle = SEOMetaData[0]?.contact?.title || metaTitle;
    metaDescription = SEOMetaData[0]?.contact?.description || metaDescription;
    metaKeywords = SEOMetaData[0]?.contact?.keywords || metaKeywords;
    metaImage = SEOMetaData[0]?.contact_feature_image?.secure_url || metaImage;
  }

  return (
    <Fragment>
      <Head>
        <meta name="author" content={`SquadDeck`} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:image:secure_url" content={metaImage} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        <title>{metaTitle}</title>
      </Head>
      <Header />
      <ToastContainer />
      <TemplateBanner
        title="Contact"
        subtitle="CONTACT"
        bgImage="template1/assets/img/news_banner_bg.png"
      />
      <section className="sqdk-contact">
        <div className="container">
          <div className="sqdk-contact-content">
            <div className="sqdk-contact-content-left">
              <div className="sqdk-contact-text">
                <h2>Get In Touch</h2>
                <p className="text-wrap">
                  Contact SquadDeck to inquire further and secure a ticket for
                  round-the-clock assistance. Avail yourself of the opportunity
                  to request a demo website and receive a complimentary
                  consultation for enhanced comprehension. By reaching out to
                  SquadDeck, you can gain additional information and guidance,
                  ensuring a seamless experience.Take advantage of our 24/7
                  support services and explore the possibilities we offer.
                  Experience top-notch customer support and access valuable
                  resources to meet your needs. Don't hesitate, reach out today.
                  To get in touch with us, simply submit a request or send a
                  message to &nbsp;
                  <a
                    className="fw-bold text-decoration-underline"
                    href="mailto:hello@squaddeck.com"
                    rel="noopener noreferrer"
                  >
                    hello@squaddeck.com
                  </a>
                  &nbsp; or Call us:{' '}
                  <span className="fw-bold">+61 477 937 937</span>
                </p>
              </div>
            </div>
            <div className="sqdk-contact-content-right">
              <div className="contact-form">
                <form onSubmit={handleContactMessageSubmit}>
                  <div className="sqdk-form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={onInputBlur}
                    />
                    {nameError && (
                      <div className="error-message">{nameError}</div>
                    )}
                  </div>
                  <div className="sqdk-form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={onInputBlur}
                    />
                    {emailError && (
                      <div className="error-message">{emailError}</div>
                    )}
                  </div>
                  <div className="sqdk-form-group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Your Phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={onInputBlur}
                    />
                    {phoneError && (
                      <div className="error-message">{phoneError}</div>
                    )}
                  </div>
                  <div className="sqdk-form-group">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Subject"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      onBlur={onInputBlur}
                    />
                    {subjectError && (
                      <div className="error-message">{subjectError}</div>
                    )}
                  </div>
                  <div className="sqdk-form-group">
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Write your message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onBlur={onInputBlur}
                    ></textarea>
                    {messageError && (
                      <div className="error-message">{messageError}</div>
                    )}
                  </div>
                  <div className="form-btn">
                    <button type="submit" className="contact-form-btn">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default MainContact;
