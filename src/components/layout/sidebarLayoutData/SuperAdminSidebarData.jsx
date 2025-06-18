
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useCustomData } from '@/utils/common/data/customeData';
import React, { useState, useEffect } from 'react';
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


      const storedMenu = localStorage.getItem('simplifiedMenu');
      let menuObj;
      if (storedMenu) {
        menuObj = JSON.parse(storedMenu);
      }
    
  const customeData = useCustomData();
  const paneltext = customeData.paneltext;
  const { data: userInfoData } = useGetUserInfoQuery();
  const userRole = userInfoData?.data?.role;
  //const userRole = 'agent';

  const getRoleBasedAccess = (role) => {
    const accessData = localStorage.getItem('accessibleUrlForUser');
    if (!accessData) return [];
    const parsed = JSON.parse(accessData);
    return parsed[role] || [];
  };

  const isAllowed = (item, allowedAccess) => {
    return allowedAccess.some(
      (access) => access.label === item.label && access.link === item.link
    );
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
  link: `/dashboard/${paneltext}/access-management?userRole=admission_manager}`,
  rolesAllowed: ['super_admin'], // Optional: restrict to super admins
},
  ];

  const filteredMenuItems = React.useMemo(() => {
    if (userRole === 'super_admin') return menuItems;
    const allowedAccess = getRoleBasedAccess(userRole);
    // Normalize current path (ignore query params/hash)
    const currentPath = router.pathname.toLowerCase();
      // Check if current path is in allowedAccess links
    // check if current path matches any allowed link
    const isAllowedUrl = allowedAccess.some(access =>
      access.link.toLowerCase() === currentPath
    );

    if (!isAllowedUrl) {
      alert("You can't access this page.");
      // redirect to a safe page
      router.replace(`/dashboard/${paneltext}`);
    }


    const filterItems = (items) => {
      return items
        .map((item) => {
          const isItemAllowed = isAllowed(item, allowedAccess);
          const filteredSubItems = item.subItems?.filter((sub) => isAllowed(sub, allowedAccess)) || [];

          if (!isItemAllowed && filteredSubItems.length === 0) return null;

          const newItem = {
            ...item,
            subItems: filteredSubItems.length > 0 ? filteredSubItems : undefined,
          };

          const originalItem = menuItems.find((m) => m.id === item.id);
          if (originalItem?.stateVariables !== undefined) {
            newItem.stateVariables = originalItem.stateVariables;
          }
          if (originalItem?.click) {
            newItem.click = originalItem.click;
          }

          return newItem;
        })
        .filter(Boolean);
    };

    return filterItems(menuItems);
  }, [
    userRole,
    paneltext,
    isUniversities,
    isInvoices,
    isSubscriptionManagement,
    isPackageManagement,
    isPaymentReport,
    isSettings,
    isBlogs,
    earnings,
    isManageDocument,
  ]);

  // ✅ Console log label & link only
  useEffect(() => {
    if (!filteredMenuItems || filteredMenuItems.length === 0) return;

    const extractLabelAndLink = (items) => {
      return items.map((item) => {
        const base = {
          label: item.label,
          link: item.link,
        };

        if (item.subItems) {
          base.subItems = extractLabelAndLink(item.subItems);
        }

        return base;
      });
    };

    const simplifiedMenu = extractLabelAndLink(filteredMenuItems);
    localStorage.setItem('simplifiedMenu', JSON.stringify(simplifiedMenu));
  }, [filteredMenuItems]);



  return <React.Fragment>{filteredMenuItems}</React.Fragment>;
};

export default SuperAdminSidebarData;
