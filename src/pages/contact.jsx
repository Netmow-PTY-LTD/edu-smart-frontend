import PageBanner from '@/components/main/common/PageBanner';
import MainLayout from '@/components/main/layout';
import { useCreateContactMutation } from '@/slice/services/public/contact-us/contactUsService';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Col, Row } from 'reactstrap';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [createContact, { isLoading, isError, isSuccess }] =
    useCreateContactMutation();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createContact(formData).unwrap();

      toast.success(response?.message);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      //console.error('Error:', error);
      toast.error('Failed to send message.');
    }
  };

  return (
    <MainLayout>
      <PageBanner
        title="Contact Us"
        bgImage="/assets/images/agent/agent_slider_bg.png"
      />
      <ToastContainer />
      <section className="contact-content">
        <div className="container">
          <Row>
            <Col lg={6}>
              <div className="contact-text-content">
                <h2>Get In Touch </h2>
                <div className="contact-text">
                  You are welcome to reach out to us using the form provided on
                  our website for a quick and convenient way to get in touch.
                  Alternatively, you can send us an email if you prefer a more
                  direct and detailed mode of communication. And if you're
                  someone who still enjoys traditional methods, feel free to
                  give us a call—we’re happy to assist you over the phone as
                  well! Whatever your preferred communication method, we’re here
                  to help and ensure that your questions or concerns are
                  addressed promptly and efficiently.
                </div>
                <div className="contact-info-list">
                  <div className="contact-info">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2.4rem"
                        height="2.4rem"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#b5d336"
                          d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"
                        ></path>
                      </svg>
                    </div>
                    <span>
                      Parklane OUG Block B1 Block B2, Jalan 1/152, Taman
                      Perindustrian Oug, 58200 Kuala Lumpur, Wilayah Persekutuan
                      Kuala Lumpur
                    </span>
                  </div>

                  <div className="contact-info">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2.4rem"
                        height="2.4rem"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#b5d336"
                          d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"
                        ></path>
                      </svg>
                    </div>
                    <span>0123456789</span>
                  </div>

                  <div className="contact-info">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2.4rem"
                        height="2.4rem"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#b5d336"
                          d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5l-8-5h16m0 12H4V8l8 5l8-5v10Z"
                        ></path>
                      </svg>
                    </div>
                    <span>info@edusmart.com</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="contact-form-main">
                <form onSubmit={handleSubmit}>
                  <div className="form-wrapper-main">
                    <div className="form-group mb-4">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        value={formData?.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={formData?.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        placeholder="Your Phone"
                        // value={formData?.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows={5}
                        cols={10}
                        onChange={handleChange}
                        required
                      >
                        Write your message
                      </textarea>
                    </div>
                    <div className="form-group text-center">
                      <button
                        type="submit"
                        className="btn-send"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </MainLayout>
  );
}
