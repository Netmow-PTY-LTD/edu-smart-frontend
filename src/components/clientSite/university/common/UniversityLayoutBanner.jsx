import Link from 'next/link';
import React from 'react';

export default function UniversityLayoutBanner({ title, bgImage }) {
  return (
    <section
      className="sqdk-page-banner-temp"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container">
        <div className="sqdk-page-banner-content-temp">
          <h1>{title}</h1>
        </div>
      </div>
    </section>
  );
}
