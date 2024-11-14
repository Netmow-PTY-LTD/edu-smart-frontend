import React from 'react';
import { Col, Row } from 'reactstrap';

import GuardianInfoCard from '@/components/dashboard/common/GuardianInfoCard';
import PlayerCountableCard from '@/components/dashboard/common/PlayerCountableCard';
import PlayerInfoCard from '@/components/dashboard/common/PlayerInfoCard';
import TeamListForPlayerCard from '@/components/dashboard/common/TeamListForPlayerCard';
import TeamList from './TeamList';

const PlayerProfileOverview = ({
  id,
  data,
  teamForPlayerIsLoading,
  tog_setSelect_modal,
  select_modal,
  allTeamListForPlayer,
  handleAssignTeam,
  selectPLayerError,
  selectedOptions,
  setSelectedOptions,
  teamForPlayerData,
  handleOnClick,
  modal_delete,
  tog_modal_delete,
  removeId,
  handleDelete,
  userInfoData,
  allTeamsForPlayerData,
  seasonalGamesNumber,
  specialEventsNUmber,
  invoicesNumber,
}) => {
  return (
    <Row className="grid g-5">
      <Col xxl={3}>
        <PlayerInfoCard data={data} />

        {userInfoData?.role === 'admin' && data?.guardian?.first_name ? (
          <GuardianInfoCard data={data} />
        ) : userInfoData?.role === 'player' && data?.guardian?.first_name ? (
          <GuardianInfoCard userInfoData={userInfoData} data={data} />
        ) : (
          ''
        )}
      </Col>
      <Col xl={9}>
        <PlayerCountableCard
          data={data}
          userInfoData={userInfoData}
          seasonalGamesNumber={seasonalGamesNumber}
          specialEventsNUmber={specialEventsNUmber}
          invoicesNumber={invoicesNumber}
        />

        {userInfoData?.role === 'admin' ? (
          <TeamListForPlayerCard
            teamForPlayerIsLoading={teamForPlayerIsLoading}
            tog_setSelect_modal={tog_setSelect_modal}
            id={id}
            select_modal={select_modal}
            allTeams={allTeamListForPlayer}
            handleAssignTeam={handleAssignTeam}
            selectPLayerError={selectPLayerError}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            teamForPlayerData={teamForPlayerData}
            handleOnClick={handleOnClick}
            modal_delete={modal_delete}
            tog_modal_delete={tog_modal_delete}
            removeId={removeId}
            handleDelete={handleDelete}
            data={data}
          />
        ) : (
          ''
        )}
        <Row xxl={12} className="g-5">
          <Col xxl={12}>
            {userInfoData?.role === 'player' ? (
              <TeamList teamData={allTeamsForPlayerData} />
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PlayerProfileOverview;
