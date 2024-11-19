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
  const endIdx = Math.min((currentPage + 1) * perPageData, data.length);
  const paginatedData = data.slice(startIdx, endIdx);

  return (
    <div>
      <div className="table-responsive mb-5">
        <table className="table table-hover table-centered align-middle table-nowrap">
          {/* Table Headers */}
          <thead className="fs-2 bg-light">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} scope="col">
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Data */}
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, key) => (
                <tr key={key}>
                  {headers.map((header, idx) => (
                    <td key={idx}>
                      {header.render
                        ? header.render(item)
                        : item[header.key] || '-'}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center">
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
