/* eslint-disable @next/next/no-img-element */
import {
  bgPrimary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import { userInfo } from '@/slices/dashboard/adminDashboard/Actions/authActions';
import { getSubdomain, getSubdomainHelperFunction } from '@/slices/helper/getSubdomain';
import { clientAboutAction } from '@/slices/home/actions/clientAboutAction';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const aboutImages = [
  {
    id: 1,
    sports_category: 'Rugby',
    bgImage: '/template1/assets/img/slider_bg.png',
    image: '/template1/assets/img/about.png',
  },
  {
    id: 2,
    sports_category: 'Basketball',
    image: '/template1/assets/img/basketball/home_about_basketball.jpg',
  },
  {
    id: 3,
    sports_category: 'Football',
    image: '/template1/assets/img/football/home_about_football.jpg',
  },
  {
    id: 4,
    sports_category: 'Cricket',
    image: '/template1/assets/img/cricket/home_about.jpg',
  },
  {
    id: 5,
    sports_category: 'Volleyball',
    image: '/template1/assets/img/volleyball/home_about.jpg',
  },
  {
    id: 6,
    sports_category: 'Baseball',
    image: '/template1/assets/img/baseball/home_about.jpg',
  },
  {
    id: 7,
    sports_category: 'Netball',
    image: '/template1/assets/img/netball/home_about.jpg',
  },
];

export default function HomeAbout({ about }) {
  const dispatch = useDispatch();
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    dispatch(clientAboutAction(getSubdomainHelperFunction()));
  }, [dispatch]);

  const {
    data: clientAboutData,
    isLoading: clientAboutIsLoading,
    error: clientAboutError,
  } = useSelector((state) => state.Home.clientAbout);

  //About Image

  const itemMatch = aboutImages.find(
    (item) => item.sports_category === themeData.sports_category
  );

  let aboutImageUrl;

  if (clientAboutData?.about_image?.secure_url) {
    aboutImageUrl = clientAboutData?.about_image?.secure_url;
  } else if (itemMatch) {
    aboutImageUrl = itemMatch?.image;
  } else {
    aboutImageUrl = '/template1/assets/img/about.png';
  }

  return (
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
              <p>
                {about
                  ? about
                  : 'SquadDeck is a software designed to manage Sports Academies or Organisations. With SquadDeck, managing your sports academy, club or organisation is made easy with minimal paperwork. We are a team of enthusiastic software developers, dedicated to improving your youth sports experience by providing smart solutions. By utilising SquadDeck, sports organisations can easily manage their daily activities, coaches can effectively instruct and manage their teams, athletes can excel at sports and everyone can stay connected with their club, team or athlete.'}
              </p>
              <div className="sqdk-about-btn-wrapper">
                <Link
                  href="/about"
                  className="btn btn-lg fw-semibold fs-2 px-4 py-3 text-light"
                  style={bgPrimary(themeData)}
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
          <div className="sqdk-about-right-content">
            <div className="sqdk-about-images">
              <div className="about-img1">
                <img src={aboutImageUrl} alt={themeData.sports_category} />
                {/* <Link href="/about" className="video-player">
                  <svg
                    width="6.4rem"
                    height="6.4rem"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32 0.125C25.6957 0.125 19.533 1.99444 14.2912 5.49691C9.04938 8.99938 4.96388 13.9776 2.55134 19.802C0.138795 25.6264 -0.492435 32.0354 0.737468 38.2185C1.96737 44.4016 5.00317 50.0812 9.46097 54.539C13.9188 58.9968 19.5984 62.0326 25.7815 63.2625C31.9646 64.4924 38.3736 63.8612 44.198 61.4487C50.0224 59.0361 55.0006 54.9506 58.5031 49.7088C62.0056 44.467 63.875 38.3043 63.875 32C63.8585 23.5513 60.4949 15.4534 54.5208 9.47922C48.5466 3.50507 40.4487 0.141518 32 0.125ZM32 60.125C26.4374 60.125 20.9997 58.4755 16.3746 55.3851C11.7495 52.2947 8.1446 47.9021 6.01589 42.763C3.88717 37.6238 3.3302 31.9688 4.41541 26.5131C5.50062 21.0574 8.17927 16.046 12.1126 12.1126C16.046 8.17927 21.0574 5.50062 26.5131 4.41541C31.9688 3.3302 37.6238 3.88717 42.763 6.01589C47.9021 8.1446 52.2947 11.7495 55.3851 16.3746C58.4755 20.9997 60.125 26.4374 60.125 32C60.1167 39.4567 57.1509 46.6056 51.8782 51.8782C46.6056 57.1509 39.4567 60.1167 32 60.125ZM43.0312 30.4375L28.0312 20.4375C27.7488 20.2515 27.4213 20.1453 27.0835 20.1303C26.7456 20.1152 26.41 20.1918 26.1121 20.352C25.8143 20.5121 25.5652 20.7498 25.3915 21.04C25.2177 21.3301 25.1256 21.6618 25.125 22V42C25.1254 42.3409 25.2187 42.6752 25.3949 42.9671C25.5711 43.2589 25.8235 43.4972 26.125 43.6562C26.4211 43.816 26.7552 43.8917 27.0912 43.8752C27.4272 43.8587 27.7523 43.7505 28.0312 43.5625L43.0312 33.5625C43.2891 33.3915 43.5006 33.1593 43.6469 32.8867C43.7932 32.614 43.8698 32.3094 43.8698 32C43.8698 31.6906 43.7932 31.386 43.6469 31.1134C43.5006 30.8407 43.2891 30.6085 43.0312 30.4375ZM28.875 38.5V25.5L38.625 32L28.875 38.5Z"
                      fill="white"
                    />
                  </svg>
                </Link> */}
              </div>
            </div>
            <div className="shape-1">
              <img src="template1/assets/img/ellipse1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
