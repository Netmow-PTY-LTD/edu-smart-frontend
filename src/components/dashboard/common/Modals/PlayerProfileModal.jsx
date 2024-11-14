/* eslint-disable @next/next/no-img-element */
import { bgSecondary } from '@/components/constants/utils/themeUtils';
import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const PlayerProfileModal = ({
  isOpen,
  toggle,
  singleTeamData,
  selectedPlayerId,
}) => {
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const selectedPlayer = singleTeamData?.player?.find(
    (player) => player?._id === selectedPlayerId
  );

  function parseDate(dateString) {
    // Parse date in the format "01 AUG, 2007"
    const [day, monthStr, year] = dateString.split(' ');
    const month = new Date(`${monthStr} 1, 2000`).getMonth(); // Get month index from month string
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

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered className="border-0">
      <div className="btn-modal-close" onClick={toggle}>
        X
      </div>
      <style>
        {`
        .modal-content{
          border: 0 !important;
          border-radius: 1rem;
        }
        .btn-modal-close {
          position: absolute;
          top: 10px;
          right: 20px;
          color: #fff;
          z-index: 1;
          font-size: 20px;
          cursor: pointer;
      }

      .player-profile-top{
        border-radius: 1rem 1rem 0 0 !important;
        padding: 4rem 2rem 0 2rem;
      }

      .player-profile-img {
        width: 20.4rem;
    }

      .player-profile-img img {
        height: 25rem;
        width: 100%;
    }
    .player-details {
      width: calc(100% - 25rem);
  }
        `}
      </style>
      <ModalBody className="p-0">
        {selectedPlayer && (
          <div className="player-profile-inner">
            <div className="player-profile-top" style={bgSecondary(themeData)}>
              {/* <div className="player-number-large">{player.id}</div> */}
              <div className="player-profile-img">
                <img
                  src={
                    selectedPlayer?.profile_image?.uploadedImage
                      ? selectedPlayer?.profile_image?.uploadedImage
                      : '/assets/images/users/user-dummy-img.jpg'
                  }
                  alt={`${selectedPlayer?.first_name} ${selectedPlayer?.last_name}`}
                />
              </div>
              <div className="player-details">
                <h5 className="player-name">{`${selectedPlayer?.first_name} ${selectedPlayer?.last_name}`}</h5>
                <div className="player-properties">
                  <div className="property">
                    <span>Age</span>
                    <span className="bold-text">
                      {selectedPlayer?.date_of_birth &&
                      selectedPlayer.date_of_birth?.trim() !== ''
                        ? `${calculateAge(selectedPlayer.date_of_birth)} years`
                        : ''}
                    </span>
                  </div>
                  <div className="property">
                    <span>Gender</span>
                    <span className="bold-text">{selectedPlayer?.gender}</span>
                  </div>
                </div>
                <div className="player-properties">
                  <div className="property">
                    <span>Height</span>
                    <span className="bold-text">
                      {selectedPlayer?.height
                        ? selectedPlayer?.height?.includes('CM')
                          ? selectedPlayer?.height
                          : selectedPlayer?.height?.replace('CM', '').trim()
                        : ''}
                    </span>
                  </div>
                  <div className="property">
                    <span>Weight</span>
                    <span className="bold-text">
                      {selectedPlayer?.weight
                        ? selectedPlayer?.weight?.includes('KG')
                          ? selectedPlayer?.weight
                          : selectedPlayer?.weight?.replace('KG', '').trim()
                        : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="player-profile-bottom">
              <div className="profile-desc">{selectedPlayer?.description}</div>
            </div>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default PlayerProfileModal;
