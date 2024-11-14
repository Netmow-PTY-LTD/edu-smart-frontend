import Link from 'next/link';
import React from 'react';

const Website = () => {
  return (
    <>
      <div className="d-flex ms-2 header-item ">
        <Link
          href={'/'}
          target="_blank"
          type="button text-black"
          className="button d-flex align-items-center p-3 fs-4 "
          id="visitwebsite"
        >
          <i className="ri-external-link-line pe-2 text-black"></i>
          <span className="flex-grow-1 me-2 text-black">Visit </span>
          <span className="flex-grow-1 me-2 text-black">Website </span>
        </Link>
      </div>
    </>
  );
};

export default Website;
