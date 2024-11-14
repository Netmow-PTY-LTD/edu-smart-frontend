/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useState } from 'react';

export default function HomeTemplates({ items }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [popupImage, setPopupImage] = useState(null);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleImageClick = (image) => {

    setPopupImage(image);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  const filteredItems =
    activeFilter === 'All'
      ? items
      : items.filter((item) => item.sport === activeFilter);

  return (
    <>
      <section className="sd-templates">
        <div className="container">
          <div className="section-heading">
            <h3>Get a free website now</h3>
            <h2>
              Obtain and Handle a Complimentary Website featuring a Variety of
              Vibrant Templates.
            </h2>
          </div>
          <div className="sd-templates-tab-nav">
            <button
              onClick={() => handleFilterClick('All')}
              className={`filter_btn ${
                activeFilter === 'All' ? 'tab-active' : ''
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterClick('Basketball')}
              className={`filter_btn ${
                activeFilter === 'Basketball' ? 'tab-active' : ''
              }`}
            >
              Basketball
            </button>
            <button
              onClick={() => handleFilterClick('Baseball')}
              className={`filter_btn ${
                activeFilter === 'Baseball' ? 'tab-active' : ''
              }`}
            >
              Baseball
            </button>
            <button
              onClick={() => handleFilterClick('Cricket')}
              className={`filter_btn ${
                activeFilter === 'Cricket' ? 'tab-active' : ''
              }`}
            >
              Cricket
            </button>
            <button
              onClick={() => handleFilterClick('Football')}
              className={`filter_btn ${
                activeFilter === 'Football' ? 'tab-active' : ''
              }`}
            >
              Football
            </button>
            <button
              onClick={() => handleFilterClick('Hockey')}
              className={`filter_btn ${
                activeFilter === 'Hockey' ? 'tab-active' : ''
              }`}
            >
              Hockey
            </button>
            <button
              onClick={() => handleFilterClick('Netball')}
              className={`filter_btn ${
                activeFilter === 'Netball' ? 'tab-active' : ''
              }`}
            >
              Netball
            </button>
            <button
              onClick={() => handleFilterClick('Rugby')}
              className={`filter_btn ${
                activeFilter === 'Rugby' ? 'tab-active' : ''
              }`}
            >
              Rugby
            </button>
            <button
              onClick={() => handleFilterClick('Volleyball')}
              className={`filter_btn ${
                activeFilter === 'Volleyball' ? 'tab-active' : ''
              }`}
            >
              Volleyball
            </button>
          </div>
          <div className="sd-templates-tab-content">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className={`tab_item ${activeFilter !== 'All' && activeFilter !== item.sport ? 'hidden' : ''}`}
              >
                <Image
                  height={500}
                  width={500}
                  src={item.image}
                  alt={item.sport}
                  className="clickable-image"
                  onClick={() => handleImageClick(item.image)}
                />
              </div>
            ))}
          </div>
          {popupImage && (
            <div className="popup" onClick={closePopup}>
              <div
                className="popup-content"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={popupImage} alt="Full Size" className="hover-image" />
                <button className="close-button" onClick={closePopup}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.4rem"
                    height="2.4rem"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#9344e8"
                      d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
