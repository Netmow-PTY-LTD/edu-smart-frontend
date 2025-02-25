import React from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

const AllOverviewInfoCard = ({ data }) => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="fw-semibold mb-3 text-primary">
            User Information
          </CardTitle>
          <div className="table-responsive">
            <Table className="table-borderless mb-0">
              <tbody>
                <tr>
                  <th className="ps-0" scope="row">
                    Name
                  </th>
                  <td className="text-muted text-wrap d-flex">
                    <span className="d-inline-block me-2">:</span>
                    <span className="d-inline-block text-capitalize">
                      {data?.name
                        ? data?.name
                        : data?.first_name
                          ? data?.first_name + ' ' + data?.last_name
                          : ''}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="ps-0" scope="row">
                    Phone
                  </th>
                  <td className="text-muted text-wrap d-flex">
                    <span className="d-inline-block me-2">:</span>
                    <span className="d-inline-block">{data?.phone ?? ''}</span>
                  </td>
                </tr>

                <tr>
                  <th className="ps-0" scope="row">
                    E-mail
                  </th>
                  <td className="text-muted text-wrap d-flex">
                    <span className="d-inline-block me-2">:</span>
                    <span className="d-inline-block">{data?.email}</span>
                  </td>
                </tr>
                <tr>
                  <th className="ps-0" scope="row">
                    Location
                  </th>
                  <td className="text-muted text-wrap d-flex">
                    <span className="d-inline-block me-2">:</span>
                    <span className="d-inline-block">
                      {data?.address_line_1?.trim() !== ''
                        ? data?.address_line_1?.trim() +
                          (data?.address_line_2?.trim() !== '' ||
                          data?.city?.trim() !== '' ||
                          data?.state?.trim() !== '' ||
                          data?.zip?.trim() !== '' ||
                          (data?.country?.trim() !== '' &&
                            data?.country !== 'undefined')
                            ? ', '
                            : '')
                        : ''}
                      {data?.address_line_2?.trim() !== ''
                        ? data?.address_line_2?.trim() +
                          (data?.city?.trim() !== '' ||
                          data?.state?.trim() !== '' ||
                          data?.zip?.trim() !== '' ||
                          (data?.country?.trim() !== '' &&
                            data?.country !== 'undefined')
                            ? ', '
                            : '')
                        : ''}
                      {data?.city?.trim() !== ''
                        ? data?.city?.trim() +
                          (data?.state?.trim() !== '' ||
                          data?.zip?.trim() !== '' ||
                          (data?.country?.trim() !== '' &&
                            data?.country !== 'undefined')
                            ? ', '
                            : '')
                        : ''}

                      {data?.state?.trim() !== ''
                        ? data?.state?.trim() +
                          (data?.zip?.trim() !== '' ||
                          (data?.country?.trim() !== '' &&
                            data?.country !== 'undefined')
                            ? ', '
                            : '')
                        : ''}

                      {data?.zip?.trim() !== ''
                        ? data?.zip?.trim() +
                          (data?.country?.trim() !== '' &&
                          data?.country !== 'undefined'
                            ? ', '
                            : '')
                        : ''}
                      {data?.country?.trim() && data?.country !== 'undefined'
                        ? data?.country?.trim()
                        : ''}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th className="ps-0" scope="row">
                    Short Description
                  </th>
                  <td className="text-muted text-wrap d-flex">
                    <span className="d-inline-block me-2">:</span>
                    <span className="d-inline-block">
                      {
                        <p className="text-wrap">
                          {data?.description
                            ? `${data?.description?.split(' ').slice(0, 20).join(' ')}...`
                            : ''}
                        </p>
                      }
                    </span>
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

export default AllOverviewInfoCard;
