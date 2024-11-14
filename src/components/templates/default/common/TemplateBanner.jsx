import React from 'react';

export default function TemplateBanner({ title, subtitle, bgImage }) {
  return (
    <section
      className="sqdk-page-banner-temp"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container">
        <div className="sqdk-page-banner-content-temp">
          <h3>{subtitle}</h3>
          <h1>{title}</h1>
        </div>
      </div>
    </section>
  );
}
