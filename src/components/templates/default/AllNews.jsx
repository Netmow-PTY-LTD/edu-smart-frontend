import { bgPrimary } from '@/components/constants/utils/themeUtils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  colorPrimary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import { userInfo } from '@/slices/dashboard/adminDashboard/Actions/authActions';

const NewsData = [
  {
    id: 1,
    title:
      'In Joseph Suaalii Australian rugby has something it so desperately needs',
    short_description:
      'Rugby Australia has bought a supremely marketable, freakishly talented player who will also be a powerful bargaining chip, Joseph Suaalii',
    featured_image: {
      uploadedImage: '/template1/assets/img/news_feature1.png',
    },
    publish_schedule: '2021-01-01 12:00:00',
  },
  {
    id: 2,
    title: 'Samuel golazo seals his place as Villarreal’s new hero',
    short_description:
      'In Joseph Suaalii Australian rugby has something it so desperately needs',
    featured_image: {
      uploadedImage: '/template1/assets/img/news_feature2.png',
    },
    publish_schedule: '2021-01-01 12:00:00',
  },

  {
    id: 3,
    title: 'News Title 1',
    short_description:
      'In Joseph Suaalii Australian rugby has something it so desperately needs',
    featured_image: {
      uploadedImage: '/template1/assets/img/single-blog-img.png',
    },
    publish_schedule: '2021-01-01 12:00:00',
  },
  {
    id: 4,
    title: 'News Title 2',
    short_description:
      'In Joseph Suaalii Australian rugby has something it so desperately needs',
    featured_image: {
      uploadedImage: '/template1/assets/img/single-blog-img.png',
    },
    publish_schedule: '2021-01-01 12:00:00',
  },
];

const newsImages = [
  {
    id: 1,
    sports_category: 'Basketball',
    image: {
      newsImage1: '/template1/assets/img/basketball/news_img2_bb.jpg',
      newsImage2: '/template1/assets/img/basketball/allnews_img1_bb.jpg',
      newsImage3: '/template1/assets/img/basketball/news_img3_bb.jpg',
      newsImage4: '/template1/assets/img/basketball/allnews_img2_bb.jpg',
    },
  },
  {
    id: 2,
    sports_category: 'Football',
    image: {
      newsImage1: '/template1/assets/img/football/news_img3_fb.jpg',
      newsImage2: '/template1/assets/img/football/allnews_img1_fb.jpg',
      newsImage3: '/template1/assets/img/football/allnews_img2_fb.jpg',
      newsImage4: '/template1/assets/img/football/allnews_img3_fb.jpg',
    },
  },
  {
    id: 3,
    sports_category: 'Cricket',
    image: {
      newsImage1: '/template1/assets/img/cricket/allnews_img1.jpg',
      newsImage2: '/template1/assets/img/cricket/allnews_img2.jpg',
      newsImage3: '/template1/assets/img/cricket/allnews_img3.jpg',
      newsImage4: '/template1/assets/img/cricket/allnews_img4.jpg',
    },
  },
  {
    id: 4,
    sports_category: 'Volleyball',
    image: {
      newsImage1: '/template1/assets/img/volleyball/allnews_img1.jpg',
      newsImage2: '/template1/assets/img/volleyball/allnews_img2.jpg',
      newsImage3: '/template1/assets/img/volleyball/allnews_img3.jpg',
      newsImage4: '/template1/assets/img/volleyball/allnews_img4.jpg',
    },
  },
  {
    id: 5,
    sports_category: 'Baseball',
    image: {
      newsImage1: '/template1/assets/img/baseball/allnews_img1.jpg',
      newsImage2: '/template1/assets/img/baseball/allnews_img2.jpg',
      newsImage3: '/template1/assets/img/baseball/allnews_img3.jpg',
      newsImage4: '/template1/assets/img/baseball/allnews_img4.jpg',
    },
  },
  {
    id: 6,
    sports_category: 'Netball',
    image: {
      newsImage1: '/template1/assets/img/netball/allnews_img1.jpg',
      newsImage2: '/template1/assets/img/netball/allnews_img2.jpg',
      newsImage3: '/template1/assets/img/netball/allnews_img3.jpg',
      newsImage4: '/template1/assets/img/netball/allnews_img4.jpg',
    },
  },
];

