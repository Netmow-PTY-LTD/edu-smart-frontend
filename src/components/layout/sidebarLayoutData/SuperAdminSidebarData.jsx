import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useCustomData } from '@/utils/common/data/customeData';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

const SuperAdminSidebarData = () => {
  const [isUniversities, setIsUniversities] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSubscriptionManagement, setSubscriptionManagement] = useState(false);
  const [isPackageManagement, setIsPackageManagement] = useState(false);
  const [isPaymentReport, setIsPaymentReport] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isBlogs, setIsBlogs] = useState(false);
  const [earnings, setEarnings] = useState(false);
  const [isManageDocument, setIsManageDocument] = useState(false);
  const router = useRouter();
  const { data: userInfoData } = useGetUserInfoQuery();
  const customeData = useCustomData();
  const paneltext = customeData.paneltext;

  const userRole = userInfoData?.data?.role;
  const alertShownRef = useRef(false); // ✅ Prevent repeated alerts

  // ✅ Step 1: Parse accessible data
  let accessibleData = [];
  try {
    const rawData = userInfoData?.data?.accessible;
    accessibleData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData || [];
  } catch (err) {
    console.error('Failed to parse accessible data:', err);
  }

  console.log("serInfoData?.data?.accessible", userInfoData?.data?.accessible);
  console.log("accessibleData", accessibleData);


  // ✅ Step 2: Menu definition
   const menuItems = [
   {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    link: '/dashboard/' + paneltext,
  },
  {
    id: 'universities',
    label: 'Universities',
    icon: 'ri-school-fill',
    link: '/#',
    click: (e) => {
      e.preventDefault();
      setIsUniversities(!isUniversities);
      updateIconSidebar(e);
    },
    stateVariables: isUniversities,
    subItems: [
      {
        id: 'alluniversity',
        label: 'All University',
        icon: 'ri-school-fill',
        link: '/dashboard/' + paneltext + '/university-management/all-university',
        parentId: 'universities',
      },
      {
        id: 'adduniversity',
        label: 'Add University',
        icon: 'ri-school-fill',
        link: '/dashboard/' + paneltext + '/university-management/add-university',
        parentId: 'universities',
      },
    ],
  },
  {
    id: 'allpermittedusers',
    label: 'Roles & Permissions',
    icon: 'ri-user-star-fill',
    link: '/dashboard/' + paneltext + '/super-admin-panel/all-permitted-users',
  },
  {
    id: 'recent-application',
    label: 'Recent Application',
    icon: 'ri-article-fill',
    link: '/dashboard/' + paneltext + '/recent-application',
  },
  {
    id: 'agents',
    label: 'Partner',
    icon: 'ri-group-2-fill',
    link: '/dashboard/' + paneltext + '/agents',
  },
  {
    id: 'students',
    label: 'Students',
    icon: 'ri-group-fill',
    link: '/dashboard/' + paneltext + '/students',
  },
  {
    id: 'alldocuments',
    label: 'Document Required List',
    icon: 'ri-file-copy-2-fill',
    link: '/dashboard/' + `${paneltext}` + '/all-documents',
  },
  {
    id: 'managedocument',
    label: 'Manage Documents',
    icon: 'ri-article-fill',
    link: '/#',
    click: function (e) {
      e.preventDefault();
      setIsManageDocument(!isManageDocument);
    },
    stateVariables: isManageDocument,
    subItems: [
      {
        id: 'alldocument',
        label: 'Accepted Documents',
        icon: 'ri-file-fill',
        link: '/dashboard/' + `${paneltext}` + '/manage-documents/all-document-for-superAdmin',
        pathName: '/dashboard/' + `${paneltext}` + '/manage-documents/all-document-for-superAdmin',
        parentId: 'managedocument',
      },
      {
        id: 'documentuploadrequest',
        label: 'Requested & Submitted',
        icon: 'ri-file-list-3-fill',
        link: '/dashboard/' + `${paneltext}` + '/manage-documents/document-upload-request',
        pathName: '/dashboard/' + `${paneltext}` + '/manage-documents/document-upload-request',
        parentId: 'managedocument',
      },
      {
        id: 'newRequest',
        label: 'New Requests',
        icon: 'ri-file-list-3-fill',
        link: '/dashboard/' + `${paneltext}` + '/manage-documents/new-document-request',
        pathName: '/dashboard/' + `${paneltext}` + '/manage-documents/new-document-request',
        parentId: 'managedocument',
      },
    ],
  },
  {
    id: 'airTicketDocumentuploadrequest',
    label: 'Air Ticket Request',
    icon: 'ri-ticket-2-line',
    link: '/dashboard/' + `${paneltext}` + '/manage-air-ticket/air-ticket-upload-request',
  },
  {
    id: 'airportpickupchargerequest',
    label: 'Airport Pickup Request',
    icon: 'ri-flight-takeoff-line',
    link: '/dashboard/' + `${paneltext}` + '/airport-pickup-request',
  },
  {
    id: 'report',
    label: 'Report',
    icon: 'ri-bank-card-line',
    link: '/#',
    click: function (e) {
      e.preventDefault();
      setIsPaymentReport(!isPaymentReport);
    },
    stateVariables: isPaymentReport,
    subItems: [
      {
        id: 'package-payment',
        label: 'Package Payment',
        icon: 'ri-red-packet-line',
        link: '/dashboard/' + `${paneltext}` + '/payment-report/package-payment',
        pathName: '/dashboard/' + `${paneltext}` + '/payment-report/package-payment',
        parentId: 'report',
      },
      {
        id: 'application-payment',
        label: 'Application Payment',
        icon: 'ri-box-1-line',
        link: '/dashboard/' + `${paneltext}` + '/payment-report/application-payment',
        pathName: '/dashboard/' + `${paneltext}` + '/payment-report/application-payment',
        parentId: 'report',
      },
      {
        id: 'familyTrip',
        label: 'Family Trip',
        icon: 'ri-gift-line',
        link: '/dashboard/' + `${paneltext}` + '/familyTrip',
        parentId: 'report',
      },
      {
        id: 'yearlyBonous',
        label: 'Yearly Bonus',
        icon: 'ri-percent-line',
        link: '/dashboard/' + `${paneltext}` + '/yearlyBonous',
        parentId: 'report',
      },
    ],
  },
  {
    id: 'blogs',
    label: 'Blogs',
    icon: 'ri-school-fill',
    link: '/#',
    click: function (e) {
      e.preventDefault();
      setIsBlogs(!isBlogs);
      updateIconSidebar(e);
    },
    stateVariables: isBlogs,
    subItems: [
      {
        id: 'addblog',
        label: 'Add Blog',
        icon: 'ri-school-fill',
        link: '/dashboard/' + `${paneltext}` + '/blog/add-blog',
        parentId: 'blogs',
      },
      {
        id: 'allblogs',
        label: 'Blogs List',
        icon: 'ri-school-fill',
        link: '/dashboard/' + `${paneltext}` + '/blog/blog-list',
        parentId: 'blogs',
      },
    ],
  },
  {
    id: 'contact-messages',
    label: 'Contact Messages',
    icon: 'ri-group-fill',
    link: '/dashboard/' + `${paneltext}` + '/contact-messages',
  },
  {
    id: 'subscription',
    label: 'Subscription',
    icon: 'ri-rss-line',
    link: '/#',
    click: function (e) {
      e.preventDefault();
      setSubscriptionManagement(!isSubscriptionManagement);
    },
    stateVariables: isSubscriptionManagement,
    subItems: [
      {
        id: 'subscriptionList',
        label: 'Subscription List',
        icon: 'ri-rss-line',
        link: '/dashboard/' + `${paneltext}` + '/subscription/subscription-list',
        pathName: '/dashboard/' + `${paneltext}` + '/subscription/subscription-list',
        parentId: 'subscription',
      },
    ],
  },
  {
    id: 'management',
    label: 'Team Management',
    icon: 'ri-group-fill',
    link: '/dashboard/' + `${paneltext}` + '/teams',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'ri-settings-3-line',
    link: '/#',
    click: function (e) {
      e.preventDefault();
      setIsSettings(!isSettings);
    },
    stateVariables: isSettings,
    subItems: [
      {
        id: 'paymentsettings',
        label: 'Payment Settings',
        icon: 'ri-refund-2-fill',
        link: '/dashboard/' + `${paneltext}` + '/settings/payment',
        pathName: '/dashboard/' + `${paneltext}` + '/settings/payment',
        parentId: 'settings',
      },
      {
        id: 'profilesettings',
        label: 'Profile Settings',
        icon: 'ri-user-settings-fill',
        link: '/dashboard/' + `${paneltext}` + '/settings/profile',
        pathName: '/dashboard/' + `${paneltext}` + '/settings/profile',
        parentId: 'settings',
      },
      {
        id: 'changeemail',
        label: 'Change Email',
        icon: 'ri-mail-add-fill',
        link: '/dashboard/' + `${paneltext}` + '/settings/email',
        pathName: '/dashboard/' + `${paneltext}` + '/settings/email',
        parentId: 'settings',
      },
      {
        id: 'changepassword',
        label: 'Change Password',
        icon: 'ri-lock-password-fill',
        link: '/dashboard/' + `${paneltext}` + '/settings/password',
        pathName: '/dashboard/' + `${paneltext}` + '/settings/password',
        parentId: 'settings',
      },
    ],
  },
{
  id: 'access-management',
  label: 'Access Management',
  icon: 'ri-shield-keyhole-fill',
  link: `/dashboard/${paneltext}/access-management`,
  rolesAllowed: ['super_admin'], // Optional: restrict to super admins
},
  ];


  // ✅ Step 3: Access checking helpers
  const isItemAllowed = (item, accessList) => {
    return accessList?.some((access) => access.link === item.link);
  };

