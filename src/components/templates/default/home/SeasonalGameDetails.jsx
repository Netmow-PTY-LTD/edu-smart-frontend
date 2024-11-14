import LoaderSpiner from '@/components/constants/Loader/Loader';
import Image from 'next/image';
import React, { useRef } from 'react';
import gameImage from '../../../../../public/template1/assets/img/gallery3.png';

const SeasonalGameDetails = ({ data, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <LoaderSpiner />
      ) : (
        <div className="seasonal-game" id="seasonal-game-details">
          <div className="container">
            <h2>{data?.name}</h2>
            <div className="seasonal-game-details">
              <div
                style={{ width: '100%', height: '500px', position: 'relative' }}
              >
                <Image
                  alt="Mountains"
                  src={data?.image ? data?.image?.uploadedImage : gameImage}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className=" ">
                Venue: <span className="text-uppercase">{data?.vanue}</span>
              </p>
              {/* <div>
                From {data?.starts} to {data?.ends}
              </div> */}
              <p>{data?.description}</p>
              {/* <div>
                Status:{' '}
                <span className="text-success text-uppercase fw-semibold fs-3">
                  {data?.status}
                </span>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeasonalGameDetails;
