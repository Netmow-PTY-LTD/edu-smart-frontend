import Image from 'next/image';
import React, { useState } from 'react';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import * as Yup from 'yup';
import CommonTableComponent from '../CommonTableComponent';

export default function UniversitySponsorsForm() {
  const [initialValues, setInitialValues] = useState({
    logo: null,
  });

  const validationSchema = Yup.object({
    logo: Yup.string().required('Logo is required'),
  });

  const sponsorsHeaders = [
    {
      title: 'SN',
      key: 'sn',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">{index + 1}</span>
      ),
    },

    { title: 'Sponsor Name', key: 'name' },
    {
      title: 'Website',
      key: 'link',
      render: (item, index) => (
        <span className="d-flex flex-column text-capitalize">
          {item?.available_seats}
        </span>
      ),
    },
    {
      title: 'Sponsor Logo',
      key: 'logo',
      render: (item) => (
        <Image src={item?.link} width={80} height={80} alt="" />
      ),
    },

    {
      title: 'Action',
      key: 'actions',
      render: (item) => (
        <UncontrolledDropdown direction="end">
          <DropdownToggle
            tag="a"
            className="text-reset dropdown-btn"
            role="button"
          >
            <span className="button px-3">
              <i className="ri-more-fill align-middle"></i>
            </span>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu dropdown-menu-end">
            <DropdownItem>
              <div className="text-primary">
                <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                Edit
              </div>
            </DropdownItem>
            <DropdownItem>
              <div className="text-primary">
                <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                Delete
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      ),
    },
  ];

  return (
    <Col lg={10}>
      <CommonTableComponent headers={sponsorsHeaders} />
    </Col>
  );
}
