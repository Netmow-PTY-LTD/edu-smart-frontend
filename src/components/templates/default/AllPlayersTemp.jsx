/* eslint-disable @next/next/no-img-element */
import {
  bgSecondary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const dummyTeams = [
  { _id: 'team1', name: 'Adelaide Team' },
  { _id: 'team2', name: 'Sydney Team' },
  { _id: 'team3', name: 'Perth Team' },
  { _id: 'team4', name: 'Melbourne Team' },
  { _id: 'team5', name: 'Victoria Team' },
  { _id: 'team6', name: 'Brisbane Team' },
];

const playerImages = [
  {
    id: 1,
    sports_category: 'Basketball',
    imgUrl: '/template1/assets/img/basketball/player_img_bb.png',
  },
  {
    id: 2,
    sports_category: 'Football',
    imgUrl: '/template1/assets/img/football/player_img_fb.png',
  },
  {
    id: 3,
    sports_category: 'Cricket',
    imgUrl: '/template1/assets/img/cricket/player_img.png',
  },
  {
    id: 4,
    sports_category: 'Volleyball',
    imgUrl: '/template1/assets/img/volleyball/player_img.png',
  },
  {
    id: 5,
    sports_category: 'Baseball',
    imgUrl: '/template1/assets/img/baseball/player_img.png',
  },
  {
    id: 6,
    sports_category: 'Netball',
    imgUrl: '/template1/assets/img/netball/player_img.png',
  },
];

const AllPlayers = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [subdomain, setSubdomain] = useState('');
  const [orderedTeams, setOrderedTeams] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);

  const dispatch = useDispatch();

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    setSubdomain(window?.location?.hostname.split('.')[0]);
  }, [subdomain]);

  const initializedPlayers = useMemo(
    () => [
      {
        _id: 1,
        first_name: 'Liam',
        last_name: 'Kirkpatrick',
        teamId: 'team1',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 19,
        gender: 'Male',
        height: '6.2 Feet',
        weight: '50 Pounds',
        description: 'Player 1 description...',
      },
      {
        _id: 2,
        first_name: 'Maeve',
        last_name: 'Schmidt',
        teamId: 'team1',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 22,
        gender: 'Female',
        height: '5.9 Feet',
        weight: '55 Pounds',
        description: 'Player 2 description...',
      },
      {
        _id: 3,
        first_name: 'Ani',
        last_name: 'Hassan',
        teamId: 'team2',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 20,
        gender: 'Male',
        height: '6.0 Feet',
        weight: '60 Pounds',
        description: 'Player 3 description...',
      },
      {
        _id: 4,
        first_name: 'Hoss',
        last_name: 'Wang',
        teamId: 'team2',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 21,
        gender: 'Female',
        height: '5.8 Feet',
        weight: '58 Pounds',
        description: 'Player 4 description...',
      },
      {
        _id: 5,
        first_name: 'Liam',
        last_name: 'Kirkpatrick',
        teamId: 'team3',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 21,
        gender: 'Female',
        height: '5.8 Feet',
        weight: '58 Pounds',
        description: 'Player 4 description...',
      },
      {
        _id: 6,
        first_name: 'Maeve',
        last_name: 'Schmidt',
        teamId: 'team3',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 21,
        gender: 'Female',
        height: '5.8 Feet',
        weight: '58 Pounds',
        description: 'Player 4 description...',
      },
      {
        _id: 7,
        first_name: 'Ani',
        last_name: 'Hassan',
        teamId: 'team4',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 21,
        gender: 'Female',
        height: '5.8 Feet',
        weight: '58 Pounds',
        description: 'Player 4 description...',
      },
      {
        _id: 8,
        first_name: 'Hoss',
        last_name: 'Wang',
        teamId: 'team4',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 21,
        gender: 'Female',
        height: '5.8 Feet',
        weight: '58 Pounds',
        description: 'Player 8 description...',
      },
      {
        _id: 9,
        first_name: 'Liam',
        last_name: 'Kirkpatrick',
        teamId: 'team5',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 21,
        gender: 'Female',
        height: '5.8 Feet',
        weight: '58 Pounds',
        description: 'Player 9 description...',
      },
      {
        _id: 10,
        first_name: 'Maeve',
        last_name: 'Schmidt',
        teamId: 'team5',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 21,
        gender: 'Female',
        height: '5.8 Feet',
        weight: '58 Pounds',
        description: 'Player 4 description...',
      },
      {
        _id: 11,
        first_name: 'Ani',
        last_name: 'Hassan',
        teamId: 'team6',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 21,
        gender: 'Female',
        height: '5.8 Feet',
        weight: '58 Pounds',
        description: 'Player 4 description...',
      },
      {
        _id: 12,
        first_name: 'Hoss',
        last_name: 'Wang',
        teamId: 'team6',
        profile_image: {
          uploadedImage: 'template1/assets/img/player.png',
        },
        age: 21,
        gender: 'Female',
        height: '5.8 Feet',
        weight: '58 Pounds',
        description: 'Player 4 description...',
      },
    ],
    []
  );

  const updatedPlayers = initializedPlayers.map((player) => {
    const matchingImage = playerImages.find(
      (item) => item.sports_category === themeData.sports_category
    );

    if (matchingImage) {
      return {
        ...player,
        profile_image: {
          ...player.profile_image,
          uploadedImage: matchingImage.imgUrl,
        },
      };
    } else {
      return player;
    }
  });

  useEffect(() => {
    if (subdomain) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/admin/website/players/${subdomain}`
        )
        .then((res) => {
          const teamsData = res.data.map((team) => ({
            ...team,
            player: team.player.map((player) => ({
              ...player,
              teamId: team._id,
            })),
          }));
          setTeams(teamsData);
          if (res.data.length === 0) {
            setPlayers(updatedPlayers);
          } else {
            const allPlayers = teamsData.reduce(
              (acc, team) => acc.concat(team.player),
              []
            );
            setPlayers(allPlayers);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdomain]);

  useEffect(() => {
    if (teams && teams.length > 0) {
      setSelectedTeam((prevTeam) => {
        const teamIds = teams.map((team) => team._id);
        return teamIds.includes(prevTeam) ? prevTeam : teams[0]._id;
      });
    } else if (dummyTeams && dummyTeams.length > 0) {
      setSelectedTeam((prevTeam) => prevTeam || dummyTeams[0]._id);
    }
  }, [teams]);

  useEffect(() => {
    if (selectedTeam && !selectedPlayer && players.length > 0) {
      const firstPlayerOfSelectedTeam = players.find(
        (player) => player.teamId === selectedTeam
      );

      if (firstPlayerOfSelectedTeam) {
        setSelectedPlayer(firstPlayerOfSelectedTeam._id);
      }
    }
  }, [selectedTeam, players, selectedPlayer]);

  const handleTeamClick = (event, teamId) => {
    event.preventDefault();

    if (selectedTeam !== teamId) {
      setSelectedTeam(teamId);
      setSelectedPlayer(null);
      setIsActive(true);
    }
  };

  const handlePlayerClick = (playerId) => {
    setSelectedPlayer(playerId);
    setIsActive(!isActive);
  };

  // Function to update the slidesPerView based on window width
  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setSlidesPerView(4);
    } else if (width >= 768) {
      setSlidesPerView(3);
    } else if (width >= 576) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  useEffect(() => {
    updateSlidesPerView(); // Set slidesPerView on mount
    window.addEventListener('resize', updateSlidesPerView); // Update on resize

    return () => {
      window.removeEventListener('resize', updateSlidesPerView); // Cleanup on unmount
    };
  }, []);

  const teamsLength = teams.length > 0 ? teams?.length : dummyTeams?.length;

  useEffect(() => {
    // Enable navigation if teams.length exceeds the number of visible slides
    setIsNavigationEnabled(teamsLength > slidesPerView);
  }, [teamsLength, slidesPerView]);

  function parseDate(dateString) {
    console.log(dateString);
    const [day, monthStr, year] = dateString ? dateString.split(' ') : '0';
    const month = new Date(`${monthStr} 1, 2000`).getMonth();
    return new Date(year, month, parseInt(day));
  }

  function calculateAge(dateOfBirth) {
    const birthDate = parseDate(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 0 ? age : '';
  }

  console.log(updatedPlayers);

  return (
    <section className="sqdk-players">
      <div className="container container-sdpl">
        <div className="sec-heading">
          <h2 style={colorSecondary(themeData)}>Our Players</h2>
          <p>
            Our players are motivated by their desire to compete in the
            basketball game.
          </p>
        </div>
        <div className="team-list tabs">
          <Swiper
            modules={[Navigation]}
            loop={true}
            spaceBetween={20}
            navigation={isNavigationEnabled}
            breakpoints={{
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="mySwiper"
          >
            {(Array.isArray(teams) && teams.length > 0
              ? teams
              : dummyTeams
            ).map((team, index) => (
              <SwiperSlide key={index}>
                <a
                  href="#"
                  className={`team-list-item ${
                    selectedTeam === team._id ? 'active' : ''
                  }`}
                  data-tab={team._id}
                  onClick={(e) => handleTeamClick(e, team._id)}
                >
                  {team?.name}
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <style>
          {`
            .players-single.active {
              background-color: ${
                themeData?.branding?.primary_color?.trim() || '#9344E8'
              };
            }

            .team-list a.active {
              background-color: ${
                themeData?.branding?.primary_color?.trim() || '#9344E8'
              };
              color: #fff;
            }
            .team-list .swiper-button-prev,
            .team-list .swiper-button-next{
              background-color:  ${themeData?.branding?.secondary_color?.trim() || '#162a73'};
              }

            .team-list .swiper-button-prev:after,
            .team-list .swiper-button-next:after{
              color:  #fff;
              font-size: 3rem !important;
              }
          `}
        </style>
        <div className="team-players-slider">
          <div className="team-player-data">
            <div className="team-players">
              {(players && players.length > 0 ? players : updatedPlayers)
                .filter(
                  (player) =>
                    selectedTeam === null ||
                    player.teamId === selectedTeam ||
                    ((dummyTeams.find((team) => team._id === selectedTeam) ||
                      teams.find((team) => team._id === selectedTeam)) &&
                      player.team === selectedTeam)
                )
                .map((player, index) => {
                  return (
                    <div
                      key={index}
                      className={`players-single ${
                        selectedPlayer === player._id ? 'active' : ''
                      }`}
                      data-id={player._id}
                      onClick={() => handlePlayerClick(player._id)}
                    >
                      {/* Display player information */}
                      <div className="player-number">
                        {player?.jersey_number}
                      </div>
                      <div className="players-single-inner">
                        <div className="player-img">
                          <img
                            src={
                              player?.profile_image?.uploadedImage ||
                              '/assets/images/users/user-dummy-img.jpg'
                            }
                            alt={`${player?.first_name} ${player?.last_name}`}
                          />
                        </div>
                        <div className="player-info">
                          <h5 className="player-name">{`${player?.first_name} ${player?.last_name}`}</h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="player-profile">
              {selectedPlayer && (
                <div className="player-profile-inner">
                  {/* Display selected player profile */}
                  {(() => {
                    const playerList =
                      players && players.length > 0 ? players : updatedPlayers;
                    const player = playerList.find(
                      (player) => player._id === selectedPlayer
                    );

                    if (!player) return null;

                    return (
                      <div className="player-profile-inner">
                        <div
                          className="player-profile-top"
                          style={bgSecondary(themeData)}
                        >
                          <div className="player-number-large">
                            {player?.jersey_number}
                          </div>
                          <div className="player-profile-img">
                            <img
                              src={
                                player?.profile_image?.uploadedImage ||
                                '/assets/images/users/user-dummy-img.jpg'
                              }
                              alt={`${player.first_name} ${player.last_name}`}
                            />
                          </div>
                          <div className="player-details">
                            <h5 className="player-name">{`${player?.first_name} ${player?.last_name}`}</h5>
                            <div className="player-properties">
                              <div className="property">
                                <span>Age</span>
                                <span className="bold-text">
                                  {player?.date_of_birth?.trim() !== ''
                                    ? `${calculateAge(player?.date_of_birth)} years`
                                    : ''}
                                </span>
                              </div>
                              <div className="property">
                                <span>Gender</span>
                                <span className="bold-text">
                                  {player?.gender}
                                </span>
                              </div>
                            </div>
                            <div className="player-properties">
                              <div className="property">
                                <span>Height</span>
                                <span className="bold-text">
                                  {player?.height
                                    ? player?.height?.includes('CM')
                                      ? player?.height
                                      : player?.height
                                          ?.replace('CM', '')
                                          ?.trim()
                                    : ''}
                                </span>
                              </div>
                              <div className="property">
                                <span>Weight</span>
                                <span className="bold-text">
                                  {player?.weight
                                    ? player?.weight?.includes('KG')
                                      ? player?.weight
                                      : player?.weight
                                          ?.replace('KG', '')
                                          ?.trim()
                                    : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="player-profile-bottom">
                          <div className="profile-desc">
                            {player?.description}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllPlayers;
