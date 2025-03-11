const {
  useGetStudentForSuperAdminQuery,
} = require('@/slice/services/super admin/sutdentService');
const { useCustomData } = require('@/utils/common/data/customeData');
const { default: Link } = require('next/link');
const { Card, CardBody, CardTitle, Table } = require('reactstrap');

const AgentInformation = ({ student_id }) => {
  const customData = useCustomData();

  const {
    data: getSingleStudent,
    isLoading: getSingleStudenIsLoadingForStudent,
    refetch: getSingleStudenRefetch,
  } = useGetStudentForSuperAdminQuery(student_id, {
    skip: !student_id,
  });

  console.log(getSingleStudent);

  return (
    <>
      {getSingleStudent?.data?.agent && (
        <Card>
          <CardBody>
            <CardTitle className="fw-semibold mb-3 text-primary">
              Agent Information
            </CardTitle>
            <div className="table-responsive">
              <Table className="table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="ps-0" scope="row">
                      Name
                    </th>
                    <td className="text-muted text-wrap d-flex align-items-center">
                      <span className="me-2">:</span>
                      <span className="text-capitalize">
                        {getSingleStudent?.data?.agent
                          ? `${getSingleStudent?.data?.agent.first_name || ''} ${getSingleStudent?.data?.agent.last_name || ''}`.trim()
                          : 'N/A'}
                        {getSingleStudent?.data?.agent?._id && (
                          <Link
                            href={`/dashboard/${customData?.paneltext}/agents/${getSingleStudent?.data?.agent._id}`}
                            className="text-reset ms-2"
                          >
                            (View Profile)
                          </Link>
                        )}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <th className="ps-0" scope="row">
                      Phone
                    </th>
                    <td className="text-muted text-wrap d-flex">
                      <span className="d-inline-block me-2">:</span>
                      <span className="d-inline-block">
                        {getSingleStudent?.data?.agent.phone}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <th className="ps-0" scope="row">
                      E-mail
                    </th>
                    <td className="text-muted text-wrap d-flex">
                      <span className="d-inline-block me-2">:</span>
                      <span className="d-inline-block">
                        {getSingleStudent?.data?.agent.email}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <th className="ps-0" scope="row">
                      Location
                    </th>
                    <td className="text-muted text-wrap d-flex">
                      <span className="d-inline-block me-2">:</span>
                      <span className="d-inline-block">
                        {[
                          getSingleStudent?.data?.agent.address_line_1,
                          getSingleStudent?.data?.agent.address_line_2,
                          getSingleStudent?.data?.agent.city,
                          getSingleStudent?.data?.agent.state,
                          getSingleStudent?.data?.agent.zip,
                          getSingleStudent?.data?.agent.country,
                        ]
                          .filter(Boolean) // Removes empty or undefined values
                          .join(', ')}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default AgentInformation;
