import {
  getAllTeam,
  getAllTeamsForPlayer,
  getAllTeamsForTrainer,
  getAllTeamsToManager,
} from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  getGuardianFreePlayer,
  getPlayerForGuardian,
} from '@/slices/dashboard/adminDashboard/Actions/playerActions';
import {
  emptyAssignPlayerToGuardian,
  emptyAssignPlayerToTeam,
  emptyAssignTeamForTrainer,
  emptyAssignTeamToManager,
  emptyAssignTeamToPlayer,
} from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';
import CloseSuccessModal from './CloseSuccessModal';
import SuccessModel from './SuccessModel';

const SelectPlayerModal = ({
  isOpen,
  toggle,
  title,
  btn,
  secondBtn,
  labelTitle,
  orBtn,
  TogAddNewPlayerModal,
  handleAssign,
  allPlayersData,
  selectPLayerError,
  selectedOptions,
  setSelectedOptions,
  id,
}) => {
  const [add_success_modal, setAdd_success_modal] = useState(false);
  const [playerList, setPlayerList] = useState([]);

  const dispatch = useDispatch();
  //  assign team to player
  const {
    data: teamToPlayerData,
    isLoading: teamToPlayerIsLoading,
    error: teamToPlayerError,
  } = useSelector((state) => state.AdminDashboard.assignTeamToPlayer);

  // assign team to manager
  const {
    data: teamToManagerData,
    isLoading: teamToManagerIsLoading,
    error: teamToManagerError,
  } = useSelector((state) => state.AdminDashboard.assignTeamToManager);

  // assign team to trainer
  const {
    data: teamToTrainerData,
    isLoading: teamToTrainerIsLoading,
    error: teamToTrainerError,
  } = useSelector((state) => state.AdminDashboard.assignTeamForTrainer);

  // Assign player to guardian
  const {
    data: playerToGuardianData,
    isLoading: playerToGuardianIsLoading,
    error: playerToGuardianError,
  } = useSelector((state) => state.AdminDashboard.assignPlayerToGuardian);

  //  assign Player to Team
  const {
    data: playerToTeamData,
    isLoading: playerToTeamIsLoading,
    error: playerToTeamError,
  } = useSelector((state) => state.AdminDashboard.assignPlayerToTeam);

  useEffect(() => {
    dispatch(emptyAssignPlayerToGuardian());
    dispatch(emptyAssignTeamToPlayer());
    dispatch(emptyAssignPlayerToTeam());
    dispatch(emptyAssignTeamToManager());
    dispatch(emptyAssignTeamForTrainer());
  }, [dispatch]);

  useEffect(() => {
    if (allPlayersData?.length > 0) {
      const mappedData = allPlayersData.map((player) => {
        if (player?._id) {
          return {
            label: player?.first_name
              ? player?.first_name + ' ' + player?.last_name
              : player?.name,
            value: player._id,
          };
        } else {
          return {
            label: player.name,
            value: player.email,
          };
        }
      });

      setPlayerList(mappedData);
    } else {
      setPlayerList([]);
    }
  }, [allPlayersData]);

  useEffect(() => {
    if (playerToGuardianData?.message && playerToGuardianError === null) {
      toast.success(playerToGuardianData?.message);
      dispatch(getPlayerForGuardian(id));
      dispatch(getGuardianFreePlayer());
      dispatch(emptyAssignPlayerToGuardian());
      // setSelectedOptions({})
      toggle();
    }
    if (playerToGuardianError) {
      toast.error(playerToGuardianError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerToGuardianData?.message, dispatch, playerToGuardianError, id]);

  useEffect(() => {
    if (teamToPlayerData?.message && teamToPlayerError === null) {
      toast.success(teamToPlayerData?.message);
      dispatch(getAllTeamsForPlayer(id));
      dispatch(emptyAssignTeamToPlayer());
      // setSelectedOptions({})
      toggle();
    }
    if (teamToPlayerError) {
      toast.error(teamToPlayerError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamToPlayerData?.message, dispatch, teamToPlayerError]);

  // assign team to manager
  useEffect(() => {
    if (teamToManagerData?.message && teamToManagerError === null) {
      toast.success(teamToManagerData?.message);
      dispatch(getAllTeamsToManager(id));
      dispatch(emptyAssignTeamToManager());
      // setSelectedOptions({})
      toggle();
    }
    if (teamToManagerError) {
      toast.error(teamToManagerError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamToManagerData?.message, dispatch, teamToManagerError]);

  // assign team to trainer
  useEffect(() => {
    if (teamToTrainerData?.message && teamToTrainerError === null) {
      toast.success(teamToTrainerData?.message);
      dispatch(getAllTeamsForTrainer(id));
      dispatch(emptyAssignTeamForTrainer());
      // setSelectedOptions({})
      toggle();
    }
    if (teamToTrainerError) {
      toast.error(teamToTrainerError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamToTrainerData?.message, dispatch, teamToTrainerError]);

  useEffect(() => {
    if (playerToTeamData?.message && playerToTeamError === null) {
      toast.success(playerToTeamData?.message);
      dispatch(getAllTeam());
      dispatch(emptyAssignPlayerToTeam());
      // setSelectedOptions({})
      toggle();
    }
    if (playerToTeamError) {
      toast.error(playerToTeamError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerToTeamData?.message, dispatch, playerToTeamError]);

  const Tog_add_success_modal = () => {
    setAdd_success_modal(!add_success_modal);
  };

  const handleSelect = (data) => {

    setSelectedOptions(data);
  };

  const resetForm = () => {
    setSelectedOptions('');
    toggle();
  };

  return (
    <div>
      {/* success modal */}
      <Modal
        id="success-Payment"
        tabIndex="-1"
        isOpen={isOpen}
        // onClick={toggle}
        centered
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            type="button"
            onClick={resetForm}
            className="btn-close fs-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          <Form id="player-form">
            <Row>
              <Col xl={12}>
                <div className="mb-5">
                  <Label className="form-label">{labelTitle}</Label>
                  <div>
                    <Select
                      options={playerList}
                      // placeholder="Player Name"
                      value={selectedOptions}
                      onChange={handleSelect}
                      isSearchable={true}
                      // isMulti
                    ></Select>
                  </div>
                </div>
              </Col>
              <Col xl={12}>
                {selectPLayerError && (
                  <span className="text-danger fs-3">*{selectPLayerError}</span>
                )}
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-center">
                  {playerToGuardianIsLoading ||
                  teamToPlayerIsLoading ||
                  playerToTeamIsLoading ||
                  teamToManagerIsLoading ||
                  teamToTrainerIsLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={
                        playerToGuardianIsLoading ||
                        teamToPlayerIsLoading ||
                        playerToTeamIsLoading ||
                        teamToTrainerIsLoading ||
                        teamToManagerIsLoading
                      }
                      type="button"
                      className="button p-3 text-light"
                      // onClick={handleAssignPlayer}
                      onClick={(e) => handleAssign(e, selectedOptions)}
                      // onClick={Tog_add_success_modal}
                    >
                      {btn}
                    </button>
                  )}

                  {orBtn === 'yes' ? (
                    <CloseSuccessModal
                      title="Successfully added into TEST team"
                      isOpen={add_success_modal}
                      toggle={Tog_add_success_modal}
                    />
                  ) : (
                    <SuccessModel
                      title="Successfully added a new player"
                      secondTitle="Invoice ID: VZ2451"
                      rightBtn="Send Invoice To Guardian"
                      leftBtn="Paid By Cash"
                      isOpen={add_success_modal}
                      toggle={Tog_add_success_modal}
                    />
                  )}
                </div>
              </Col>
              {orBtn === 'yes' ? (
                ''
              ) : (
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-center my-3">
                    <h5 className="text-primary fw-semibold fs-3">Or</h5>
                  </div>
                </Col>
              )}
              {orBtn === 'yes' ? (
                ''
              ) : (
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-center">
                    {/* {isLoading ? (
                                <Loader />
                              ) : (
                                <button
                                //   disabled={isLoading}
                                  type="button"
                                  className="button p-3 text-light"
                                //   onClick={handleAddGuardian}
                                >
                                  Add
                                </button>
                              )} */}
                    <button
                      //   disabled={isLoading}
                      type="button"
                      className="button p-3 text-light"
                      onClick={TogAddNewPlayerModal}
                    >
                      {secondBtn}
                    </button>
                    {/* <PlayerModalForm
                      isOpen={addNewPlayerModal}
                      toggle={TogAddNewPlayerModal}
                    /> */}
                  </div>
                </Col>
              )}
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SelectPlayerModal;
