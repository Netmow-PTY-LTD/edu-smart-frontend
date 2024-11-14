import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { colorSecondary } from '@/components/constants/utils/themeUtils';
import { useSelector } from 'react-redux';

const HomeSponsors = ({ sponsorsData }) => {
  const settings = {
    dots: true,
    infinite: sponsorsData?.length >= 5,
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
          infinite: sponsorsData?.length >= 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: sponsorsData?.length >= 2,
        },
      },
    ],
  };

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  return (
    <section className="sponsors-area">
      <div className="container">
        <div className="sec-heading">
          <h2 style={colorSecondary(themeData)}>Meet Our Generous Sponsors!</h2>
        </div>
        <div className="sponsor-items">
          {sponsorsData && sponsorsData.length > 0 ? (
            <Slider {...settings}>
              {sponsorsData.map((item, index) => (
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
          ) : (
            <Slider {...settings}>
              <div className="sponsors-single">Sponsor Logo here </div>
              <div className="sponsors-single">Sponsor Logo here </div>
              <div className="sponsors-single">Sponsor Logo here </div>
              <div className="sponsors-single">Sponsor Logo here </div>
              <div className="sponsors-single">Sponsor Logo here </div>
              <div className="sponsors-single">Sponsor Logo here </div>
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeSponsors;
