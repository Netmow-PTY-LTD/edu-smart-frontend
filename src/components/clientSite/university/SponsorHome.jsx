import Image from 'next/image';
import React from 'react';
import sponsorImage1 from '../../../../public/assets/images/landing/sponsor/Webflow.png';

const SponsorHome = ({ sponsorData }) => {
  return (
    <section className="sponsor-section">
      <div className="sponsor-container">
        
       <div className="sponsor">
       <h3 className="sponsor-title">Sponsored By</h3>
       <div className='sponsor-content' >
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}

          {/* under the  demo repetitive data  */}

          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
          {sponsorData ? (
            <figure className="image-container">
              <Image src={sponsorData} alt="sponsor-image" />
            </figure>
          ) : (
            <figure className="image-container">
              <Image src={sponsorImage1} alt="sponsor-image" />
            </figure>
          )}
       
        </div>
       </div>
      </div>
    </section>
  );
};

export default SponsorHome;
