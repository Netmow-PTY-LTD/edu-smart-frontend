import Image from 'next/image';
import React from 'react';
import sponsorImage1 from '../../../../public/assets/images/landing/sponsor/Webflow.png';

const SponsorHome = ({ sponsorData }) => {
  const sponsors =
    sponsorData || new Array(10).fill({ logo: { url: sponsorImage1 } });

  return (
    <section className="sponsor-section">
      <div className="container">
        <h3 className="sponsor-title">Sponsored By</h3>
        <div className="sponsor-content">
          {sponsors.map((sponsor, index) => (
            <figure key={index} className="image-container ">
              <Image
                src={sponsor?.logo?.url || sponsorImage1}
                alt={`sponsor-image-${index}`}
                width={150}
                height={150}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorHome;
