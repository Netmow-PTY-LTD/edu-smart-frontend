/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useState } from 'react';
// import bannerImg from '../../public/assets/img/hero-bg.png';
import TemplateLayout from '@/components/templates/TemplateLayout';
import {
  getSubdomain,
  getSubdomainHelperFunction,
} from '@/slices/helper/getSubdomain';
import axios from 'axios';

import validator from 'validator';

import { colorSecondary } from '@/components/constants/utils/themeUtils';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TemplateBanner from './common/TemplateBanner';

const ClientContact = () => {
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
      if (value?.trim() === '') {
        setEmail('');
        setEmailError('Email is required.');
      } else if (validator.isEmail(value)) {
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

  const handleAdminContactSubmit = async (e) => {
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
            `/public/api/v1/admin/website/contact-message/${getSubdomainHelperFunction()}`,
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

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const dispatch = useDispatch();

  const bgImageUrl =
    themeData.sports_category === 'Basketball'
      ? '/template1/assets/img/basketball/contact_bg.jpg'
      : '/template1/assets/img/news_banner_bg.png';

  return (
    <Fragment>
      <Head>
        <meta
          name="author"
          content={`${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}
        />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <meta
          property="og:title"
          content={`Contact | ${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}
        />
        <meta
          property="og:description"
          content="Central Stars Basketball Club welcomes junior basketball players aged 5 to 19 and runs teams in all junior-age competitions."
        />
        <meta
          property="og:site_name"
          content={`${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}
        />
        <meta
          property="og:image"
          content="/template1/assets/img/basketball/meta_img.png"
        />
        <meta
          property=" og:image:secure_url"
          content="/template1/assets/img/basketball/meta_img.png"
        />
        <meta
          property="og:image:alt"
          content={`${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}
        />
        <meta
          name="twitter:title"
          content={`Contact | ${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}
        />
        <meta
          name="twitter:description"
          content="Central Stars Basketball Club welcomes junior basketball players aged 5 to 19 and runs teams in all junior-age competitions."
        />
        <meta
          name="twitter:image"
          content="/template1/assets/img/basketball/meta_img.png"
        />
        <title>{`Contact | ${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}</title>
      </Head>
      <TemplateLayout>
        <ToastContainer />
        <TemplateBanner
          title="Contact"
          subtitle="CONTACT"
          bgImage={bgImageUrl}
        />
        <section className="sqdk-contact">
          <div className="container">
            <div className="sqdk-contact-content">
              <div className="sqdk-contact-content-left">
                <div className="sqdk-contact-text-temp">
                  <h2 style={colorSecondary(themeData)}>Get In Touch</h2>
                  {themeData?.subdomain ? (
                    <p className="text-wrap">
                      We appreciate your interest in our sports club! Whether
                      you have questions, comments, or suggestions, we'd love to
                      hear from you. Our team is here to assist you and provide
                      any information you may need.
                    </p>
                  ) : (
                    <p className="text-wrap">
                      Contact SquadDeck to inquire further and secure a ticket
                      for round-the-clock assistance. Avail yourself of the
                      opportunity to request a demo website and receive a
                      complimentary consultation for enhanced comprehension. By
                      reaching out to SquadDeck, you can gain additional
                      information and guidance, ensuring a seamless
                      experience.Take advantage of our 24/7 support services and
                      explore the possibilities we offer. Experience top-notch
                      customer support and access valuable resources to meet
                      your needs. Don't hesitate, reach out today. To get in
                      touch with us, simply submit a request or send a message
                      to <span className="fw-bold">hello@squaddeck.app</span> or{' '}
                      <span className="fw-bold">Call us: +61 477 937 937</span>
                    </p>
                  )}
                </div>
                {themeData?.subdomain && (
                  <div className="contact-info-list">
                    <div className="contact-info">
                      <figure>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.4rem"
                          height="2.4rem"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill={`${themeData?.branding?.primary_color?.trim() || '#9344e8'}`}
                            d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"
                          ></path>
                        </svg>
                      </figure>
                      <p>
                        <span>
                          {`${themeData?.branding?.address1 || '18 Marbella Dr'}`}
                          <br /> {`${themeData?.branding?.address2 || ''}`}{' '}
                          {`${themeData?.branding?.city || 'Benowa'}`}{' '}
                          {`${themeData?.branding?.state || 'QLD'}`}{' '}
                          {`${themeData?.branding?.zip || '4217'}`}{' '}
                          {`${themeData?.branding?.country || 'Australia'}`}
                        </span>
                      </p>
                    </div>
                    <div className="contact-info">
                      <figure>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.4rem"
                          height="2.4rem"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill={`${themeData?.branding?.primary_color?.trim() || '#9344e8'}`}
                            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"
                          ></path>
                        </svg>
                      </figure>
                      <p>
                        <a
                          href={`tel:${themeData?.branding?.phone}`}
                        >{`${themeData?.branding?.phone}`}</a>
                        <br />
                      </p>
                    </div>
                    <div className="contact-info">
                      <figure>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.4rem"
                          height="2.4rem"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill={`${themeData?.branding?.primary_color?.trim() || '#9344e8'}`}
                            d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5l-8-5h16m0 12H4V8l8 5l8-5v10Z"
                          ></path>
                        </svg>
                      </figure>
                      <p>
                        <a href={`mailto:${themeData?.branding?.email}`}>
                          {themeData?.branding?.email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="sqdk-contact-content-right">
                <div className="contact-form">
                  <form onSubmit={handleAdminContactSubmit}>
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
                      <button
                        className="btn btn-lg fw-semibold fs-2 px-4 py-2"
                        style={{
                          cursor: 'pointer',
                          backgroundColor: `${
                            themeData?.branding?.primary_color?.trim() ||
                            '#9344E8'
                          }`,
                          color: '#fff',
                        }}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </TemplateLayout>
    </Fragment>
  );
};

export default ClientContact;
