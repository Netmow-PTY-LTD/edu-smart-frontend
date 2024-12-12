import Image from 'next/image';
import React from 'react';
import sponsorImage1 from '../../../../public/assets/images/landing/sponsor/Webflow.png';

const SponsorHome = ({ sponsorData }) => {
  const sponsors =
    sponsorData || new Array(10).fill({ logo: { url: sponsorImage1 } });

  return (
    <section className="sponsor-section pb-5">
      <div className="sponsor-container">
        <div className="sponsor">
          <h3 className="sponsor-title">Sponsored By</h3>
          <div className="sponsor-content">
            {sponsors.map((sponsor, index) => (
              <figure key={index} className="image-container ">
                <Image
                  src={sponsor?.logo?.url || sponsorImage1}
                  alt={`sponsor-image-${index}`}
                  width={500}
                  height={500}
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorHome;
