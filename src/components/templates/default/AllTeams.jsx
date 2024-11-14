/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubdomain } from '@/slices/helper/getSubdomain';
import {
  clientTeamAction,
  getSingleTeamAction,
} from '@/slices/home/actions/clientTeamAction';
import Link from 'next/link';
import { userInfo } from '@/slices/dashboard/adminDashboard/Actions/authActions';
import {
  bgPrimary,
  colorPrimary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import DOMPurify from 'dompurify';

const Teams = [
  {
    id: 1,
    name: 'Team Eagle',
    description: 'This is a team eagle',
    image: {
      uploadedImage: '/template1/assets/img/team-img-small1.png',
    },
    total_player: 3,
    total_played: 2,
  },
  {
    id: 2,
    name: 'Team Sprint',
    description: 'This is a team sprint',
    image: {
      uploadedImage: '/template1/assets/img/team-img2.png',
    },
    total_player: 4,
    total_played: 4,
  },
  {
    id: 3,
    name: 'Team Spark',
    description: 'This is a team spark',
    image: {
      uploadedImage: '/template1/assets/img/team-img3.png',
    },
    total_player: 5,
    total_played: 5,
  },
  {
    id: 4,
    name: 'Team Spark',
    description: 'This is a team spark',
    image: {
      uploadedImage: '/template1/assets/img/team-img-small1.png',
    },
    total_player: 6,
    total_played: 6,
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
      teamImage2: '/template1/assets/img/baseball/team2.jpg',
      teamImage3: '/template1/assets/img/baseball/team3.jpg',
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

const AllTeams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [subdomain, setSubdomain] = useState('');
  const [visibleTeams, setVisibleTeams] = useState(8);

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const dispatch = useDispatch();

  const {
    data: teamData,
    isLoading: teamIsLoading,
    error: teamError,
  } = useSelector((state) => state.Home.clientTeams);

  console.log(teamData);

  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);
  const {
    data: userInfoData,
    isLoading: userInfoIsLoading,
    error: userInfoError,
  } = useSelector((state) => state.AdminDashboard.userInfo);

  useEffect(() => {
    setSubdomain(window?.location?.hostname.split('.')[0]);
    if (subdomain) {
      dispatch(clientTeamAction({ subdomain: subdomain }));
    }
  }, [dispatch, subdomain]);

  const teamsWithImages = Teams.map((team) => {
    // Find the matching team image object in teamImages
    const teamMatch = teamImages.find(
      (item) => item.sports_category === userInfoData.sports_category
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

  useEffect(() => {
    const filteredData = (
      teamData && teamData.length > 0 ? teamData : teamsWithImages
    ).filter((team) =>
      Object.values(team).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredTeams(filteredData);
  }, [teamData, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const loadMore = () => {
    setVisibleTeams((prevVisibleTeams) => prevVisibleTeams + 4);
  };

  return (
    <section className="sqdk-teams">
      <div className="container">
        <div className="sec-heading">
          <h2 style={colorSecondary(themeData)}>Our Teams</h2>
        </div>
        <div className="team-search">
          <form action="">
            <div className="sqdk-form-group">
              <input
                type="text"
                className="sqdk-form-input"
                placeholder="Search a team"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
                type="submit"
                className="btn-team-search"
                style={bgPrimary(themeData)}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="teams-row">
          {(filteredTeams || []).slice(0, visibleTeams)?.map((team, index) => {
            return (
              <div className="teams-col" key={index}>
                <div className="team-single">
                  <div className="team-single-inner">
                    <div className="team-img">
                      <img
                        src={
                          team?.image?.uploadedImage ||
                          '/assets/images/users/user-dummy-img.jpg'
                        }
                        alt={team?.name}
                      />
                    </div>
                    <div className="team-info">
                      <h4>
                        <Link
                          href={team._id ? `/teams/${team._id}` : '#'}
                          style={colorPrimary(themeData)}
                        >
                          {team?.name}
                        </Link>
                      </h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(team?.description),
                        }}
                        className="team-desc"
                      ></div>
                      <div className="team-features">
                        <div className="team-members">
                          Team Players: <br />
                          <span>{team?.total_player}</span>
                        </div>
                        <div className="team-members">
                          Event Played:
                          <br />
                          <span>{team?.total_played}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filteredTeams && filteredTeams.length > visibleTeams && (
          <div className="load-more-btn d-flex justify-content-center mt-5">
            <button
              onClick={loadMore}
              className="btn btn-lg fw-semibold fs-2 px-4 py-3 d-flex"
              style={{
                backgroundColor: `${themeData?.branding?.primary_color?.trim() || '#9344E8'}`,
                color: '#fff',
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllTeams;
