import React from 'react';
import { CardFooter } from 'reactstrap';
import Pagination from './Pagination';

const CommonTableComponent = ({
  headers,
  data,
  currentPage,
  setCurrentPage,
  perPageData,
  emptyMessage,
  totalAmount,
  totalUniversityAmount,
  totalAgentPaidPayoutAmount,
  totalAgentPendingPayoutAmount,
  SupperProfitAmount,
  totalAgentPaidPayoutAmountNew,
}) => {
  // Pagination logic
  const startIdx = currentPage * perPageData;
  const endIdx = Math.min((currentPage + 1) * perPageData, data?.length);
  const paginatedData = data?.length > 0 && data.slice(startIdx, endIdx);

  return (
    <div>
      <div className="table-responsive mb-5">
        <table className="table table-hover table-centered align-middle">
          {/* Table Headers */}
          <thead className="fs-2 bg-light">
            <tr>
              {headers?.length > 0 &&
                headers?.map((header, index) => (
                  <th key={index} scope="col">
                    {header?.title}
                  </th>
                ))}
            </tr>
          </thead>

          {/* Table Data */}
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, rowIndex) => (
                <>
                  <tr key={rowIndex}>
                    {headers?.length > 0 &&
                      headers?.map((header) => (
                        <td key={header?.key}>
                          {header?.render
                            ? header?.render(item, rowIndex)
                            : `${header?.key}` in item
                              ? item[header?.key]
                              : '-'}
                        </td>
                      ))}
                  </tr>
                </>
              ))
            ) : (
              <tr>
                <td colSpan={headers?.length} className="text-center">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
          {totalAmount ? (
            <thead className="fs-2">
              <tr>
                {<th colSpan={2}></th>}
                {
                  <th className="text-uppercase text-end">
                    {'Total Received Amount :'}
                  </th>
                }
                {
                  <th>
                    {totalAmount} {'MYR'}
                  </th>
                }
                {<th>{''}</th>}
                {<th>{''}</th>}
              </tr>
            </thead>
          ) : (
            ''
          )}

          {totalUniversityAmount ? (
            <thead className="fs-2">
              <tr>
                {<th colSpan={3}></th>}
                {
                  <th className="text-uppercase text-end">
                    {'Total Payout Amount :'}
                  </th>
                }
                {
                  <th>
                    {totalUniversityAmount} {'MYR'}
                  </th>
                }
                {<th>{''}</th>}
                {<th>{''}</th>}
              </tr>
            </thead>
          ) : (
            ''
          )}

          {totalAgentPaidPayoutAmount ? (
            <thead className="fs-2">
              <tr>
                {<th colSpan={4}></th>}
                {
                  <th className="text-uppercase text-end">
                    {'Total Payout Amount :'}
                  </th>
                }
                {
                  <th>
                    {totalAgentPaidPayoutAmount} {'MYR'}
                  </th>
                }
                {<th>{''}</th>}
                {<th>{''}</th>}
                {<th>{''}</th>}
              </tr>
            </thead>
          ) : (
            ''
          )}

          {totalAgentPendingPayoutAmount ? (
            <thead className="fs-2">
              <tr>
                {
                  <th colSpan={8} className="text-uppercase text-end">
                    {'Total Payout Amount :'}
                  </th>
                }
                {
                  <th>
                    {totalAgentPendingPayoutAmount} {'MYR'}
                  </th>
                }
                {<th>{''}</th>}
                {<th>{''}</th>}
              </tr>
            </thead>
          ) : (
            ''
          )}

          {totalAgentPaidPayoutAmountNew ? (
            <thead className="fs-2">
              <tr>
                {
                  <th colSpan={8} className="text-uppercase text-end">
                    {'Total Payout Amount :'}
                  </th>
                }
                {
                  <th>
                    {totalAgentPaidPayoutAmountNew} {'MYR'}
                  </th>
                }
                {<th>{''}</th>}
                {<th>{''}</th>}
              </tr>
            </thead>
          ) : (
            ''
          )}

          {SupperProfitAmount ? (
            <thead className="fs-2">
              <tr>
                {
                  <th colSpan={9} className="text-uppercase text-end">
                    {'Total Profit Amount :'}
                  </th>
                }
                {
                  <th colSpan={3}>
                    {SupperProfitAmount} {'MYR'}
                  </th>
                }
                {<th>{''}</th>}
                {<th>{''}</th>}
              </tr>
            </thead>
          ) : (
            ''
          )}
        </table>
      </div>

      {/* Pagination */}
      <CardFooter>
        {data.length > perPageData && (
          <Pagination
            style={{
              position: 'absolute',
              bottom: 0,
              right: 20,
            }}
            data={data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPageData={perPageData}
          />
        )}
      </CardFooter>
    </div>
  );
};

export default CommonTableComponent;
