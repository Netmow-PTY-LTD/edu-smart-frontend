import Footer from '@/components/Footer/footer';
import Header from '@/components/Header/header';
import VideoPopup from '@/components/Home/video-popup';
import { clients, settings } from '@/data/data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';

export default function MainAbout() {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  const handleVideoClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Header />

      <section
        className="sqdk-page-banner"
        // style={{ backgroundImage: `url(${bannerImg.src})` }}
      >
        <div className="main-container">
          <div className="sqdk-page-banner-content">
            <div className="sqdk-page-banner-text-content">
              <h3 className="text-light mt-5">ABOUT SQUADDECK</h3>
              <h1>
                SquadDeck allows you to link and oversee your athletic
                communities
              </h1>
            </div>
            <div className="sqdk-breadcrumb fs-2 mb-5">
              <ul>
                <li>
                  <Link href="/public">Home</Link>
                </li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ==== About SquadDeck ====== --> */}
      <section className="sqdk-about">
        <div className="container">
          <div className="sqdk-about-content">
            <div className="sqdk-about-left-content">
              <div className="sqdk-about-text">
                <h3 className="wow animate__animated animate__fadeInUp">
                  SquadDeck caters to Sports Clubs, Academies, Trainers,
                  Coaches, and their Members.
                </h3>
                <p className="wow animate__animated animate__fadeInUp">
                  SquadDeck is a software designed to manage Sports Academies or
                  Organisations. With SquadDeck, managing your sports academy,
                  club or organisation is made easy with minimal paperwork. We
                  are a team of enthusiastic software developers, dedicated to
                  improving your youth sports experience by providing smart
                  solutions.
                </p>
                <p>
                  By utilising SquadDeck, sports organisations can easily manage
                  their daily activities, coaches can effectively instruct and
                  manage their teams, athletes can excel at sports and everyone
                  can stay connected with their club, team or athlete.
                </p>
              </div>
            </div>
            <div className="sqdk-about-right-content">
              <div className="sqdk-about-images">
                <div className="img1 wow animate__animated animate__fadeInDown">
                  <Image
                    width={500}
                    height={500}
                    src="/assets/img/about_page/kids1.png"
                    alt=""
                  />
                </div>
                <div className="img2 wow animate__animated animate__fadeInUp">
                  <Image
                    width={500}
                    height={500}
                    src="/assets/img/about_page/kids2.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="sqdk-about-free-trial">
                <div className="sqdk-about-free-trial-inner">
                  <h4>Watch</h4>
                  <p>Out Our Intro Video</p>
                  <Link
                    href="#"
                    className="play-btn-about"
                    onClick={handleVideoClick}
                  >
                    <Image
                      width={500}
                      height={500}
                      src="/assets/img/about_page/play-btn.png"
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <div className="shape-1 wow animate__animated animate__fadeInRight">
                <Image
                  width={500}
                  height={500}
                  src="/assets/img/about_page/ellipse1.png"
                  alt=""
                />
              </div>
              <div className="shape-2">
                {/* <!-- <Image  src="assets/img/ellipse2.png" alt=""> --> */}
              </div>
              <div className="shape-3">
                {/* <!-- <Image  src="assets/img/ellipse3.png" alt=""> --> */}
              </div>
            </div>
          </div>
        </div>
        <VideoPopup show={showPopup} onClose={handleClosePopup} />
      </section>
      {/* <!-- ==== About SquadDeck End ====== --> */}

      {/* <!-- ==== About Page CTA ====== --> */}
      <section
        className="sqdk-about-page-cta"
        style={{
          backgroundImage: `url('/assets/img/about_page/about_cta_bg.png')`,
        }}
      >
        <div className="container">
          <div className="sqdk-about-page-cta-content">
            <h2>Our purpose and long-term objectives</h2>
            <p>
              Our goal is to provide Sports Associations with efficient tools to
              streamline their daily operations, including program coordination,
              player registrations, payment processing, team roster management,
              schedule planning, staff organisation, and field management. By
              taking care of these administrative tasks, we enable them to focus
              on the game and their sports events. We are currently establishing
              a network of Sports organisations and plan to expand our reach
              globally to assist even more clubs in managing their operations
              effectively with SquadDeck.
            </p>
          </div>
        </div>
      </section>
      {/* <!-- ==== About Page CTA End ====== --> */}
      {/* <!-- ==== SquadDeck Values ====== --> */}
      <section className="sqdk-values">
        <div className="container">
          <div className="sqdk-section-heading">
            <h2>Valuable Features that will guide you to Success. </h2>
          </div>
          <div className="sqdk-values-content">
            <div className="sqdk-values-single-item">
              <div className="icon">
                <svg
                  width="38"
                  height="39"
                  viewBox="0 0 38 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_85_500)">
                    <path
                      d="M36.9899 6.00545C37.3445 6.34721 37.4527 6.7522 37.3145 7.22042L28.895 34.1261C28.7871 34.4645 28.5584 34.7069 28.209 34.8533C28.0284 34.9256 27.8364 34.9477 27.6332 34.9195C27.5017 34.9012 27.3624 34.8513 27.2153 34.77L18.301 29.6009L12.1421 34.7219C11.892 34.943 11.5936 35.0295 11.2469 34.9813C11.0795 34.958 10.9454 34.915 10.8444 34.8522C10.6289 34.737 10.4691 34.5716 10.365 34.356C10.261 34.1405 10.2255 33.9132 10.2588 33.6741L11.3855 25.5687L3.4026 20.9313C2.98353 20.7024 2.79014 20.3404 2.82241 19.8453C2.85136 19.3741 3.09166 19.048 3.54331 18.8671L35.7755 5.80008C36.2288 5.6072 36.6336 5.67565 36.9899 6.00545ZM27.1205 32.0333L34.3814 8.85989L6.60513 20.1152L12.2888 23.4095L29.3572 14.1021L18.7989 27.2025L27.1205 32.0333Z"
                      fill="#9344E8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_85_500">
                      <rect
                        width="32.4434"
                        height="33.0228"
                        fill="white"
                        transform="translate(5.46472 0.837402) rotate(7.91391)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h4>Members Management</h4>
              <p>
                Manage your Members, Coaches, Players and Guardians in a Single
                platform with simple Registration.
              </p>
            </div>
            <div className="sqdk-values-single-item">
              <div className="icon">
                <svg
                  width="38"
                  height="39"
                  viewBox="0 0 38 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_85_500)">
                    <path
                      d="M36.9899 6.00545C37.3445 6.34721 37.4527 6.7522 37.3145 7.22042L28.895 34.1261C28.7871 34.4645 28.5584 34.7069 28.209 34.8533C28.0284 34.9256 27.8364 34.9477 27.6332 34.9195C27.5017 34.9012 27.3624 34.8513 27.2153 34.77L18.301 29.6009L12.1421 34.7219C11.892 34.943 11.5936 35.0295 11.2469 34.9813C11.0795 34.958 10.9454 34.915 10.8444 34.8522C10.6289 34.737 10.4691 34.5716 10.365 34.356C10.261 34.1405 10.2255 33.9132 10.2588 33.6741L11.3855 25.5687L3.4026 20.9313C2.98353 20.7024 2.79014 20.3404 2.82241 19.8453C2.85136 19.3741 3.09166 19.048 3.54331 18.8671L35.7755 5.80008C36.2288 5.6072 36.6336 5.67565 36.9899 6.00545ZM27.1205 32.0333L34.3814 8.85989L6.60513 20.1152L12.2888 23.4095L29.3572 14.1021L18.7989 27.2025L27.1205 32.0333Z"
                      fill="#9344E8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_85_500">
                      <rect
                        width="32.4434"
                        height="33.0228"
                        fill="white"
                        transform="translate(5.46472 0.837402) rotate(7.91391)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h4>Multiple Sports</h4>
              <p>
                You can Manage and Control multiple sports under multiple
                Coaches and managers with squadDeck.
              </p>
            </div>
            <div className="sqdk-values-single-item">
              <div className="icon">
                <svg
                  width="38"
                  height="39"
                  viewBox="0 0 38 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_85_500)">
                    <path
                      d="M36.9899 6.00545C37.3445 6.34721 37.4527 6.7522 37.3145 7.22042L28.895 34.1261C28.7871 34.4645 28.5584 34.7069 28.209 34.8533C28.0284 34.9256 27.8364 34.9477 27.6332 34.9195C27.5017 34.9012 27.3624 34.8513 27.2153 34.77L18.301 29.6009L12.1421 34.7219C11.892 34.943 11.5936 35.0295 11.2469 34.9813C11.0795 34.958 10.9454 34.915 10.8444 34.8522C10.6289 34.737 10.4691 34.5716 10.365 34.356C10.261 34.1405 10.2255 33.9132 10.2588 33.6741L11.3855 25.5687L3.4026 20.9313C2.98353 20.7024 2.79014 20.3404 2.82241 19.8453C2.85136 19.3741 3.09166 19.048 3.54331 18.8671L35.7755 5.80008C36.2288 5.6072 36.6336 5.67565 36.9899 6.00545ZM27.1205 32.0333L34.3814 8.85989L6.60513 20.1152L12.2888 23.4095L29.3572 14.1021L18.7989 27.2025L27.1205 32.0333Z"
                      fill="#9344E8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_85_500">
                      <rect
                        width="32.4434"
                        height="33.0228"
                        fill="white"
                        transform="translate(5.46472 0.837402) rotate(7.91391)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h4>Sports Event Management</h4>
              <p>
                Elevate your sports event management with our comprehensive
                scheduling solutions. Coordinate games, practices, events, and
                staff assignments.
              </p>
            </div>
            <div className="sqdk-values-single-item">
              <div className="icon">
                <svg
                  width="38"
                  height="39"
                  viewBox="0 0 38 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_85_500)">
                    <path
                      d="M36.9899 6.00545C37.3445 6.34721 37.4527 6.7522 37.3145 7.22042L28.895 34.1261C28.7871 34.4645 28.5584 34.7069 28.209 34.8533C28.0284 34.9256 27.8364 34.9477 27.6332 34.9195C27.5017 34.9012 27.3624 34.8513 27.2153 34.77L18.301 29.6009L12.1421 34.7219C11.892 34.943 11.5936 35.0295 11.2469 34.9813C11.0795 34.958 10.9454 34.915 10.8444 34.8522C10.6289 34.737 10.4691 34.5716 10.365 34.356C10.261 34.1405 10.2255 33.9132 10.2588 33.6741L11.3855 25.5687L3.4026 20.9313C2.98353 20.7024 2.79014 20.3404 2.82241 19.8453C2.85136 19.3741 3.09166 19.048 3.54331 18.8671L35.7755 5.80008C36.2288 5.6072 36.6336 5.67565 36.9899 6.00545ZM27.1205 32.0333L34.3814 8.85989L6.60513 20.1152L12.2888 23.4095L29.3572 14.1021L18.7989 27.2025L27.1205 32.0333Z"
                      fill="#9344E8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_85_500">
                      <rect
                        width="32.4434"
                        height="33.0228"
                        fill="white"
                        transform="translate(5.46472 0.837402) rotate(7.91391)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h4>Secure Payment Method</h4>
              <p>
                100% Secure payment system for student registration and
                eCommerce of your sports organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ==== SquadDeck Values End ====== --> */}

      {/* <!-- ==== SquadDeck About Gallery ====== --> */}
      <section className="sqdk-about-gallery">
        <div className="container">
          <div className="sqdk-about-gallery-grid">
            <div className="sqdk-about-gallery-single-content">
              <Image
                width={500}
                height={500}
                src="/assets/img/about_page/about_gallery_1.png"
                alt="Gallery Image"
              />
            </div>
            <div className="sqdk-about-gallery-single-content">
              <Image
                width={500}
                height={500}
                src="/assets/img/about_page/about_gallery_2.png"
                alt="Gallery Image"
              />
            </div>
            <div className="sqdk-about-gallery-single-content">
              <h2>
                Start Your Winning Season With <br />
                SquadDeck
              </h2>
              <div className="btns">
                <Link href="/book-demo" className="sqdk-about-btn">
                  Get a free demo
                </Link>
                <Link href="/contact" className="sqdk-contact-btn">
                  Contact Us
                </Link>
              </div>
              <Image
                width={500}
                height={500}
                src="/assets/img/about_page/img_shape.png"
                alt=""
                className="img-shape"
              />
            </div>
            <div className="sqdk-about-gallery-single-content">
              <Image
                width={500}
                height={500}
                src="/assets/img/about_page/about_gallery_3.png"
                alt="Gallery Image"
              />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ==== SquadDeck About Gallery End ====== --> */}

      {/* <!-- ==== SquadDeck Testimonial ====== --> */}
      <section className="sqdk-client-testimonial mx-5">
        <div className="container">
          <div className="sqdk-section-heading">
            <h3
              className="wow animate__animated animate__fadeInUp"
              data-wow-delay="0.3s"
            >
              Testimonials
            </h3>
            <h2
              className="wow animate__animated animate__fadeInUp"
              data-wow-delay="0.5s"
            >
              What makes SquadDeck so beloved by clients?{' '}
            </h2>
            <p
              className="wow animate__animated animate__fadeInUp"
              data-wow-delay="0.8s"
            >
              Discover the ways in which SquadDeck has enabled our clientele to
              enhance their business operations.
            </p>
          </div>
          <Slider {...settings}>
            {clients.map((client, index) => {
              return (
                <div className="sqdk-single-client-testimonial" key={index}>
                  <div className="client-profile">
                    <div className="client-img">
                      <Image
                        // priority={true}
                        height={500}
                        width={500}
                        src={client.image}
                        alt={client.name}
                      />
                    </div>
                    <div className="client-info">
                      <h4>{client.name}</h4>
                      <p>{client.designation}</p>
                    </div>
                  </div>
                  <div className="client-quote">
                    <p>{client.comment}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
      {/* <!-- ==== SquadDeck Testimonial ====== --> */}
      <Footer />
    </>
  );
}
