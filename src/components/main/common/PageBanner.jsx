import React from 'react';

export default function PageBanner({ title, bgImage }) {
  return (
    <section
      className="page-banner"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container">
        <div className="page-banner-content">
          <h1>{title}</h1>
        </div>
      </div>
    </section>
  );
}
