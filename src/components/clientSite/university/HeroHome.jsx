import React, { useState } from 'react';

import heroImage from '../../../../public/assets/images/landing/hero/hero-image.png';
import logoMmu from '../../../../public/assets/images/landing/hero/logo-mmu.png';
import searchIcon from '../../../../public/assets/images/landing/hero/search.png';
import Image from 'next/image';

export default function HeroHome({ university }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  console.log(university);

  return (
    <section className="hero-section">
      {/* hero image section */}
      <figure>
        <Image alt="hero" src={heroImage} sizes="100vw" />
      </figure>
      {/* heroSection-info-header */}
      <div className="container">
        <div className="container-row">
          <div className="row-content d-flex align-items-center justify-content-center justify-content-sm-center justify-md-content-between rounded-4 ">
            {/* info */}
            <div className="d-none d-sm-none d-md-flex align-items-center">
              <figure>
                <Image
                  className="university-logo"
                  alt="logoMmu"
                  src={university?.logo?.url || logoMmu}
                  width={50}
                  height={50}
                />
              </figure>
              <h4 className="ms-4">{university?.name}</h4>
            </div>

            {/* intraction section */}
            <div className="d-flex flex-wrap align-items-center justify-content-sm-center justify-content-md-end gap-4 w-75 w-sm-75 w-md-50">
              {/* search-input */}

              <div className="search-container w-sm-100 w-md-50">
                <label htmlFor="search" className="searchIcon-conatiner">
                  <i className="ri-search-line fs-1 search-icon"></i>
                </label>
                <input
                  id="search"
                  type="text"
                  className="search-input w-100"
                  placeholder="Search a program"
                />
              </div>

              {/* dropdwon */}
              <div className="dropdownContainer">
                <select
                  className="select"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <option value="">Browse Programs</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
