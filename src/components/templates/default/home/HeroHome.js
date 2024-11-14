/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  bgPrimary,
  bgSecondary,
} from '@/components/constants/utils/themeUtils';
import { userInfo } from '@/slices/dashboard/adminDashboard/Actions/authActions';

const sliderImages = [
  {
    id: 1,
    sports_category: 'Rugby',
    bgImage: '/template1/assets/img/slider_bg1.png',
    image: '/template1/assets/img/banner-img.png',
  },
  {
    id: 2,
    sports_category: 'Basketball',
    bgImage: '/template1/assets/img/basketball/slider_bg_basketball.png',
    image: '/template1/assets/img/basketball/slider_img_basketball.png',
  },
  {
    id: 3,
    sports_category: 'Football',
    bgImage: '/template1/assets/img/football/slider_bg_football.png',
    image: '/template1/assets/img/football/slider_img_football.png',
  },
  {
    id: 4,
    sports_category: 'Cricket',
    bgImage: '/template1/assets/img/cricket/slider_bg.png',
    image: '/template1/assets/img/cricket/slider_img.png',
  },

  {
    id: 5,
    sports_category: 'Volleyball',
    bgImage: '/template1/assets/img/volleyball/slider_bg.png',
    image: '/template1/assets/img/volleyball/slider_img.png',
  },
  {
    id: 6,
    sports_category: 'Baseball',
    bgImage: '/template1/assets/img/baseball/slider_bg.png',
    image: '/template1/assets/img/baseball/slider_img.png',
  },
  {
    id: 7,
    sports_category: 'Netball',
    bgImage: '/template1/assets/img/netball/slider_bg.png',
    image: '/template1/assets/img/netball/slider_img.png',
  },
];

const HeroHome = ({ sliderData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="slick-prev slick-arrow slider-prev"
        aria-label="Previous"
        type="button"
        onClick={onClick}
      >
        <svg
          width="3rem"
          height="3rem"
          viewBox="0 0 14 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9453 1.29236L1.82733 12.4103L12.9453 23.5283"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
      </button>
    );
  };

  // Custom next button component
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="slick-next slick-arrow slider-next"
        aria-label="Previous"
        type="button"
        onClick={onClick}
      >
        <svg
          width="3rem"
          height="3rem"
          viewBox="0 0 14 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.05469 1.29224L12.1726 12.4102L1.05469 23.5281"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
      </button>
    );
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const sliderMatch = sliderImages.find(
    (item) => item.sports_category === themeData.sports_category
  );

  // Use ternary operator to set slider_bg and slider_img
  const slider_bg = sliderMatch
    ? sliderMatch.bgImage
    : '/template1/assets/img/slider_bg1.png';
  const slider_img = sliderMatch
    ? sliderMatch.image
    : '/template1/assets/img/banner-img.png';

  const checkUrl = (url) => {
    if (!url) return '';

    if (url.includes('https://' || 'http://')) {
      return url;
    } else {
      return 'https://' + url;
    }
  };

  return (
    <>
      <section className="slider-area">
        <style>
          {`
                        .slider-prev.slick-prev,
                        .slider-next.slick-next {
                          background-color: ${
                            themeData?.branding?.primary_color?.trim() ||
                            '#9344E8'
                          };
                        }

                      .btn-register{
                       background-color: ${
                         themeData?.branding?.primary_color?.trim() || '#9344E8'
                       };
                      }

                        .btn-register:hover{
                          background-color: ${
                            themeData?.branding?.secondary_color?.trim() ||
                            '#162a73'
                          };
                        }
  
                        .btn-contact:hover{
                          background-color: ${
                            themeData?.branding?.primary_color?.trim() ||
                            '#9344E8'
                          };
                          border: ${
                            themeData?.branding?.primary_color?.trim() ||
                            '#9344E8'
                          };
                        }
                      `}
        </style>
        <Slider {...settings}>
          {sliderData && sliderData?.length > 0 ? (
            sliderData?.map((slider, index) => {
              const backgroundImageUrl =
                checkUrl(slider?.hero_image?.Location) ||
                checkUrl(slider?.hero_image?.secure_url);

              if (slider?.status) {
                return (
                  <div key={index}>
                    <div
                      className="slider-single"
                      style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                      }}
                    >
                      <div className="bg-overlay"></div>
                      <div className="container">
                        <div className="slider-single-content">
                          <div className="slider-single-text-content">
                            <h3>{slider?.sub_title}</h3>
                            <h1>{slider?.title}</h1>
                            <p>{slider?.paragraph}</p>
                            <div className="slider-btns-template">
                              {slider.button_one_text && (
                                <Link
                                  href={slider?.button_one_url}
                                  className="btn-register"
                                >
                                  {slider?.button_one_text}
                                </Link>
                              )}
                              {slider.button_two_text && (
                                <Link
                                  href={slider?.button_two_url}
                                  className="btn-contact"
                                >
                                  {slider?.button_two_text}
                                </Link>
                              )}
                            </div>
                          </div>
                          <div className="slider-single-img-content">
                            <div className="slider-single-img">
                              {(slider?.image?.Location ||
                                slider?.image?.secure_url) && (
                                <img
                                  src={
                                    checkUrl(slider?.image?.Location) ||
                                    checkUrl(slider?.image?.secure_url)
                                  }
                                  alt="Banner Image"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div className="slider-single">
              <style>
                {`
                  .slider-single {
                    background-image: url(${slider_bg});
                  }
                `}
              </style>
              <div className="bg-overlay"></div>
              <div className="container">
                <div className="slider-single-content">
                  <img
                    src="template1/assets/img/banner_shape.png"
                    alt="Banner Shape"
                    className="banner-shape"
                  />
                  <div className="slider-single-text-content">
                    <h3>Taste the victory</h3>
                    <h1>Home of champs</h1>
                    <p>
                      Step into a world where champions are made! Discover
                      expert training, top-notch resources, and a supportive
                      community that empowers you to achieve greatness. Join us
                      and embrace the winning spirit!
                    </p>
                    <div className="slider-btns-template">
                      <a href="#" className="btn-register">
                        Register Now
                      </a>
                      <a href="#" className="btn-contact">
                        Contact Us
                      </a>
                    </div>
                  </div>
                  <div className="slider-single-img-content">
                    <div className="slider-single-img">
                      <img
                        src={`${slider_img}`}
                        alt={`${themeData?.sports_category}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Slider>
      </section>
    </>
  );
};

export default HeroHome;
