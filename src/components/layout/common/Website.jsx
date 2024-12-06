import Link from 'next/link';
import React from 'react';

const Website = () => {
  return (
    <>
      <div className=" header-item ">
        <Link
          href={'/university'}
          target="_blank"
          type="button"
          className="button d-flex align-items-center p-3 "
          id="visitwebsite"
        >
          <i className="ri-external-link-line pe-2 "></i>
          <span className="flex-grow-1 me-2 ">Visit </span>
          <span className="flex-grow-1 me-2 ">University </span>
        </Link>
      </div>
    </>
  );
};

export default Website;
