import {
  bgSecondary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import React from 'react';
import { useSelector } from 'react-redux';

const TeamStaffs = ({ singleTeamData }) => {
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  return (
    <section
      className="team-staffs"
      style={{
        backgroundImage: `url(
        '/template1/assets/img/players-bg.png'
      )`,
        backgroundColor: `${themeData?.branding?.secondary_color?.trim() || '#162A73'}`,
      }}
    >
      <div className="container">
        <div className="page-section-heading">
          <h2>Our Coaches & Staffs</h2>
          <p>
            Accomplished{' '}
            {`${themeData.sports_category ? themeData.sports_category.toLowerCase() : 'rugby'} `}
            player with a long history of success on the field.
          </p>
        </div>
        <div className="tm-staff-members">
          <div className="tm-staff-member">
            <img
              src={
                singleTeamData?.trainer
                  ? singleTeamData?.trainer?.profile_image?.uploadedImage
                  : '/assets/images/users/user-dummy-img.jpg'
              }
              alt={
                singleTeamData?.trainer
                  ? singleTeamData?.trainer?.first_name +
                    ' ' +
                    singleTeamData?.trainer?.last_name
                  : ''
              }
              className="staff-img"
            />
            <div className="tm-member-info">
              <h5 style={colorSecondary(themeData)}>
                {singleTeamData?.trainer
                  ? singleTeamData?.trainer?.first_name +
                    ' ' +
                    singleTeamData?.trainer?.last_name
                  : 'TBD'}
              </h5>
              <span>Head Coach</span>
            </div>
          </div>
          <div className="tm-staff-member">
            <img
              src={
                singleTeamData?.manager
                  ? singleTeamData?.manager?.profile_image?.uploadedImage
                  : '/assets/images/users/user-dummy-img.jpg'
              }
              alt={
                singleTeamData?.manager
                  ? singleTeamData?.manager?.first_name +
                    ' ' +
                    singleTeamData?.manager?.last_name
                  : ''
              }
              className="staff-img"
            />
            <div className="tm-member-info">
              <h5 style={colorSecondary(themeData)}>
                {singleTeamData?.manager
                  ? singleTeamData?.manager?.first_name +
                    ' ' +
                    singleTeamData?.manager?.last_name
                  : 'TBD'}
              </h5>
              <span>Manager</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamStaffs;
