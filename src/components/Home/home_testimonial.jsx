import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function HomeTestimonial({ testimonials }) {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    infinite: testimonials?.length >= 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          infinite: testimonials?.length >= 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          infinite: testimonials?.length >= 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="sqdk-client-testimonial">
        <div className="container">
          <div className="sqdk-section-heading">
            <h3
              className="wow animate__animated animate__fadeInUp"
              data-wow-delay="0.3s"
            >
              Testimonials
            </h3>
            <h2
              className="wow animate__animated animate__fadeInUp"
              data-wow-delay="0.5s"
            >
              What makes SquadDeck so beloved by clients?{' '}
            </h2>
            <p
              className="wow animate__animated animate__fadeInUp"
              data-wow-delay="0.8s"
            >
              Discover the ways in which SquadDeck has enabled our clientele to
              enhance their business operations.
            </p>
          </div>
          <Slider {...settings}>
            {testimonials?.map((client, index) => {
              return (
                <div className="sqdk-single-client-testimonial" key={index}>
                  <div className="client-profile">
                    <div className="client-img">
                      <Image
                        // priority={true}
                        height={500}
                        width={500}
                        src={client?.image?.uploadedImage}
                        alt={client?.name}
                      />
                    </div>
                    <div className="client-info">
                      <h4>{client?.name}</h4>
                      <p>{client?.address}</p>
                    </div>
                  </div>
                  <div className="client-quote">
                    <p>{client?.comment}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
}
