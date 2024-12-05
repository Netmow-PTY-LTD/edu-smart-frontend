import React, { useState } from 'react';

import heroImage from '../../../../public/assets/images/landing/hero/hero-image.png';
import logoMmu from '../../../../public/assets/images/landing/hero/logo-mmu.png';
import searchIcon from '../../../../public/assets/images/landing/hero/search.png';
import Image from 'next/image';

export default function HeroHome() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <section className="hero-section">
      {/* hero image section */}
      <figure style={{ display: 'flex', flexDirection: 'column' }}>
        <Image alt="hero" src={heroImage} sizes="100vw" />
      </figure>
      {/* heroSection-info-header */}
      <div className="container">
        <div className="d-flex align-items-center container-row rounded-4">
          {/* info */}
          <div className="d-flex align-items-center w-75 ">
            <figure className="me-2">
              <Image alt="logoMmu" src={logoMmu} width={153} height={44} />
            </figure>
            <h4>Malaysia Multimedia University</h4>
          </div>

          {/* intraction section */}
          <div className=" d-flex w-25  ">
            {/* search-input */}

            <div class="me-4  search-container">
              <figure className="searchIcon-conatiner">
                <Image
                  src={searchIcon}
                  alt="searchIcon"
                  width={24}
                  height={25}
                  class="search-icon"
                />
              </figure>

              <input
                type="text"
                className="search-input"
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
    </section>
  );
}
