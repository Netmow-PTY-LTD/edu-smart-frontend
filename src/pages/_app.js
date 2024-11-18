import { store } from '@/slice/store/store';
import '@/styles/clienttheme.scss';
import '@/styles/globals.css';
import '@/styles/themes.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'remixicon/fonts/remixicon.css';

export default function MyApp({ Component, pageProps }) {
  // const [checked, setChecked] = useState(false);
  const [checked, setChecked] = useState(true);
  const [isValidSubdomain, setIsValidSubdomain] = useState(true);
  const [themeData, setThemeData] = useState([]);

  const router = useRouter();

  // useEffect(() => {
  //   const checkSubdomain = async (subdomain) => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/check-subdomain`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ subdomain }),
  //         }
  //       );
  //       if (!res.ok) {
  //         setIsValidSubdomain(true);
  //       } else if (typeof window !== "undefined") {
  //         window.location.assign(
  //           `${window.location.protocol}//${process.env.NEXT_PUBLIC_REDIRECT_URL}`
  //         );
  //       }
  //     } catch (error) {
  //       console.error("An error occurred while fetching:", error);
  //     } finally {
  //       setChecked(true);
  //     }
  //   };

  //   if (typeof window !== "undefined") {
  //     const host = window.location.hostname.split(".");
  //     if (host.length === 3 && host[0] !== "www") {
  //       checkSubdomain(host[0]);
  //     } else {
  //       setChecked(true);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   const checkThemeData = async (subdomain) => {
  //     if (subdomain) {
  //       try {
  //         const res = await fetch(
  //           `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/public/api/v1/theme/${subdomain}`,
  //           {
  //             method: 'GET',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           }
  //         );

  //         const data = await res.json();
  //         setThemeData(data);
  //       } catch (error) {
  //         console.error('An error occurred while fetching theme data:', error);
  //       }
  //     }
  //   };

  //   checkThemeData(getSubdomainHelperFunction());
  // }, []);

  return (
    <>
      <ReduxProvider store={store}>
        <Head>
          <title>{`${themeData?.organisation_name ? themeData?.organisation_name : pageProps?.metaTags?.title ? pageProps?.metaTags?.title : 'EduSmart'}`}</title>
          <meta
            property="description"
            content={`${pageProps?.metaTags?.description ? pageProps?.metaTags?.description : ''}`}
          />

          <link
            rel="icon"
            href={`${themeData?.branding?.favicon?.secure_url || '/favicon.png'}`}
          />

          <meta name="author" content={`${'EduSmart'}`} />
          <meta
            name="keywords"
            content={`${pageProps?.metaTags?.keywords ? pageProps?.metaTags?.keywords : ''}`}
          />
          <meta
            name="robots"
            content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
          />

          <meta
            property="og:title"
            content={`${pageProps?.metaTags?.title ? pageProps?.metaTags?.title : ''}`}
          />
          <meta
            property="og:description"
            content={`${pageProps?.metaTags?.description ? pageProps?.metaTags?.description : ''}`}
          />
          <meta property="og:site_name" content={`${'SquadDeck'}`} />
          <meta
            property="og:image"
            content={
              pageProps?.metaTags?.image ? pageProps?.metaTags?.image : ''
            }
          />

          <meta
            property="og:image:alt"
            content={`${pageProps?.metaTags?.title ? pageProps?.metaTags?.title : ''}`}
          />
          <meta
            name="twitter:title"
            content={`${pageProps?.metaTags?.title ? pageProps?.metaTags?.title : ''}`}
          />
          <meta
            name="twitter:description"
            content={`${pageProps?.metaTags?.description ? pageProps?.metaTags?.description : ''}`}
          />
          <meta
            name="twitter:image"
            content={
              pageProps?.metaTags?.image ? pageProps?.metaTags?.image : ''
            }
          />
        </Head>
        {/* <AuthProvider> */}
        {checked && <Component {...pageProps} />}
        {/* </AuthProvider> */}
      </ReduxProvider>
    </>
  );
}
