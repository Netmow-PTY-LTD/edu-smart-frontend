import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import withRouter from '../common/withRoutes';

//import Components
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

//import actions
import {
  changeLayout,
  changeLayoutMode,
  changeLayoutPosition,
  changeLayoutWidth,
  changeLeftsidebarSizeType,
  changeLeftsidebarViewType,
  changeSidebarImageType,
  changeSidebarTheme,
  changeSidebarVisibility,
  changeTopbarTheme,
} from '../../../slices/thunks';

//redux
import LoaderSpiner from '@/components/constants/Loader/Loader';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const DashBoardLayout = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const [headerClass, setHeaderClass] = useState('');
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Layout;

  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      layoutType: layout.layoutType,
      leftSidebarType: layout.leftSidebarType,
      layoutModeType: layout.layoutModeType,
      layoutWidthType: layout.layoutWidthType,
      layoutPositionType: layout.layoutPositionType,
      topbarThemeType: layout.topbarThemeType,
      leftsidbarSizeType: layout.leftsidbarSizeType,
      leftSidebarViewType: layout.leftSidebarViewType,
      leftSidebarImageType: layout.leftSidebarImageType,
      preloader: layout.preloader,
      sidebarVisibilitytype: layout.sidebarVisibilitytype,
    })
  );

  // Inside your component
  const {
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    preloader,
    sidebarVisibilitytype,
  } = useSelector(selectLayoutProperties);

  /*
    layout settings
    */
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (layoutType ||
        leftSidebarType ||
        layoutModeType ||
        layoutWidthType ||
        layoutPositionType ||
        topbarThemeType ||
        leftsidbarSizeType ||
        leftSidebarViewType ||
        leftSidebarImageType ||
        sidebarVisibilitytype)
    ) {
      window.dispatchEvent(new Event('resize'));
      dispatch(changeLeftsidebarViewType(leftSidebarViewType));
      dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
      dispatch(changeSidebarTheme(leftSidebarType));
      dispatch(changeLayoutMode(layoutModeType));
      dispatch(changeLayoutWidth(layoutWidthType));
      dispatch(changeLayoutPosition(layoutPositionType));
      dispatch(changeTopbarTheme(topbarThemeType));
      dispatch(changeLayout(layoutType));
      dispatch(changeSidebarImageType(leftSidebarImageType));
      dispatch(changeSidebarVisibility(sidebarVisibilitytype));
    }
  }, [
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    sidebarVisibilitytype,
    dispatch,
  ]);

  /*
    call dark/light mode
    */
  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };

  // class add remove in header
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollNavigation, true);
    }
  });

  function scrollNavigation() {
    var scrollup = document?.documentElement?.scrollTop;
    if (scrollup > 50) {
      setHeaderClass('topbar-shadow');
    } else {
      setHeaderClass('');
    }
  }

  useEffect(() => {
    if (
      sidebarVisibilitytype === 'show' ||
      layoutType === 'vertical' ||
      layoutType === 'twocolumn'
    ) {
      document?.querySelector('.hamburger-icon')?.classList?.remove('open');
    } else {
      document?.querySelector('.hamburger-icon') &&
        document?.querySelector('.hamburger-icon')?.classList?.add('open');
    }
  }, [sidebarVisibilitytype, layoutType]);

  // useEffect(() => {
  //   if (route?.query?.token) {
  //     localStorage.setItem('token', route.query.token);
  //   }
  //   if (localStorage.getItem('token') && route.query.token) {
  //     window?.location?.assign(
  //       window?.location?.origin + window?.location?.pathname
  //     );
  //   }
  //   setIsLoading(false);
  // }, [route?.query?.token]);

  // useEffect(() => {
  //   const path = window.location?.pathname?.split('/');
  //   if (path.length > 1 && userInfo?.role) {
  //     if (path[1] !== userInfo?.role) {
  //       window.location.assign(window?.location?.origin + '/' + userInfo?.role);
  //     }
  //   }
  // }, [userInfo]);

  // if (
  //   typeof window !== 'undefined' &&
  //   window.location.href.split('?')[0] !==
  //     window?.location?.origin + window?.location?.pathname
  // ) {
  //   return <LoaderSpiner />;
  // }

  return (
    <>
      {/* <Script id="tawk" strategy="lazyOnload">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6401cce031ebfa0fe7f071a9/1gqjggjll';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
      </Script> */}
      {isLoading ? (
        <LoaderSpiner />
      ) : (
        <div id="layout-wrapper">
          <Header
            headerClass={headerClass}
            layoutModeType={layoutModeType}
            onChangeLayoutMode={onChangeLayoutMode}
          />
          <Sidebar layoutType={layoutType} />
          <div id="footer" className="main-content">
            {props.children}
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

DashBoardLayout.propTypes = {
  children: PropTypes.object,
};

export default withRouter(DashBoardLayout);
