import DOMPurify from 'dompurify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function UniversityFaculties({ university }) {
  const [data, setData] = useState({
    'all-courses': [],
    departments: [],
    courseCategories: [],
  });
  const [activeTab, setActiveTab] = useState('all-courses');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const router = useRouter();

  console.log(router);

  useEffect(() => {
    if (university?.courses) {
      setData({
        'all-courses': university.courses,
        departments: university.courses,
        courseCategories: university.courses,
      });
    }
  }, [university?.courses]);

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = data[activeTab]?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(data[activeTab]?.length / itemsPerPage);

  const truncateText = (text, maxLength) => {
    const textContent = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };

  return (
    <section className="university-faculties">
      <div className="container">
        <div className="sec-heading">
          <h2>Our Courses</h2>
          <p>
            Malaysia started focusing on the development of telecommunication,
            Telekom Malaysia Berhad (TM) took a leap of faith by establishing
            the first private-owned higher learning institute..
          </p>
        </div>
        <div className="faculty-content">
          <div className="faculty-content-left">
            <div className="faculty-tab-navs">
              <h5>Courses By Categories</h5>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className={`tab ${activeTab === 'departments' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick(e, 'departments')}
                >
                  <span>By Course Categories</span>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className={`tab ${activeTab === 'courseCategories' ? 'active' : ''}`}
                  onClick={(e) => handleTabClick(e, 'courseCategories')}
                >
                  <span>By Departments</span>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="faculty-content-right">
            <div className="faculty-grid">
              {data[activeTab] &&
                data[activeTab]
                  .slice(startIndex, startIndex + itemsPerPage)
                  .map((item, index) => (
                    <div className="faculty-item" key={index}>
                      <Image
                        src={university?.logo?.url}
                        width={500}
                        height={500}
                        alt={item.name}
                      />
                      <h3>{item.name}</h3>
                      <div className="fc-desc">
                        {truncateText(item.description, 100)}
                      </div>
                      <Link
                        href={`${router?.asPath}/course/${item?._id}`}
                        className="button py-3 px-5 fw-semibold d-inline-block mt-4"
                      >
                        Apply Now
                      </Link>
                    </div>
                  ))}
            </div>
            {data[activeTab]?.length > 0 && (
              <Pagination size="sm" className="mt-5">
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
