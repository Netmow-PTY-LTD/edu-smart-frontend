import { addCustomTrainingSchedule } from '@/slices/dashboard/adminDashboard/Actions/customTrainingScheduleActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Row, Table } from 'reactstrap';

const CustomTrainingModalDataTable = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector(
    (state) => state.AdminDashboard.addCustomTrainingSchedule
  );

  useEffect(() => {
    dispatch(addCustomTrainingSchedule());
  }, [dispatch]);
  return (
    <div>
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="table-borderless text-center table-nowrap align-middle">
                  <thead>
                    <tr className="table-active text-center">
                      <th scope="col" className="text-start ps-4">
                        Date
                      </th>
                      <th scope="col">Status</th>
                      <th scope="col">Vanue</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {('' || []).map((item, key) => (
                      <tr key={'key'}>
                        <td>
                          <h5 className="fs-13 my-1 fw-normal">
                            {new Date(item?.date).toLocaleDateString()}
                          </h5>
                        </td>
                        <td>
                          <h5 className="fs-13 my-1 fw-normal badge bg-light-subtle text-success">
                            {item?.status}
                          </h5>
                        </td>
                        <td>
                          <h5 className="fs-13 my-1 fw-normal">{item?.vanue}</h5>
                        </td>
                        <td>
                          <h5 className="fs-13 my-1 fw-normal">
                            {item?.startfrom}
                          </h5>
                        </td>

                        <td>
                          <h5 className="fs-13 my-1 fw-normal">{item?.endto}</h5>
                        </td>

                        <td>
                          <div
                            style={{ cursor: 'pointer' }}
                            className="flex-shrink-0 text-center fs-1"
                          >
                            <i className="ri-close-line me-2 text-danger"></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* If table data is empty */}
                {''.length <= 0 && (
                  <div className="empty-table-dialog-container">
                    <span className="">
                      {"Don't found any Training Schedule Data."}
                    </span>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomTrainingModalDataTable;
