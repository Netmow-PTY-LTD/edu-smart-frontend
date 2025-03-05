import { useCustomData } from '@/utils/common/data/customeData';
import React, { useState } from 'react';

const SuperAdminSidebarData = () => {
  const [isUniversities, setIsUniversities] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSubscriptionManagement, setSubscriptionManagement] = useState(false);
  const [isPaymentReport, setIsPaymentReport] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isBlogs, setIsBlogs] = useState(false);
  const [earnings, setEarnings] = useState(false);

  const customeData = useCustomData();
  const paneltext = customeData.paneltext;

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute('subitems')) {
      const ul = document.getElementById('two-column-menu');
      const iconItems = ul.querySelectorAll('.nav-icon.active');
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove('active');
        var id = item.getAttribute('subitems');
        if (document.getElementById(id))
          document.getElementById(id).classList.remove('show');
      });
    }
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/' + `${paneltext}` + '',
    },
    {
      id: 'universities',
      label: 'Universities',
      icon: 'ri-school-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/#',
      click: function (e) {
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
          link:
            '/dashboard/' +
            `${paneltext}` +
            '/university-management/all-university',
          parentId: 'universities',
        },
        {
          id: 'adduniversity',
          label: 'Add University',
          icon: 'ri-school-fill',
          link:
            '/dashboard/' +
            `${paneltext}` +
            '/university-management/add-university',
          parentId: 'universities',
        },
      ],
    },

    {
      id: 'allpermittedusers',
      label: 'Roles & Permissions',
      icon: 'ri-user-star-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link:
        '/dashboard/' +
        `${paneltext}` +
        '/super-admin-panel/all-permitted-users',
    },
    {
      id: 'recent-application',
      label: 'Recent Application',
      icon: 'ri-article-fill',
      style: `${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/recent-application',
    },
    {
      id: 'invoices',
      label: 'Invoices',
      icon: 'ri-receipt-fill',
      style: `${customeData.hideforadmissionmanger} `,
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsInvoices(!isInvoices);
        updateIconSidebar(e);
      },
      stateVariables: isInvoices,
      subItems: [
        {
          id: 'package-invoice',
          label: 'Package Invoices',
          icon: 'ri-receipt-fill',
          link: '/dashboard/' + `${paneltext}` + '/package-invoices',
          parentId: 'invoices',
        },
        {
          id: 'application-invoice',
          label: 'Application Invoices',
          icon: 'ri-receipt-fill',
          link: '/dashboard/' + `${paneltext}` + '/application-invoices',
          parentId: 'invoices',
        },
      ],
    },

    {
      id: 'alldocuments',
      label: 'Document Required List',
      icon: 'ri-file-copy-2-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/all-documents',
    },
    {
      id: 'airTicketDocumentuploadrequest',
      label: 'Air Ticket Doc  Request',
      icon: 'ri-ticket-2-line',
      style: `${customeData.hideforaccountant}`,
      link:
        '/dashboard/' +
        `${paneltext}` +
        '/manage-air-ticket/air-ticket-upload-request',
    },
    {
      id: 'package',
      label: 'Packages',
      icon: 'ri-price-tag-2-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/packages',
    },
    {
      id: 'coupon',
      label: 'Coupon Management',
      icon: 'ri-coupon-3-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/coupon-management',
    },
    {
      id: 'hotoffer',
      label: 'Hot Offers',
      icon: 'ri-fire-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/hot-offer',
    },
    {
      id: 'familyTrip',
      label: 'familyTrip',
      icon: 'ri-gift-line',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/familyTrip',
    },
    {
      id: 'yearlyBonous',
      label: 'Yearly Bonous',
      icon: 'ri-percent-line',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/yearlyBonous',
    },
    {
      id: 'agents',
      label: 'Agents',
      icon: 'ri-group-2-fill',
      style: `${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/agents',
    },

    {
      id: 'students',
      label: 'Students',
      icon: 'ri-group-fill',
      style: `${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/students',
    },
    {
      id: 'blogs',
      label: 'Blogs',
      icon: 'ri-school-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
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
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/dashboard/' + `${paneltext}` + '/contact-messages',
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: 'ri-rss-line',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
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
          link:
            '/dashboard/' + `${paneltext}` + '/subscription/subscription-list',
          pathName:
            '/dashboard/' + `${paneltext}` + '/subscription/subscription-list',
          parentId: 'subscription',
        },
      ],
    },
    {
      id: 'super-admin-earnings',
      label: 'Earnings',
      icon: 'ri-coins-line',
      style: `${customeData.hideforadmissionmanger}`,
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setEarnings(!earnings);
      },
      stateVariables: earnings,
      subItems: [
        {
          id: 'total-receive-amount',
          label: 'Total Receive Amount',
          icon: 'ri-money-rupee-circle-line',
          link:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/total-receive-amount',
          pathName:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/total-receive-amount',
          parentId: 'super-admin-earnings',
        },
        {
          id: 'total-university-payout',
          label: 'Total University Payout',
          icon: 'ri-money-rupee-circle-line',
          link:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/total-university-payout',
          pathName:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/total-university-payout',
          parentId: 'super-admin-earnings',
        },
        {
          id: 'total-agent-paid-payout',
          label: 'Total Agent Paid Payout',
          icon: 'ri-money-rupee-circle-line',
          link:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/total-agent-paid-payout',
          pathName:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/total-agent-paid-payout',
          parentId: 'super-admin-earnings',
        },
        {
          id: 'total-agent-pending-payout',
          label: 'Total Agent Pending Payout',
          icon: 'ri-money-rupee-circle-line',
          link:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/total-agent-pending-payout',
          pathName:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/total-agent-pending-payout',
          parentId: 'super-admin-earnings',
        },
        {
          id: 'super-admin-profit',
          label: 'Super Admin Profit',
          icon: 'ri-money-rupee-circle-line',
          link:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/super-admin-profit',
          pathName:
            '/dashboard/' +
            `${paneltext}` +
            '/super-admin-earnings/super-admin-profit',
          parentId: 'super-admin-earnings',
        },
      ],
    },
    {
      id: 'payment-report',
      label: 'Payment Report',
      icon: 'ri-bank-card-line',
      style: `${customeData.hideforadmissionmanger}`,
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
          link:
            '/dashboard/' + `${paneltext}` + '/payment-report/package-payment',
          pathName:
            '/dashboard/' + `${paneltext}` + '/payment-report/package-payment',
          parentId: 'payment-report',
        },

        {
          id: 'application-payment',
          label: 'Application Payment',
          icon: 'ri-box-1-line',
          link:
            '/dashboard/' +
            `${paneltext}` +
            '/payment-report/application-payment',
          pathName:
            '/dashboard/' +
            `${paneltext}` +
            '/payment-report/application-payment',
          parentId: 'payment-report',
        },
      ],
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
          style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
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
          style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
          link: '/dashboard/' + `${paneltext}` + '/settings/email',
          pathName: '/dashboard/' + `${paneltext}` + '/settings/email',
          parentId: 'settings',
        },
        {
          id: 'changepassword',
          label: 'Change Password',
          icon: 'ri-lock-password-fill',
          style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
          link: '/dashboard/' + `${paneltext}` + '/settings/password',
          pathName: '/dashboard/' + `${paneltext}` + '/settings/password',
          parentId: 'settings',
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default SuperAdminSidebarData;
