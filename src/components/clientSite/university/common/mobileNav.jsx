import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const MobileNav = ({ showMobileNav, setShowMobileNav }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const toggleSubmenu = (menuItem) => {
    setShowSubmenu(menuItem === activeMenuItem ? !showSubmenu : true);
    setActiveMenuItem(menuItem === activeMenuItem ? null : menuItem);
  };

  const navRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowMobileNav(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef, setShowMobileNav]);

  return (
    <section className={`mobile-nav-area ${showMobileNav ? 'active' : ''}`}>
      <div className="mobile-nav-header-temp">
        <Link href="/" className="logo-container">
          <img src="assets/images/logo_alt.png" alt="Logo" />
        </Link>
        <button
          className="close-btn-temp"
          onClick={() => setShowMobileNav(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="30px"
            height="30px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
            />
          </svg>
        </button>
      </div>

      <nav className="mobile-nav">
        <ul className="nav-list-temp">
          <li>
            <Link href="#">
              <span>Home</span>
            </Link>
          </li>
          <li className=" menu-item-has-children">
            <Link href="/faculties" className="nav-link">
              <span>Faculties</span>
              <svg
                width="11"
                height="6"
                viewBox="0 0 11 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.878632 0.602997L5.28656 5.01092L9.69449 0.602997"
                  stroke="var(--color--secondary)"
                  strokeWidth="1.10198"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <ul className="sub-menu">
              <li>
                <Link href={`#`}>Science</Link>
              </li>
              <li>
                <Link href={`#`}>Law</Link>
              </li>
            </ul>
          </li>
          <li className=" menu-item-has-children">
            <Link href="/programs" className="nav-link">
              <span>Programs</span>
              <svg
                width="11"
                height="6"
                viewBox="0 0 11 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.878632 0.602997L5.28656 5.01092L9.69449 0.602997"
                  stroke="#162A73"
                  strokeWidth="1.10198"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <ul className="sub-menu">
              <li>
                <Link href={`#`}>Graduate</Link>
              </li>
              <li>
                <Link href={`#`}>Undergraduate</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="px-3">
            <Link
              href={`/auth/login`}
              className={`button text-secondary-alt text-center fs-20 fw-semibold py-2 px-5`}
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default MobileNav;
