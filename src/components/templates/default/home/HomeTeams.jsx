/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  bgPrimary,
  colorPrimary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import DOMPurify from 'dompurify';

const teamData = [
  {
    id: 1,
    name: 'Team Eagle',
    description:
      'Soaring high with determination and vision, Team Eagle exemplifies strength and precision. Known for their strategic approach and teamwork, they aim for victory with every challenge they face.',
    image: {
      uploadedImage: 'template1/assets/img/team-img-small1.png',
    },
  },
  {
    id: 2,
    name: 'Team Sprint',
    description:
      'Fast, agile, and always on the move, Team Sprint embodies speed and efficiency. With a focus on quick execution and adaptability, they tackle obstacles head-on and strive for excellence in every endeavor.',
    image: {
      uploadedImage: 'template1/assets/img/team-img2.png',
    },
  },
  {
    id: 3,
    name: 'Team Spark',
    description:
      'Igniting passion and creativity, Team Spark is all about innovation and inspiration. Their dynamic energy fuels collaboration, driving them to push boundaries and achieve remarkable results together.',
    image: {
      uploadedImage: 'template1/assets/img/team-img3.png',
    },
  },
  {
    id: 4,
    name: 'Team Gladiators',
    description:
      'Fierce and resilient, Team Gladiators are warriors on the field. With a strong sense of camaraderie and competitive spirit, they face challenges with courage and determination, ready to conquer any opponent.',
    image: {
      uploadedImage: 'template1/assets/img/team-img-small1.png',
    },
  },
];

const teamImages = [
  {
    id: 1,
    sports_category: 'Basketball',
    image: {
      teamImage1: '/template1/assets/img/basketball/team_img1_basketball.jpg',
      teamImage2: '/template1/assets/img/basketball/team_img2_basketball.jpg',
      teamImage3: '/template1/assets/img/basketball/team_img3_basketball.jpg',
      teamImage4: '/template1/assets/img/basketball/team_img4_basketball.jpg',
    },
  },
  {
    id: 2,
    sports_category: 'Football',
    image: {
      teamImage1: '/template1/assets/img/football/team_img1_football.jpg',
      teamImage2: '/template1/assets/img/football/team_img2_football.jpg',
      teamImage3: '/template1/assets/img/football/team_img3_football.jpg',
      teamImage4: '/template1/assets/img/football/team_img4_football.jpg',
    },
  },
  {
    id: 3,
    sports_category: 'Cricket',
    image: {
      teamImage1: '/template1/assets/img/cricket/team1.jpg',
      teamImage2: '/template1/assets/img/cricket/team2.jpg',
      teamImage3: '/template1/assets/img/cricket/team3.jpg',
      teamImage4: '/template1/assets/img/cricket/team4.jpg',
    },
  },
  {
    id: 4,
    sports_category: 'Volleyball',
    image: {
      teamImage1: '/template1/assets/img/volleyball/team1.jpg',
      teamImage2: '/template1/assets/img/volleyball/team2.jpg',
      teamImage3: '/template1/assets/img/volleyball/team3.jpg',
      teamImage4: '/template1/assets/img/volleyball/team4.jpg',
    },
  },
  {
    id: 5,
    sports_category: 'Baseball',
    image: {
      teamImage1: '/template1/assets/img/baseball/team1.jpg',
      teamImage2: '/template1/assets/img/baseball/team2.png',
      teamImage3: '/template1/assets/img/baseball/team3.png',
      teamImage4: '/template1/assets/img/baseball/team4.jpg',
    },
  },
  {
    id: 6,
    sports_category: 'Netball',
    image: {
      teamImage1: '/template1/assets/img/netball/team1.jpg',
      teamImage2: '/template1/assets/img/netball/team2.jpg',
      teamImage3: '/template1/assets/img/netball/team3.jpg',
      teamImage4: '/template1/assets/img/netball/team4.jpg',
    },
  },
];

