import {
  assignTeamForTrainer,
  getAllTeamListForTrainer,
  getAllTeamsForTrainer,
} from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import { emptyAssignTeamForTrainer } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';

const SelectTeamForTrainerModal = ({ isOpen, toggle, btn, id }) => {
  // success modal state
  const [selectTrainerError, setSelectTrainerError] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState();
  const handleSelect = (data) => {
    setSelectedOptions(data);
  };

  const dispatch = useDispatch();

  // get all team list for manager
  const allTeams = useSelector(
    (state) => state.AdminDashboard.getAllTeamListForTrainer
  );

  useEffect(() => {
    dispatch(getAllTeamListForTrainer(id));
  }, [dispatch, id]);

  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    if (allTeams?.data?.length > 0) {
      const mappedData = allTeams.data.map((teams) => ({
        label: teams.name,
        value: teams._id,
      }));

      setTeamList(mappedData);
    }
  }, [allTeams]);

  //  assign team to player
  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.assignTeamForTrainer
  );

  useEffect(() => {
    if (data?.message && error === null) {
      toast.success(data?.message);
      dispatch(getAllTeamsForTrainer(id));
      dispatch(emptyAssignTeamForTrainer());
      // TogAll();
      toggle();
    }
    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.message, dispatch, error, id]);

  const resetForm = () => {
    setSelectedOptions('');
    toggle();
  };

  const handleAssignTeam = (e) => {
    e.preventDefault();
    // selectTrainerError(null);
    if (!selectedOptions?.value) {
      selectTrainerError('Please select a Team');
    } else {
      const teamData = {
        id: selectedOptions.value,
        trainer_id: id,
      };

      dispatch(assignTeamForTrainer(teamData));
    }
  };

  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={isOpen}
        // onClick={toggle}
        centered
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">Team Assign</h5>
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
                  <Label className="form-label">Select Team</Label>
                  <div>
                    <Select
                      options={teamList}
                      // placeholder="Player Name"
                      value={selectedOptions}
                      onChange={handleSelect}
                      isSearchable={true}
                    ></Select>
                  </div>
                </div>
              </Col>
              <Col xl={12}>
                {selectTrainerError && (
                  <span className="text-danger fs-3">
                    *{selectTrainerError}
                  </span>
                )}
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-center">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={isLoading}
                      type="button"
                      className="button p-3 text-light"
                      onClick={handleAssignTeam}
                    >
                      {btn}
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SelectTeamForTrainerModal;
