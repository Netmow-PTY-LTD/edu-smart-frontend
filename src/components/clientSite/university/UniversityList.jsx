import DOMPurify from 'dompurify';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function UniversityList({ universityData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [subdomain, setSubdomain] = useState('');
  const [visibleTeams, setVisibleTeams] = useState(8);
  const [data, setData] = useState([]);

  useEffect(() => {
    const filteredData = (
      universityData?.data && universityData?.data.length > 0
        ? universityData?.data
        : universityData?.data
    )?.filter((university) =>
      Object.values(university).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUniversities(filteredData);
  }, [universityData?.data, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const loadMore = () => {
    setVisibleTeams((prevVisibleTeams) => prevVisibleTeams + 4);
  };

  return (
    <section className="university-list">
      <div className="container">
        <div className="university-search">
          <form action="">
            <div className="es-form-group">
              <button className="search-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                  />
                </svg>
              </button>
              <input
                type="text"
                className="es-form-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>
        <div className="teams-row">
          {(filteredUniversities || [])
            .slice(0, visibleTeams)
            ?.map((university, index) => {
              return (
                <div className="teams-col" key={index}>
                  <div className="team-single">
                    <div className="team-single-inner">
                      <div className="team-img">
                        <img
                          src={
                            university?.logo?.url ||
                            '/assets/images/users/user-dummy-img.jpg'
                          }
                          alt={university?.name}
                        />
                      </div>
                      <div className="team-info">
                        <h4>
                          <Link
                            href={
                              university._id
                                ? `/university/${university._id}`
                                : '#'
                            }
                          >
                            {university?.name}
                          </Link>
                        </h4>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(university?.description),
                          }}
                          className="team-desc"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {filteredUniversities && filteredUniversities.length > visibleTeams && (
          <div className="load-more-btn d-flex justify-content-center mt-5">
            <button
              onClick={loadMore}
              className="button fw-semibold fs-2 px-4 py-3 d-flex"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