export default function HomeTeams({ teams }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const dispatch = useDispatch();
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="slick-prev slick-arrow team-btn-prev"
        aria-label="Previous"
        type="button"
        onClick={onClick}
      >
        <svg
          width="1.9rem"
          height="1.2rem"
          viewBox="0 0 19 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.95619 0.681641L0.352001 2.28583L9.32456 11.2584L18.2971 2.28583L16.6929 0.681641L9.32456 8.05002L1.95619 0.681641Z"
            fill={`${themeData?.branding?.secondary_color?.trim() || '#162A73'}`}
          ></path>
        </svg>
      </button>
    );
  };

  // Custom next button component
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="slick-next slick-arrow team-btn-next"
        aria-label="Previous"
        type="button"
        onClick={onClick}
      >
        <svg
          width="1.9rem"
          height="1.2rem"
          viewBox="0 0 19 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.44636 10.9482L0.842173 9.34406L9.81473 0.371497L18.7873 9.34406L17.1831 10.9482L9.81473 3.57987L2.44636 10.9482V10.9482Z"
            fill={`${themeData?.branding?.secondary_color?.trim() || '#162A73'}`}
          ></path>
        </svg>
      </button>
    );
  };

  const teamsWithImages = teamData.map((team) => {
    // Find the matching team image object in teamImages
    const teamMatch = teamImages.find(
      (item) => item.sports_category === themeData.sports_category
    );

    // If a match is found and it's not an object (i.e., a direct URL), update the team's image URL
    if (teamMatch && typeof teamMatch.image === 'string') {
      team.image.uploadedImage = teamMatch.image;
    } else if (teamMatch && typeof teamMatch.image === 'object') {
      // If a match is found and it's an object, find the corresponding image for the team
      const teamImageKey = `teamImage${team.id}`;
      if (teamMatch.image[teamImageKey]) {
        team.image.uploadedImage = teamMatch.image[teamImageKey];
      }
    }

    return team;
  });

  return (
    <section className="home-team">
      <div className="container">
        <div className="section-heading-left">
          <h2 style={colorSecondary(themeData)}>Meet Our Teams</h2>
        </div>
        <div className="team-content">
          <div className="team-img-slider">
            <Slider
              asNavFor={nav2}
              ref={(slider) => (sliderRef1 = slider)}
              slidesToShow={1}
              slidesToScroll={1}
              swipeToSlide={true}
              focusOnSelect={true}
              autoplay={true}
              autoplaySpeed={5000}
              adaptiveHeight={true}
            >
              {(teams && teams.length > 0 ? teams : teamsWithImages)?.map(
                (team, index) => (
                  <img
                    src={
                      team?.image?.uploadedImage
                        ? team?.image?.uploadedImage
                        : '/assets/images/users/user-dummy-img.jpg'
                    }
                    alt="Team Image"
                    key={index}
                  />
                )
              )}
            </Slider>
          </div>
          <div className="team-slider">
            <style>
              {`
                .team-slider
                  .slick-slide.slick-current.slick-active
                  .team-single {
                    background-color: ${
                      themeData?.branding?.primary_color?.trim() || '#9344E8'
                    };
                }
                .team-slider .slick-slide.slick-current.slick-active .team-info h4 a{
                  color: #fff !important;
                }
              `}
            </style>
            <Slider
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={3}
              slidesToScroll={1}
              swipeToSlide={true}
              infinite={Array.isArray(teams) && teams?.length >= 3}
              focusOnSelect={true}
              vertical={true}
              verticalSwiping={true}
              autoplay={true}
              autoplaySpeed={5000}
              arrows={true}
              adaptiveHeight={false}
              prevArrow={<PrevArrow />}
              nextArrow={<NextArrow />}
            >
              {(teams && teams.length > 0 ? teams : teamsWithImages)?.map(
                (team, index) => {
                  return (
                    <div key={index} className="team-single">
                      <div className="team-single-inner">
                        <div className="team-img">
                          <img
                            src={
                              team?.image?.uploadedImage
                                ? team?.image?.uploadedImage
                                : '/assets/images/users/user-dummy-img.jpg'
                            }
                            alt=""
                          />
                        </div>
                        <div className="team-info">
                          <h4>
                            <Link
                              href={team._id ? `/teams/${team._id}` : ''}
                              style={colorPrimary(themeData)}
                            >
                              {team?.name}
                            </Link>
                          </h4>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(team?.description),
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
