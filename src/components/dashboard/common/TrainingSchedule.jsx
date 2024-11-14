import React from 'react';
import CustomTrainingSchedule from './CustomTrainingSchedule';

const TrainingSchedule = ({ weeklyData, userInfoData, customData }) => {
  return (
    <>
      {/* <WeeklyTrainingSchedule
        weeklyData={weeklyData}
        userInfoData={userInfoData}
        forTeam={'yes'}
      /> */}
      <CustomTrainingSchedule
        customData={customData}
        userInfoData={userInfoData}
        forTeam={'yes'}
      />
    </>
  );
};

export default TrainingSchedule;
