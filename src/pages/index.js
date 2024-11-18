require('dotenv').config();

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    router.push('/super-admin');
  }, [router]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const host = window.location.hostname?.split(".");

  //     if ((host.length === 3 && host[0] !== "www") || host[1] === "localhost") {
  //       dispatch(getTheme(host[0]));
  //     }

  //     if (
  //       host.length === 2 &&
  //       host[0] !== "squaddeck" &&
  //       host[0] !== "localhost"
  //     ) {
  //       dispatch(getTheme(host[0]));
  //     }

  //     if (host.length === 3 && host[0] === "www" && host[1] !== "squaddeck") {
  //       dispatch(getTheme(host[1]));
  //     }
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   if (themeData?.subdomain) {
  //     localStorage.setItem("subdomain", themeData?.subdomain);
  //   }
  // }, [themeData?.subdomain]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (themeError || themeError !== null) {
  //       window.location.assign(
  //         `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}`
  //       );
  //     }
  //   }
  // }, [themeError]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const host = window.location.hostname?.split(".");
  //     if (
  //       host.length === 3 &&
  //       host[0] !== "www" &&
  //       host[0] !== themeData?.subdomain &&
  //       themeData?.subdomain
  //     ) {
  //       window.location.assign(
  //         `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}`
  //       );
  //     }
  //     if (
  //       host[1] === "localhost" &&
  //       host[0] !== themeData?.subdomain &&
  //       themeData?.subdomain
  //     ) {
  //       window.location.assign(
  //         `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}`
  //       );
  //     }
  //   }
  // }, [themeData?.subdomain]);

  return (
    <>
    </>
  );
};

export default HomePage;
