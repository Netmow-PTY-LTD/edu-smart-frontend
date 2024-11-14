/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import {
  bgPrimary,
  bgSecondary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import { useDispatch, useSelector } from 'react-redux';

const playersData = [
  {
    id: 1,
    first_name: 'Mario',
    last_name: 'Bellucci',
    profile_image: {
      uploadedImage: 'template1/assets/img/player_img1.png',
    },
  },
  {
    id: 2,
    first_name: 'ARCHIE',
    last_name: 'STEAD',
    profile_image: {
      uploadedImage: 'template1/assets/img/player_img2.png',
    },
  },
  {
    id: 3,
    first_name: 'Mario',
    last_name: 'Bellucci',
    profile_image: {
      uploadedImage: 'template1/assets/img/player_img3.png',
    },
  },
  {
    id: 4,
    first_name: 'ARCHIE',
    last_name: 'STEAD',
    profile_image: {
      uploadedImage: 'template1/assets/img/player_img4.png',
    },
  },
  {
    id: 5,
    first_name: 'Mario',
    last_name: 'Bellucci',
    profile_image: {
      uploadedImage: 'template1/assets/img/player_img3.png',
    },
  },
  {
    id: 6,
    first_name: 'ARCHIE',
    last_name: 'STEAD',
    profile_image: {
      uploadedImage: 'template1/assets/img/player_img4.png',
    },
  },
];

const playersImages = [
  {
    id: 1,
    sports_category: 'Basketball',
    image: {
      playerImage1:
        '/template1/assets/img/basketball/player_img1_basketball.jpg',
      playerImage2:
        '/template1/assets/img/basketball/player_img2_basketball.jpg',
      playerImage3:
        '/template1/assets/img/basketball/player_img3_basketball.jpg',
      playerImage4:
        '/template1/assets/img/basketball/player_img4_basketball.jpg',
      playerImage5:
        '/template1/assets/img/basketball/player_img1_basketball.jpg',
      playerImage6:
        '/template1/assets/img/basketball/player_img2_basketball.jpg',
    },
  },
  {
    id: 2,
    sports_category: 'Football',
    image: {
      playerImage1: '/template1/assets/img/football/player_img1_football.jpg',
      playerImage2: '/template1/assets/img/football/player_img2_football.jpg',
      playerImage3: '/template1/assets/img/football/player_img3_football.jpg',
      playerImage4: '/template1/assets/img/football/player_img4_football.jpg',
      playerImage5: '/template1/assets/img/football/player_img1_football.jpg',
      playerImage6: '/template1/assets/img/football/player_img2_football.jpg',
    },
  },
  {
    id: 3,
    sports_category: 'Cricket',
    image: {
      playerImage1: '/template1/assets/img/cricket/player_img1.jpg',
      playerImage2: '/template1/assets/img/cricket/player_img2.jpg',
      playerImage3: '/template1/assets/img/cricket/player_img3.jpg',
      playerImage4: '/template1/assets/img/cricket/player_img4.jpg',
      playerImage5: '/template1/assets/img/cricket/player_img1.jpg',
      playerImage6: '/template1/assets/img/cricket/player_img2.jpg',
    },
  },
  {
    id: 4,
    sports_category: 'Volleyball',
    image: {
      playerImage1: '/template1/assets/img/volleyball/player_img1.jpg',
      playerImage2: '/template1/assets/img/volleyball/player_img2.jpg',
      playerImage3: '/template1/assets/img/volleyball/player_img3.jpg',
      playerImage4: '/template1/assets/img/volleyball/player_img4.jpg',
      playerImage5: '/template1/assets/img/volleyball/player_img1.jpg',
      playerImage6: '/template1/assets/img/volleyball/player_img2.jpg',
    },
  },
  {
    id: 5,
    sports_category: 'Baseball',
    image: {
      playerImage1: '/template1/assets/img/volleyball/player_img1.jpg',
      playerImage2: '/template1/assets/img/volleyball/player_img2.jpg',
      playerImage3: '/template1/assets/img/volleyball/player_img3.jpg',
      playerImage4: '/template1/assets/img/volleyball/player_img4.jpg',
      playerImage5: '/template1/assets/img/volleyball/player_img1.jpg',
      playerImage6: '/template1/assets/img/volleyball/player_img2.jpg',
    },
  },
  {
    id: 6,
    sports_category: 'Netball',
    image: {
      playerImage1: '/template1/assets/img/volleyball/player_img1.jpg',
      playerImage2: '/template1/assets/img/volleyball/player_img2.jpg',
      playerImage3: '/template1/assets/img/volleyball/player_img3.jpg',
      playerImage4: '/template1/assets/img/volleyball/player_img4.jpg',
      playerImage5: '/template1/assets/img/volleyball/player_img1.jpg',
      playerImage6: '/template1/assets/img/volleyball/player_img2.jpg',
    },
  },
];

export default function HomePlayers({ players }) {
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
        className="slick-prev slick-arrow"
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
        className="slick-next slick-arrow"
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
    autoplay: true,
    autoPlaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const playersWithImages = playersData.map((player) => {
    const playerMatch = playersImages.find(
      (item) => item.sports_category === themeData?.sports_category
    );

    if (playerMatch && typeof playerMatch.image === 'string') {
      player.profile_image.uploadedImage = playerMatch.image;
    } else if (playerMatch && typeof playerMatch.image === 'object') {
      const playerImageKey = `playerImage${player.id}`;
      if (playerMatch.image[playerImageKey]) {
        player.profile_image.uploadedImage = playerMatch.image[playerImageKey];
      }
    }

    return player;
  });

  return (
    <section
      className="home-players"
      style={{ backgroundImage: `url('template1/assets/img/players-bg.png')` }}
    >
      <div className="players-overlay" style={bgSecondary(themeData)}></div>
      <div className="container">
        <div className="section-heading">
          <h2>Meet all the best players</h2>
          <Link
            href="/players"
            className="section-btn"
            style={bgPrimary(themeData)}
          >
            View All Players
          </Link>
        </div>
        <style>
          {`
           .home-players::before {
            background-color: ${
              themeData?.branding?.primary_color?.trim() || '#9344E8'
            };
            }

            .home-players::after{
              background-color: ${
                themeData?.branding?.primary_color?.trim() || '#9344E8'
              };
            }
            
            .home-players .slick-prev, 
            .home-players .slick-next{
              background-color: ${
                themeData?.branding?.primary_color?.trim() || '#9344E8'
              };
            }
          `}
        </style>
        <div className="players-wrapper">
          <div className="players">
            <Slider {...settings}>
              {(players && players.length > 0
                ? players
                : playersWithImages
              )?.map((player, index) => {
                return (
                  <div key={index} className="player-single">
                    <img
                      src={
                        player?.profile_image?.uploadedImage ||
                        '/assets/images/users/user-dummy-img.jpg'
                      }
                      alt={`${player.first_name} ${player.last_name}`}
                    />
                    <h4 style={colorSecondary(themeData)}>
                      {player.first_name} {player.last_name}
                    </h4>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
