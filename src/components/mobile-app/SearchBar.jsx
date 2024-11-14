/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SearchBar = ({ backHandler }) => {
  const [allClubs, setAllClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/all-clubs`
        );
        setAllClubs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClubs();
  }, []);

  useEffect(() => {
    setFilteredClubs([]);
    if (searchQuery?.trim()) {
      const filtered =
        allClubs?.length > 0
          ? allClubs?.filter((club) =>
              club?.organisation_name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
          : [];
      setFilteredClubs(filtered);
    } else {
      setFilteredClubs([]);
    }
  }, [searchQuery, allClubs]);

  return (
    <section
      className="mobile-app-wrapper"
      style={{ backgroundImage: `url('/mobile-app/app_bg.png')` }}
    >
      <div className="mobile-search-container">
        <div className="app-search-header">
          <button className="btn-back" onClick={backHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <path
                d="M13 6.5C13 6.89887 12.6767 7.22222 12.2778 7.22222L2.3793 7.22222L6.38947 11.5034C6.64101 11.7719 6.64084 12.1896 6.38907 12.458C6.11352 12.7516 5.64729 12.7518 5.37155 12.4583L0.158118 6.90926C-0.0527062 6.68457 -0.0527061 6.32346 0.158118 6.09877L5.37175 0.5422C5.64732 0.2485 6.11365 0.2485 6.38922 0.5422C6.6409 0.810437 6.64108 1.228 6.38963 1.49645L2.3793 5.77778L12.2778 5.77778C12.6767 5.77778 13 6.10113 13 6.5Z"
                fill="white"
              />
            </svg>
            <span>Back</span>
          </button>
        </div>
        <div className="search-area-app">
          <div className="search-group">
            <input
              type="text"
              className="search-input"
              id="team_search_input"
              placeholder="Find your Team/Club"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7879 13.0519L10.0119 9.27594C10.9193 8.18659 11.3718 6.78936 11.2752 5.37489C11.1787 3.96042 10.5405 2.63763 9.49352 1.6817C8.44651 0.725759 7.07127 0.210276 5.65388 0.242481C4.23649 0.274687 2.88608 0.852103 1.88357 1.85461C0.881064 2.85711 0.303648 4.20753 0.271443 5.62492C0.239237 7.04231 0.75472 8.41755 1.71066 9.46456C2.66659 10.5116 3.98939 11.1497 5.40385 11.2463C6.81832 11.3428 8.21556 10.8903 9.3049 9.98294L13.0809 13.7589L13.7879 13.0519ZM1.2879 5.75894C1.2879 4.86892 1.55182 3.99889 2.04629 3.25887C2.54075 2.51885 3.24356 1.94208 4.06582 1.60148C4.88809 1.26089 5.79289 1.17177 6.66581 1.3454C7.53872 1.51904 8.34054 1.94762 8.96988 2.57696C9.59922 3.20629 10.0278 4.00812 10.2014 4.88103C10.3751 5.75395 10.286 6.65875 9.94536 7.48101C9.60476 8.30328 9.02799 9.00609 8.28796 9.50055C7.54794 9.99502 6.67792 10.2589 5.7879 10.2589C4.59483 10.2576 3.45101 9.78308 2.60738 8.93946C1.76375 8.09583 1.28922 6.95201 1.2879 5.75894Z"
                  fill="#1E1E1E"
                  stroke="#1E1E1E"
                  strokeWidth="0.3"
                ></path>
              </svg>
            </div>
          </div>
          <div className="app-search-results">
            {filteredClubs?.length > 0 && (
              <div className="app-search-heading">
                <h3>Search Results</h3>
              </div>
            )}
            <div className="app-search-results-main">
              {isLoading ? (
                <p className="fs-14 text-black">Loading...</p>
              ) : filteredClubs?.length > 0 ? (
                filteredClubs?.map((club, i) => (
                  <Link
                    href="#"
                    className="single-search"
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.assign(
                        `${window.location.protocol}//${club?.subdomain}.squaddeck.app`
                      );
                    }}
                  >
                    <div className="single-search-inner">
                      <div className="single-search-img">
                        <img
                          src={
                            club?.business_setting?.logo?.secure_url
                              ? club?.business_setting?.logo?.secure_url
                              : 'https://placehold.co/150X150'
                          }
                          alt={club?.organisation_name}
                        />
                      </div>
                      <div className="single-search-content">
                        <h3>{club?.organisation_name}</h3>
                      </div>
                    </div>
                  </Link>
                ))
              ) : searchQuery?.trim() ? (
                <p className="fs-14 text-black mt-2">No results found</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
