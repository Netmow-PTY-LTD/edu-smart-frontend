import React from 'react';

const HotOfferBanner = ({ height = '120px', width = '220px', data }) => {
  return (
    <div
      style={{
        backgroundImage: `url('/Hot Offer.png')`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: height,
        width: width,
        position: 'relative',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'start',
          width: '85%',
        }}
      >
        <h1
          className="text-primary text-nowrap fw-bold text-capitalize"
          style={{
            fontSize: `calc(${width} * 0.080)`,
            margin: '0',
          }}
        >
          {data?.name || 'Hot Offer'}
        </h1>
        <p
          className="text-primary fw-semibold text-capitalize"
          style={{
            fontSize: `calc(${width} * 0.050)`,
            margin: '0',
          }}
        >
          {data?.offer_duration.split('_').join(' ') || 'Limited Time Offer'}
        </p>
        <p
          className="text-primary fw-semibold text-capitalize"
          style={{
            fontSize: `calc(${width} * 0.045)`,
            margin: '0',
          }}
        >
          {data?.package?.name || 'Standard Package'}
        </p>
        <p
          className="text-primary fw-semibold text-capitalize"
          style={{
            fontSize: `calc(${width} * 0.045)`,
            margin: '0',
          }}
        >
          {data?.offer_percentage ? data?.offer_percentage + ' % offer' : ''}
        </p>
      </div>
    </div>
  );
};

export default HotOfferBanner;
