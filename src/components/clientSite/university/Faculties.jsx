import Link from 'next/link';
import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function UniversityFaculties() {
  const [activeTab, setActiveTab] = useState('all-courses');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const data = {
    'all-courses': [
      {
        title: 'Faculty of Information Technology',
        desc: 'A degree from SCIENCE AND IT will transform your life for the better. We are inviting you to prepare yourself for the.',
        img: '/assets/university-gallery/1st-element.jpeg',
      },
      {
        title: 'Business & Entrepreneurship',
        desc: 'Do you want to pursue your career in the business industry as a leader? A degree from BUSINESS AND ENTREPRENEURSHIP...',
        img: '/assets/university-gallery/second-element.png',
      },

      {
        title: 'Graduate Studies',
        desc: 'This faculty’s primary mission is to provide support for the overall research and publications of the faculty, researchers...',
        img: '/assets/university-gallery/second-element.png',
      },
      {
        title: 'Graduate Studies',
        desc: 'This faculty’s primary mission is to provide support for the overall research and publications of the faculty, researchers...',
        img: '/assets/university-gallery/second-element.png',
      },
      {
        title: 'Graduate Studies',
        desc: 'This faculty’s primary mission is to provide support for the overall research and publications of the faculty, researchers...',
        img: '/assets/university-gallery/second-element.png',
      },
    ],
    faculty: [
      {
        title: 'Faculty of Information Technology',
        desc: 'A degree from SCIENCE AND IT will transform your life for the better. We are inviting you to prepare yourself for the future.',
        img: '/assets/university-gallery/1st-element.jpeg',
      },
      {
        title: 'Humanities & Social Sciences',
        desc: 'Studying HUMANITIES AND SOCIAL SCIENCE will help you excel in thinking, judgment, communication...',
        img: '/assets/university-gallery/second-element.png',
      },
    ],
    campus: [
      {
        title: 'Business & Entrepreneurship - Main Campus',
        desc: 'Do you want to pursue your career in the business industry as a leader? A degree from BUSINESS AND ENTREPRENEURSHIP...',
        img: '/assets/university-gallery/second-element.png',
      },
      {
        title: 'Health and Life Sciences',
        desc: 'An exclusive faculty with global demand dedicated to producing an impact on health and human life...',
        img: '/assets/university-gallery/second-element.png',
      },
    ],
  };

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = data[activeTab].slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(data[activeTab].length / itemsPerPage);

  return (
    <section className="university-faculties">
      <div className="container">
        <div className="sec-heading">
          <h2>Our Faculties</h2>
          <p>
            Malaysia started focusing on the development of telecommunication,
            Telekom Malaysia Berhad (TM) took a leap of faith by establishing
            the first private-owned higher learning institute..
          </p>
        </div>
        <div className="faculty-content">
          <div className="faculty-content-left">
            <div className="faculty-tab-navs">
              <h5>Programs By Categories</h5>
              <div className="inner">
                <Link
                  href="#"
                  className={`tab ${activeTab === 'all-courses' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick(e, 'all-courses')}
                >
                  <span>All Courses</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="17"
                    viewBox="0 0 9 17"
                    fill="none"
                  >
                    <path
                      d="M1 15.5L8 8.5L0.999999 1.5"
                      stroke="var(--color--secondary)"
                      strokeWidth="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className={`tab ${activeTab === 'faculty' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick(e, 'faculty')}
                >
                  <span>By Faculty</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="17"
                    viewBox="0 0 9 17"
                    fill="none"
                  >
                    <path
                      d="M1 15.5L8 8.5L0.999999 1.5"
                      stroke="var(--color--secondary)"
                      strokeWidth="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className={`tab ${activeTab === 'campus' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick(e, 'campus')}
                >
                  <span>By Campus</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="17"
                    viewBox="0 0 9 17"
                    fill="none"
                  >
                    <path
                      d="M1 15.5L8 8.5L0.999999 1.5"
                      stroke="var(--color--secondary)"
                      strokeWidth="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="faculty-content-right">
            <div className="faculty-grid">
              {data[activeTab]
                .slice(startIndex, startIndex + itemsPerPage)
                .map((item, index) => (
                  <div className="faculty-item" key={index}>
                    <img src={item.img} alt={item.title} />
                    <h3>{item.title}</h3>
                    <div className="fc-desc">{item.desc}</div>
                    <Link
                      href="#"
                      className="button py-3 px-5 fw-semibold d-inline-block mt-4"
                    >
                      Apply Now
                    </Link>
                  </div>
                ))}
            </div>
            <Pagination className="mt-5">
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  first
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(1);
                  }}
                />
              </PaginationItem>
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  previous
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem active={page === currentPage} key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                  next
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                  last
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(totalPages);
                  }}
                />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
    </section>
  );
}
