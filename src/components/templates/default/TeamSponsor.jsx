import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';

export default function TeamSponsor({ singleTeamSponsors }) {
  const settings = {
    dots: false,
    infinite: singleTeamSponsors?.length >= 5,
    autoPlay: true,
    autoPlaySpeed: 2000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <section className="sponsors-area">
      <div className="container">
        <div class="sec-heading">
          <h2>Our Generous Sponsors!</h2>
        </div>
        <div className="sponsors-item">
          {singleTeamSponsors && singleTeamSponsors?.length > 0 && (
            <Slider {...settings}>
              {singleTeamSponsors.map((item, index) => (
                <div key={index} className="sponsors-single">
                  <Image
                    src={item?.logo?.uploadedImage}
                    width={100}
                    height={50}
                    style={{ objectFit: 'contain' }}
                    className="sponsors-image"
                    alt={item?.name}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}
