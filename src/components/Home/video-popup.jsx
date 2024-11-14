// components/VideoPopup.js
import React from 'react';

const VideoPopup = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="hero-popup-overlay" onClick={handleOverlayClick}>
      <div className="hero-popup-content">
        <div className="video-wrapper">
          <iframe
            className="hero-iframe"
            src="https://www.youtube.com/embed/qXlePLytMvo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
      <button className="close-button" onClick={onClose}>
        <i className="ri-close-fill"></i>
      </button>
    </div>
  );
};

export default VideoPopup;
