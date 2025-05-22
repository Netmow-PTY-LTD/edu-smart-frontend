import Layout from '@/components/layout';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { userDummyImage } from '@/utils/common/data';
import Image from 'next/image';
import React from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

const AgentProfileInStudentDashboard = () => {
  const { data: userInfoData } = useGetUserInfoQuery();
  return (
    <Layout>
      <div className="page-content">
        <Card className="mb-5 h-100">
          {userInfoData?.data?.agent?._id ? (
            <>
              <CardTitle className="p-4 text-capitalize fs-2 fw-semibold">
                Partner Information
              </CardTitle>
              <CardBody className="mb-4">
                <div className="text-center d-flex flex-column align-items-center justify-content-center">
                  <div className="profile-user position-relative d-inline-block mx-auto mb-4">
                    <Image
                      src={
                        userInfoData?.data?.agent?.profile_image?.url ||
                        `${userDummyImage}`
                      }
                      width={60}
                      height={60}
                      className="avatar-xl rounded-circle img-thumbnail user-profile-image"
                      alt="user-profile"
                    />
                  </div>
                  <div className="table-responsive">
                    <Table className="table-borderless mb-0">
                      <tbody>
                        <tr>
                          <th className="ps-0 text-start" scope="row">
                            Name
                          </th>
                          <td className="text-muted text-wrap d-flex">
                            <span className="d-inline-block me-2">:</span>
                            <span className="d-inline-block text-capitalize ">
                              {userInfoData?.data?.agent?.name
                                ? userInfoData?.data?.agent?.name
                                : userInfoData?.data?.agent?.first_name
                                  ? userInfoData?.data?.agent?.first_name +
                                    ' ' +
                                    userInfoData?.data?.agent?.last_name
                                  : ''}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th className="ps-0 text-start" scope="row">
                            Phone
                          </th>
                          <td className="text-muted text-wrap d-flex">
                            <span className="d-inline-block me-2">:</span>
                            <span className="d-inline-block">
                              {userInfoData?.data?.agent?.phone ?? ''}
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <th className="ps-0 text-start" scope="row">
                            E-mail
                          </th>
                          <td className="text-muted text-wrap d-flex">
                            <span className="d-inline-block me-2">:</span>
                            <span className="d-inline-block">
                              {userInfoData?.data?.agent?.email}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th className="ps-0 text-start" scope="row">
                            Location
                          </th>
                          <td className="text-muted text-wrap d-flex">
                            <span className="d-inline-block me-2">:</span>
                            <span className="d-inline-block">
                              {userInfoData?.data?.agent?.address_line_1?.trim() !==
                              ''
                                ? userInfoData?.data?.agent?.address_line_1?.trim() +
                                  (userInfoData?.data?.agent?.address_line_2?.trim() !==
                                    '' ||
                                  userInfoData?.data?.agent?.city?.trim() !==
                                    '' ||
                                  userInfoData?.data?.agent?.state?.trim() !==
                                    '' ||
                                  userInfoData?.data?.agent?.zip?.trim() !==
                                    '' ||
                                  (userInfoData?.data?.agent?.country?.trim() !==
                                    '' &&
                                    userInfoData?.data?.agent?.country !==
                                      'undefined')
                                    ? ', '
                                    : '')
                                : ''}
                              {userInfoData?.data?.agent?.address_line_2?.trim() !==
                              ''
                                ? userInfoData?.data?.agent?.address_line_2?.trim() +
                                  (userInfoData?.data?.agent?.city?.trim() !==
                                    '' ||
                                  userInfoData?.data?.agent?.state?.trim() !==
                                    '' ||
                                  userInfoData?.data?.agent?.zip?.trim() !==
                                    '' ||
                                  (userInfoData?.data?.agent?.country?.trim() !==
                                    '' &&
                                    userInfoData?.data?.agent?.country !==
                                      'undefined')
                                    ? ', '
                                    : '')
                                : ''}
                              {userInfoData?.data?.agent?.city?.trim() !== ''
                                ? userInfoData?.data?.agent?.city?.trim() +
                                  (userInfoData?.data?.agent?.state?.trim() !==
                                    '' ||
                                  userInfoData?.data?.agent?.zip?.trim() !==
                                    '' ||
                                  (userInfoData?.data?.agent?.country?.trim() !==
                                    '' &&
                                    userInfoData?.data?.agent?.country !==
                                      'undefined')
                                    ? ', '
                                    : '')
                                : ''}

                              {userInfoData?.data?.agent?.state?.trim() !== ''
                                ? userInfoData?.data?.agent?.state?.trim() +
                                  (userInfoData?.data?.agent?.zip?.trim() !==
                                    '' ||
                                  (userInfoData?.data?.agent?.country?.trim() !==
                                    '' &&
                                    userInfoData?.data?.agent?.country !==
                                      'undefined')
                                    ? ', '
                                    : '')
                                : ''}

                              {userInfoData?.data?.agent?.zip?.trim() !== ''
                                ? userInfoData?.data?.agent?.zip?.trim() +
                                  (userInfoData?.data?.agent?.country?.trim() !==
                                    '' &&
                                  userInfoData?.data?.agent?.country !==
                                    'undefined'
                                    ? ', '
                                    : '')
                                : ''}
                              {userInfoData?.data?.agent?.country?.trim() &&
                              userInfoData?.data?.agent?.country !== 'undefined'
                                ? userInfoData?.data?.agent?.country?.trim()
                                : ''}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </CardBody>
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center vh-100 text-primary fs-2 fw-semibold">
              No Data Found
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default AgentProfileInStudentDashboard;
