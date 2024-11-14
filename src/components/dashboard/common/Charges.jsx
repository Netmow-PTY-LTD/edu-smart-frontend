import Link from 'next/link';
import React from 'react';

const Charges = ({ totalCharges }) => {
  return (
    <>
      <div className="ms-2 header-item d-none d-lg-flex">
        <button
          type="button"
          className="button d-flex align-items-center p-3 fs-4 text-black"
          id="chargesbtn"
        >
          <i className="ri-coins-line"></i>{' '}
          <Link
            href="/admin/charges"
            className="flex-grow-1 me-2 ms-2 text-black"
          >
            Charges
          </Link>
          {/* <span>$</span> */}
          {/* <span>{totalCharges?.data?.total_charges}</span> */}
        </button>
      </div>
    </>
  );
};

export default Charges;
