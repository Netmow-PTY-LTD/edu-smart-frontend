/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { colorSecondary } from '@/components/constants/utils/themeUtils';
import TemplateLayout from '@/components/templates/TemplateLayout';
import {
  getSubdomain,
  getSubdomainHelperFunction,
} from '@/slices/helper/getSubdomain';
import { clientAboutAction } from '@/slices/home/actions/clientAboutAction';
import axios from 'axios';
import TemplateBanner from './common/TemplateBanner';

const aboutImages = [
  {
    id: 1,
    sports_category: 'Basketball',
    image: '/template1/assets/img/basketball/about_basketball.jpg',
  },
  {
    id: 2,
    sports_category: 'Football',
    image: '/template1/assets/img/football/about_football.jpg',
  },
  {
    id: 3,
    sports_category: 'Cricket',
    image: '/template1/assets/img/cricket/about.jpg',
  },
  {
    id: 4,
    sports_category: 'Volleyball',
    image: '/template1/assets/img/volleyball/about.jpg',
  },
  {
    id: 5,
    sports_category: 'Baseball',
    image: '/template1/assets/img/baseball/about.jpg',
  },
  {
    id: 6,
    sports_category: 'Netball',
    image: '/template1/assets/img/netball/about.jpg',
  },
];

const counterBgImages = [
  {
    id: 1,
    sports_category: 'Basketball',
    bgImage: '/template1/assets/img/basketball/counter_bg_csb.jpg',
  },
  {
    id: 2,
    sports_category: 'Football',
    bgImage: '/template1/assets/img/football/counter_bg_football.jpg',
  },
  {
    id: 3,
    sports_category: 'Cricket',
    bgImage: '/template1/assets/img/cricket/counter_bg.jpg',
  },
  {
    id: 4,
    sports_category: 'Volleyball',
    bgImage: '/template1/assets/img/volleyball/counter_bg.jpg',
  },
  {
    id: 5,
    sports_category: 'Baseball',
    bgImage: '/template1/assets/img/baseball/counter_bg.jpg',
  },
  {
    id: 6,
    sports_category: 'Netball',
    bgImage: '/template1/assets/img/netball/counter_bg.jpg',
  },
];

const missionImages = [
  {
    id: 1,
    sports_category: 'Basketball',
    image: '/template1/assets/img/basketball/mission_about.jpg',
  },
  {
    id: 2,
    sports_category: 'Football',
    image: '/template1/assets/img/football/mission_about_football.jpg',
  },
  {
    id: 3,
    sports_category: 'Cricket',
    image: '/template1/assets/img/cricket/mission_about.jpg',
  },
  {
    id: 4,
    sports_category: 'Volleyball',
    image: '/template1/assets/img/volleyball/mission_about.jpg',
  },
  {
    id: 5,
    sports_category: 'Baseball',
    image: '/template1/assets/img/baseball/mission_about.jpg',
  },
  {
    id: 6,
    sports_category: 'Netball',
    image: '/template1/assets/img/netball/mission_about.jpg',
  },
];

