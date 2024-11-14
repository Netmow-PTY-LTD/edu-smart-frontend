/* eslint-disable @next/next/no-img-element */
import { colorSecondary } from '@/components/constants/utils/themeUtils';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row } from 'reactstrap';

const galleryData = [
  {
    id: 1,
    title: 'Gallery Title 1',
    sports_category: 'Rugby',
    image: {
      galleryImage1: '/template1/assets/img/gallery1.png',
      galleryImage2: '/template1/assets/img/gallery2.png',
      galleryImage3: '/template1/assets/img/gallery3.png',
      galleryImage4: '/template1/assets/img/gallery4.png',
      galleryImage5: '/template1/assets/img/gallery5.png',
      galleryImage6: '/template1/assets/img/gallery1.png',
    },
  },
  {
    id: 2,
    title: 'Gallery Title 2',
    sports_category: 'Basketball',
    image: {
      galleryImage1:
        '/template1/assets/img/basketball/gallery_img1_basketball.jpg',
      galleryImage2:
        '/template1/assets/img/basketball/gallery_img2_basketball.jpg',
      galleryImage3:
        '/template1/assets/img/basketball/gallery_img3_basketball.jpg',
      galleryImage4:
        '/template1/assets/img/basketball/gallery_img4_basketball.jpg',
      galleryImage5:
        '/template1/assets/img/basketball/gallery_img5_basketball.jpg',
      galleryImage6:
        '/template1/assets/img/basketball/gallery_img5_basketball.jpg',
    },
  },
  {
    id: 3,
    title: 'Gallery Title 3',
    sports_category: 'Football',
    image: {
      galleryImage1: '/template1/assets/img/football/gallery_img1_football.jpg',
      galleryImage2: '/template1/assets/img/football/gallery_img2_football.jpg',
      galleryImage3: '/template1/assets/img/football/gallery_img3_football.jpg',
      galleryImage4: '/template1/assets/img/football/gallery_img4_football.jpg',
      galleryImage5: '/template1/assets/img/football/gallery_img5_football.jpg',
      galleryImage6: '/template1/assets/img/football/gallery_img1_football.jpg',
    },
  },
  {
    id: 4,
    title: 'Gallery Title 4',
    sports_category: 'Cricket',
    image: {
      galleryImage1: '/template1/assets/img/cricket/gallery_img1.jpg',
      galleryImage2: '/template1/assets/img/cricket/gallery_img2.jpg',
      galleryImage3: '/template1/assets/img/cricket/gallery_img3.jpg',
      galleryImage4: '/template1/assets/img/cricket/gallery_img4.jpg',
      galleryImage5: '/template1/assets/img/cricket/gallery_img5.jpg',
      galleryImage6: '/template1/assets/img/cricket/gallery_img1.jpg',
    },
  },
  {
    id: 5,
    title: 'Gallery Title 5',
    sports_category: 'Volleyball',
    image: {
      galleryImage1: '/template1/assets/img/volleyball/gallery_img1.jpg',
      galleryImage2: '/template1/assets/img/volleyball/gallery_img2.jpg',
      galleryImage3: '/template1/assets/img/volleyball/gallery_img3.jpg',
      galleryImage4: '/template1/assets/img/volleyball/gallery_img4.jpg',
      galleryImage5: '/template1/assets/img/volleyball/gallery_img5.jpg',
      galleryImage6: '/template1/assets/img/volleyball/gallery_img1.jpg',
    },
  },
  {
    id: 6,
    title: 'Gallery Title 6',
    sports_category: 'Baseball',
    image: {
      galleryImage1: '/template1/assets/img/baseball/gallery_img1.jpg',
      galleryImage2: '/template1/assets/img/baseball/gallery_img2.jpg',
      galleryImage3: '/template1/assets/img/baseball/gallery_img3.jpg',
      galleryImage4: '/template1/assets/img/baseball/gallery_img4.jpg',
      galleryImage5: '/template1/assets/img/baseball/gallery_img5.jpg',
      galleryImage6: '/template1/assets/img/baseball/gallery_img1.jpg',
    },
  },
  {
    id: 7,
    title: 'Gallery Title 7',
    sports_category: 'Netball',
    image: {
      galleryImage1: '/template1/assets/img/netball/gallery_img1.jpg',
      galleryImage2: '/template1/assets/img/netball/gallery_img2.jpg',
      galleryImage3: '/template1/assets/img/netball/gallery_img3.jpg',
      galleryImage4: '/template1/assets/img/netball/gallery_img4.jpg',
      galleryImage5: '/template1/assets/img/netball/gallery_img5.jpg',
      galleryImage6: '/template1/assets/img/netball/gallery_img1.jpg',
    },
  },
];

export default function HomeGallery({ gallery }) {
  const [lightboxImageIndex, setLightboxImageIndex] = useState(null);

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const openLightbox = (index) => {
    setLightboxImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImageIndex(null);
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    setLightboxImageIndex((prevIndex) =>
      prevIndex === 0 ? unifiedGallery.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    setLightboxImageIndex((prevIndex) =>
      prevIndex === unifiedGallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const dispatch = useDispatch();

  function hexToRGBA(hex, alpha) {
    // Remove '#' if present
    hex = hex.replace('#', '');

    // Convert hexadecimal to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Return RGBA string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const rgbaSecondary = hexToRGBA(
    themeData?.branding?.secondary_color?.trim() || '#162A73',
    0.6
  );

  const selectedCategoryImages = galleryData.find(
    (item) => item.sports_category === themeData.sports_category
  );

  const galleryWithImages = selectedCategoryImages?.image
    ? Object.keys(selectedCategoryImages?.image).map((key, index) => ({
        id: galleryData[index].id,
        title: `Gallery Title ${galleryData[index].id}`,
        image: {
          secure_url: selectedCategoryImages.image[key],
        },
      }))
    : [];

  const unifiedGallery =
    gallery &&
    gallery.length > 0 &&
    gallery.filter((item) => item?.status === true).length > 0
      ? gallery.filter((item) => item?.status === true) // Show items with status true
      : galleryWithImages; // Fallback to galleryWithImages

  return (
    <section className="sqdk-gallery home-gallery">
      <div className="container">
        <div className="sec-heading">
          <h2 style={colorSecondary(themeData)}>Our team Gallery</h2>
        </div>
      </div>
      <>
        <Row>
          {unifiedGallery?.map((item, index) => (
            <Col xl={4} sm={6} key={index} className="p-0">
              <Card className="gallery-box">
                <div className="gallery-container">
                  <Link
                    className="image-popup"
                    href="#" // Use as for the actual link URL
                    onClick={(e) => {
                      e.preventDefault();
                      openLightbox(index);
                    }}
                  >
                    <img
                      className="gallery-img img-fluid mx-auto"
                      src={item.image.secure_url}
                      alt=""
                    />
                    <div className="gallery-overlay">
                      <h5 className="overlay-caption">{item.title}</h5>
                    </div>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <style>
          {`
              .gallery-box .gallery-container .gallery-overlay{
                background-color: ${rgbaSecondary}
              `}
        </style>
        {lightboxImageIndex !== null && (
          <div className="lightbox" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="close-button">
              x
            </button>
            <button onClick={showPrevImage} className="prev-button">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <img
              src={unifiedGallery[lightboxImageIndex].image.secure_url}
              alt={unifiedGallery[lightboxImageIndex].title}
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={showNextImage} className="next-button">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        )}
      </>
    </section>
  );
}
