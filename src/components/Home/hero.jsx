import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import VideoPopup from './video-popup';

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);

  const handleVideoClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <section className="sqdk-hero">
        <div className="container">
          <div className="sqdk-hero-content">
            <div className="sqdk-hero-left">
              <div className="sqdk-hero-text-content">
                <h3>THE NEW ERA IN SPORTS TEAM MEMBER MANAGEMENT</h3>
                <h1>SPORTS. RUN. SIMPLY.</h1>
                <div>
                  <ul className="hero-features-lists">
                    <li>
                      Manage players, parents, teams and coaching staff on the
                      fly
                    </li>
                    <li>
                      Live chat, scheduling trainings and matches, and stats
                    </li>
                    <li>eCommerce and stunning website</li>
                    <li>
                      Free accounts, or low monthly payment & transaction fee
                    </li>
                  </ul>
                </div>
                <div
                  className="sqdk-hero-btn-container wow animate__animated animate__fadeInUp"
                  data-wow-delay="1.5s"
                >
                  <Link
                    href="/book-demo"
                    className="btn-common btn-primary btn-hero mt-btn"
                  >
                    Book A Free Demo
                  </Link>
                </div>
                <div className="mobile-app-info mt-5">
                  <h5 className="fs-14 mb-4">
                    Explore our platform via mobile apps
                  </h5>
                  <div className="app-links">
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.sports.squaddeck"
                      target="_blank"
                    >
                      <Image
                        priority={true}
                        src="/images/home/google-play.png"
                        width={100}
                        height={100}
                        alt="Google Playstore"
                      />
                    </Link>
                    <Link
                      href="https://apps.apple.com/pl/app/squaddeck/id6475808392"
                      target="_blank"
                    >
                      <Image
                        priority={true}
                        src="/images/home/appstore.png"
                        width={100}
                        height={100}
                        alt="Appstore"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="sqdk-hero-right">
              <div className="sqdk-hero-images">
                <Image
                  priority={true}
                  src={''}
                  alt="Mac Desktop"
                  // loading="lazy"
                />
                <div className="video-iframe">
                  <iframe
                    className="hero-iframe"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/qXlePLytMvo"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                  <a
                    href="https://www.youtube.com/watch?v=qXlePLytMvo"
                    className="video-player"
                    onClick={handleVideoClick}
                  >
                    <svg
                      width="2rem"
                      height="2.5rem"
                      viewBox="0 0 33 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31.4857 16.8109C32.819 17.5807 32.8191 19.5052 31.4857 20.275L3.07143 36.68C1.7381 37.4498 0.0714284 36.4876 0.0714285 34.948L0.0714299 2.13796C0.07143 0.598358 1.7381 -0.363893 3.07143 0.405908L31.4857 16.8109Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <VideoPopup show={showPopup} onClose={handleClosePopup} />
      </section>
    </>
  );
}
