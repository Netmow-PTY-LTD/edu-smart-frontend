import React from 'react';
import { useSelector } from 'react-redux';

const LoaderSpiner = () => {
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  return (
    <div className="loader-spiner-container">
      <style>
        {`
          .loader-spiner::after{
            background-color: ${themeData?.branding?.primary_color?.trim() || '#9344E8'}
          }
          
          `}
      </style>
      <span className="loader-spiner"></span>
    </div>
  );
};

export default LoaderSpiner;
