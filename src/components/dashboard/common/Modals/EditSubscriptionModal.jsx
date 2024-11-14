import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  getAllGameSubscriptions,
  updateGameSubscription,
} from '@/slices/dashboard/adminDashboard/Actions/gameSubscriptionActions';
import {
  getAllPlayerSubscriptions,
  updatePlayerSubscription,
} from '@/slices/dashboard/adminDashboard/Actions/playerSubscriptionsActions';
import {
  getAllSeasonalSubscriptions,
  updateSeasonalSubscription,
} from '@/slices/dashboard/adminDashboard/Actions/seasonalSubscriptionActions';
import {
  emptyUpdateGameSubscription,
  emptyUpdatePlayerSubscription,
  emptyUpdateSeasonalSubscription,
} from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const EditSubscriptionsModal = ({
  id,
  editModal,
  setEditModal,
  title,
  player,
}) => {
  const dispatch = useDispatch();
  const {
    data: playerSubscriptionsData,
    isLoading: playerSubscriptionsIsLoading,
    error: playerSubscriptionsError,
  } = useSelector((state) => state.AdminDashboard.updatePlayerSubscription);

  const {
    data: gameSubscriptionsData,
    isLoading: gameSubscriptionsIsLoading,
    error: gameSubscriptionsError,
  } = useSelector((state) => state.AdminDashboard.updateGameSubscription);

  const {
    data: seasonalSubscriptionsData,
    isLoading: seasonalSubscriptionsIsLoading,
    error: seasonalSubscriptionsError,
  } = useSelector((state) => state.AdminDashboard.updateSeasonalSubscription);

  useEffect(() => {
    dispatch(emptyUpdateGameSubscription());
    dispatch(emptyUpdatePlayerSubscription());
    dispatch(emptyUpdateSeasonalSubscription());
  }, [dispatch]);

  // close button function
  const resetForm = () => {
    setFormData({
      name: '',
      fee: '',
      image: '',
      create_date: '',
      end_date: '',
      select_team: '',
      select_team_id: '',
      description: '',
    });

    setSelectedOption({
      select_team: null,
    });

    setEditModal(!editModal);
  };

  useEffect(() => {
    if (playerSubscriptionsData?.message && playerSubscriptionsError === null) {
      toast.success(playerSubscriptionsData?.message);

      dispatch(emptyUpdatePlayerSubscription());
      dispatch(getAllPlayerSubscriptions());
      resetForm();
    }
    if (playerSubscriptionsError) {
      toast.error(playerSubscriptionsError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, playerSubscriptionsData?.message, playerSubscriptionsError]);

  useEffect(() => {
    if (gameSubscriptionsData?.message && gameSubscriptionsError === null) {
      toast.success(gameSubscriptionsData?.message);

      dispatch(emptyUpdateGameSubscription());
      dispatch(getAllGameSubscriptions());
      resetForm();
    }
    if (gameSubscriptionsError) {
      toast.error(gameSubscriptionsError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gameSubscriptionsData?.message, gameSubscriptionsError]);

  useEffect(() => {
    if (
      seasonalSubscriptionsData?.message &&
      seasonalSubscriptionsError === null
    ) {
      toast.success(seasonalSubscriptionsData?.message);

      dispatch(emptyUpdateSeasonalSubscription());
      dispatch(getAllSeasonalSubscriptions());
      resetForm();
    }
    if (seasonalSubscriptionsError) {
      toast.error(seasonalSubscriptionsError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    seasonalSubscriptionsData?.message,
    seasonalSubscriptionsError,
  ]);

  // get all team list
  const allTeams = useSelector((state) => state.AdminDashboard.addNewTeam);
  useEffect(() => {
    dispatch(getAllTeam());
  }, [dispatch]);
  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    if (allTeams?.data) {
      const mappedData = allTeams.data.map((teams) => ({
        label: teams.name,
        value: { select_team: teams.name, select_team_id: teams._id },
      }));

      setTeamList(mappedData);
    }
  }, [allTeams]);

  const [formData, setFormData] = useState({
    name: '',
    fee: '',
    create_date: '',
    end_date: '',
    select_team: '',
    description: '',
  });

  // for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle set date
  const handleSetDate = (fieldName, dateStr) => {
    setFormData({
      ...formData,
      [fieldName]: dateStr,
    });
  };

  // select state and function
  const [selectedOption, setSelectedOption] = useState({
    select_team: null,
  });

  const handleSelect = (name, selected) => {
    if (name !== 'select_team' && name !== 'select_team_id') {
      setFormData({
        ...formData,
        [name]: selected ? selected.value : '',
      });
    } else {
      setFormData({
        ...formData,
        select_team: selected ? selected?.value?.select_team : '',
        select_team_id: selected ? selected?.value?.select_team_id : '',
      });
    }

    setSelectedOption({
      ...selectedOption,
      [name]: selected,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let subscriptionAllData = {};

    if (formData?.name) {
      subscriptionAllData = {
        ...subscriptionAllData,
        name: formData?.name,
      };
    }
    if (formData?.fee) {
      subscriptionAllData = {
        ...subscriptionAllData,
        fee: formData?.fee,
      };
    }
    if (id) {
      subscriptionAllData.id = id;
    }

    if (formData?.create_date) {
      subscriptionAllData = {
        ...subscriptionAllData,
        create_date: formData?.create_date,
      };
    }
    if (formData?.end_date) {
      subscriptionAllData = {
        ...subscriptionAllData,
        end_date: formData?.end_date,
      };
    }
    if (formData?.select_team) {
      subscriptionAllData = {
        ...subscriptionAllData,
        select_team: formData?.select_team,
      };
    }
    if (formData?.description) {
      subscriptionAllData = {
        ...subscriptionAllData,
        description: formData?.description,
      };
    }

    const mainData = { ...subscriptionAllData, id };
    dispatch(updatePlayerSubscription(mainData))
      .then(() => {
        toast.success(playerSubscriptionsError?.message);
      })
      .catch((error) => {
        console.error('Dispatch error:', error);
      });


  };

  const handleGameSubmit = (e) => {
    e.preventDefault();
    let subscriptionAllData = {};

    if (formData?.name) {
      subscriptionAllData = {
        ...subscriptionAllData,
        name: formData?.name,
      };
    }
    if (formData?.fee) {
      subscriptionAllData = {
        ...subscriptionAllData,
        fee: formData?.fee,
      };
    }
    if (id) {
      subscriptionAllData.id = id;
    }

    if (formData?.create_date) {
      subscriptionAllData = {
        ...subscriptionAllData,
        create_date: formData?.create_date,
      };
    }
    if (formData?.end_date) {
      subscriptionAllData = {
        ...subscriptionAllData,
        end_date: formData?.end_date,
      };
    }
    if (formData?.select_team) {
      subscriptionAllData = {
        ...subscriptionAllData,
        select_team: formData?.select_team,
      };
    }
    if (formData?.description) {
      subscriptionAllData = {
        ...subscriptionAllData,
        description: formData?.description,
      };
    }

    const mainData = { ...subscriptionAllData, id };
    dispatch(updateGameSubscription(mainData))
      .then(() => {
        toast.success(playerSubscriptionsError?.message);
      })
      .catch((error) => {
        console.error('Dispatch error:', error);
      });


  };

  const handleSeasonalSubmit = (e) => {
    e.preventDefault();
    let subscriptionAllData = {};

    if (formData?.name) {
      subscriptionAllData = {
        ...subscriptionAllData,
        name: formData?.name,
      };
    }
    if (formData?.fee) {
      subscriptionAllData = {
        ...subscriptionAllData,
        fee: formData?.fee,
      };
    }
    if (id) {
      subscriptionAllData.id = id;
    }

    if (formData?.create_date) {
      subscriptionAllData = {
        ...subscriptionAllData,
        create_date: formData?.create_date,
      };
    }
    if (formData?.end_date) {
      subscriptionAllData = {
        ...subscriptionAllData,
        end_date: formData?.end_date,
      };
    }
    if (formData?.select_team) {
      subscriptionAllData = {
        ...subscriptionAllData,
        select_team: formData?.select_team,
      };
    }
    if (formData?.description) {
      subscriptionAllData = {
        ...subscriptionAllData,
        description: formData?.description,
      };
    }

    const mainData = { ...subscriptionAllData, id };
    dispatch(updateSeasonalSubscription(mainData))
      .then(() => {
        toast.success(playerSubscriptionsError?.message);
      })
      .catch((error) => {
        console.error('Dispatch error:', error);
      });


  };

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={editModal}
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
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="nameInput" className="form-label">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="nameInput"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="feeInput" className="form-label">
                    Fee
                  </Label>
                  <Input
                    type="number"
                    id="feeInput"
                    className="form-control"
                    name="fee"
                    value={formData.fee}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="create_dateInput" className="form-label">
                    Created Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    id="create_dateInput"
                    name="create_date"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    value={formData.create_date}
                    onChange={(selectedDates, dateStr, instance) =>
                      handleSetDate('create_date', dateStr)
                    }
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="dateOfBirthInput" className="form-label">
                    End Date
                  </Label>
                  <Flatpickr
                    className="form-control"
                    options={{
                      dateFormat: 'd M, Y',
                    }}
                    value={formData.end_date}
                    name="end_date"
                    onChange={(selectedDates, dateStr, instance) =>
                      handleSetDate('end_date', dateStr)
                    }
                  />
                </div>
              </Col>

              {player === 'yes' ? (
                <Col xl={12}>
                  <div className="mb-3">
                    <Label htmlFor="select_teaminput" className="form-label">
                      Select Team
                    </Label>
                    <div>
                      <Select
                        options={teamList}
                        placeholder="Select A Team"
                        id="select_teaminput"
                        name="select_team"
                        value={selectedOption.select_team}
                        onChange={(selected) =>
                          handleSelect('select_team', selected)
                        }
                      />
                    </div>
                  </div>
                </Col>
              ) : (
                ''
              )}

              <Col lg={12}>
                <div className="mb-3 pb-2">
                  <Label htmlFor="descriptionTextarea" className="form-label">
                    Description
                  </Label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="descriptionTextarea"
                    rows="5"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </Col>

              {title === 'Edit Player Subscriptions' ? (
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    {playerSubscriptionsIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={playerSubscriptionsIsLoading}
                        type="button"
                        className="button p-3 text-light"
                        onClick={handleSubmit}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </Col>
              ) : (
                ''
              )}

              {title === 'Edit Game Subscriptions' ? (
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    {gameSubscriptionsIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={gameSubscriptionsIsLoading}
                        type="button"
                        className="button p-3 text-light"
                        onClick={handleGameSubmit}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </Col>
              ) : (
                ''
              )}

              {title === 'Edit Seasonal Subscriptions' ? (
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    {seasonalSubscriptionsIsLoading ? (
                      <Loader />
                    ) : (
                      <button
                        disabled={seasonalSubscriptionsIsLoading}
                        type="button"
                        className="button p-3 text-light"
                        onClick={handleSeasonalSubmit}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </Col>
              ) : (
                ''
              )}
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditSubscriptionsModal;
