import { bgSecondary } from '@/components/constants/utils/themeUtils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NewsData = [
  {
    id: 1,
    title:
      'In Joseph Suaalii Australian rugby has something it so desperately needs',
    description:
      'Rugby Australia has bought a supremely marketable, freakishly talented player who will also be a powerful bargaining chip, Joseph Suaalii',
    featured_image: {
      uploadedImage: '/template1/assets/img/news_feature1.png',
    },
    createdAt: '2021-01-01 12:00:00',
  },
  {
    id: 2,
    title: 'Samuel golazo seals his place as Villarreal’s new hero',
    description:
      'In Joseph Suaalii Australian rugby has something it so desperately needs',
    featured_image: {
      uploadedImage: '/template1/assets/img/news_feature2.png',
    },
    createdAt: '2021-01-01 12:00:00',
  },

  {
    id: 3,
    title: 'News Title 1',
    description:
      'In Joseph Suaalii Australian rugby has something it so desperately needs',
    featured_image: {
      uploadedImage: '/template1/assets/img/news_feature1.png',
    },
    createdAt: '2021-01-01 12:00:00',
  },
];

const newsImages = [
  {
    id: 1,
    sports_category: 'Basketball',
    image: {
      newsImage1: '/template1/assets/img/basketball/news_img1_bb.jpg',
      newsImage2: '/template1/assets/img/basketball/news_img2_bb.jpg',
      newsImage3: '/template1/assets/img/basketball/news_img3_bb.jpg',
    },
  },
  {
    id: 2,
    sports_category: 'Football',
    image: {
      newsImage1: '/template1/assets/img/football/news_img1_fb.jpg',
      newsImage2: '/template1/assets/img/football/news_img2_fb.jpg',
      newsImage3: '/template1/assets/img/football/news_img3_fb.jpg',
    },
  },
  {
    id: 3,
    sports_category: 'Cricket',
    image: {
      newsImage1: '/template1/assets/img/cricket/news_img1.jpg',
      newsImage2: '/template1/assets/img/cricket/news_img2.png',
      newsImage3: '/template1/assets/img/cricket/allnews_img1.jpg',
    },
  },
  {
    id: 4,
    sports_category: 'Volleyball',
    image: {
      newsImage1: '/template1/assets/img/volleyball/news_img1.jpg',
      newsImage2: '/template1/assets/img/volleyball/news_img2.png',
      newsImage3: '/template1/assets/img/volleyball/allnews_img1.jpg',
    },
  },
  {
    id: 5,
    sports_category: 'Baseball',
    image: {
      newsImage1: '/template1/assets/img/baseball/news_img1.jpg',
      newsImage2: '/template1/assets/img/baseball/news_img2.png',
      newsImage3: '/template1/assets/img/baseball/allnews_img1.jpg',
    },
  },
  {
    id: 6,
    sports_category: 'Netball',
    image: {
      newsImage1: '/template1/assets/img/netball/news_img1.jpg',
      newsImage2: '/template1/assets/img/netball/news_img2.png',
      newsImage3: '/template1/assets/img/netball/allnews_img1.jpg',
    },
  },
];

const NewsGrid = ({ id, data }) => {
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

    if (newsMatch && typeof newsMatch.image === 'string') {
      news.featured_image.uploadedImage = newsMatch.image;
    } else if (newsMatch && typeof newsMatch.image === 'object') {
      const newsImageKey = `newsImage${news.id}`;
      if (newsMatch.image[newsImageKey]) {
        news.featured_image.uploadedImage = newsMatch.image[newsImageKey];
      }
    }
    return news;
  });

  return (
    <section className="sqdk-news">
      <div className="container">
        <div className="news-grid">
          {(data?.length > 0
            ? data.slice(0, 3)
            : newsWithImages.slice(0, 3)
          ).map((item, index) => (
            <div
              key={index}
              className="news-single"
              style={bgSecondary(themeData)}
            >
              <Image
                src={item?.featured_image?.uploadedImage}
                alt="News Feature"
                width={500}
                height={400}
              />
              <div className="news-single-inner">
                <div className="news-date-time">
                  <span className="news-date">
                    {new Date(item?.createdAt).toDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="news-time">
                    {new Date(item?.createdAt).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
                <h2>{item?.title}</h2>
                <Link href={item?.slug ? `/news/${item.slug}` : '#'}>
                  <span>Read More</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 22 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.27249 2.12212L8.02486 2.15646L8.0592 2.40409L8.31999 4.28447L8.35434 4.5321L8.60197 4.49776L15.9818 3.47426L1.41324 22.7345L1.26242 22.9339L1.46181 23.0847L1.46185 23.0847L2.97587 24.2299L2.97592 24.23L3.1753 24.3808L3.32612 24.1814L17.8946 4.92131L18.918 12.3009L18.9524 12.5485L19.2 12.5142L21.0804 12.2534L21.328 12.2191L21.2937 11.9714L19.7422 0.783715L19.7078 0.536081L19.4602 0.570427L8.27249 2.12212Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
