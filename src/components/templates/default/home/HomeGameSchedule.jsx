/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const dummyGameSchedules = [
  {
    _id: 1,
    host_team_name: 'Team A',
    guest_team_name: 'Team B',
    date: [
      {
        date: 'Mon Sep 30 2024',
        start_time: '18:01',
        end_time: '20:05',
      },
    ],
    host_team_id: {
      _id: 1,
      name: 'Team A',
      logo: '/template1/assets/img/team1_logo.png',
    },
    guest_team_id: {
      _id: 2,
      name: 'Team B',
      logo: '/template1/assets/img/team2_logo.png',
    },
    vanue: 'Dream Arena Stadium',
    status: 'active',
  },
  {
    _id: 2,
    host_team_name: 'Team C',
    guest_team_name: 'Team D',
    date: [
      {
        date: 'Wed Oct 1 2024',
        start_time: '14:00',
        end_time: '16:00',
      },
    ],
    host_team_id: {
      _id: 3,
      name: 'Team C',
      logo: '/template1/assets/img/team3_logo.png',
    },
    guest_team_id: {
      _id: 4,
      name: 'Team D',
      logo: '/template1/assets/img/team4_logo.png',
    },
    vanue: 'Victory Stadium',
    status: 'active',
  },
  {
    _id: 3,
    host_team_name: 'Team E',
    guest_team_name: 'Team F',
    date: [
      {
        date: 'Fri Oct 4 2024',
        start_time: '19:30',
        end_time: '21:30',
      },
    ],
    host_team_id: {
      _id: 5,
      name: 'Team E',
      logo: '/template1/assets/img/team5_logo.png',
    },
    guest_team_id: {
      _id: 6,
      name: 'Team F',
      logo: '/template1/assets/img/team6_logo.png',
    },
    vanue: 'Legends Field, Gotham',
    status: 'upcoming',
  },
  {
    _id: 4,
    host_team_name: 'Team G',
    guest_team_name: 'Team H',
    date: [
      {
        date: 'Sun Oct 5 2024',
        start_time: '16:00',
        end_time: '18:00',
      },
    ],
    host_team_id: {
      _id: 7,
      name: 'Team G',
      logo: '/template1/assets/img/team7_logo.png',
    },
    guest_team_id: {
      _id: 8,
      name: 'Team H',
      logo: '/template1/assets/img/team8_logo.png',
    },
    vanue: 'Champions Stadium, Star City',
    status: 'completed',
  },
  {
    _id: 5,
    host_team_name: 'Team I',
    guest_team_name: 'Team J',
    date: [
      {
        date: 'Tue Oct 7 2024',
        start_time: '17:15',
        end_time: '19:15',
      },
    ],
    host_team_id: {
      _id: 9,
      name: 'Team I',
      logo: '/template1/assets/img/team9_logo.png',
    },
    guest_team_id: {
      _id: 10,
      name: 'Team J',
      logo: '/template1/assets/img/team10_logo.png',
    },
    vanue: 'Infinity Park, Central City',
    status: 'scheduled',
  },
  {
    _id: 6,
    host_team_name: 'Team K',
    guest_team_name: 'Team L',
    date: [
      {
        date: 'Thu Oct 9 2024',
        start_time: '20:00',
        end_time: '22:00',
      },
    ],
    host_team_id: {
      _id: 11,
      name: 'Team K',
      logo: '/template1/assets/img/team11_logo.png',
    },
    guest_team_id: {
      _id: 12,
      name: 'Team L',
      logo: '/template1/assets/img/team12_logo.png',
    },
    vanue: 'Galaxy Stadium, Keystone City',
    status: 'active',
  },
];

