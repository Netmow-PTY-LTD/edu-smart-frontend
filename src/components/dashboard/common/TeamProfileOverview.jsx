import SponsorsCard from '@/components/dashboard/common/SponsorsCard';
import TeamInfoCard from '@/components/dashboard/common/TeamInfoCard';
import TeamProfileCountUpCard from '@/components/dashboard/common/TeamProfileCountUpCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import InactiveSquadList from './InactiveSquadList';
import ProfileCard from './ProfileCard';

const TeamProfileOverview = ({
  mainData,
  sponsorsData,
  loading,
  userInfoData,
  tog_setSelect_modal,
  select_modal,
  playerListData,
  handleAssign,
  selectPLayerError,
  selectedOptions,
  setSelectedOptions,
  removeId,
  id,
  handleOnClick,
  handleDelete,
  tog_modal_delete,
  modal_delete,
  eventsIdForRemoveSponsor,
  gameSchedulesNumber,
  trainingSchedulesNumber,
  sponsorsNumber,
}) => {
  const dispatch = useDispatch();
  const [activePlayers, setActivePlayers] = useState([]);
  const [inactivePlayers, setInactivePlayers] = useState([]);

  useEffect(() => {
    if (mainData?.player?.length > 0) {
      const filteredActivePlayers = mainData?.player.filter(
        (item) => item.status === 'active'
      );
      setActivePlayers(filteredActivePlayers);

      const filteredInactivePlayers = mainData?.player.filter(
        (item) => item.status === 'inactive'
      );
      setInactivePlayers(filteredInactivePlayers);
    } else {
      setActivePlayers([]);
      setInactivePlayers([]);
    }
  }, [mainData?.player?.length, mainData?.player]);

  return (
    <Row id="teamprofileoverview" className="grid g-5">
      <Col xxl={3}>
        <TeamInfoCard mainData={mainData} />
        {userInfoData?.role === 'admin' ? (
          <SponsorsCard
            data={sponsorsData}
            loding={loading}
            eventsIdForRemoveSponsor={eventsIdForRemoveSponsor}
          />
        ) : userInfoData?.role === 'player' ? (
          <Col xxl={12}>
            <ProfileCard role={'Manager'} data={mainData?.manager} />
            <ProfileCard role={'Trainer'} data={mainData?.trainer} />
          </Col>
        ) : (
          ''
        )}
      </Col>
      <Col xl={9}>
        <Col>
          <TeamProfileCountUpCard
            mainData={mainData}
            gameSchedulesNumber={gameSchedulesNumber}
            trainingSchedulesNumber={trainingSchedulesNumber}
            sponsorsNumber={sponsorsNumber}
          />
        </Col>
        <Row className="grid g-5">
          <Col lg={12}>
            <InactiveSquadList
              userInfoData={userInfoData}
              data={mainData?.player}
              tog_setSelect_modal={tog_setSelect_modal}
              select_modal={select_modal}
              playerListData={playerListData}
              handleAssign={handleAssign}
              selectPLayerError={selectPLayerError}
              setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions}
              handleOnClick={handleOnClick}
              handleDelete={handleDelete}
              removeId={removeId}
              id={id}
              tog_modal_delete={tog_modal_delete}
              modal_delete={modal_delete}
            />
          </Col>
          {/* <Col lg={6}>
            <InactiveSquadList
              userInfoData={userInfoData}
              data={inactivePlayers}
            />
          </Col> */}
          {/* <Col lg={12}>
            <InactiveSquadList
              userInfoData={userInfoData}
              data={mainData?.player}
            />
          </Col> */}
        </Row>
      </Col>
    </Row>
  );
};

export default TeamProfileOverview;
