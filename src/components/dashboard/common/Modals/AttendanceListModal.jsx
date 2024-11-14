/* eslint-disable @next/next/no-img-element */
import {
  singleSeasonalGame,
  updateAttendance,
} from '@/slices/dashboard/adminDashboard/Actions/seasonalGameActions';
import { singleSpecialEvents } from '@/slices/dashboard/adminDashboard/Actions/specialEventsActions';
import {
  singleGameSchedule,
  singleTrainingSchedule,
} from '@/slices/dashboard/commonApi/Actions/eventsActions';
import { userDummyImage } from '@/utils/common/data/dashboardEcommerce';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import Loader from '../Loader';

const AttendanceListModal = ({
  openModal,
  setOpenModal,
  id,
  singleSchedule,
  eventName,
  singleEventsData,
  singleEventsError,
  eventsType,
}) => {
  const dispatch = useDispatch();
  const [playerState, setPlayerState] = useState({});
  const [allPresent, setAllPresent] = useState(false);
  const [sendReq, setSendReq] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const players = singleSchedule?.activity || [];

  useEffect(() => {
    if (singleEventsData?._id && sendReq) {
      setLoading(false);
      toast.success('Attendance Updated Successfully');
      {
        eventsType === 'seasonalGame'
          ? dispatch(singleSeasonalGame(id))
          : eventsType === 'trainingSchedule'
            ? dispatch(singleTrainingSchedule(id))
            : eventsType === 'gameSchedule'
              ? dispatch(singleGameSchedule(id))
              : eventsType === 'specialEvents'
                ? dispatch(singleSpecialEvents(id))
                : '';
      }
      // resetHandler();
    }

    if (singleEventsError) {
      setLoading(false);
      toast.error(singleEventsError);
      if (eventsType === 'seasonalGame') {
        router.push('/admin/seasonal-games');
      } else if (eventsType === 'trainingSchedule') {
        router.push('/admin/trainingSchedule');
      } else if (eventsType === 'gameSchedule') {
        router.push('/admin/game-schedules');
      } else if (eventsType === 'specialEvents') {
        router.push('/admin/specialEvents');
      } else {
        router.push('/admin');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, sendReq, singleEventsData?._id, singleEventsError]);

  const toggleMarkAll = () => {
    const updatedPlayerState = {};
    if (allPresent) {
      players.forEach((player) => {
        updatedPlayerState[player._id] = '';
      });
    } else {
      players.forEach((player) => {
        updatedPlayerState[player._id] = 'present';
      });
    }
    setPlayerState(updatedPlayerState);
    setAllPresent(!allPresent);
  };

  const handleClick = (playerId, iconName) => {
    setPlayerState((prevState) => ({
      ...prevState,
      [playerId]: iconName,
    }));
  };

  const submitHandler = async () => {
    setLoading(true);
    const dataArray = Object.entries(playerState).map(([id, activity]) => ({
      _id: id,
      activity,
    }));

    await dispatch(updateAttendance(dataArray));
    {
      eventsType === 'seasonalGame'
        ? dispatch(singleSeasonalGame(id))
        : eventsType === 'trainingSchedule'
          ? dispatch(singleTrainingSchedule(id))
          : eventsType === 'gameSchedule'
            ? dispatch(singleGameSchedule(id))
            : eventsType === 'specialEvents'
              ? dispatch(singleSpecialEvents(id))
              : '';
    }
    setSendReq(true);
    setLoading(false);
  };

  const resetHandler = () => {
    setSendReq(false);
    setOpenModal(!openModal);
  };

  return (
    <>
      <Modal isOpen={openModal} size="lg" start scrollable>
        <div className="modal-header bg-light-subtle">
          <h5 className="fs-2 w-100 qoute_color fw-semibold">
            {eventName} {`-`}{' '}
            {new Date(singleSchedule?.date).toLocaleDateString()}
            {singleSchedule?.start_time
              ? `, ${new Date(
                  `2000-01-01T${singleSchedule?.start_time}:00`
                ).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}`
              : ''}
            {singleSchedule?.end_time
              ? ` - ${new Date(
                  `2000-01-01T${singleSchedule?.end_time}:00`
                ).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}`
              : ''}
          </h5>
          <button
            onClick={() => resetHandler()}
            type="button"
            className="btn-close fs-1"
          ></button>
        </div>
        <ModalBody>
          <ToastContainer />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Table hover className="fs-3">
                    <thead>
                      <tr>
                        <th className="d-flex align-items-center justify-content-between ">
                          <div className="col-md-5 pe-5">Name</div>
                          <div className="d-flex align-items-center gap-4 col-md-5 pe-5">
                            <div
                              onClick={() => toggleMarkAll()}
                              style={{
                                cursor: 'pointer',
                                ':hover': { color: 'blue' },
                              }}
                              className="border border-success rounded-2 fs-3 text-success px-4"
                            >
                              <i className="ri-check-line fw-bold me-2"></i>
                              <span>Mark All</span>
                            </div>
                            <div className="text-muted">8 / 12 PRESENT</div>
                          </div>
                          <div className="pe-5 col-md-2 d-flex justify-content-end">
                            RSVP
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {players?.length > 0 &&
                        players.map((player) => (
                          <tr key={player?._id}>
                            <td className="d-flex align-items-center justify-content-between">
                              <div className="col-md-5 pe-5">
                                <img
                                  className="avatar-sm rounded-circle me-4"
                                  src={
                                    player?.user_id?.profile_image
                                      ?.uploadedImage
                                      ? player?.user_id?.profile_image
                                          ?.uploadedImage
                                      : `${userDummyImage}`
                                  }
                                  alt="user"
                                />
                                <span className="fw-medium text-uppercase">
                                  {player?.user_id?.first_name}
                                  {player?.user_id?.last_name}

                                  <span className="badge bg-secondary-subtle text-black ms-2">
                                    {player?.user_id?.role}
                                  </span>
                                </span>
                              </div>
                              <div className="col-md-5 d-flex align-items-center fs-24 gap-5 pe-5">
                                <div>
                                  <i
                                    style={{ cursor: 'pointer' }}
                                    id={`Tooltip-present-${player._id}`}
                                    className={`ri-checkbox-circle-fill ${
                                      playerState[player._id] === 'present'
                                        ? 'text-success'
                                        : !playerState[player?._id] &&
                                            player?.activity === 'present'
                                          ? 'text-success'
                                          : 'text-muted'
                                    }`}
                                    onClick={() =>
                                      handleClick(player._id, 'present')
                                    }
                                  >
                                    <UncontrolledTooltip
                                      style={{
                                        fontSize: '1rem',
                                      }}
                                      placement="top"
                                      target={`Tooltip-present-${player._id}`}
                                      autohide
                                      trigger={'hover'}
                                    >
                                      Present
                                    </UncontrolledTooltip>
                                  </i>
                                </div>

                                {/* Unknown Icon */}
                                <div>
                                  <i
                                    style={{ cursor: 'pointer' }}
                                    id={`Tooltip-unknown-${player._id}`}
                                    className={`ri-question-fill ${
                                      playerState[player._id] === 'unknown'
                                        ? 'text-danger-emphasis'
                                        : !playerState[player?._id] &&
                                            player?.activity === 'unknown'
                                          ? 'text-danger-emphasis'
                                          : 'text-muted'
                                    }`}
                                    onClick={() =>
                                      handleClick(player._id, 'unknown')
                                    }
                                  >
                                    <UncontrolledTooltip
                                      style={{
                                        fontSize: '1rem',
                                      }}
                                      placement="top"
                                      target={`Tooltip-unknown-${player._id}`}
                                      autohide
                                      trigger={'hover'}
                                    >
                                      Unknown
                                    </UncontrolledTooltip>
                                  </i>
                                </div>

                                {/* Excused Icon */}
                                <div>
                                  <i
                                    style={{ cursor: 'pointer' }}
                                    id={`Tooltip-excused-${player._id}`}
                                    className={`ri-close-circle-fill ${
                                      playerState[player._id] === 'excused'
                                        ? 'text-warning'
                                        : !playerState[player?._id] &&
                                            player?.activity === 'excused'
                                          ? 'text-warning'
                                          : 'text-muted'
                                    }`}
                                    onClick={() =>
                                      handleClick(player._id, 'excused')
                                    }
                                  >
                                    <UncontrolledTooltip
                                      style={{
                                        fontSize: '1rem',
                                      }}
                                      placement="top"
                                      target={`Tooltip-excused-${player._id}`}
                                      autohide
                                      trigger={'hover'}
                                    >
                                      Excused
                                    </UncontrolledTooltip>
                                  </i>
                                </div>

                                {/* Sick Icon */}
                                <div>
                                  <i
                                    style={{ cursor: 'pointer' }}
                                    id={`Tooltip-sick-${player._id}`}
                                    className={`ri-edit-circle-fill ${
                                      playerState[player._id] === 'sick'
                                        ? 'text-info'
                                        : !playerState[player?._id] &&
                                            player?.activity === 'sick'
                                          ? 'text-info'
                                          : 'text-muted'
                                    }`}
                                    onClick={() =>
                                      handleClick(player._id, 'sick')
                                    }
                                  >
                                    <UncontrolledTooltip
                                      style={{
                                        fontSize: '1rem',
                                      }}
                                      placement="top"
                                      target={`Tooltip-sick-${player._id}`}
                                      autohide
                                      trigger={'hover'}
                                    >
                                      Sick
                                    </UncontrolledTooltip>
                                  </i>
                                </div>

                                {/* Late Icon */}
                                <div>
                                  <i
                                    style={{ cursor: 'pointer' }}
                                    id={`Tooltip-late-${player._id}`}
                                    className={`ri-timer-fill ${
                                      playerState[player._id] === 'late'
                                        ? 'text-danger'
                                        : !playerState[player?._id] &&
                                            player?.activity === 'late'
                                          ? 'text-danger'
                                          : 'text-muted'
                                    }`}
                                    onClick={() =>
                                      handleClick(player._id, 'late')
                                    }
                                  >
                                    <UncontrolledTooltip
                                      style={{
                                        fontSize: '1rem',
                                      }}
                                      placement="top"
                                      target={`Tooltip-late-${player._id}`}
                                      autohide
                                      trigger={'hover'}
                                    >
                                      Late
                                    </UncontrolledTooltip>
                                  </i>
                                </div>
                              </div>
                              <div className="fs-24 text-success pe-5 col-md-2 d-flex justify-content-end">
                                <i className="ri-thumb-up-line"></i>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              <div className="d-flex justify-content-end">
                {loading ? (
                  <Loader />
                ) : (
                  <button
                    disabled={loading}
                    onClick={() => submitHandler()}
                    className=" button text-white p-2 fs-2"
                  >
                    Save & continue
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AttendanceListModal;
