import { getAllTeam } from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import {
  addGameSubscriptions,
  getAllGameSubscriptions,
} from '@/slices/dashboard/adminDashboard/Actions/gameSubscriptionActions';
import {
  addPlayerSubscriptions,
  getAllPlayerSubscriptions,
} from '@/slices/dashboard/adminDashboard/Actions/playerSubscriptionsActions';
import {
  addSeasonalSubscriptions,
  getAllSeasonalSubscriptions,
} from '@/slices/dashboard/adminDashboard/Actions/seasonalSubscriptionActions';
import {
  emptyGameSubscription,
  emptyPlayerSubscription,
  emptySeasonalSubscription,
} from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const SubscriptionsModal = ({
  isOpen,
  toggle,
  title,
  btn,
  player,
  setSubscriptions_modal,
  game_subscription,
  seasonal_subscription,
}) => {
  const dispatch = useDispatch();
  const {
    data: playerSubscriptionsData,
    isLoading: playerSubscriptionsIsLoading,
    error: playerSubscriptionsError,
  } = useSelector((state) => state.AdminDashboard.addPlayerSubscription);

  useEffect(() => {
    dispatch(emptyPlayerSubscription());
  }, [dispatch]);

  const {
    data: gameSubscriptionsData,
    isLoading: gameSubscriptionsIsLoading,
    error: gameSubscriptionsError,
  } = useSelector((state) => state.AdminDashboard.addGameSubscription);

  useEffect(() => {
    dispatch(emptyGameSubscription());
  }, [dispatch]);

  const {
    data: seasonalSubscriptionsData,
    isLoading: seasonalSubscriptionsIsLoading,
    error: seasonalSubscriptionsError,
  } = useSelector((state) => state.AdminDashboard.addSeasonalSubscription);

  useEffect(() => {
    dispatch(emptySeasonalSubscription());
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

    // Clear the error messages
    setErrors({});
    setSelectedOption({
      select_team: null,
    });

    toggle();
  };

  useEffect(() => {
    const resetAllData = () => {
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

      // Clear the error messages
      setErrors({});
      setSelectedOption({
        select_team: null,
      });

      setSubscriptions_modal(false);
    };

    if (playerSubscriptionsData?.message && playerSubscriptionsError === null) {
      toast.success(playerSubscriptionsData?.message);

      setTimeout(() => {
        resetAllData();
        dispatch(getAllPlayerSubscriptions());
        dispatch(emptyPlayerSubscription());
      }, 500);
    }
    if (playerSubscriptionsError) {
      toast.error(playerSubscriptionsError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerSubscriptionsData]);

  useEffect(() => {
    const resetAllData = () => {
      setFormData({
        name: '',
        fee: '',
        image: '',
        create_date: '',
        end_date: '',
        // select_team: '',
        // select_team_id: '',
        description: '',
      });


      setErrors({});
      setSelectedOption({
        select_team: null,
      });


      toggle();
    };

    if (gameSubscriptionsData?.message && gameSubscriptionsError === null) {
      toast.success(gameSubscriptionsData?.message);

      setTimeout(() => {
        resetAllData();
        dispatch(getAllGameSubscriptions());
        dispatch(emptyGameSubscription());
      }, 500);
    }
    if (gameSubscriptionsError) {
      toast.error(gameSubscriptionsError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameSubscriptionsData]);

  useEffect(() => {
    const resetAllData = () => {
      setFormData({
        name: '',
        fee: '',
        image: '',
        create_date: '',
        end_date: '',
        // select_team: '',
        // select_team_id: '',
        description: '',
      });

      // Clear the error messages
      setErrors({});
      setSelectedOption({
        select_team: null,
      });

      seasonal_subscription(false);
    };

    if (
      seasonalSubscriptionsData?.message &&
      seasonalSubscriptionsError === null
    ) {
      toast.success(seasonalSubscriptionsData?.message);

      setTimeout(() => {
        resetAllData();
        dispatch(getAllSeasonalSubscriptions());
        dispatch(emptySeasonalSubscription());
      }, 500);
    }
    if (seasonalSubscriptionsError) {
      toast.error(seasonalSubscriptionsError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasonalSubscriptionsData]);

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

  //  error state
  const [errors, setErrors] = useState({});

  // for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the form error
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // handle set date
  const handleSetDate = (fieldName, dateStr) => {
    setFormData({
      ...formData,
      [fieldName]: dateStr,
    });

    setErrors({
      ...errors,
      [fieldName]: '',
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

    // Clear the form error for the select team
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    // Perform form validation
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.fee) {
      newErrors.fee = 'Fee is required';
    }

    if (!formData.create_date) {
      newErrors.create_date = 'Created Date is required';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End Date is required';
    }
    // for the game schedule
    if (!formData.select_team) {
      newErrors.select_team = 'Please select a team';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      dispatch(addPlayerSubscriptions(formData));

    } else {
      // Form has errors, update the errors state
      setErrors(newErrors);
    }
  };
  const handleGameSubmit = (e) => {
    e.preventDefault();

    const gameAllData = {
      name: formData.name,
      fee: formData.fee,
      create_date: formData.create_date,
      end_date: formData.end_date,
      description: formData.description,
    };



    // Perform form validation
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.fee) {
      newErrors.fee = 'Fee is required';
    }

    if (!formData.create_date) {
      newErrors.create_date = 'Created Date is required';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End Date is required';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      dispatch(addGameSubscriptions(gameAllData));

    } else {

      setErrors(newErrors);
    }
  };
  const handleSeasonalSubmit = (e) => {
    e.preventDefault();

    const seanalAllData = {
      name: formData.name,
      fee: formData.fee,
      create_date: formData.create_date,
      end_date: formData.end_date,
      description: formData.description,
    };



    // Perform form validation
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.fee) {
      newErrors.fee = 'Fee is required';
    }

    if (!formData.create_date) {
      newErrors.create_date = 'Created Date is required';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End Date is required';
    }

    // Form is valid
    if (Object.keys(newErrors).length === 0) {
      dispatch(addSeasonalSubscriptions(seanalAllData));

    } else {
      // Form has errors, update the errors state
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={isOpen}
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
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
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
                  {errors.fee && (
                    <div className="text-danger">{errors.fee}</div>
                  )}
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
                  {errors.create_date && (
                    <div className="text-danger">{errors.create_date}</div>
                  )}
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
                  {errors.end_date && (
                    <div className="text-danger">{errors.end_date}</div>
                  )}
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
                    {errors.select_team && (
                      <div className="text-danger">{errors.select_team}</div>
                    )}
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

              {title === 'Subscription package' ? (
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
                        {btn}
                      </button>
                    )}
                  </div>
                </Col>
              ) : (
                ''
              )}

              {title === 'Game Subscriptions' ? (
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
                        {btn}
                      </button>
                    )}
                  </div>
                </Col>
              ) : (
                ''
              )}

              {title === 'Seasonal Subscriptions' ? (
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
                        {btn}
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

export default SubscriptionsModal;
