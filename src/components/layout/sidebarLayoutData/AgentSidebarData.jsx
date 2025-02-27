import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AgentSidebarData = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isWebsite, setIsWebsite] = useState(false);
  const [isManageDocument, setIsManageDocument] = useState(false);
  const [isManageAirTicket, setIsManageAirTicket] = useState(false);
  const [isStudentManagement, setIsStudentManagement] = useState(false);
  const [isUinversityManagement, setIsUinversityManagement] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [iscurrentState, setIscurrentState] = useState('Dashboard');
  const [isPaymentReport, setIsPaymentReport] = useState(false);

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
    if (iscurrentState !== 'Dashboard') {
      setIsDashboard(false);
    }

    if (iscurrentState !== 'Website') {
      setIsWebsite(false);
    }

    if (iscurrentState !== 'Manage Document') {
      setIsManageDocument(false);
    }
    if (iscurrentState !== 'Manage Air Ticket') {
      setIsManageAirTicket(false);
    }

    if (iscurrentState !== 'Manage University') {
      setIsUinversityManagement(false);
    }
    if (iscurrentState !== 'Manage Student') {
      setIsMyProfile(false);
    }
    if (iscurrentState !== 'My Profile') {
      setIsMyProfile(false);
    }
    if (iscurrentState !== 'Settings') {
      setIsSettings(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isWebsite,
    isManageDocument,
    isMyProfile,
    isSettings,
    isUinversityManagement,
  ]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/agent',
    },

    // {
    //   id: 'website',
    //   label: 'Website',
    //   icon: 'ri-school-fill',
    //   link: '/#',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsWebsite(!isWebsite);
    //     setIscurrentState('Website');
    //   },
    //   stateVariables: isWebsite,
    //   subItems: [
    //     {
    //       id: 'allwebsite',
    //       label: 'All website',
    //       icon: 'ri-government-fill',
    //       link: '/dashboard/agent/website-management/all-website-for-agent',
    //       pathName: '/dashboard/agent/website-management/all-website-for-agent',
    //       parentId: 'website',
    //     },
    //   ],
    // },

    {
      id: 'universitymanagement',
      label: 'University',
      icon: 'ri-school-line',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsUinversityManagement(!isUinversityManagement);
        setIscurrentState('Manage University');
      },
      stateVariables: isUinversityManagement,
      subItems: [
        {
          id: 'allUniversity',
          label: 'All University',
          icon: 'ri-school-line',
          link: '/dashboard/agent/university-management/all-university',
          pathName: '/dashboard/agent/university-management/all-university',
          parentId: 'universitymanagement',
        },
      ],
    },
    {
      id: 'studentmanagement',
      label: 'Student',
      icon: 'ri-group-fill',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsStudentManagement(!isStudentManagement);
        setIscurrentState('Manage Student');
      },
      stateVariables: isStudentManagement,
      subItems: [
        {
          id: 'addstudent',
          label: 'Add Student',
          icon: 'ri-user-add-fill',
          link: '/dashboard/agent/student-management/add-student-for-agent',
          pathName: '/dashboard/agent/student-management/add-student-for-agent',
          parentId: 'studentmanagement',
        },
        {
          id: 'allstudent',
          label: 'All Students',
          icon: 'ri-group-2-fill',
          link: '/dashboard/agent/student-management/all-student-for-agent',
          pathName: '/dashboard/agent/student-management/all-student-for-agent',
          parentId: 'studentmanagement',
        },
      ],
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: 'ri-list-check-3',
      link: '/dashboard/agent/applications',
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
          link: '/dashboard/agent/package-invoices',
          parentId: 'invoices',
        },
        {
          id: 'application-invoice',
          label: 'Application Invoices',
          icon: 'ri-receipt-fill',
          link: '/dashboard/agent/application-invoices',
          parentId: 'invoices',
        },
      ],
    },

    {
      id: 'managedocument',
      label: 'Manage Documents',
      icon: 'ri-article-fill',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsManageDocument(!isManageDocument);
        setIscurrentState('Manage Document');
      },
      stateVariables: isManageDocument,
      subItems: [
        {
          id: 'alldocument',
          label: 'All Document',
          link: '/dashboard/agent/manage-documents/all-document-for-agent',
          icon: 'ri-file-fill',
          pathName: '/dashboard/agent/manage-documents/all-document-for-agent',
          parentId: 'managedocument',
        },
        {
          id: 'documentuploadrequest',
          label: 'Doc Upload Request',
          link: '/dashboard/agent/manage-documents/document-upload-request',
          icon: 'ri-file-list-3-fill',
          pathName: '/dashboard/agent/manage-documents/document-upload-request',
          parentId: 'managedocument',
        },
      ],
    },
    // ----------------- Future use Manage Air Ticket subitem sidebar -----------------
    // {
    //   id: 'manage-air-ticket',
    //   label: 'Manage Air Ticket',
    //   icon: 'ri-article-fill',
    //   link: '/#',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsManageAirTicket(!isManageAirTicket);
    //     setIscurrentState('Manage Air Ticket');
    //   },
    //   stateVariables: isManageAirTicket,
    //   subItems: [
    //     {
    //       id: 'allAirTicketDoc',
    //       label: 'All Air Ticket Document',
    //       link: '/dashboard/agent/manage-air-ticket/all-air-ticket-doc-for-agent',
    //       icon: 'ri-file-fill',
    //       pathName:
    //         '/dashboard/agent/manage-air-ticket/all-air-ticket-doc-for-agent',
    //       parentId: 'manage-air-ticket',
    //     },
    //     {
    //       id: 'airTicketDocumentuploadrequest',
    //       label: 'Air Ticket Doc  Request',
    //       link: '/dashboard/agent/manage-air-ticket/air-ticket-upload-request',
    //       icon: 'ri-file-list-3-fill',
    //       pathName:
    //         '/dashboard/agent/manage-air-ticket/air-ticket-upload-request',
    //       parentId: 'manage-air-ticket',
    //     },
    //   ],
    // },
    {
      id: 'airTicketDocumentuploadrequest',
      label: 'Air Ticket Doc  Request',
      icon: 'ri-ticket-2-line',
      link: '/dashboard/agent/manage-air-ticket/air-ticket-upload-request',
    },
    {
      id: 'earnings',
      label: 'Earnings',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/agent/earnings',
    },
    {
      id: 'familyTrip',
      label: 'familyTrip',
      icon: 'ri-gift-line',
      link: '/dashboard/agent/familyTrip',
    },
    {
      id: 'yearlyBonous',
      label: 'Yearly Bonous',
      icon: 'ri-percent-line',
      link: '/dashboard/agent/yearlyBonous',
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
          id: 'businesssettings',
          label: 'Business settings',
          icon: 'ri-briefcase-fill',
          link: '/dashboard/agent/settings/business',
          pathName: '/dashboard/agent/settings/business',
          parentId: 'settings',
        },
        // {
        //   id: 'currencysettings',
        //   label: 'Currency Settings',
        //   icon: 'ri-money-dollar-circle-fill',
        //   link: '/dashboard/agent/settings/currency',
        //   pathName: '/dashboard/agent/settings/currency',
        //   parentId: 'settings',
        // },
        // {
        //   id: 'domainsettings',
        //   label: 'Domain Settings',
        //   icon: 'ri-global-fill',
        //   link: '/dashboard/agent/settings/domain',
        //   pathName: '/dashboard/agent/settings/domain',
        //   parentId: 'settings',
        // },
        // {
        //   id: 'paymentsettings',
        //   label: 'Payment Settings',
        //   icon: 'ri-refund-2-fill',
        //   link: '/dashboard/agent/settings/payment',
        //   pathName: '/dashboard/agent/settings/payment',
        //   parentId: 'settings',
        // },
        {
          id: 'profilesettings',
          label: 'Profile Settings',
          icon: 'ri-user-settings-fill',
          link: '/dashboard/agent/settings/profile',
          pathName: '/dashboard/agent/settings/profile',
          parentId: 'settings',
        },
        {
          id: 'changeemail',
          label: 'Change Email',
          icon: 'ri-mail-add-fill',
          link: '/dashboard/agent/settings/email',
          pathName: '/dashboard/agent/settings/email',
          parentId: 'settings',
        },
        {
          id: 'changepassword',
          label: 'Change Password',
          icon: 'ri-lock-password-fill',
          link: '/dashboard/agent/settings/password',
          pathName: '/dashboard/agent/settings/password',
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
          link: '/dashboard/agent/payment-report/package-payment',
          pathName: '/dashboard/agent/payment-report/package-payment',
          parentId: 'payment-report',
        },
        {
          id: 'application-payment',
          label: 'Application Payment',
          icon: 'ri-box-1-line',
          link: '/dashboard/agent/payment-report/application-payment',
          pathName: '/dashboard/agent/payment-report/application-payment',
          parentId: 'payment-report',
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default AgentSidebarData;
