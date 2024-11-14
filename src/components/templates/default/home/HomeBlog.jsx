/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  bgPrimary,
  colorSecondary,
} from '@/components/constants/utils/themeUtils';
import { userInfo } from '@/slices/dashboard/adminDashboard/Actions/authActions';
import DOMPurify from 'dompurify';

const homeNews = [
  {
    id: 1,
    title:
      'How to Estimate Custom Software Development Costs for your Projects?',
    featured_image: {
      uploadedImage: 'template1/assets/img/blog1.png',
    },
    createdAt: '2020-01-01',
    description:
      'Navigating the costs of custom software development can be challenging. This blog provides a comprehensive guide to help you estimate project costs accurately, covering key factors such as scope, complexity, and timelines. We’ll also share budgeting tips and best practices to ensure a successful investment. By the end, you’ll have the insights needed to make informed decisions and set realistic expectations for your development projects.',
    short_description:
      'Sports club management refers to the administration, organisation, and coordination of activities within a sports club or team.',
  },
  {
    id: 2,
    title: 'The Power of SquadDeck: Revolutionising Sports Club Management',
    featured_image: {
      uploadedImage: 'template1/assets/img/blog2.png',
    },
    createdAt: '2020-03-03',
    description:
      'Discover how SquadDeck is transforming the way sports clubs operate! This blog explores the innovative features and benefits of our platform, highlighting how it streamlines management tasks and enhances team performance. From scheduling and communication to analytics and player development, SquadDeck offers tools that empower club administrators and coaches alike. Learn how embracing this technology can lead to increased engagement and success on and off the field.',
    short_description:
      'Efficiency is a crucial factor in the success of any sports club.',
  },
  {
    id: 3,
    title: 'Boost Your Sports Club’s Efficiency with SquadDeck',
    featured_image: {
      uploadedImage: 'template1/assets/img/blog3.png',
    },
    createdAt: '2020-03-03',
    description:
      'Unlock your club’s full potential with SquadDeck! This blog discusses practical strategies and features that enhance operational efficiency, improve communication, and streamline processes. We’ll delve into time-saving tools, performance tracking, and community-building features that allow your team to focus on what truly matters—success on the field. Join us as we explore how adopting SquadDeck can lead to a more organized and productive environment for athletes and coaches alike.',
    short_description:
      'Running a sports club is no easy task. From managing memberships and scheduling events to handling finances and nurturing team performance, the responsibilities can quickly become overwhelming.',
  },
];

const blogImages = [
  {
    id: 1,
    sports_category: 'Basketball',
    image: {
      blog1Image: '/template1/assets/img/basketball/blog_img1_basketball.jpg',
      blog2Image: '/template1/assets/img/basketball/blog_img2_basketball.jpg',
      blog3Image: '/template1/assets/img/basketball/blog_img3_basketball.jpg',
    },
  },
  {
    id: 2,
    sports_category: 'Football',
    image: {
      blog1Image: '/template1/assets/img/football/blog_img1_football.jpg',
      blog2Image: '/template1/assets/img/football/blog_img2_football.jpg',
      blog3Image: '/template1/assets/img/football/blog_img3_football.jpg',
    },
  },
  {
    id: 3,
    sports_category: 'Cricket',
    image: {
      blog1Image: '/template1/assets/img/cricket/blog_img1.jpg',
      blog2Image: '/template1/assets/img/cricket/blog_img2.jpg',
      blog3Image: '/template1/assets/img/cricket/blog_img3.jpg',
    },
  },
  {
    id: 4,
    sports_category: 'Volleyball',
    image: {
      blog1Image: '/template1/assets/img/volleyball/blog_img1.jpg',
      blog2Image: '/template1/assets/img/volleyball/blog_img2.jpg',
      blog3Image: '/template1/assets/img/volleyball/blog_img3.jpg',
    },
  },
  {
    id: 5,
    sports_category: 'Baseball',
    image: {
      blog1Image: '/template1/assets/img/baseball/blog_img1.jpg',
      blog2Image: '/template1/assets/img/baseball/blog_img2.jpg',
      blog3Image: '/template1/assets/img/baseball/blog_img3.jpg',
    },
  },
  {
    id: 6,
    sports_category: 'Netball',
    image: {
      blog1Image: '/template1/assets/img/netball/blog_img1.jpg',
      blog2Image: '/template1/assets/img/netball/blog_img2.jpg',
      blog3Image: '/template1/assets/img/netball/blog_img3.jpg',
    },
  },
];

export default function HomeBlog({ news }) {
  function limitWords(text, limit) {
    const words = text.split(' ');
    return words.slice(0, limit).join(' ');
  }

  const dispatch = useDispatch();

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  const homeNewsWithImages = homeNews.map((newsItem, index) => {
    // Find the matching blog image object in blogImages
    const blogMatch = blogImages.find(
      (item) => item.sports_category === themeData.sports_category
    );

    // If a match is found, update the featured_image.uploadedImage URL
    if (blogMatch && blogMatch.image[`blog${newsItem.id}Image`]) {
      newsItem.featured_image.uploadedImage =
        blogMatch.image[`blog${newsItem.id}Image`];
    } else {
      switch (index) {
        case 0:
          newsItem.featured_image.uploadedImage =
            'template1/assets/img/blog1.png';
          break;
        case 1:
          newsItem.featured_image.uploadedImage =
            'template1/assets/img/blog2.png';
          break;
        case 2:
          newsItem.featured_image.uploadedImage =
            'template1/assets/img/blog3.png';
          break;
        // Add more cases as needed for additional news items
        default:
          newsItem.featured_image.uploadedImage =
            'template1/assets/img/blog_default.png';
          break;
      }
    }

    return newsItem;
  });

  return (
    <section className="home-blog">
      <div className="container">
        <div className="blog-heading">
          <h2 style={colorSecondary(themeData)}>Inside Latest News</h2>
          <Link href="/news" className="blog-btn" style={bgPrimary(themeData)}>
            View All
          </Link>
        </div>
        <div className="blog-grid">
          {(news && news.length > 0 ? news : homeNewsWithImages).map(
            (item, index) => {
              return (
                <div key={index} className="blog-single">
                  <div className="blog-image position-relative">
                    <img
                      src={item.featured_image.uploadedImage}
                      alt="Blog Image"
                    />
                  </div>
                  <div className="blog-single-text-area">
                    <span className="ticker" style={bgPrimary(themeData)}>
                      New
                    </span>
                    <div className="blog-date">
                      <span
                        style={{
                          color: `${
                            themeData?.branding?.primary_color?.trim() ||
                            '#9344E8'
                          }`,
                        }}
                      >
                        {new Date(item?.createdAt).toDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                      <span
                        className="news-time"
                        style={{
                          color: `${
                            themeData?.branding?.primary_color?.trim() ||
                            '#9344E8'
                          }`,
                        }}
                      >
                        {new Date(item?.createdAt).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <div className="blog-single-heading">
                      <h4>
                        <Link
                          href={`/news/${item?.slug}`}
                          style={colorSecondary(themeData)}
                        >
                          {item?.title}
                        </Link>
                      </h4>
                    </div>
                    <div
                      className="blog-single-text"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          item?.short_description + '...' || ''
                        ),
                      }}
                    >
                      {/* {limitWords(item.description, 20)} ... */}
                    </div>
                    <Link
                      href={`/news/${item.slug}`}
                      className="blog-single-btn"
                      style={{
                        color: `${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`,
                        borderBottom: `1px solid ${
                          themeData?.branding?.primary_color?.trim() ||
                          '#9344E8'
                        }`,
                      }}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
