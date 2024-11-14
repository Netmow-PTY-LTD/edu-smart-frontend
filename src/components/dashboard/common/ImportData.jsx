import React from 'react';
import { CSVLink } from 'react-csv';

const ImportData = ({ exportCSVData, toggleModal }) => {
  const formattedCSVData = Array.isArray(exportCSVData)
    ? exportCSVData.map((item) => {
        return Object.fromEntries(
          Object.entries(item).map(([key, value]) => [
            key,
            typeof value === 'object' && value !== null
              ? JSON.stringify(value)
              : value,
          ])
        );
      })
    : [];
  return (
    <>
      <div className="d-flex gap-4 align-content-center justify-content-end pe-4">
        <div>
          <button
            onClick={toggleModal}
            className="third-btn rounded px-3 fs-14 fw-medium text-uppercase"
          >
            Import As CSV
          </button>
        </div>
        <div>
          <CSVLink data={formattedCSVData}>
            <button className="third-btn rounded px-3 fs-14 fw-medium text-uppercase">
              Export As CSV
            </button>
          </CSVLink>
        </div>
      </div>
    </>
  );
};

export default ImportData;