export default function HomeGameSchedule() {
  const [subdomain, setSubdomain] = useState('');
  const [gameschedule, setGameschedule] = useState([]);

  // Create refs for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    setSubdomain(themeData?.subdomain);
  }, [themeData?.subdomain]);

  useEffect(() => {
    if (subdomain) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/gameschedule/${subdomain}`
        )
        .then((res) => {
          setGameschedule(res.data.length > 0 ? res.data : dummyGameSchedules);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [subdomain]);

  //console.log(gameschedule);

  return (
    <>
      <section className="home-game-schedule">
        <div className="container">
          <div className="section-heading-left">
            <h2>Upcoming Games</h2>
            <div className="custom-navigation">
              <button ref={prevRef} className="swiper-button-prev"></button>
              <button ref={nextRef} className="swiper-button-next"></button>
            </div>
          </div>

          <div className="game-schedule">
            <Swiper
              modules={[Navigation]}
              loop={true}
              spaceBetween={30}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              breakpoints={{
                576: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="mySwiper"
            >
              {gameschedule?.length > 0 &&
                gameschedule?.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="game-item">
                      <div className="game-item-top">
                        <div className="team team-1">
                          <div className="team-logo">
                            <img
                              src={`${item?.host_team_id?.image?.uploadedImage || '/template1/assets/img/team1_logo.png'}`}
                              alt={`${item?.host_team_id?.name || 'Team 1 Logo'}`}
                            />
                          </div>
                          <div className="team-name">
                            {item?.host_team_name}
                          </div>
                        </div>
                        <div className="team-intro">Vs.</div>
                        <div className="team team-2">
                          <div className="team-logo">
                            <img
                              src={`${item?.guest_team_id?.image?.uploadedImage || '/template1/assets/img/team2_logo.png'}`}
                              alt={`${item?.guest_team_id?.name || 'Team 2 Logo'}`}
                            />
                          </div>
                          <div className="team-name">
                            {item?.guest_team_name}
                          </div>
                        </div>
                      </div>
                      <div className="game-location">
                        <div className="location-icon">
                          <svg
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.6 5.35959L8.80005 0.100098V16.9001H10.759V9.44826L17.6 5.35959Z"
                              fill="#162A73"
                            />
                            <path
                              d="M2 16.3957C2 16.2181 2.17323 15.7691 3.1647 15.2326C4.08847 14.7328 5.46218 14.3137 7.13617 14.0834L6.86383 12.1001C5.04225 12.3507 3.41595 12.821 2.21362 13.4715C1.07898 14.0855 0 15.0481 0 16.3957C0 17.2543 0.45088 17.963 1.03043 18.4963C1.60913 19.0289 2.39133 19.4625 3.27359 19.8059C5.04448 20.4953 7.42296 20.9001 10 20.9001C12.577 20.9001 14.9555 20.4953 16.7264 19.8059C17.6087 19.4625 18.3909 19.0289 18.9696 18.4963C19.5491 17.963 20 17.2543 20 16.3957C20 15.0481 18.921 14.0855 17.7864 13.4715C16.584 12.821 14.9578 12.3507 13.1362 12.1001L12.8638 14.0834C14.5378 14.3137 15.9115 14.7328 16.8353 15.2326C17.8268 15.7691 18 16.2181 18 16.3957C18 16.5048 17.9472 16.7178 17.6159 17.0227C17.2838 17.3283 16.7479 17.6496 16.0015 17.9401C14.515 18.5188 12.3935 18.8982 10 18.8982C7.60648 18.8982 5.48496 18.5188 3.99849 17.9401C3.25207 17.6496 2.71624 17.3283 2.3841 17.0227C2.0528 16.7178 2 16.5048 2 16.3957Z"
                              fill="#162A73"
                            />
                          </svg>
                        </div>
                        <div className="location-name">{item?.vanue}</div>
                      </div>

                      {item?.date
                        ? item?.date?.map((d, i) => {
                            const formattedDate = d.date
                              ? new Date(d.date).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : '';

                            const [hour, minute] = d.start_time
                              ? d.start_time.split(':')
                              : '';
                            const date = new Date();
                            date.setHours(hour, minute);
                            const formattedTime = d.start_time
                              ? date
                                  .toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                  })
                                  .toUpperCase()
                              : '';

                            return (
                              <div className="game-date" key={i}>
                                <div className="date-icon">
                                  <svg
                                    width="32"
                                    height="35"
                                    viewBox="0 0 32 35"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M27.75 16.9702C28.4141 17.4373 29.0062 17.9671 29.5264 18.5596C30.0465 19.152 30.4948 19.8014 30.8711 20.5078C31.2474 21.2142 31.5241 21.9604 31.7012 22.7466C31.8783 23.5327 31.9779 24.3359 32 25.1562C32 26.512 31.751 27.7881 31.2529 28.9844C30.7549 30.1807 30.0687 31.2231 29.1943 32.1118C28.32 33.0005 27.3073 33.7012 26.1562 34.2139C25.0052 34.7266 23.7656 34.9886 22.4375 35C21.4303 35 20.4564 34.8462 19.5156 34.5386C18.5749 34.231 17.7116 33.7866 16.9258 33.2056C16.14 32.6245 15.4427 31.9295 14.834 31.1206C14.2253 30.3117 13.7549 29.4173 13.4229 28.4375H0.125V2.1875H4.375V0H6.5V2.1875H21.375V0H23.5V2.1875H27.75V16.9702ZM2.25 4.375V8.75H25.625V4.375H23.5V6.5625H21.375V4.375H6.5V6.5625H4.375V4.375H2.25ZM12.9248 26.25C12.8916 25.8968 12.875 25.5322 12.875 25.1562C12.875 24.1764 13.0078 23.2251 13.2734 22.3022C13.5391 21.3794 13.943 20.5078 14.4854 19.6875H12.875V17.5H15V18.9697C15.4538 18.3887 15.9574 17.876 16.5107 17.4316C17.0641 16.9873 17.6618 16.6056 18.3037 16.2866C18.9456 15.9676 19.6152 15.7284 20.3125 15.5688C21.0098 15.4093 21.7181 15.3239 22.4375 15.3125C23.5443 15.3125 24.6068 15.5005 25.625 15.8765V10.9375H2.25V26.25H12.9248ZM22.4375 32.8125C23.4668 32.8125 24.4297 32.6131 25.3262 32.2144C26.2227 31.8156 27.0085 31.2687 27.6836 30.5737C28.3587 29.8787 28.89 29.0698 29.2773 28.147C29.6647 27.2241 29.8639 26.2272 29.875 25.1562C29.875 24.0967 29.6813 23.1055 29.2939 22.1826C28.9066 21.2598 28.3753 20.4508 27.7002 19.7559C27.0251 19.0609 26.2393 18.514 25.3428 18.1152C24.4463 17.7165 23.4779 17.5114 22.4375 17.5C21.4082 17.5 20.4453 17.6994 19.5488 18.0981C18.6523 18.4969 17.8665 19.0438 17.1914 19.7388C16.5163 20.4338 15.985 21.2427 15.5977 22.1655C15.2103 23.0884 15.0111 24.0853 15 25.1562C15 26.2158 15.1937 27.207 15.5811 28.1299C15.9684 29.0527 16.4997 29.8617 17.1748 30.5566C17.8499 31.2516 18.6357 31.7985 19.5322 32.1973C20.4287 32.596 21.3971 32.8011 22.4375 32.8125ZM23.5 24.0625H26.6875V26.25H21.375V19.6875H23.5V24.0625ZM4.375 17.5H6.5V19.6875H4.375V17.5ZM8.625 17.5H10.75V19.6875H8.625V17.5ZM8.625 13.125H10.75V15.3125H8.625V13.125ZM8.625 21.875H10.75V24.0625H8.625V21.875ZM15 15.3125H12.875V13.125H15V15.3125ZM19.25 15.3125H17.125V13.125H19.25V15.3125ZM4.375 13.125H6.5V15.3125H4.375V13.125Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>
                                <div className="date-time">
                                  {formattedDate ? formattedDate : ''} |{' '}
                                  {formattedTime?.toUpperCase()}
                                </div>
                              </div>
                            );
                          })
                        : ''}
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
