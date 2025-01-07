import Image from 'next/image';
import React from 'react';
import cardimg from '../../../public/assets/card-bg.png';

const SingleHotOfferCardComponent = ({ togEditOpenModal }) => {
  const bgImage = '/assets/card-bg.png';
  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2>Hot Offer</h2>
          <button
            onClick={togEditOpenModal}
            style={{
              background: 'transparent',
              transform: 'rotate(90deg)',
            }}
          >
            <i class="ri-more-2-fill fw-bolder fs-1"></i>
          </button>
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
              <h1 className="text-primary text-nowrap fw-bold">
                60 Days Of Premium
              </h1>
              <p className="text-primary fw-semibold">Get It Before</p>
            </div>
            <button
              style={{
                position: 'absolute',
                bottom: '0',
              }}
              className="button px-4 py-2 my-5"
            >
              Learn More
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
