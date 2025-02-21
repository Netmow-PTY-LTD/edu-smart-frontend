import React, { useEffect, useState } from 'react';

const AccountantSidebarData = () => {
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isPaymentReport, setIsPaymentReport] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
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
    if (iscurrentState !== 'Invoices') {
      setIsInvoices(false);
    }
  }, [iscurrentState]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/accountant',
    },

    {
      id: 'recent-application',
      label: 'Recent Application',
      icon: 'ri-article-fill',
      link: '/dashboard/accountant/recent-application',
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
          link: '/dashboard/accountant/package-invoices',
          parentId: 'invoices',
        },
        {
          id: 'application-invoice',
          label: 'Application Invoices',
          icon: 'ri-receipt-fill',
          link: '/dashboard/accountant/application-invoices',
          parentId: 'invoices',
        },
      ],
    },
    {
      id: 'agents',
      label: 'Agents',
      icon: 'ri-group-2-fill',
      link: '/dashboard/accountant/agents',
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
        {
          id: 'paymentsettings',
          label: 'Payment Settings',
          icon: 'ri-refund-2-fill',
          link: '/dashboard/accountant/settings/payment',
          pathName: '/dashboard/accountant/settings/payment',
          parentId: 'settings',
        },
        {
          id: 'profilesettings',
          label: 'Profile Settings',
          icon: 'ri-user-settings-fill',
          link: '/dashboard/accountant/settings/profile',
          pathName: '/dashboard/accountant/settings/profile',
          parentId: 'settings',
        },
        {
          id: 'changeemail',
          label: 'Change Email',
          icon: 'ri-mail-add-fill',
          link: '/dashboard/accountant/settings/email',
          pathName: '/dashboard/accountant/settings/email',
          parentId: 'settings',
        },
        {
          id: 'changepassword',
          label: 'Change Password',
          icon: 'ri-lock-password-fill',
          link: '/dashboard/accountant/settings/password',
          pathName: '/dashboard/accountant/settings/password',
          parentId: 'settings',
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
          link: '/dashboard/accountant/payment-report/package-payment',
          pathName: '/dashboard/accountant/payment-report/package-payment',
          parentId: 'payment-report',
        },
        {
          id: 'application-payment',
          label: 'Application Payment',
          icon: 'ri-box-1-line',
          link: '/dashboard/accountant/payment-report/application-payment',
          pathName: '/dashboard/accountant/payment-report/application-payment',
          parentId: 'payment-report',
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default AccountantSidebarData;
