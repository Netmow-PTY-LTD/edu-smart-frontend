import React from 'react';

const LoaderSpiner = () => {
  return (
    <div className="loader-spiner-container">
      <style>
        {`
          .loader-spiner::after{
            background-color: ${'#b5d336'}
          }
          
          `}
      </style>
      <span className="loader-spiner"></span>
    </div>
  );
};

export default LoaderSpiner;
