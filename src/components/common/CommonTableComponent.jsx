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
              ))
            ) : (
              <tr>
                <td colSpan={headers?.length} className="text-center">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <CardFooter>
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
      </CardFooter>
    </div>
  );
};

export default CommonTableComponent;
