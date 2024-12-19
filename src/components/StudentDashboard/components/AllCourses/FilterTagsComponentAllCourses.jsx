import React from 'react';
import { Col, Row } from 'reactstrap';

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
      const isAlreadySelected = prevSelectedValues?.some(
        (item) => item.name === name && item.value === value
      );
      if (isAlreadySelected) {
        return prevSelectedValues?.filter(
          (item) => !(item.name === name && item.value === value)
        );
      }
    });
  };

  return (
    <Row className="mb-4 d-flex justify-content-center">
      <Col className="d-flex align-items-center justify-content-start gap-2">
        <h2 className="text-primary">Filtered By:</h2>

        {filters?.map((filter, index) => (
          <div
            key={index}
            className="d-flex justify-content-center align-items-center gap-2 badge text-primary bg-secondary-subtle me-2 p-2"
          >
            <span>{filter?.value}</span>
            <span
              className="ms-1 fs-1 cursor-pointer text-danger"
              onClick={() => removeFilter(filter)}
            >
              &times;
            </span>
          </div>
        ))}
        {filters?.length > 1 && (
          <div
            className="d-flex justify-content-center align-items-center gap-2 badge text-primary bg-secondary-subtle  p-3 cursor-pointer"
            onClick={() => setFilters([])}
          >
            Clear All
          </div>
        )}
      </Col>
    </Row>
  );
};

export default FilterTags;
