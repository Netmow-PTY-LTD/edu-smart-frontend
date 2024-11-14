import {
  bgSecondary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerProfileModal from '@/components/dashboard/common/Modals/PlayerProfileModal';

const playersData = [
  {
    id: 1,
    first_name: 'Mario',
    last_name: 'Bellucci',
    profile_image: {
      uploadedImage: '/template1/assets/img/player_img1.png',
    },
  },
  {
    id: 2,
    first_name: 'ARCHIE',
    last_name: 'STEAD',
    profile_image: {
      uploadedImage: '/template1/assets/img/player_img2.png',
    },
  },
  {
    id: 3,
    first_name: 'ARCHIE',
    last_name: 'STEAD',
    profile_image: {
      uploadedImage: '/template1/assets/img/player_img3.png',
    },
  },
  {
    id: 4,
    first_name: 'Mario',
    last_name: 'Bellucci',
    profile_image: {
      uploadedImage: '/template1/assets/img/player_img4.png',
    },
  },
  {
    id: 5,
    first_name: 'ARCHIE',
    last_name: 'STEAD',
    profile_image: {
      uploadedImage: '/template1/assets/img/player_img1.png',
    },
  },
  {
    id: 6,
    first_name: 'Mario',
    last_name: 'Bellucci',
    profile_image: {
      uploadedImage: '/template1/assets/img/player_img2.png',
    },
  },
  {
    id: 7,
    first_name: 'ARCHIE',
    last_name: 'STEAD',
    profile_image: {
      uploadedImage: '/template1/assets/img/player_img3.png',
    },
  },
  {
    id: 8,
    first_name: 'Mario',
    last_name: 'Bellucci',
    profile_image: {
      uploadedImage: '/template1/assets/img/player_img4.png',
    },
  },
];
const PlayersGrid = ({ singleTeamData }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [showPlayerProfile, setShowPlayerProfile] = useState(false);
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const toggleProfileModal = () => {
    setShowPlayerProfile(!showPlayerProfile);
  };

  const openPlayerProfile = (playerId) => {
    setSelectedPlayerId(playerId);
    setShowPlayerProfile(true);
  };

  return (
    <section className="team-page-players">
      <div className="container">
        <div className="page-section-heading">
          <h3 style={colorSecondary(themeData)}>Our Team</h3>
          <h2 style={colorSecondary(themeData)}>Exclusive Members</h2>
        </div>
        <div className="tm-players">
          {(singleTeamData?.player?.length > 0
            ? singleTeamData
            : playersData
          )?.player?.map((player, index) => {
            return (
              <div
                className="tm-player-single"
                key={index}
                style={{ cursor: 'pointer' }}
                onClick={() => openPlayerProfile(player._id)}
              >
                <img
                  src={
                    player?.profile_image?.uploadedImage
                      ? player?.profile_image?.uploadedImage
                      : '/assets/images/users/user-dummy-img.jpg'
                  }
                  alt={player.first_name + ' ' + player.last_name}
                />
                <h4 style={bgSecondary(themeData)}>
                  {player.first_name + ' ' + player.last_name}
                </h4>
              </div>
            );
          })}
        </div>
        <PlayerProfileModal
          isOpen={showPlayerProfile}
          toggle={toggleProfileModal}
          singleTeamData={singleTeamData}
          selectedPlayerId={selectedPlayerId}
        />
      </div>
    </section>
  );
};

export default PlayersGrid;
