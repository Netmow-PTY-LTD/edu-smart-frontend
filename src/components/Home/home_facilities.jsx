import Image from 'next/image';
import React from 'react';


import Link from 'next/link';

export default function HomeFacilities() {
  return (
    <>
      <section className="sd-facilities">
        <div className="container">
          <div className="sd-grid align-items-center">
            <div className="sd-grid-single">
              <div className="sd-facilities-text">
                <h3
                  className="wow animate__animated animate__fadeInDown"
                  data-wow-delay=".1s"
                >
                  Facilites
                </h3>
                <h2
                  className="wow animate__animated animate__fadeInUp"
                  data-wow-delay=".5s"
                >
                  Club management made it effortless.
                </h2>
                <div
                  className="wow animate__animated animate__fadeInUp"
                  data-wow-delay="1s"
                >
                  <ul className="hero-features-lists">
                    <li>Quickly registration and easy to use</li>
                    <li>No Hidden Charge, No credit card required</li>
                    <li>24/7 customer support on business days</li>
                  </ul>
                  <Link
                    href="/features"
                    className="btn-common btn-primary mt-btn"
                  >
                    View Facilites
                  </Link>
                </div>
              </div>
            </div>
            <div className="sd-grid-single">
              <div className="section-img">
                <Image priority={true} src={''} alt="SD Dashboard" />
                {/* <a
                  href="https://www.youtube.com/watch?v=qXlePLytMvo"
                  className="video-player"
                >
                  <svg
                    width="3.3rem"
                    height="3.7rem"
                    viewBox="0 0 33 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.4857 16.8109C32.819 17.5807 32.8191 19.5052 31.4857 20.275L3.07143 36.68C1.7381 37.4498 0.0714284 36.4876 0.0714285 34.948L0.0714299 2.13796C0.07143 0.598358 1.7381 -0.363893 3.07143 0.405908L31.4857 16.8109Z"
                      fill="white"
                    />
                  </svg>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
