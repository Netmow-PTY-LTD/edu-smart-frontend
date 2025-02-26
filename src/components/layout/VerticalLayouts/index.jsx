/* eslint-disable no-redeclare */
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { Collapse } from 'reactstrap';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { createSelector } from 'reselect';
import withRouter from '../../common/withRoutes';
import AccountantSidebarData from '../sidebarLayoutData/AccountantSidebarData';
import AdmissionManagerSidebarData from '../sidebarLayoutData/AdmissionManagerData';
import AgentSidebarData from '../sidebarLayoutData/AgentSidebarData';
import StudentSidebarData from '../sidebarLayoutData/StudentSidebarData';
import SuperAdminSidebarData from '../sidebarLayoutData/SuperAdminSidebarData';
import UniversityAdministratorSidebarData from '../sidebarLayoutData/UniversitySidebardata';

const VerticalLayout = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const superAdminSidebarData = SuperAdminSidebarData().props.children;
  const studentSidebarData = StudentSidebarData().props.children;
  const agentSidebarData = AgentSidebarData().props.children;
  const universitySidebarData =
    UniversityAdministratorSidebarData().props.children;
  const admissionManagerSidebarData =
    AdmissionManagerSidebarData().props.children;
  const accountantSidebarData = AccountantSidebarData().props.children;

  const { data: userInfodata } = useGetUserInfoQuery();

  // const userInfodata = {
  //   data: { role: 'admission_manager' },
  // };

  const selectLayoutState = (state) => state.Layout;

  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      leftsidbarSizeType: layout.leftsidbarSizeType,
      sidebarVisibilitytype: layout.sidebarVisibilitytype,
      layoutType: layout.layoutType,
    })
  );

  // Inside your component
  const { leftsidbarSizeType, sidebarVisibilitytype, layoutType } = useSelector(
    selectLayoutProperties
  );

  //vertical and semibox resize events
  const resizeSidebarMenu = useCallback(() => {
    var windowSize = document.documentElement.clientWidth;
    if (windowSize >= 1025) {
      if (document.documentElement.getAttribute('data-layout') === 'vertical') {
        document.documentElement.setAttribute(
          'data-sidebar-size',
          leftsidbarSizeType
        );
      }
      if (document.documentElement.getAttribute('data-layout') === 'semibox') {
        document.documentElement.setAttribute(
          'data-sidebar-size',
          leftsidbarSizeType
        );
      }
      if (
        (sidebarVisibilitytype === 'show' ||
          layoutType === 'vertical' ||
          layoutType === 'twocolumn') &&
        document.querySelector('.hamburger-icon')
      ) {
        var hamburgerIcon = document.querySelector('.hamburger-icon');
        if (hamburgerIcon !== null) {
          hamburgerIcon.classList.remove('open');
        }
      } else {
        var hamburgerIcon = document.querySelector('.hamburger-icon');
        if (hamburgerIcon !== null) {
          hamburgerIcon.classList.add('open');
        }
      }
    } else if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove('twocolumn-panel');
      if (document.documentElement.getAttribute('data-layout') === 'vertical') {
        document.documentElement.setAttribute('data-sidebar-size', 'sm');
      }
      if (document.documentElement.getAttribute('data-layout') === 'semibox') {
        document.documentElement.setAttribute('data-sidebar-size', 'sm');
      }
      if (document.querySelector('.hamburger-icon')) {
        document.querySelector('.hamburger-icon').classList.add('open');
      }
    } else if (windowSize <= 767) {
      document.body.classList.remove('vertical-sidebar-enable');
      if (
        document.documentElement.getAttribute('data-layout') !== 'horizontal'
      ) {
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
      }
      if (document.querySelector('.hamburger-icon')) {
        document.querySelector('.hamburger-icon').classList.add('open');
      }
    }
  }, [leftsidbarSizeType, sidebarVisibilitytype, layoutType]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeSidebarMenu, true);
    }
  }, [resizeSidebarMenu]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const initMenu = () => {
      const pathName = router?.pathname;
      const ul = document.getElementById('navbar-nav');
      const items = ul.getElementsByTagName('a');
      let itemsArray = [...items];
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === 'vertical') {
      initMenu();
    }
  }, [props.layoutType, router?.pathname]);

  function activateParentDropdown(item) {
    item.classList.add('active');
    let parentCollapseDiv = item.closest('.collapse.menu-dropdown');

    if (parentCollapseDiv) {
      parentCollapseDiv.classList.add('show');
      parentCollapseDiv.parentElement.children[0].classList.add('active');
      parentCollapseDiv.parentElement.children[0].setAttribute(
        'aria-expanded',
        'true'
      );
      if (parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown')) {
        parentCollapseDiv.parentElement
          .closest('.collapse')
          .classList.add('show');
        if (
          parentCollapseDiv.parentElement.closest('.collapse')
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.classList.add('active');
        if (
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
        ) {
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
            .classList.add('show');
          parentCollapseDiv.parentElement
            .closest('.collapse')
            .previousElementSibling.closest('.collapse')
            .previousElementSibling.classList.add('active');
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains('active'));

    actiItems.forEach((item) => {
      if (item.classList.contains('menu-link')) {
        if (!item.classList.contains('active')) {
          item.setAttribute('aria-expanded', false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove('show');
        }
      }
      if (item.classList.contains('nav-link')) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove('show');
        }
        item.setAttribute('aria-expanded', false);
      }
      item.classList.remove('active');
    });
  };

  return (
    <>
      {/* menu Items */}
      {(userInfodata?.data?.role === 'super_admin'
        ? superAdminSidebarData
        : userInfodata?.data?.role === 'student'
          ? studentSidebarData
          : userInfodata?.data?.role === 'agent'
            ? agentSidebarData
            : userInfodata?.data?.role === 'university_administrator'
              ? universitySidebarData
              : userInfodata?.data?.role === 'admission_manager'
                ? //  admissionManagerSidebarData
                  superAdminSidebarData
                : userInfodata?.data?.role === 'accountant'
                  ? accountantSidebarData
                  : []
      ).map((item, key) => {
        return (
          <React.Fragment key={key}>
            {/* Main Header */}
            {item['isHeader'] ? (
              ''
            ) : item.subItems ? (
              <li
                id={`${item?.id === 'players' ? 'addplayer' : item?.id === 'teams' ? 'addteam' : item?.id === 'events' ? 'createevents' : item?.id === 'settings' ? 'systemsettings' : item?.id === 'website' ? 'websiteinfo' : item?.id === 'ecommerce' ? 'ecommercesystem' : ''}`}
                className="nav-item fs-2"
              >
                <p
                  onClick={item?.click}
                  className="nav-link menu-link cursor-pointer"
                  data-bs-toggle="collapse"
                >
                  <i className={`pe-3 ${item.icon}`}></i>
                  <span data-key="t-apps">{item.label}</span>
                  {item.badgeName ? (
                    <span
                      className={'badge badge-pill bg-' + item.badgeColor}
                      data-key="t-new"
                    >
                      {item.badgeName}
                    </span>
                  ) : (
                    ''
                  )}
                </p>
                <Collapse
                  className="menu-dropdown"
                  isOpen={item.stateVariables}
                  id="sidebarApps"
                >
                  <ul className="nav nav-sm flex-column test">
                    {/* subItems  */}
                    {item.subItems &&
                      (item.subItems || []).map((subItem, key) => (
                        <React.Fragment key={key}>
                          {!subItem.isChildItem ? (
                            <li className="nav-item d-flex align-items-center">
                              <Link
                                href={
                                  subItem.link
                                    ? subItem.link
                                    : subItem?.pathName
                                }
                                className="nav-link"
                              >
                                <i className={`pe-2 ${subItem.icon}`}></i>
                                {subItem.label}

                                {subItem.badge ? (
                                  <span
                                    className="badge badge-pill bg-danger"
                                    data-key="t-hot"
                                  >
                                    <i className={subItem.badge}></i>
                                  </span>
                                ) : null}
                                {subItem.badgeName ? (
                                  <span
                                    className={
                                      'badge badge-pill bg-' +
                                      subItem.badgeColor
                                    }
                                    data-key="t-new"
                                  >
                                    {subItem.badgeName}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ) : (
                            <li className="nav-item">
                              <p
                                onClick={subItem.click}
                                className="nav-link fs-3"
                                data-bs-toggle="collapse"
                              >
                                {/* <i className={`pe-2 ${subItem.icon}`}></i> */}
                                {subItem.label}
                                {subItem.badgeName ? (
                                  <span
                                    className={
                                      'badge badge-pill bg-' +
                                      subItem.badgeColor
                                    }
                                    data-key="t-new"
                                  >
                                    {subItem.badgeName}
                                  </span>
                                ) : null}
                              </p>
                              <Collapse
                                className="menu-dropdown"
                                isOpen={subItem.stateVariables}
                                id="sidebarEcommerce"
                              >
                                <ul className="nav nav-sm flex-column ">
                                  {/* child subItems  */}
                                  {subItem.childItems &&
                                    (subItem.childItems || []).map(
                                      (childItem, key) => (
                                        <React.Fragment key={key}>
                                          {!childItem.childItems ? (
                                            <li className="nav-item fs-5">
                                              <Link
                                                href={
                                                  childItem.link
                                                    ? childItem.link
                                                    : '/#'
                                                }
                                                className="nav-link"
                                              >
                                                {/* <i
                                                  className={`pe-2 ${childItem.icon}`}
                                                ></i> */}
                                                {childItem.label}
                                              </Link>
                                            </li>
                                          ) : (
                                            <li className="nav-item">
                                              <Link
                                                href="/#"
                                                className="nav-link"
                                                onClick={childItem.click}
                                                data-bs-toggle="collapse"
                                              >
                                                {/* <i
                                                  className={`pe-2 ${childItem.icon}`}
                                                ></i> */}
                                                {childItem.label}
                                              </Link>
                                              <Collapse
                                                className="menu-dropdown"
                                                isOpen={
                                                  childItem.stateVariables
                                                }
                                                id="sidebaremailTemplates"
                                              >
                                                <ul className="nav nav-sm flex-column">
                                                  {childItem.childItems.map(
                                                    (subChildItem, key) => (
                                                      <li
                                                        className="nav-item "
                                                        key={key}
                                                      >
                                                        <Link
                                                          href={
                                                            subChildItem.link
                                                          }
                                                          className="nav-link fs-1"
                                                          data-key="t-basic-action"
                                                        >
                                                          {subChildItem.label}{' '}
                                                        </Link>
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              </Collapse>
                                            </li>
                                          )}
                                        </React.Fragment>
                                      )
                                    )}
                                </ul>
                              </Collapse>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                  </ul>
                </Collapse>
              </li>
            ) : (
              <li className="nav-item fs-2">
                <Link
                  className="nav-link menu-link"
                  href={item.link ? item.link : '/#'}
                >
                  <i className={`pe-3 ${item.icon}`}></i>{' '}
                  <span>{item.label}</span>
                  {item.badgeName ? (
                    <span
                      className={'badge badge-pill bg-' + item.badgeColor}
                      data-key="t-new"
                    >
                      {item.badgeName}
                    </span>
                  ) : null}
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(VerticalLayout);
