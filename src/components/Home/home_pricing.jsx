import Image from 'next/image';
import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';


export default function HomePricing({ pricing, token, userInfoData }) {
  const router = useRouter();

  console.log(pricing);
  console.log(userInfoData);

  return (
    <>
      <section className="sqdk-pricing sqdk-pricing-page">
        <div className="sqdk-pricing-inner">
          <div className="container">
            <div className="sqdk-section-heading">
              <h3
                className="wow animate__animated animate__fadeInUp"
                data-wow-delay="0.3s"
              >
                our pricing
              </h3>
              <h2
                className="wow animate__animated animate__fadeInUp"
                data-wow-delay="0.8s"
              >
                Pick your plan. Change whenever you want.
              </h2>
              <p
                className="wow animate__animated animate__fadeInUp"
                data-wow-delay="1.2s"
              >
                Get started in minutes, no credit card needed, 24/7 support.
              </p>
            </div>
            <div className="sqdk-pricing-table">
              {pricing?.map((p, index) => {
                return (
                  <div
                    className="sqdk-single-pricing-table wow animate__animated animate__fadeIn"
                    data-wow-delay="0.1s"
                    key={index}
                  >
                    <div className="pricing-table-heading">
                      <div className="icon">
                        <Image src={''} alt="" />
                      </div>
                      <h4>{p?.name}</h4>
                    </div>
                    <div className="price">
                      <p>
                        <span className="me-4">
                          {p.subscription_fees
                            ?.filter(
                              (item) => item?.country === userInfoData?.country
                            )
                            ?.map((item) => item?.currency)}
                        </span>
                        <span>
                          {p.subscription_fees
                            ?.filter(
                              (item) => item?.country === userInfoData?.country
                            )
                            ?.map((item) => item?.price)}
                        </span>
                        <small>/mo</small>
                      </p>
                    </div>
                    <div className="pricing-btn-wrapper">
                      {p?.name === 'Enterprise' ? (
                        <div
                          style={{
                            cursor: 'pointer',
                          }}
                          className="hstack justify-content-center  py-1 fw-bold fs-2"
                        >
                          <Link
                            href={'/contact'}
                            className="button pricing-btn text-white"
                          >
                            Contact Us
                          </Link>
                        </div>
                      ) : (
                        <div
                          style={{
                            cursor: 'pointer',
                          }}
                          className="hstack justify-content-center  py-1"
                        >
                          <button
                            onClick={() => {
                              if (p?.name === 'Free') {
                                router.push('/auth/register');
                              } else {
                                router.push({
                                  pathname: '/auth/register-with-payment',
                                  query: {
                                    id: p?._id,
                                    // price: p?.subscription_fees,
                                    price: 0,
                                    name: p?.name,
                                  },
                                });
                              }
                            }}
                            className="button pricing-btn text-white"
                          >
                            Get Started
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="pricing-lists">
                      <ul>
                        <li>
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="11.7003"
                              cy="11.049"
                              r="10.9832"
                              fill="#CFF5DC"
                            ></circle>
                            <path
                              d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                              fill="#162A73"
                            ></path>
                          </svg>
                          <span>Processing Fee {p?.price}</span>
                        </li>
                        <li>
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="11.7003"
                              cy="11.049"
                              r="10.9832"
                              fill="#CFF5DC"
                            ></circle>
                            <path
                              d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                              fill="#162A73"
                            ></path>
                          </svg>
                          <span>
                            {index !== pricing.length - 1 ? 'Up to' : ''}{' '}
                            {p?.num_of_team} Team
                          </span>{' '}
                        </li>
                        <li>
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="11.7003"
                              cy="11.049"
                              r="10.9832"
                              fill="#CFF5DC"
                            ></circle>
                            <path
                              d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                              fill="#162A73"
                            ></path>
                          </svg>
                          <span>{p?.num_of_player} Players</span>
                        </li>
                        {/* <li>
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="11.7003"
                              cy="11.049"
                              r="10.9832"
                              fill="#CFF5DC"
                            ></circle>
                            <path
                              d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                              fill="#162A73"
                            ></path>
                          </svg>
                          <span>{p?.num_of_products} Products</span>
                        </li> */}
                        <li>
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="11.7003"
                              cy="11.049"
                              r="10.9832"
                              fill="#CFF5DC"
                            ></circle>
                            <path
                              d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                              fill="#162A73"
                            ></path>
                          </svg>
                          <span>Free Sub-Domain</span>
                        </li>
                        <li>
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="11.7003"
                              cy="11.049"
                              r="10.9832"
                              fill="#CFF5DC"
                            ></circle>
                            <path
                              d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                              fill="#162A73"
                            ></path>
                          </svg>
                          <span>
                            On Demand Custom Website
                            {/* ({p?.custom_website}) */}
                          </span>
                        </li>
                        <li>
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="11.7003"
                              cy="11.049"
                              r="10.9832"
                              fill="#CFF5DC"
                            ></circle>
                            <path
                              d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                              fill="#162A73"
                            ></path>
                          </svg>
                          <span>{p.website}</span>
                        </li>
                        <li>
                          {p?.manager_management === true ? (
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="11.7003"
                                cy="11.049"
                                r="10.9832"
                                fill="#CFF5DC"
                              ></circle>
                              <path
                                d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                                fill="#162A73"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="11.5615"
                                cy="11.3563"
                                r="10.9832"
                                fill="#EEF3F8"
                              ></circle>
                              <path
                                d="M14.8312 7.26172L11.5615 10.5314L8.29175 7.26172L7.46701 8.08646L10.7367 11.3562L7.46701 14.6259L8.29175 15.4506L11.5615 12.1809L14.8312 15.4506L15.6559 14.6259L12.3862 11.3562L15.6559 8.08646L14.8312 7.26172Z"
                                fill="#162A73"
                              ></path>
                            </svg>
                          )}

                          <span>Manager Role</span>
                        </li>
                        <li>
                          {p?.coach_management === true ? (
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="11.7003"
                                cy="11.049"
                                r="10.9832"
                                fill="#CFF5DC"
                              ></circle>
                              <path
                                d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                                fill="#162A73"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="11.5615"
                                cy="11.3563"
                                r="10.9832"
                                fill="#EEF3F8"
                              ></circle>
                              <path
                                d="M14.8312 7.26172L11.5615 10.5314L8.29175 7.26172L7.46701 8.08646L10.7367 11.3562L7.46701 14.6259L8.29175 15.4506L11.5615 12.1809L14.8312 15.4506L15.6559 14.6259L12.3862 11.3562L15.6559 8.08646L14.8312 7.26172Z"
                                fill="#162A73"
                              ></path>
                            </svg>
                          )}
                          <span>Trainer Role</span>
                        </li>
                        <li>
                          {p?.ads === true ? (
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="11.7003"
                                cy="11.049"
                                r="10.9832"
                                fill="#CFF5DC"
                              ></circle>
                              <path
                                d="M9.90436 13.0121L7.53874 10.6465L6.52295 11.6623L9.90436 15.0437L16.8777 8.07035L15.8619 7.05457L9.90436 13.0121Z"
                                fill="#162A73"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 23 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="11.5615"
                                cy="11.3563"
                                r="10.9832"
                                fill="#EEF3F8"
                              ></circle>
                              <path
                                d="M14.8312 7.26172L11.5615 10.5314L8.29175 7.26172L7.46701 8.08646L10.7367 11.3562L7.46701 14.6259L8.29175 15.4506L11.5615 12.1809L14.8312 15.4506L15.6559 14.6259L12.3862 11.3562L15.6559 8.08646L14.8312 7.26172Z"
                                fill="#162A73"
                              ></path>
                            </svg>
                          )}
                          <span>On Demand Media Buying</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