export default function ClientAbout() {
  const [subdomain, setSubdomain] = useState('');
  const [totalGuardians, setTotalGuardians] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    setSubdomain(window?.location?.hostname.split('.')[0]);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clientAboutAction(getSubdomainHelperFunction()));
  }, [dispatch]);

  const {
    data: clientAboutData,
    isLoading: clientAboutIsLoading,
    error: clientAboutError,
  } = useSelector((state) => state.Home.clientAbout);

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const pageMeta = {
    subtitle: 'About',
    title: `${themeData?.organisation_name}`,
    bgImageUrl: [
      {
        id: 1,
        sports_category: 'Basketball',
        url: '/template1/assets/img/basketball/about_bg.jpg',
      },
      {
        id: 2,
        sports_category: 'Football',
        url: '/template1/assets/img/football/about_bg_football.jpg',
      },
      {
        id: 3,
        sports_category: 'Cricket',
        url: '/template1/assets/img/cricket/about_bg.jpg',
      },
      {
        id: 4,
        sports_category: 'Volleyball',
        url: '/template1/assets/img/volleyball/about_bg.jpg',
      },
      {
        id: 5,
        sports_category: 'Baseball',
        url: '/template1/assets/img/baseball/about_bg.jpg',
      },
      {
        id: 6,
        sports_category: 'Netball',
        url: '/template1/assets/img/netball/about_bg.jpg',
      },
    ],
  };

  //total guardians api call

  useEffect(() => {
    if (subdomain) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/club-info/${subdomain}`
        )
        .then((res) => {
          setTotalGuardians(res.data.total_guardian);
          setTotalPlayers(res.data.total_player);
          setTotalEvents(res.data.total_events);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [subdomain]);

  //banner background image

  const bgImage = pageMeta.bgImageUrl.find(
    (image) => image.sports_category === themeData.sports_category
  );

  // Extract the URL from the matching bgImage object, or provide a default URL if no match is found
  const bgImageUrl = bgImage
    ? bgImage.url
    : '/template1/assets/img/page_banner.png';

  //About Image

  const itemMatch = aboutImages.find(
    (item) => item.sports_category === themeData.sports_category
  );

  let aboutImageUrl;

  if (
    clientAboutData &&
    clientAboutData.about_image &&
    clientAboutData.about_image.secure_url
  ) {
    aboutImageUrl = clientAboutData.about_image.secure_url;
  } else if (itemMatch) {
    aboutImageUrl = itemMatch.image;
  } else {
    aboutImageUrl = '/template1/assets/img/aboutimg.png';
  }

  //counter background image

  const counterBg = counterBgImages.find(
    (item) => item.sports_category === themeData.sports_category
  );

  const counterBgImage = counterBg
    ? counterBg.bgImage
    : '/assets/img/counter_bg.png';

  //Mission Image

  const missionImageMatch = missionImages.find(
    (item) => item.sports_category === themeData.sports_category
  );

  const missionImage = missionImageMatch
    ? missionImageMatch.image
    : '/assets/img/mission_img.png';

  return (
    <TemplateLayout>
      <TemplateBanner
        title={pageMeta.title}
        subtitle={pageMeta.subtitle}
        bgImage={bgImageUrl}
      />

      {/* <!-- ==== About SquadDeck ====== --> */}
      <section className="sqdk-about">
        <div className="container">
          <div className="sqdk-about-content">
            <div className="sqdk-about-left-content">
              <div className="sqdk-about-text-temp">
                <h2 style={colorSecondary(themeData)}>
                  {clientAboutData?.title
                    ? clientAboutData?.title
                    : `About ${themeData?.organisation_name ? themeData?.organisation_name : 'SquadDeck'}`}
                </h2>
                {clientAboutData?.about ? (
                  <p>{clientAboutData?.about}</p>
                ) : (
                  <p>
                    SquadDeck is a software designed to manage Sports Academies
                    or Organisations. With SquadDeck, managing your sports
                    academy, club or organisation is made easy with minimal
                    paperwork. We are a team of enthusiastic software
                    developers, dedicated to improving your youth sports
                    experience by providing smart solutions. By utilising
                    SquadDeck, sports organisations can easily manage their
                    daily activities, coaches can effectively instruct and
                    manage their teams, athletes can excel at sports and
                    everyone can stay connected with their club, team or
                    athlete.
                  </p>
                )}
                <div className="sqdk-about-btn-wrapper">
                  <Link
                    href="/contact"
                    className="btn btn-lg fw-semibold fs-2 px-4 py-3"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: `${
                        themeData?.branding?.primary_color?.trim() || '#9344E8'
                      }`,
                      color: '#fff',
                    }}
                  >
                    Get Involved With Us
                  </Link>
                  {/* <a href="#" className="contact-us">
                    <span>Contact Us</span> <br />
                    <span className="bold-text">+012-3456789</span>
                  </a> */}
                </div>
              </div>
            </div>
            <div className="sqdk-about-right-content">
              <div className="sqdk-about-images">
                <div className="about-img1">
                  <img src={aboutImageUrl} alt="About Image" />
                </div>
              </div>
              {/* <div className="sqdk-about-free-trial">
                <div className="sqdk-about-free-trial-inner">
                  <h4>Watch</h4>
                  <p>Out Our Intro Video</p>
                  <Link
                    href="https://www.youtube.com/watch?v=xX3UgtJlFCY"
                    className="about-page-video-player"
                  >
                    <Image
                      width={500}
                      height={500}
                      src="/assets/img/about_page/play-btn.png"
                      alt=""
                    />
                  </Link>
                </div>
              </div> */}
              <div className="shape-1">
                <Image
                  width={500}
                  height={500}
                  src="/assets/img/about_page/ellipse1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ==== About SquadDeck End ====== --> */}

      {/* Counter */}
      <section
        className="counter"
        style={{ backgroundImage: `url(${counterBgImage})` }}
      >
        <div className="container">
          <div className="sec-heading">
            <h2>Our Insight</h2>
          </div>
          <div className="counter-content">
            <div className="counter-single">
              <div className="counter-icon">
                <svg
                  width="7rem"
                  height="5.9rem"
                  viewBox="0 0 70 59"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.4729 9.79802C25.4729 4.38672 29.8596 0 35.2709 0C40.6822 0 45.0689 4.38672 45.0689 9.79802C45.0689 15.2093 40.6822 19.596 35.2709 19.596C29.8596 19.596 25.4729 15.2093 25.4729 9.79802ZM35.2709 4.90389C32.5679 4.90389 30.3768 7.09504 30.3768 9.79802C30.3768 12.5009 32.5679 14.6921 35.2709 14.6921C37.9738 14.6921 40.165 12.5009 40.165 9.79802C40.165 7.09504 37.9738 4.90389 35.2709 4.90389Z"
                    fill="white"
                  />
                  <path
                    d="M49.9829 12.2501C49.9829 8.18759 53.2764 4.89429 57.3387 4.89429C61.4011 4.89429 64.6946 8.18759 64.6946 12.2501C64.6946 16.3126 61.4011 19.606 57.3387 19.606C53.2764 19.606 49.9829 16.3126 49.9829 12.2501ZM57.3387 9.79818C55.9848 9.79818 54.8868 10.896 54.8868 12.2501C54.8868 13.6043 55.9848 14.7021 57.3387 14.7021C58.6927 14.7021 59.7907 13.6043 59.7907 12.2501C59.7907 10.896 58.6927 9.79818 57.3387 9.79818Z"
                    fill="white"
                  />
                  <path
                    d="M13.2037 4.89429C9.1412 4.89429 5.8479 8.18759 5.8479 12.2501C5.8479 16.3126 9.1412 19.606 13.2037 19.606C17.2663 19.606 20.5596 16.3126 20.5596 12.2501C20.5596 8.18759 17.2663 4.89429 13.2037 4.89429ZM10.7518 12.2501C10.7518 10.896 11.8496 9.79818 13.2037 9.79818C14.5579 9.79818 15.6557 10.896 15.6557 12.2501C15.6557 13.6043 14.5579 14.7021 13.2037 14.7021C11.8496 14.7021 10.7518 13.6043 10.7518 12.2501Z"
                    fill="white"
                  />
                  <path
                    d="M16.9676 24.5076C16.1331 25.9502 15.6555 27.6251 15.6555 29.4115H5.84774V41.6727C5.84774 45.7356 9.14104 49.0285 13.2036 49.0285C14.2429 49.0285 15.2319 48.8132 16.1282 48.4244C16.4916 50.0495 17.0567 51.5982 17.7957 53.0433C16.3774 53.6166 14.8273 53.9324 13.2036 53.9324C6.43272 53.9324 0.943848 48.4435 0.943848 41.6727V29.4115C0.943848 26.7031 3.13942 24.5076 5.84774 24.5076H16.9676Z"
                    fill="white"
                  />
                  <path
                    d="M52.7473 53.0433C54.1655 53.6166 55.7156 53.9324 57.3393 53.9324C64.1101 53.9324 69.599 48.4435 69.599 41.6727V29.4115C69.599 26.7031 67.4036 24.5076 64.6951 24.5076H53.5751C54.4097 25.9502 54.8874 27.6251 54.8874 29.4115L64.6951 29.4115V41.6727C64.6951 45.7356 61.4017 49.0285 57.3393 49.0285C56.3002 49.0285 55.3111 48.8132 54.4146 48.4244C54.0513 50.0495 53.4863 51.5982 52.7473 53.0433Z"
                    fill="white"
                  />
                  <path
                    d="M25.4635 24.5076C22.7551 24.5076 20.5596 26.7031 20.5596 29.4115V44.1246C20.5596 52.2499 27.1462 58.8363 35.2712 58.8363C43.3962 58.8363 49.9829 52.2499 49.9829 44.1246V29.4115C49.9829 26.7031 47.7874 24.5076 45.079 24.5076H25.4635ZM25.4635 29.4115H45.079V44.1246C45.079 49.5415 40.6879 53.9324 35.2712 53.9324C29.8545 53.9324 25.4635 49.5415 25.4635 44.1246V29.4115Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h4>Guardians</h4>
              <h3>{totalGuardians ? totalGuardians : 0}</h3>
            </div>
            <div className="counter-single">
              <div className="counter-icon">
                <svg
                  width="6.4rem"
                  height="5.9rem"
                  viewBox="0 0 64 59"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M63.0781 45.1919C62.1306 43.8654 61.2462 42.4757 60.3619 41.086C59.0354 39.0646 59.0354 39.0646 61.0567 37.6749C61.8148 37.1064 62.6991 36.7274 62.3833 35.464C60.7409 28.8313 57.014 23.7779 51.0762 20.3036C50.255 19.8615 49.497 19.8615 48.6758 20.1773C45.2647 21.4407 41.9168 22.704 38.5689 23.9674C37.9372 24.2201 37.3687 24.4727 37.1792 25.2308C36.358 28.2628 29.3463 29.2104 27.2618 26.0519C26.1879 24.3464 24.8614 23.7779 23.219 23.2094C20.6923 22.2619 18.1656 21.3775 15.6389 20.3036C14.3123 19.7983 13.3016 19.9878 12.1014 20.6827C7.36383 23.5884 4.07908 27.6943 2.18404 32.8741C0.920678 36.2852 0.983847 36.3484 3.88958 38.3697C4.77393 38.9382 4.71077 39.3173 4.20542 40.0753C3.00523 41.7176 1.93137 43.4864 0.794342 45.1919C0.225829 46.0131 0.0994927 46.5816 1.11018 47.2133C3.13156 48.4135 5.08977 49.74 6.98482 51.0665C7.93234 51.7614 8.50085 51.4455 9.0062 50.5612C9.95372 49.0451 11.0907 47.5923 11.9751 46.0131C12.7963 44.4339 14.0596 43.4232 15.8284 42.981C16.081 44.118 16.46 45.2551 17.5339 46.0131C17.9129 46.2658 18.0392 46.7079 18.1024 47.2133C18.6078 50.4348 18.6709 53.7196 18.2287 56.9412C18.0392 58.394 18.2919 58.8362 19.8079 58.8362C26.8828 58.773 34.0208 58.773 41.0956 58.773C45.7701 58.773 45.7701 58.773 45.3279 54.2249C45.1384 52.014 45.5174 49.8032 45.6437 47.5291C45.6437 46.0762 47.4124 45.6341 47.5388 44.4339C47.7914 42.602 48.5494 43.0442 49.6233 43.6127C50.3813 43.9917 50.8867 44.497 51.3288 45.1287C52.529 47.0238 53.7924 48.8556 54.9926 50.7507C55.4979 51.5087 55.9401 51.6982 56.6981 51.1297C58.7195 49.8032 60.7409 48.4135 62.7623 47.2133C63.773 46.5816 63.6466 46.0131 63.0781 45.1919ZM30.7992 40.6438C30.9887 42.0335 29.978 42.6652 28.9042 43.1073C28.5252 43.2968 27.9566 43.1073 27.4513 43.1705C26.8828 43.2968 25.8721 42.6652 25.7458 43.8022C25.6826 44.5602 25.3036 45.6341 26.0616 45.9499C26.6933 46.2658 27.7671 46.6448 28.3988 45.4446C28.7147 44.6865 29.5358 45.0024 30.1675 45.0656C30.9887 45.1287 30.736 45.8867 30.736 46.3289C30.8624 48.603 30.8624 48.603 28.6515 48.603H27.3881C26.6301 48.603 25.9353 48.6661 25.1772 48.603C23.9139 48.5398 23.219 47.845 23.219 46.5816C23.1559 45.7604 23.219 44.876 23.219 44.0549C23.219 41.4018 23.9139 40.5806 26.5669 40.6438C27.8935 40.707 28.5252 40.3911 28.2725 39.0014C28.2093 38.5592 28.462 37.9276 27.8303 37.7381C27.2618 37.6117 26.2511 37.4222 25.9984 37.8644C25.3667 39.0646 24.4824 38.8751 23.598 38.6856C22.9664 38.4961 23.219 37.7381 23.219 37.2327C23.2822 36.0957 24.1666 35.4008 25.0509 35.2745C26.3774 35.0218 27.8935 34.8955 29.0937 35.3377C31.7467 36.2852 30.4834 38.7487 30.7992 40.6438ZM34.5261 44.7497C34.5893 45.1919 34.2735 45.9499 35.0315 46.0762C35.7263 46.1394 36.6738 46.5184 37.0528 45.7604C37.5582 44.5602 38.6321 44.876 39.1374 45.1287C40.1481 45.7604 39.5164 47.0238 39.5164 47.9713C39.5164 49.0451 38.5689 48.5398 38.0004 48.603C37.4319 48.6661 36.8002 48.603 36.1685 48.603H34.3998C32.6942 48.7293 31.9362 47.9081 32.0626 46.2658V43.9285C32.0626 41.3386 32.6942 40.5806 35.3473 40.6438C36.4843 40.6438 37.3687 40.5806 37.116 39.0646C37.0528 38.5592 37.3687 37.8644 36.6107 37.7381C35.979 37.6749 35.0315 37.359 34.7788 37.9276C34.2103 39.1909 33.2628 38.8119 32.4416 38.6856C31.8099 38.5592 32.0626 37.8012 32.0626 37.2959C31.9994 36.222 32.8206 35.464 33.6418 35.3377C35.0315 35.085 36.4843 35.0218 37.874 35.2745C39.3901 35.5272 40.0849 38.0539 39.5796 41.1491C39.3269 42.5388 38.253 43.1705 36.8002 43.1705C35.7895 43.1705 34.2103 42.602 34.5261 44.7497ZM23.0927 14.429C24.0402 14.2395 24.4192 14.7448 24.6087 15.6924C24.8614 17.4611 25.6194 19.1035 26.8196 20.5563C29.3463 23.5884 33.1364 23.9674 36.0422 21.5038C37.8109 19.9878 38.8847 18.0296 39.2637 15.8187C39.5164 14.6185 39.9586 14.3027 41.0324 14.3658C41.7273 14.429 42.2958 14.3027 42.5485 13.4815C44.4435 8.36487 40.0849 0.974196 34.7788 0.216178C33.8944 0.0266737 33.6418 0.279346 33.6418 1.22687C33.7049 2.5534 33.5786 3.9431 33.6418 5.3328C33.7681 6.53299 33.1996 6.59616 32.1889 6.7225C30.4834 6.84883 29.7253 6.34349 30.0412 4.57478C30.1044 4.1326 30.0412 3.69043 30.0412 3.31142V1.66905C30.0412 -0.225999 29.978 -0.289167 28.1461 0.405682C23.3454 2.11122 20.1238 7.54368 21.0713 12.4708C21.2608 13.5447 21.5135 14.6185 23.0927 14.429Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h4>Total Players</h4>
              <h3>{totalPlayers ? totalPlayers : 0}</h3>
            </div>
            <div className="counter-single">
              <div className="counter-icon">
                <svg
                  width="6.5rem"
                  height="5.9rem"
                  viewBox="0 0 65 59"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M59.1277 5.34875H48.3788V0H16.1321V5.34875H5.38313C2.42717 5.34875 0.00866699 7.75568 0.00866699 10.6975V16.0462C0.00866699 24.9252 7.21045 32.0925 16.1321 32.0925H17.0995C19.0343 37.4947 23.7638 41.5598 29.5682 42.5225V53.4875H16.1321V58.8362H29.5682H34.9427H48.3788V53.4875H34.9427V42.5225C40.7471 41.5598 45.4766 37.4947 47.4114 32.0925H48.3788C57.3004 32.0925 64.5022 24.9252 64.5022 16.0462V10.6975C64.5022 7.75568 62.0837 5.34875 59.1277 5.34875ZM5.38313 16.0462V10.6975H16.1321V26.7437C10.2201 26.7437 5.38313 21.9299 5.38313 16.0462ZM32.2554 37.4412C26.3435 37.4412 21.5065 32.6274 21.5065 26.7437V5.34875H43.0044V26.7437C43.0044 32.6274 38.1673 37.4412 32.2554 37.4412ZM59.1277 16.0462C59.1277 21.9299 54.2907 26.7437 48.3788 26.7437V10.6975H59.1277V16.0462Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h4>Total Events</h4>
              <h3>{totalEvents ? totalEvents : 0}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Ends */}

      {/* <!-- ===== Mission and Vision ===== --> */}

      <section className="sqdk-mission-vision">
        <style>
          {`
          .sqdk-mission-vision::after{
            background-color: ${themeData?.branding?.primary_color?.trim() || '#9344E8'}
          }
          `}
        </style>
        <div className="container">
          <div className="sqdk-row">
            <div className="mission-img">
              <img
                src={`${clientAboutData?.mission_image?.secure_url ? clientAboutData?.mission_image?.secure_url : missionImage}`}
                alt="Mission Image"
              />
            </div>
            <div className="mission-text">
              <h2>Our Mission & Vision</h2>
              {clientAboutData?.mission ? (
                <p>{clientAboutData?.mission}</p>
              ) : (
                <p>
                  Our rugby game club's mission is to cultivate a community that
                  is passionate about the sport and embodies its values of
                  teamwork, respect, discipline and sportsmanship. We aim to
                  provide a safe and inclusive environment that welcomes people
                  of all ages, genders and skill levels to come and play rugby.
                  Our goal is to promote physical and mental well-being through
                  the sport, while nurturing a love for rugby that will last a
                  lifetime.
                  <br />
                  <br />
                  We envision a future where our rugby game club sets the
                  standard for excellence on and off the field. We strive to
                  grow and develop as a club, bringing together dedicated
                  players, coaches, and volunteers.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ===== Mission and Vision End ===== --> */}
    </TemplateLayout>
  );
}