const filterMenuItemsByAccess = (items, accessList) => {
  return items
    .map((item) => {
      const allowedSubItems = item.subItems
        ? item.subItems.filter((sub) => isItemAllowed(sub, accessList))
        : [];

      const isMainItemAllowed = isItemAllowed(item, accessList);

      // ✅ If it's a parent with subItems and none are allowed, skip it
      const isPlaceholderParent = item.link === '/#' && allowedSubItems.length === 0;
      if (isPlaceholderParent) return null;

      // ✅ If it's a real link and not allowed, and no allowed subItems, skip it
      if (!isMainItemAllowed && allowedSubItems.length === 0) return null;

      return {
        ...item,
        subItems: allowedSubItems.length > 0 ? allowedSubItems : undefined,
        ...(item.click ? { click: item.click } : {}),
        ...(item.stateVariables !== undefined ? { stateVariables: item.stateVariables } : {}),
      };
    })
    .filter(Boolean);
};

  const updateIconSidebar = (e) => {
    if (e?.target?.getAttribute('subitems')) {
      const ul = document.getElementById('two-column-menu');
      const iconItems = ul?.querySelectorAll('.nav-icon.active') || [];
      [...iconItems].forEach((item) => {
        item.classList.remove('active');
        const id = item.getAttribute('subitems');
        document.getElementById(id)?.classList.remove('show');
      });
    }
  };

  // ✅ Step 4: Final filtered menu
  const filteredMenuItems = useMemo(() => {
    if (userRole === 'super_admin') return menuItems;

    if (!Array.isArray(accessibleData)) return [];

    const currentPath = router.pathname.toLowerCase().split('?')[0];

    const isAllowedUrl = accessibleData.some((access) => access.link.toLowerCase() === currentPath);

      // if (!isAllowedUrl && paneltext !== 'student' && paneltext !== 'agent') {
      //   router.replace(`/dashboard/${paneltext}`);
      //   return [];
      // }
 // ✅ Alert + redirect (only once)
  useEffect(() => {
    if (
      !isAllowedUrl &&
      paneltext !== 'student' &&
      paneltext !== 'agent' &&
      !alertShownRef.current
    ) {
      alertShownRef.current = true;
      alert("Please ask the superadmin for this access.");
      router.replace(`/dashboard/${paneltext}`);
    }
  }, [isAllowedUrl, paneltext, router]);




    return filterMenuItemsByAccess(menuItems, accessibleData);
  }, [userRole, accessibleData, router.pathname, paneltext, isUniversities]);

  // ✅ Step 5: Store simplified menu
  useEffect(() => {
    if (!filteredMenuItems.length) return;

    const simplified = filteredMenuItems.map((item) => ({
      label: item.label,
      link: item.link,
      ...(item.subItems && {
        subItems: item.subItems.map((sub) => ({
          label: sub.label,
          link: sub.link,
        })),
      }),
    }));

    localStorage.setItem('simplifiedMenu', JSON.stringify(simplified));
    console.log('Simplified Menu saved to localStorage:', simplified);
  }, [filteredMenuItems]);

  // ✅ Output
  return <React.Fragment>{filteredMenuItems}</React.Fragment>;
};

export default SuperAdminSidebarData;
