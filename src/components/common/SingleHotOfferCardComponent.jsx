import Image from 'next/image';
import React from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import cardimg from '../../../public/assets/card-bg.png';

const SingleHotOfferCardComponent = ({
  updateHotOffer,
  data,
  deleteHotOffer,
}) => {
  const bgImage = '/assets/card-bg.png';

  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2>Hot Offer</h2>
          <UncontrolledDropdown direction="end">
            <DropdownToggle
              tag="a"
              className="text-reset dropdown-btn"
              role="button"
            >
              <button
                style={{
                  background: 'transparent',
                  transform: 'rotate(90deg)',
                }}
              >
                <i className="ri-more-2-fill fw-bolder fs-1"></i>
              </button>
            </DropdownToggle>
            <DropdownMenu className="ms-2">
              <DropdownItem>
                <div
                  onClick={() => updateHotOffer(data?._id)}
                  className="text-primary"
                >
                  <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                  Edit
                </div>
              </DropdownItem>
              {/* <DropdownItem>
                <div
                  onClick={() => deleteHotOffer(data._id)}
                  className="text-primary"
                >
                  <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                  Delete
                </div>
              </DropdownItem> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div
          style={{
            backgroundColor: '#FFC1AE',
            minHeight: '250px',
            minWidth: '400px',
            position: 'relative',
          }}
          className="d-flex px-5 rounded-5 pt-4"
        >
          <div className="d-flex flex-column z-1">
            <div>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ gap: '75%' }}
              >
                <h1 className="text-primary text-nowrap fw-bold text-capitalize">
                  {data?.name}
                </h1>
                <span
                  className={`fs-3 text-capitalize badge ${data?.status === 'active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
                >
                  {data?.status}
                </span>
              </div>

              <p className="text-primary fw-semibold text-capitalize">
                {data?.offer_duration.split('_').join(' ')}
              </p>
              <p className="text-primary fw-semibold text-capitalize">
                <strong>For</strong> {data?.package?.name}
              </p>
            </div>
            <button
              style={{
                position: 'absolute',
                bottom: '0',
              }}
              className="button px-4 py-2 my-5"
            >
              {data?.offer_percentage}
              {'%'}
              {' Extraa'}
            </button>
          </div>

          <Image
            src={cardimg || bgImage}
            alt="alt"
            style={{
              position: 'absolute',
              bottom: '-34px',
              right: '-16px',
              width: '300px',
              height: '278px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SingleHotOfferCardComponent;