const AllNewsGrid = ({ data, setPage, page, totalPage }) => {
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const dispatch = useDispatch();

  const newsWithImages = NewsData.map((news) => {
    // Find the matching team image object in teamImages
    const newsMatch = newsImages.find(
      (item) => item.sports_category === themeData.sports_category
    );

    // If a match is found and it's not an object (i.e., a direct URL), update the team's image URL
    if (newsMatch && typeof newsMatch.image === 'string') {
      news.featured_image.uploadedImage = newsMatch.image;
    } else if (newsMatch && typeof newsMatch.image === 'object') {
      // If a match is found and it's an object, find the corresponding image for the team
      const newsImageKey = `newsImage${news.id}`;
      if (newsMatch.image[newsImageKey]) {
        news.featured_image.uploadedImage = newsMatch.image[newsImageKey];
      }
    }

    return news;
  });

  console.log(data);

  return (
    <>
      <section className="sqdk-latest-blogs">
        <div className="container">
          <div className="sec-heading">
            <h2 style={colorSecondary(themeData)}>Read Our Latest News</h2>
            <div className="section-heading-border">
              <div className="square"></div>
            </div>
          </div>
          <div className="blogs-grid">
            {(data?.length > 0 ? data : newsWithImages)?.map((item, index) => {
              console.log(item);
              return (
                <div key={index} className="single-blog">
                  <Image
                    src={item?.featured_image?.uploadedImage}
                    alt=""
                    className="single-blog-img"
                    height={300}
                    width={400}
                  />
                  <div className="single-blog-text">
                    <div className="blog-date-time">
                      <span
                        className="pub-date"
                        style={colorSecondary(themeData)}
                      >
                        {new Date(item?.createdAt).toDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="pub-time">
                        {new Date(item?.createdAt).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <h2
                      className="single-blog-heading"
                      style={colorSecondary(themeData)}
                    >
                      {item?.title}
                    </h2>
                    <p>{item?.short_description}</p>
                    <div className="single-blog-btn">
                      <Link
                        href={item?.slug ? `/news/${item.slug}` : '#'}
                        style={colorPrimary(themeData)}
                      >
                        <span
                          className="line"
                          style={bgPrimary(themeData)}
                        ></span>
                        <span>Read More</span>
                        <svg
                          width="2.4rem"
                          height="2.6rem"
                          viewBox="0 0 24 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.78557 5.06478L9.99293 6.55993L16.3362 5.68019L4.46278 21.3774L4.46282 21.3774L5.66666 22.288L5.6667 22.288L17.5401 6.59095L18.4198 12.9341L19.9149 12.7267L18.6813 3.83098L9.78557 5.06478Z"
                            fill={`${
                              themeData?.branding?.primary_color?.trim() ||
                              '#9344E8'
                            }`}
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <style>
        {`
          .sqdk-pagination .pagination-item {
            color: ${themeData?.branding?.secondary_color?.trim() || '#162A73'};
            border: 1px solid
              ${themeData?.branding?.secondary_color?.trim() || '#162A73'};
          }
          .sqdk-pagination .pagination-item.active {
            border: none;
          }
          .sqdk-pagination .pagination-item:last-child {
            background: ${themeData?.branding?.primary_color?.trim() || '#9344E8'};
            border: none;
          }
        `}
      </style>
      {data && data.length > 0 ? (
        <div className="sqdk-pagination">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            className="rounded-circle p-4 pagination-item"
          >
            <i className="ri-arrow-left-s-line fs-24"></i>
          </div>
          <div className="active fw-semibold rounded-circle bg-white p-4 pagination-item">
            {page <= totalPage ? page : ''}
          </div>

          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (page < totalPage) {
                setPage(page + 1);
              }
            }}
            className="rounded-circle p-4 pagination-item"
          >
            <i className="ri-arrow-right-s-line fs-24"></i>
          </div>
        </div>
      ) : (
        <div className="sqdk-pagination">
          <a href="#" className="pagination-item">
            <svg
              width="2.1rem"
              height="2.1rem"
              viewBox="0 0 14 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9453 1.29236L1.82733 12.4103L12.9453 23.5283"
                stroke={`${themeData?.branding?.secondary_color?.trim() || '#162A73'}`}
                strokeWidth="1.36752"
              />
            </svg>
          </a>
          <a href="#" className="pagination-item active">
            1
          </a>
          <a href="#" className="pagination-item">
            2
          </a>
          <a href="#" className="pagination-item">
            3
          </a>
          <a href="#" className="pagination-item">
            4
          </a>
          <a href="#" className="pagination-item">
            <svg
              width="2.1rem"
              height="2.1rem"
              viewBox="0 0 14 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.05469 1.29224L12.1726 12.4102L1.05469 23.5281"
                stroke="{`${
                  themeData?.branding?.secondary_color?.trim() || '#162A73'
                }`}"
                strokeWidth="1.36752"
              />
            </svg>
          </a>
        </div>
      )}
    </>
  );
};

export default AllNewsGrid;
