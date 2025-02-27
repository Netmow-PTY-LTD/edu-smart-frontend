import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SuperAdminSidebarData = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isUniversities, setIsUniversities] = useState(false);
  const [isUniversity, setIsUniversity] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [rolesAndPermission, setRolesAndPermission] = useState(false);
  const [isSubscriptionManagement, setSubscriptionManagement] = useState(false);
  const [isPaymentReport, setIsPaymentReport] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isBlogs, setIsBlogs] = useState(false);

  const [iscurrentState, setIscurrentState] = useState('Dashboard');

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

  useEffect(() => {
    document.body.classList.remove('twocolumn-panel');
    if (iscurrentState !== 'Dashboard') {
      setIsDashboard(false);
    }
    if (iscurrentState !== 'Universities') {
      setIsUniversities(false);
    }
    if (iscurrentState !== 'University') {
      setIsUniversity(false);
    }
    if (iscurrentState !== 'subscription') {
      setIsUniversity(false);
    }
    if (iscurrentState !== 'Invoices') {
      setIsInvoices(false);
    }
    if (iscurrentState !== 'Roles & Permission') {
      setRolesAndPermission(false);
    }
  }, [iscurrentState]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/super-admin',
    },
    {
      id: 'universities',
      label: 'Universities',
      icon: 'ri-school-fill',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsUniversities(!isUniversities);
        setIscurrentState('Universities');
        updateIconSidebar(e);
      },
      stateVariables: isUniversities,
      subItems: [
        {
          id: 'alluniversity',
          label: 'All University',
          icon: 'ri-school-fill',
          link: '/dashboard/super-admin/university-management/all-university',
          parentId: 'universities',
        },
        {
          id: 'adduniversity',
          label: 'Add University',
          icon: 'ri-school-fill',
          link: '/dashboard/super-admin/university-management/add-university',
          parentId: 'universities',
        },
      ],
    },
    // {
    //   id: 'rolesandermissions',
    //   label: 'Roles & Permissions',
    //   icon: 'ri-user-star-fill',
    //   link: '/#',
    //   click: function (e) {
    //     e.preventDefault();
    //     setRolesAndPermission(!rolesAndPermission);
    //     setIscurrentState('Roles & Permissions');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: rolesAndPermission,
    //   subItems: [
    //     {
    //       id: 'admissionmanager',
    //       label: 'Admission Manager',
    //       icon: 'ri-user-3-fill',
    //       link: '/dashboard/super-admin/super-admin-panel/admission-manager',
    //       parentId: 'invoices',
    //     },
    //     {
    //       id: 'accountant',
    //       label: 'Accountant',
    //       icon: 'ri-user-6-fill',
    //       link: '/dashboard/super-admin/super-admin-panel/accountant',
    //       parentId: 'invoices',
    //     },
    //   ],
    // },
    {
      id: 'allpermittedusers',
      label: 'Roles & Permissions',
      icon: 'ri-user-star-fill',
      link: '/dashboard/super-admin/super-admin-panel/all-permitted-users',
    },
    {
      id: 'recent-application',
      label: 'Recent Application',
      icon: 'ri-article-fill',
      link: '/dashboard/super-admin/recent-application',
    },
    {
      id: 'invoices',
      label: 'Invoices',
      icon: 'ri-receipt-fill',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsInvoices(!isInvoices);
        setIscurrentState('Invoices');
        updateIconSidebar(e);
      },
      stateVariables: isInvoices,
      subItems: [
        {
          id: 'package-invoice',
          label: 'Package Invoices',
          icon: 'ri-receipt-fill',
          link: '/dashboard/super-admin/package-invoices',
          parentId: 'invoices',
        },
        {
          id: 'application-invoice',
          label: 'Application Invoices',
          icon: 'ri-receipt-fill',
          link: '/dashboard/super-admin/application-invoices',
          parentId: 'invoices',
        },
      ],
    },

    {
      id: 'alldocuments',
      label: 'Document Required List',
      icon: 'ri-file-copy-2-fill',
      link: '/dashboard/super-admin/all-documents',
    },
    {
      id: 'airTicketDocumentuploadrequest',
      label: 'Air Ticket Doc  Request',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/super-admin/manage-air-ticket/air-ticket-upload-request',
    },
    {
      id: 'package',
      label: 'Packages',
      icon: 'ri-price-tag-2-fill',
      link: '/dashboard/super-admin/packages',
    },
    {
      id: 'coupon',
      label: 'Coupon Management',
      icon: 'ri-coupon-3-fill',
      link: '/dashboard/super-admin/coupon-management',
    },
    {
      id: 'hotoffer',
      label: 'Hot Offers',
      icon: 'ri-fire-fill',
      link: '/dashboard/super-admin/hot-offer',
    },
    {
      id: 'familyTrip',
      label: 'familyTrip',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/super-admin/familyTrip',
    },
    {
      id: 'yearlyBonous',
      label: 'Yearly Bonous',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/super-admin/yearlyBonous',
    },
    {
      id: 'agents',
      label: 'Agents',
      icon: 'ri-group-2-fill',
      link: '/dashboard/super-admin/agents',
    },

    {
      id: 'students',
      label: 'Students',
      icon: 'ri-group-fill',
      link: '/dashboard/super-admin/students',
    },
    {
      id: 'blogs',
      label: 'Blogs',
      icon: 'ri-school-fill',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsBlogs(!isBlogs);
        setIscurrentState('Blogs');
        updateIconSidebar(e);
      },
      stateVariables: isBlogs,
      subItems: [
        {
          id: 'addblog',
          label: 'Add Blog',
          icon: 'ri-school-fill',
          link: '/dashboard/super-admin/blog/add-blog',
          parentId: 'blogs',
        },

        {
          id: 'allblogs',
          label: 'Blogs List',
          icon: 'ri-school-fill',
          link: '/dashboard/super-admin/blog/blog-list',
          parentId: 'blogs',
        },
      ],
    },
    {
      id: 'contact-messages',
      label: 'Contact Messages',
      icon: 'ri-group-fill',
      link: '/dashboard/super-admin/contact-messages',
    },

    {
      id: 'settings',
      label: 'Settings',
      icon: 'ri-settings-3-line',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsSettings(!isSettings);
        setIscurrentState('Settings');
      },
      stateVariables: isSettings,
      subItems: [
        // {
        //   id: 'businesssettings',
        //   label: 'Business settings',
        //   icon: 'ri-briefcase-fill',
        //   link: '/dashboard/super-admin/settings/business',
        //   pathName: '/dashboard/super-admin/settings/business',
        //   parentId: 'settings',
        // },
        // {
        //   id: 'smtpsettings',
        //   label: 'SMTP & Email Config',
        //   icon: 'ri-mail-settings-fill',
        //   link: '/dashboard/super-admin/settings/smtp-config',
        //   pathName: '/dashboard/super-admin/settings/smtp-config',
        //   parentId: 'settings',
        // },
        // {
        //   id: 'currencysettings',
        //   label: 'Currency Settings',
        //   icon: 'ri-money-dollar-circle-fill',
        //   link: '/dashboard/super-admin/settings/currency',
        //   pathName: '/dashboard/super-admin/settings/currency',
        //   parentId: 'settings',
        // },
        {
          id: 'paymentsettings',
          label: 'Payment Settings',
          icon: 'ri-refund-2-fill',
          link: '/dashboard/super-admin/settings/payment',
          pathName: '/dashboard/super-admin/settings/payment',
          parentId: 'settings',
        },
        {
          id: 'profilesettings',
          label: 'Profile Settings',
          icon: 'ri-user-settings-fill',
          link: '/dashboard/super-admin/settings/profile',
          pathName: '/dashboard/super-admin/settings/profile',
          parentId: 'settings',
        },
        {
          id: 'changeemail',
          label: 'Change Email',
          icon: 'ri-mail-add-fill',
          link: '/dashboard/super-admin/settings/email',
          pathName: '/dashboard/super-admin/settings/email',
          parentId: 'settings',
        },
        {
          id: 'changepassword',
          label: 'Change Password',
          icon: 'ri-lock-password-fill',
          link: '/dashboard/super-admin/settings/password',
          pathName: '/dashboard/super-admin/settings/password',
          parentId: 'settings',
        },
      ],
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: 'ri-rss-line',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setSubscriptionManagement(!isSubscriptionManagement);
        setIscurrentState('subscription');
      },
      stateVariables: isSubscriptionManagement,
      subItems: [
        {
          id: 'subscriptionList',
          label: 'Subscription List',
          icon: 'ri-rss-line',
          link: '/dashboard/super-admin/subscription/subscription-list',
          pathName: '/dashboard/super-admin/subscription/subscription-list',
          parentId: 'subscription',
        },
      ],
    },
    {
      id: 'payment-report',
      label: 'Payment Report',
      icon: 'ri-bank-card-line',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsPaymentReport(!isPaymentReport);
        setIscurrentState('payment-report');
      },
      stateVariables: isPaymentReport,
      subItems: [
        {
          id: 'package-payment',
          label: 'Package Payment',
          icon: 'ri-red-packet-line',
          link: '/dashboard/super-admin/payment-report/package-payment',
          pathName: '/dashboard/super-admin/payment-report/package-payment',
          parentId: 'payment-report',
        },
        {
          id: 'application-payment',
          label: 'Application Payment',
          icon: 'ri-box-1-line',
          link: '/dashboard/super-admin/payment-report/application-payment',
          pathName: '/dashboard/super-admin/payment-report/application-payment',
          parentId: 'payment-report',
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default SuperAdminSidebarData;
