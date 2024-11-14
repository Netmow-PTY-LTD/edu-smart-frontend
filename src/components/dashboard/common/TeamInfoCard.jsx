import React from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

const TeamInfoCard = ({ mainData }) => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="fw-medium mb-3">Info</CardTitle>
          <div className="table-responsive">
            <Table className="table-borderless mb-0">
              <tbody>
                <tr>
                  <th className="ps-0" scope="row">
                    Team Name
                  </th>
                  <td className="text-muted text-uppercase">
                    : {mainData?.name}
                  </td>
                </tr>
                <tr>
                  <th className="ps-0" scope="row">
                    Manager
                  </th>
                  <td className="text-muted text-uppercase">
                    :{' '}
                    {mainData?.manager
                      ? mainData?.manager?.first_name +
                        ' ' +
                        mainData?.manager?.last_name
                      : ''}
                  </td>
                </tr>
                <tr>
                  <th className="ps-0" scope="row">
                    Trainer
                  </th>
                  <td className="text-muted text-uppercase">
                    :{' '}
                    {mainData?.trainer
                      ? mainData?.trainer?.first_name +
                        ' ' +
                        mainData?.trainer?.last_name
                      : ''}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TeamInfoCard;
