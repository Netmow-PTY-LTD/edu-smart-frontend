import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import Link from 'next/link';
import React from 'react';

const Website = () => {
  const { data: userInfodata, error, isLoading } = useGetUserInfoQuery();

  return (
    <>
      {/* <div className=" header-item">
        <Link
          href={`${userInfodata?.data?.role === 'university_administrator' ? '/university/' + userInfodata?.data?._id : ''}`}
          target="_blank"
          type="button"
          className="button d-flex align-items-center p-3 "
          id="visitwebsite"
        >
          <i className="ri-external-link-line pe-2 "></i>
          <span className="flex-grow-1 me-2 ">Visit </span>
          <span className="flex-grow-1 me-2 ">
            {userInfodata?.data?.role === 'university_administrator'
              ? 'University'
              : 'Website'}
          </span>
        </Link>
      </div> */}
    </>
  );
};

export default Website;
