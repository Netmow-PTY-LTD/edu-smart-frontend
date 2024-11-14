import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';

const ProfileAttendance = ({ customData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageData, setPerPageData] = useState(15);
  return (
    <>
      <Card>
        <CardHeader className="bg-light-subtle ">
          <div className="col-sm pe-3 my-3">
            <div className="d-flex justify-content-sm-start">
              <h4 className="card-title mb-0 flex-grow-1 ps-2 fs-1 fw-semibold">
                Player Profile Attendance Information
              </h4>
            </div>
          </div>
        </CardHeader>

        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="d-flex align-items-center justify-content-center flex-wrap my-3 w-50 ">
            <div className="mb-4 w-25">
              <div className="d-flex align-items-center gap-3 fs-22">
                <i className="ri-check-line text-success fw-bold fs-24 "></i>
                <div className="fw-medium ">
                  15 <small className="text-muted fs-2">(20%)</small>
                </div>
              </div>
              <h1 className="fs-3 fw-semibold">Present</h1>
            </div>
            <div className="mb-4 w-25">
              <div className="d-flex align-items-center gap-3 fs-22">
                <i className="ri-timer-fill text-danger fw-bolder fs-24"></i>
                <div className="fw-medium ">15 </div>
              </div>
              <h1 className="fs-3 fw-semibold">Late</h1>
            </div>
            <div className="mb-4 w-25">
              <div className="d-flex align-items-center gap-3 fs-22">
                <i className="ri-question-mark text-danger-emphasis fw-bolder fs-24"></i>
                <span className="fw-medium">15</span>
              </div>
              <h1 className="fs-3 fw-semibold">Unknown</h1>
            </div>
            <div className="mb-4 w-25">
              <div className="d-flex align-items-center gap-3 fs-22">
                <i className="ri-close-line text-warning fw-bolder fs-24"></i>
                <span className="fw-medium">15</span>
              </div>
              <h1 className="fs-3 fw-semibold">Absent</h1>
            </div>
            <div className="mb-4 w-25">
              <div className="d-flex align-items-center gap-3 fs-22">
                <i className="ri-pencil-line text-info-emphasis fw-bolder fs-24"></i>
                <span className="fw-medium">15</span>
              </div>
              <h1 className="fs-3 fw-semibold">sick</h1>
            </div>
            <div className="mb-4 w-25">
              <div className="d-flex align-items-center gap-3 fs-22">
                <i className="ri-calendar-event-fill text-primary fw-bolder fs-22"></i>
                <span className="fw-medium">15</span>
              </div>
              <h1 className="fs-3 fw-semibold">Events</h1>
            </div>
          </div>
        </div>

        <CardBody style={{ position: 'relative', }}>
          <Table
            borderless
            size="xl"
            responsive
            className="align-middle table-nowrap"
          >
            <thead className="fs-2">
              <tr>
                <th scope="col" className="py-4">
                  Date
                </th>
                <th scope="col" className="py-4">
                  Details
                </th>

                <th scope="col" className="py-4">
                  RSVP
                </th>
                <th scope="col" className="py-4">
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {customData?.length > 0 &&
                  customData
                    ?.slice(
                      currentPage * perPageData,
                      customData?.length - currentPage * perPageData >
                        perPageData
                        ? currentPage * perPageData + perPageData
                        : customData?.length
                    )
                    ?.map((item, key) => ( */}
              <tr
                key={'key'}
                className="mb-2 border-bottom border-white border-4"
              >
                <td>
                  <h5 className="fs-14 my-1 fw-normal">apr 1</h5>
                </td>
                <td className="bg-warning-subtle border-start border-warning text-black">
                  <h5 className="fs-14 my-1 fw-normal">UTS-Football(Soccer)</h5>
                  <h5 className="fs-14 my-1 fw-normal">
                    1 april 2024, 11.00 - 13.00,Coaches:Tom Katsiroubas
                  </h5>
                </td>

                <td className="bg-warning-subtle">
                  <h5 className="fs-14 my-1 fw-normal">rsvp</h5>
                </td>

                <td className="bg-warning-subtle">
                  <h5 className="fs-14 my-1 fw-normal">attendance</h5>
                </td>
              </tr>
              <tr
                key={'key'}
                className="mb-2 border-bottom border-white border-4"
              >
                <td>
                  <h5 className="fs-14 my-1 fw-normal">apr 1</h5>
                </td>
                <td className="bg-warning-subtle border-start border-warning text-black">
                  <h5 className="fs-14 my-1 fw-normal">UTS-Football(Soccer)</h5>
                  <h5 className="fs-14 my-1 fw-normal">
                    1 april 2024, 11.00 - 13.00,Coaches:Tom Katsiroubas
                  </h5>
                </td>

                <td className="bg-warning-subtle">
                  <h5 className="fs-14 my-1 fw-normal">rsvp</h5>
                </td>

                <td className="bg-warning-subtle">
                  <h5 className="fs-14 my-1 fw-normal">attendance</h5>
                </td>
              </tr>
              <tr
                key={'key'}
                className="mb-2 border-bottom border-white border-4"
              >
                <td>
                  <h5 className="fs-14 my-1 fw-normal">apr 1</h5>
                </td>
                <td className="bg-warning-subtle border-start border-warning text-black">
                  <h5 className="fs-14 my-1 fw-normal">UTS-Football(Soccer)</h5>
                  <h5 className="fs-14 my-1 fw-normal">
                    1 april 2024, 11.00 - 13.00,Coaches:Tom Katsiroubas
                  </h5>
                </td>

                <td className="bg-warning-subtle">
                  <h5 className="fs-14 my-1 fw-normal">rsvp</h5>
                </td>

                <td className="bg-warning-subtle">
                  <h5 className="fs-14 my-1 fw-normal">attendance</h5>
                </td>
              </tr>
              <tr
                key={'key'}
                className="mb-2 border-bottom border-white border-4"
              >
                <td>
                  <h5 className="fs-14 my-1 fw-normal">apr 1</h5>
                </td>
                <td className="bg-warning-subtle border-start border-warning text-black">
                  <h5 className="fs-14 my-1 fw-normal">UTS-Football(Soccer)</h5>
                  <h5 className="fs-14 my-1 fw-normal">
                    1 april 2024, 11.00 - 13.00,Coaches:Tom Katsiroubas
                  </h5>
                </td>

                <td className="bg-warning-subtle">
                  <h5 className="fs-14 my-1 fw-normal">rsvp</h5>
                </td>

                <td className="bg-warning-subtle">
                  <h5 className="fs-14 my-1 fw-normal">attendance</h5>
                </td>
              </tr>

              {/* ))} */}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default ProfileAttendance;
