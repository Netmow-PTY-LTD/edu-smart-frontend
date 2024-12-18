import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';

const FilterTags = () => {
  // State to manage the list of filters
  const [filters, setFilters] = useState(['CSE', 'EEE', 'IPE']);

  // Function to remove a specific filter
  const removeFilter = (filterName) => {
    setFilters(filters.filter((filter) => filter !== filterName));
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setFilters([]);
  };

  return (
    <Row className="mb-4">
      <Col>
        <Row className="align-items-center">
          <Col xs="auto">
            <h2 className="text-info-emphasis">Filtered By:</h2>
          </Col>
          <Col>
            <div className="d-flex flex-wrap align-items-center">
              {filters.map((filter) => (
                <span
                  key={filter}
                  className="badge text-primary bg-secondary-subtle me-2 p-2"
                >
                  {filter}{' '}
                  <span
                    className="ms-1 text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeFilter(filter)}
                  >
                    &times;
                  </span>
                </span>
              ))}
              {filters.length > 0 && (
                <button
                  style={{ cursor: 'pointer' }}
                  type="button"
                  className="badge text-primary bg-secondary-subtle"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FilterTags;
