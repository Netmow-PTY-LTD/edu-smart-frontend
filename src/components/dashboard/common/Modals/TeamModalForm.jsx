/* eslint-disable @next/next/no-img-element */
import LoaderSpiner from '@/components/constants/Loader/Loader';
import {
  getAllTeam,
  getSingleTeamForAdmin,
  updateTeam,
} from '@/slices/dashboard/adminDashboard/Actions/addNewTeamActions';
import { emptyUpdateTeam } from '@/slices/dashboard/adminDashboard/reducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Form, Input, Label, Modal, ModalBody, Row } from 'reactstrap';
import Loader from '../Loader';
import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('@/components/CustomEditor'), {
  ssr: false,
});

const TeamModalForm = ({
  edit_profileModal,
  setEdit_profileModal,
  title,
  id,
  singleTeamData,
  singleTeamIsLoading,
  allManager,
  allTrainer,
  managerList,
  trainerList,
}) => {
  // all states
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState('');
  const [manager_name, setManager_name] = useState('');
  const [trainer_name, setTrainer_name] = useState('');
  const [manager_id, setManager] = useState(null);
  const [trainer_id, setTrainer] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(emptyUpdateTeam());
  }, [dispatch]);

  const {
    data: updateTeamData,
    isLoading: updateTeamIsLoading,
    error: updateTeamError,
  } = useSelector((state) => state.AdminDashboard.updateTeam);

  useEffect(() => {
    if (singleTeamData) {
      setTeamName(singleTeamData?.name);
      setManager_name(
        singleTeamData?.manager?.first_name +
          ' ' +
          singleTeamData?.manager?.last_name
      );
      setTrainer_name(
        singleTeamData?.trainer?.first_name +
          ' ' +
          singleTeamData?.trainer?.last_name
      );
      setDescription(singleTeamData?.description);
      setSelectedImage(singleTeamData?.image?.uploadedImage);
    }
  }, [singleTeamData]);

  useEffect(() => {
    if (updateTeamData?.message && updateTeamError === null) {
      toast.success(updateTeamData?.message);
      dispatch(emptyUpdateTeam());
      dispatch(getAllTeam());
      dispatch(getSingleTeamForAdmin({ id }));

      setEdit_profileModal(!edit_profileModal);
    }
    if (updateTeamError) {
      toast.error(updateTeamError);
      dispatch(emptyUpdateTeam());
    }
  }, [
    dispatch,
    edit_profileModal,
    id,
    setEdit_profileModal,
    updateTeamData?.message,
    updateTeamError,
  ]);

  // this is for select manager
  const handleManagerChange = (selectedOption) => {
    const managerValue = selectedOption.value;
    setManager_name(managerValue?.manager_name || '');
    setManager(managerValue?.manager_id || '');
  };

  //  this is for select trainer
  const handleTrainerChange = (selectedOption) => {
    const trainerValue = selectedOption.value;
    setTrainer_name(trainerValue?.trainer_name || '');
    setTrainer(trainerValue?.trainer_id || '');
  };

  const handleDescriptionChange = (data) => {
    setDescription(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();
    let editTeamData = {};

    if (teamName) {
      editTeamData.name = teamName;
    } else {
      editTeamData = {
        ...editTeamData,
        name: ' ',
      };
    }
    if (id) {
      editTeamData.team_id = id;
    }
    if (manager_name) {
      editTeamData.manager_name = manager_name;
    }
    if (trainer_name) {
      editTeamData.trainer_name = trainer_name;
    }
    if (manager_id) {
      editTeamData.manager_id = manager_id;
    }
    if (trainer_id) {
      editTeamData.trainer_id = trainer_id;
    }
    if (description) {
      editTeamData.description = description;
    } else {
      editTeamData = {
        ...editTeamData,
        description: ' ',
      };
    }
    if (selectedImage) {
      editTeamData.image = selectedImage;
    } else {
      editTeamData = {
        ...editTeamData,
        image: ' ',
      };
    }

    const treamedData = new FormData();
    Object.entries(editTeamData).forEach(([key, value]) => {
      treamedData.append(key, value);
    });
    if (
      editTeamData?.name ||
      editTeamData?.manager_name ||
      editTeamData?.trainer_name ||
      editTeamData?.manager_id ||
      editTeamData?.trainer_id ||
      editTeamData?.description ||
      editTeamData?.image
    ) {
      await dispatch(updateTeam(treamedData));
    }
  };

  return (
    <div>
      {/* success modal */}
      <Modal
        className=""
        id="success-Payment"
        tabIndex="-1"
        isOpen={edit_profileModal}
        centered
        size="lg"
      >
        <div className="modal-header ">
          <h5 className="fs-2 w-100">{title}</h5>
          <button
            onClick={() => setEdit_profileModal(!edit_profileModal)}
            className="btn-close fs-1"
          ></button>
        </div>

        <ModalBody className="fs-3 m-1">
          <ToastContainer />
          {singleTeamIsLoading ? (
            <LoaderSpiner />
          ) : (
            <Form id="player-form">
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="teamnameInput" className="form-label">
                      Team Name
                    </Label>
                    <Input
                      value={teamName}
                      type="text"
                      className="form-control"
                      id="teamnameInput"
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="mb-3">
                    <Label className="form-label">Add Manager</Label>
                    <div>
                      <Select
                        options={managerList}
                        value={managerList?.find(
                          (p) => p.value.manager_name === manager_name
                        )}
                        onChange={handleManagerChange}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="mb-3">
                    <Label className="form-label">Add Trainer</Label>
                    <div>
                      <Select
                        value={trainerList?.find(
                          (p) => p.value.trainer_name === trainer_name
                        )}
                        onChange={handleTrainerChange}
                        isSearchable={true}
                        options={trainerList}
                      />
                    </div>
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="mb-3">
                    <label htmlFor="imageInput" className="form-label">
                      Image
                    </label>
                    <input
                      placeholder={singleTeamData?.image}
                      type="file"
                      className="form-control"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {selectedImage && (
                      <div>
                        <img
                          className="rounded-3 mt-2"
                          src={
                            typeof selectedImage === 'string'
                              ? selectedImage
                              : URL.createObjectURL(selectedImage)
                          }
                          style={{ maxHeight: '70px' }}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="mb-3 pb-2">
                    <Label
                      htmlFor="exampleFormControlTextarea"
                      className="form-label"
                    >
                      Description
                    </Label>
                    <CustomEditor
                      data={description}
                      onChange={handleDescriptionChange}
                    />
                    {/* <textarea
                      type="text"
                      className="form-control"
                      id="exampleFormControlTextarea"
                      rows="5"
                      value={description}
                      onChange={handleDescriptionChange}
                    ></textarea> */}
                  </div>
                </Col>
              </Row>
              <Col lg={6}>
                <div className="hstack gap-2 justify-content-start">
                  {updateTeamIsLoading ? (
                    <Loader />
                  ) : (
                    <button
                      disabled={updateTeamIsLoading}
                      className="button p-3 text-light"
                      onClick={handleUpdateTeam}
                    >
                      Update
                    </button>
                  )}
                </div>
              </Col>
            </Form>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TeamModalForm;
