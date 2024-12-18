import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';

const FilterTags = ({
  selectedValue: filters,
  setSelectedValue: setFilters,
}) => {
  // Function to remove a specific filter
  const removeFilter = (filterData) => {
    const name = filterData?.name;
    const value = filterData?.value;

    setFilters((prevSelectedValues) => {
      // Add the department to the selected value array if not already selected
      const isAlreadySelected = prevSelectedValues.some(
        (item) => item.name === name && item.value === value
      );
      if (isAlreadySelected) {
        return prevSelectedValues.filter(
          (item) => !(item.name === name && item.value === value)
        );
      }
    });
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
              {filters.map((filter,index) => (
                <span
                  key={index}
                  className="badge text-primary bg-secondary-subtle me-2 p-2"
                >
                  {filter?.value}
                  <span
                    className="ms-1 text-danger"
                    style={{ cursor: 'pointer' }}
                    // onClick={() => removeFilter(filter)}
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
                  onClick={() => setFilters([])}
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
