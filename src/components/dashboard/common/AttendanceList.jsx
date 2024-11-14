import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import AttendanceListModal from './Modals/AttendanceListModal';

const AttendanceList = ({
  schedule,
  eventName,
  id,
  singleEventsData,
  singleEventsError,
  eventsType,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [singleSchedule, setSingleSchedule] = useState({});
  const [mainCountPresent, setMainCountPresent] = useState(0);
  const [mainCountUnknown, setMainCountUnknown] = useState(0);
  const [mainCountExcused, setMainCountExcused] = useState(0);
  const [mainCountSick, setMainCountSick] = useState(0);
  const [mainCountLate, setMainCountLate] = useState(0);

  const { data: userInfoData } = useSelector(
    (state) => state.AdminDashboard.userInfo
  );

  useEffect(() => {
    setMainCountPresent(0);
    setMainCountUnknown(0);
    setMainCountExcused(0);
    setMainCountSick(0);
    setMainCountLate(0);
    if (schedule && schedule?.length > 0) {
      let count = 0;
      singleEventsData?.schedule?.map((s) => {
        const present = s?.activity?.filter(
          (act) => act?.activity === 'present'
        );
        count += present.length;
      });

      setMainCountPresent(count);
    }
    if (schedule && schedule?.length > 0) {
      let count = 0;
      singleEventsData?.schedule?.map((s) => {
        const present = s?.activity?.filter(
          (act) => act?.activity === 'unknown'
        );
        count += present.length;
      });

      setMainCountUnknown(count);
    }
    if (schedule && schedule?.length > 0) {
      let count = 0;
      singleEventsData?.schedule?.map((s) => {
        const present = s?.activity?.filter(
          (act) => act?.activity === 'excused'
        );
        count += present.length;
      });

      setMainCountExcused(count);
    }
    if (schedule && schedule?.length > 0) {
      let count = 0;
      singleEventsData?.schedule?.map((s) => {
        const present = s?.activity?.filter((act) => act?.activity === 'sick');
        count += present.length;
      });

      setMainCountSick(count);
    }
    if (schedule && schedule?.length > 0) {
      let count = 0;
      singleEventsData?.schedule?.map((s) => {
        const present = s?.activity?.filter((act) => act?.activity === 'late');
        count += present.length;
      });

      setMainCountLate(count);
    }
  }, [schedule, singleEventsData?.schedule]);

  const togOpenModal = (s) => {
    setSingleSchedule(s);
    setOpenModal(!openModal);
  };

  function getPresent(scheduleData, user, type) {
    let count = 0;
    scheduleData?.map((s) => {
      const present = s?.activity?.filter(
        (act) =>
          act?.user_id?._id === user?.user_id?._id && act?.activity === type
      );
      count += present.length;
    });
    return count;
  }

  return (
    <>
      <Row className="mt-5 gx-5">
        <Col>
          <Card>
            <CardHeader className="py-4 fw-medium fs-1 bg-light-subtle">
              Attendance Report for{' '}
              <span className="qoute_color fw-semibold">
                {eventName && eventName.toUpperCase()}
              </span>
            </CardHeader>
            <div className="d-flex flex-wrap justify-content-between align-items-center p-sm-2 fw-medium m-5 text-nowrap gap-4 ">
              <div className=" flex align-items-center text-success">
                <i className="ri-check-line me-2 fw-bold"></i>
                <span>Present</span>
              </div>
              <div className="text-danger-emphasis">
                <i className="ri-question-mark me-2"></i>
                Unknown absence
              </div>
              <div className="text-warning">
                <i className="ri-close-line me-2 fw-bold"></i>
                Excused absence
              </div>
              <div className="text-primary-emphasis">
                <i className="ri-pencil-line me-2"></i>
                Absence because of sickness/injury
              </div>
              <div className="text-danger">
                <i className="ri-timer-line me-2"></i>
                Late
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mx-5 text-muted my-3">
              <div></div>
              <div>
                {schedule?.length > 0 && schedule.length}{' '}
                {schedule?.length === 1 ? 'Activity' : 'Activities'}
              </div>
            </div>
            <CardBody
              style={{ position: 'relative', overflowX: 'auto' }}
              className=" fw-semibold"
            >
              <Table bordered className="border">
                <thead className="border border-2">
                  <tr className="align-middle border border-2 bg-light">
                    <th width="15%" className="border border-2">
                      Member Name
                    </th>
                    <th width="10" className="bg-light-subtle border border-2">
                      <i
                        style={{
                          cursor: 'pointer',
                        }}
                        id="present"
                        className="ri-check-line text-success fs-22"
                      ></i>
                      <UncontrolledTooltip
                        style={{ fontSize: '1rem' }}
                        placement="top"
                        target="present"
                        autohide
                        trigger="hover"
                      >
                        Present
                      </UncontrolledTooltip>
                    </th>
                    <th width="10" className="bg-light-subtle border border-2">
                      <i
                        style={{
                          cursor: 'pointer',
                        }}
                        id="unknown"
                        className="ri-question-mark text-danger-emphasis fs-22"
                      ></i>
                      <UncontrolledTooltip
                        style={{ fontSize: '1rem' }}
                        placement="top"
                        target="unknown"
                        autohide
                        trigger="hover"
                      >
                        Unknown
                      </UncontrolledTooltip>
                    </th>
                    <th width="10" className="bg-light-subtle border border-2">
                      <i
                        style={{
                          cursor: 'pointer',
                        }}
                        id="excused"
                        className="ri-close-line text-warning fw-bolder fs-22 "
                      ></i>
                      <UncontrolledTooltip
                        style={{ fontSize: '1rem' }}
                        placement="top"
                        target="excused"
                        autohide
                        trigger="hover"
                      >
                        Excused
                      </UncontrolledTooltip>
                    </th>
                    <th width="10" className="bg-light-subtle border border-2">
                      <i
                        style={{
                          cursor: 'pointer',
                        }}
                        id="sick"
                        className="ri-pencil-line text-primary-emphasis fs-22"
                      ></i>
                      <UncontrolledTooltip
                        style={{ fontSize: '1rem' }}
                        placement="top"
                        target="sick"
                        autohide
                        trigger="hover"
                      >
                        Sick
                      </UncontrolledTooltip>
                    </th>
                    <th width="10" className="bg-light-subtle border border-2">
                      <i
                        style={{
                          cursor: 'pointer',
                        }}
                        id="late"
                        className="ri-timer-line text-danger fs-22"
                      ></i>
                      <UncontrolledTooltip
                        style={{ fontSize: '1rem' }}
                        placement="top"
                        target="late"
                        autohide
                        trigger="hover"
                      >
                        Late
                      </UncontrolledTooltip>
                    </th>
                    {schedule?.length > 0 &&
                      schedule?.map((s) => (
                        <th
                          style={{
                            cursor:
                              userInfoData?.role !== 'guardian' &&
                              userInfoData?.role !== 'player'
                                ? 'pointer'
                                : 'auto',
                          }}
                          onClick={() => {
                            userInfoData?.role === 'guardian'
                              ? ''
                              : userInfoData?.role === 'player'
                                ? ''
                                : togOpenModal(s);
                          }}
                          className="text-center font-weight-light align-items-center border border-2 "
                          key={s._id}
                        >
                          <span className="d-flex qoute_color align-items-center justify-content-center ">
                            <i class="ri-edit-box-fill fs-22 me-2"></i>
                            {new Date(s.date).toLocaleDateString()}
                          </span>
                        </th>
                      ))}
                  </tr>
                </thead>
                {
                  <AttendanceListModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    singleSchedule={singleSchedule}
                    eventName={eventName}
                    id={id}
                    singleEventsData={singleEventsData}
                    singleEventsError={singleEventsError}
                    eventsType={eventsType}
                  />
                }
                <tbody>
                  <tr className="text-muted fw-semibold bg-light-subtle align-middle text-black text-center border border-2">
                    <th
                      scope="row"
                      className="d-flex align-items-center gap-3 "
                    >
                      <span>
                        {schedule?.length > 0 && schedule[0]?.activity?.length}
                      </span>{' '}
                      <span>Members</span>
                    </th>
                    <td className="border border-2">{mainCountPresent}</td>
                    <td className="border border-2">{mainCountUnknown}</td>
                    <td className="border border-2">{mainCountExcused}</td>
                    <td className="border border-2">{mainCountSick}</td>
                    <td className="border border-2">{mainCountLate}</td>
                    <td
                      className="border border-2"
                      colSpan={schedule?.length > 0 && schedule.length}
                    ></td>
                  </tr>
                  {schedule &&
                    schedule[0]?.activity?.length > 0 &&
                    schedule[0]?.activity?.map((a) => (
                      <tr
                        key={a?._id}
                        className="text-center align-middle border border-2"
                      >
                        <td scope="row" className="text-start">
                          <h2 className=" text-info">
                            {a?.user_id?.first_name} {a?.user_id?.last_name}
                          </h2>
                          <p className="badge bg-secondary-subtle text-muted">
                            {a?.user_id?.role}
                          </p>
                        </td>
                        <td className="bg-light-subtle border border-2">
                          {getPresent(schedule, a, 'present')}
                        </td>
                        <td className="bg-light-subtle border border-2">
                          {getPresent(schedule, a, 'unknown')}
                        </td>
                        <td className="bg-light-subtle border border-2">
                          {getPresent(schedule, a, 'excused')}
                        </td>
                        <td className="bg-light-subtle border border-2">
                          {getPresent(schedule, a, 'sick')}
                        </td>
                        <td className="bg-light-subtle border border-2">
                          {getPresent(schedule, a, 'late')}
                        </td>
                        {schedule?.map((s) => (
                          <td
                            key={s?._id}
                            className="bg-light-subtle border border-2"
                          >
                            {s?.activity
                              ?.filter(
                                (act) => act?.user_id?._id === a?.user_id?._id
                              )
                              .map((filteredActivity) => (
                                <div key={filteredActivity._id}>
                                  <i
                                    style={{ cursor: 'pointer' }}
                                    id={`Tooltip-unknown-${filteredActivity._id}`}
                                    className={` fs-24 ${
                                      filteredActivity?.activity === 'unknown'
                                        ? 'text-danger-emphasis ri-question-fill'
                                        : filteredActivity?.activity ===
                                            'present'
                                          ? 'text-success ri-check-fill'
                                          : filteredActivity?.activity ===
                                              'excused'
                                            ? 'text-warning ri-close-circle-fill'
                                            : filteredActivity?.activity ===
                                                'sick'
                                              ? 'text-info ri-edit-circle-fill'
                                              : filteredActivity?.activity ===
                                                  'late'
                                                ? 'text-danger ri-timer-fill'
                                                : 'text-muted'
                                    }`}
                                  >
                                    <UncontrolledTooltip
                                      style={{
                                        fontSize: '1rem',
                                      }}
                                      placement="top"
                                      target={`Tooltip-unknown-${filteredActivity._id}`}
                                      autohide
                                      trigger={'hover'}
                                    >
                                      {filteredActivity?.activity === 'unknown'
                                        ? 'unknown'
                                        : filteredActivity?.activity ===
                                            'present'
                                          ? 'present'
                                          : filteredActivity?.activity ===
                                              'excused'
                                            ? 'excused'
                                            : filteredActivity?.activity ===
                                                'sick'
                                              ? 'sick'
                                              : filteredActivity?.activity ===
                                                  'late'
                                                ? 'late'
                                                : ''}
                                    </UncontrolledTooltip>
                                  </i>
                                </div>
                              ))}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AttendanceList;
