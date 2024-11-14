import {
  bgSecondary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import DOMPurify from 'dompurify';
import React from 'react';
import { useSelector } from 'react-redux';

const TeamAbout = ({ singleTeamData }) => {
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  return (
    <section className="team-about">
      <div className="container">
        <div className="team-about-content">
          <div className="team-about-text-content">
            <div className="team-about-text-content-inner">
              <h3 style={colorSecondary(themeData)}>Our History</h3>
              <h2 style={colorSecondary(themeData)}>
                A Team with Style & Strength
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    singleTeamData?.description ||
                      'Our rugby team is a group of dedicated athletes who share a passion for the sport. We come from different backgrounds and have diverse skill sets, but we all have one common goal: to play the best rugby we can. <br/> Our team has been together for several years now, and we have developed a strong bond both on and off the field. We train hard, pushing ourselves to be faster, stronger, and more skilled.'
                  ),
                }}
              ></p>
            </div>
            <div className="team-people" style={bgSecondary(themeData)}>
              <div className="team-people-content">
                <small>Coach</small>
                <h6>
                  {singleTeamData?.trainer &&
                  singleTeamData?.trainer?.status === 'active'
                    ? singleTeamData?.trainer?.first_name +
                      ' ' +
                      singleTeamData?.trainer?.last_name
                    : ''}
                </h6>
              </div>
              <div className="team-people-content">
                <small>Manager</small>
                <h6>
                  {singleTeamData?.manager &&
                  singleTeamData?.manager?.status === 'active'
                    ? singleTeamData?.manager?.first_name +
                      ' ' +
                      singleTeamData?.manager?.last_name
                    : ''}
                </h6>
              </div>
            </div>
          </div>
          <div className="team-about-img">
            <img
              src={
                singleTeamData?.image?.uploadedImage
                  ? singleTeamData.image.uploadedImage
                  : '/template1/assets/img/shop/team-about.png'
              }
              alt="Team About"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamAbout;
