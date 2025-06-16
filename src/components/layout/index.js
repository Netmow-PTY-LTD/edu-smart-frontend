import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
//import actions

//redux
import withRouter from '@/components/common/withRoutes';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
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
} from '../constants/utils/dashboardSidebarUtils';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const DashBoardLayout = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [headerClass, setHeaderClass] = useState('');
  const dispatch = useDispatch();

  const [isRouteLoading, setIsRouteLoading] = useState(true);

  const { data: userInfodata } = useGetUserInfoQuery();

  useEffect(() => {
    if (userInfodata?.data?.role) {
      if (userInfodata.data.role === 'accountant') {
        const allowedPathsForAccountant = [
          '/dashboard/accountant',
          '/dashboard/accountant/package-invoices',
          '/dashboard/accountant/application-invoices',
          '/dashboard/accountant/super-admin-earnings/total-receive-amount',
          '/dashboard/accountant/super-admin-earnings/total-university-payout',
          '/dashboard/accountant/super-admin-earnings/total-agent-paid-payout',
          '/dashboard/accountant/super-admin-earnings/total-agent-pending-payout',
          '/dashboard/accountant/super-admin-earnings/super-admin-profit',
          '/dashboard/accountant/payment-report/package-payment',
          '/dashboard/accountant/payment-report/application-payment',
          '/dashboard/accountant/settings/profile',
        ];

        if (!allowedPathsForAccountant.includes(router.pathname)) {
          router.push(
            `/dashboard/${userInfodata?.data?.role?.split('_').join('-')}`
          );
        }
      }

      
      if (userInfodata.data.role === 'admission_manager') {
        const allowedPathsForAdmissionManager = [
          '/dashboard/admission-manager',
          '/dashboard/admission-manager/recent-application',
          '/dashboard/admission-manager/manage-air-ticket/air-ticket-upload-request',
          '/dashboard/admission-manager/airport-pickup-request',
          '/dashboard/admission-manager/agents',
          '/dashboard/admission-manager/students',
          '/dashboard/admission-manager/settings/profile',
          '/dashboard/admission-manager/university-management/edit-university/',
          '/dashboard/admission-manager/university-management/add-university',
        ];

        const dynamicPath = [
          '/dashboard/admission-manager/students/',
          '/dashboard/admission-manager/agents/',
          '/dashboard/admission-manager/recent-application/',
          '/dashboard/admission-manager/university-management',
        ];

        const currentPath = router.pathname;

        const isAllowedPath =
          allowedPathsForAdmissionManager.includes(currentPath) ||
          dynamicPath.some((path) => currentPath.startsWith(path));

        if (!isAllowedPath) {
          router.push(
            `/dashboard/${userInfodata?.data?.role?.split('_').join('-')}`
          );
        }
      }

      setIsRouteLoading(false);
    }
  }, [router, userInfodata?.data?.role]);

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

  if (isRouteLoading || isLoading) {
    return <LoaderSpiner />;
  }

  return (
    <>
      {isLoading ? (
        <LoaderSpiner />
      ) : (
        <div id="layout-wrapper">
          <Header
            headerclassName={headerClass}
            layoutModeType={layoutModeType}
            onChangeLayoutMode={onChangeLayoutMode}
          />
          <Sidebar layoutType={layoutType} />
          <div id="footer" className="main-content">
            {isRouteLoading ? <LoaderSpiner /> : <>{props.children}</>}
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
