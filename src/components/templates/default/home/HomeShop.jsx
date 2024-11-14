/* eslint-disable @next/next/no-img-element */
import {
  getSubdomain,
  getSubdomainHelperFunction,
} from '@/slices/helper/getSubdomain';
import { allEcommerceProducts } from '@/slices/home/actions/clientProductAction';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const dummyProducts = [
  {
    _id: 1,
    title: 'Rugby Sports Red Helmet',
    sale_price: 19.99,
    images: [{ secure_url: '/assets/img/shop/helmet.png' }],
    category: {
      _id: 1,
      name: 'T-shirt',
    },
  },
  {
    _id: 2,
    title: 'Rugby Sports Jersey',
    sale_price: 128.0,
    images: [{ secure_url: '/assets/img/shop/jersey.png' }],
    category: {
      _id: 2,
      name: 'jersey',
    },
  },

  {
    _id: 3,
    title: 'Rugby Sports Red Helmet',
    sale_price: 50.0,
    images: [{ secure_url: '/assets/img/shop/helmet.png' }],
    category: {
      _id: 3,
      name: 'T-shirt',
    },
  },
  {
    _id: 4,
    title: 'Rugby Sports Jersey',
    sale_price: 5.0,
    images: [{ secure_url: '/assets/img/shop/jersey1.png' }],
    category: {
      _id: 4,
      name: 'polo shirt',
    },
  },
  {
    _id: 5,
    title: 'Rugby Sports Red Helmet',
    sale_price: 60.0,
    images: [{ secure_url: '/assets/img/shop/helmet.png' }],
    category: {
      _id: 5,
      name: 'jersey',
    },
  },

  {
    _id: 6,
    title: 'Rugby Sports Jersey',
    sale_price: 80.0,
    images: [{ secure_url: '/assets/img/shop/jersey.png' }],
    category: {
      _id: 6,
      name: 'polo shirt',
    },
  },

  {
    _id: 7,
    title: 'Rugby Sports Red Helmet',
    sale_price: 50.0,
    images: [{ secure_url: '/assets/img/shop/helmet.png' }],
    category: {
      _id: 7,
      name: 'T-shirt',
    },
  },

  {
    _id: 8,
    title: 'Rugby Sports Jersey',
    sale_price: 40.0,
    images: [{ secure_url: '/assets/img/shop/jersey1.png' }],
    category: {
      _id: 8,
      name: 'jersey',
    },
  },

  {
    _id: 9,
    title: 'Rugby Sports Red Helmet',
    sale_price: 30.0,
    images: [{ secure_url: '/assets/img/shop/helmet.png' }],
    category: {
      _id: 9,
      name: 'polo shirt',
    },
  },

  {
    _id: 10,
    title: 'Rugby Sports Jersey',
    sale_price: 20.0,
    images: [{ secure_url: '/assets/img/shop/jersey.png' }],
    category: {
      _id: 10,
      name: 'T-shirt',
    },
  },

  {
    _id: 11,
    title: 'Rugby Sports Red Helmet',
    sale_price: 28.0,
    images: [{ secure_url: '/assets/img/shop/helmet.png' }],
    category: {
      _id: 11,
      name: 'jersey',
    },
  },
  {
    _id: 12,
    title: 'Rugby Sports Jersey',
    sale_price: 28.0,
    images: [{ secure_url: '/assets/img/shop/jersey1.png' }],
    category: {
      _id: 12,
      name: 'polo shirt',
    },
  },
];

export default function HomeShop() {
  const [products, setProducts] = React.useState([]);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);

  const dispatch = useDispatch();

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setSlidesPerView(4);
    } else if (width >= 768) {
      setSlidesPerView(3);
    } else if (width >= 576) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  useEffect(() => {
    updateSlidesPerView(); // Set slidesPerView on mount
    window.addEventListener('resize', updateSlidesPerView); // Update on resize

    return () => {
      window.removeEventListener('resize', updateSlidesPerView); // Cleanup on unmount
    };
  }, []);

  const productsLength =
    products.length > 0 ? products.length : dummyProducts?.length;

  useEffect(() => {
    // Enable navigation if teams.length exceeds the number of visible slides
    setIsNavigationEnabled(productsLength > slidesPerView);
  }, [productsLength, slidesPerView]);

  const {
    data: allEcommerceProductData,
    isLoading: isAllProductsLoading,
    error: allProductsError,
  } = useSelector((state) => state.Home.allEcommerceProducts);

  useEffect(() => {
    dispatch(allEcommerceProducts(getSubdomainHelperFunction()));
  }, [dispatch]);

  useEffect(() => {
    setProducts(
      allEcommerceProductData?.length > 0
        ? allEcommerceProductData
        : dummyProducts
    );
  }, [allEcommerceProductData]);

  return (
    <>
      <section className="sd-shop">
        <div className="container">
          <div className="home-shop-heading">
            <h2>Our Official Store</h2>
            <div className="d-flex justify-content-center">
              <Link href="/ecommerce/products" className="btn-shop">
                View All Products
              </Link>
            </div>
          </div>
          <style>
            {`
              .product-info h4{
                color: ${themeData?.branding?.secondary_color?.trim() || '#162a73'};
              }

              .product-info span.price{
                  color: ${themeData?.branding?.secondary_color?.trim() || '#162a73'};
              }

              .btn-shop-now{
                background-color: ${
                  themeData?.branding?.secondary_color?.trim() || '#162a73'
                };
                }
              `}
          </style>
          <div className="product-shop">
            <Swiper
              modules={[Navigation]}
              loop={true}
              spaceBetween={20}
              navigation={isNavigationEnabled}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              className="mySwiper"
            >
              {products?.length > 0 &&
                products.slice(0, 6).map((product, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="product-home-card">
                        <div className="product-card-inner">
                          <div className="product-img">
                            <img
                              src={
                                product?.images[0]?.secure_url
                                  ? product?.images[0]?.secure_url
                                  : '/assets/img/shop/helmet.png'
                              }
                              alt={product?.title}
                            />
                          </div>
                          <div className="product-info bg-body-subtle">
                            <h4 className="product-title">
                              <Link
                                href={`/ecommerce/products/${product?.slug ? product?.slug : product?._id}`}
                              >
                                {product?.title}
                              </Link>
                            </h4>
                            <span className="price">
                              ${product?.sale_price}
                            </span>
                          </div>
                          <div className="product-cart">
                            <Link
                              href={`/ecommerce/products/${product?.slug ? product?.slug : product?._id}`}
                              className="btn-shop-now"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
