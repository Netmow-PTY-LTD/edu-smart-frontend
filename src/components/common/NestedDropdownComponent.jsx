import React, { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

const NestedDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subDropdown, setSubDropdown] = useState(null); // Track which department is selected
  const [subSubDropdown, setSubSubDropdown] = useState(null); // Track which program is selected

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const handleSubDropdownToggle = (department) => {
    setSubDropdown(department);
  };

  const handleSubSubDropdownToggle = (program) => {
    setSubSubDropdown(subSubDropdown === program ? null : program); // Toggle open/close of selected program
  };

  console.log(subDropdown);

  return (
    <Dropdown direction="end" nav isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle nav>Departments</DropdownToggle>
      <DropdownMenu>
        {/* Departments Dropdown */}
        <DropdownItem onClick={() => handleSubDropdownToggle('CSE')}>
          CSE
        </DropdownItem>
        <DropdownItem onClick={() => handleSubDropdownToggle('EEE')}>
          EEE
        </DropdownItem>
        <DropdownItem onClick={() => handleSubDropdownToggle('ME')}>
          ME
        </DropdownItem>

        {/* Show sub-dropdowns based on the selected department */}
        {subDropdown && (
          <DropdownMenu className="nested-dropdown">
            <DropdownItem onClick={() => handleSubSubDropdownToggle('BSC')}>
              BSC
            </DropdownItem>
            <DropdownItem onClick={() => handleSubSubDropdownToggle('MSC')}>
              MSC
            </DropdownItem>
            <DropdownItem onClick={() => handleSubSubDropdownToggle('PhD')}>
              PhD
            </DropdownItem>

            {/* Show sub-sub-dropdowns based on the selected program */}
            {subSubDropdown === 'BSC' && (
              <DropdownMenu className="nested-dropdown">
                <DropdownItem>C</DropdownItem>
                <DropdownItem>C++</DropdownItem>
                <DropdownItem>Python</DropdownItem>
              </DropdownMenu>
            )}
            {subSubDropdown === 'MSC' && (
              <DropdownMenu className="nested-dropdown">
                <DropdownItem>Advanced C</DropdownItem>
                <DropdownItem>Machine Learning</DropdownItem>
                <DropdownItem>Data Science</DropdownItem>
              </DropdownMenu>
            )}
            {subSubDropdown === 'PhD' && (
              <DropdownMenu className="nested-dropdown">
                <DropdownItem>AI Research</DropdownItem>
                <DropdownItem>Quantum Computing</DropdownItem>
                <DropdownItem>Robotics</DropdownItem>
              </DropdownMenu>
            )}
          </DropdownMenu>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NestedDropdown;
