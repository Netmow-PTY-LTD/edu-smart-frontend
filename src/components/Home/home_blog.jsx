import { clientNewsAction } from '@/slices/home/actions/clientNewsActions';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colorSecondary } from '../constants/utils/themeUtils';
import { getTheme } from '@/slices/home/actions/organizationAction';

const HomeBlog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const {
    data: allNewsListData,
    isLoading: allNewsListIsLoading,
    error: allNewsListError,
  } = useSelector((state) => state.Home.clientNews);

  useEffect(() => {
    const data = {
      page: currentPage,
    };

    dispatch(clientNewsAction(data));
  }, [dispatch, currentPage]);

  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname?.split('.');
      if ((host.length === 3 && host[0] !== 'www') || host[1] === 'localhost') {
        dispatch(getTheme(host[0]));
      }
    }
  }, [dispatch]);

  return (
    <section className="home-blog">
      <div className="container">
        <div className="blog-heading">
          <h2 style={colorSecondary(themeData)}>Inside Latest Blogs</h2>
          <Link className="blog-btn button py-3" href="/blog">
            View All
          </Link>
        </div>
        <div className="blog-grid">
          {allNewsListData?.popularNews &&
            allNewsListData?.popularNews?.length > 0 &&
            allNewsListData?.popularNews
              ?.slice(0, 3)
              ?.map((blogItem, index) => (
                <div className="blog-single" key={index}>
                  <div className="blog-image position-relative">
                    <img
                      src={blogItem?.featured_image?.uploadedImage}
                      alt="Blog Image"
                    />
                  </div>
                  <div className="blog-single-text-area">
                    <div className="blog-date">
                      <span>
                        {' '}
                        {new Date(blogItem?.createdAt).toDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="news-time">
                        {' '}
                        {new Date(blogItem?.createdAt).toLocaleTimeString(
                          'en-GB',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }
                        )}
                      </span>
                    </div>
                    <div className="blog-single-heading">
                      <h4>
                        <Link href={`/blog/${blogItem?.slug}`}>
                          {blogItem?.title}
                        </Link>
                      </h4>
                    </div>
                    <div
                      className="blog-single-text"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          blogItem?.short_description + '...'
                        ),
                      }}
                    ></div>
                    <Link
                      className="blog-single-btn"
                      href={`/blog/${blogItem?.slug}`}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
