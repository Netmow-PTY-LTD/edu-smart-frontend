import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useCustomData } from '@/utils/common/data/customeData';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const StudentSidebarData = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isUniversity, setIsUniversity] = useState(false);
  const [isManageDocument, setIsManageDocument] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [iscurrentState, setIscurrentState] = useState('Dashboard');
  const [isPaymentReport, setIsPaymentReport] = useState(false);
  const [isManageAirTicket, setIsManageAirTicket] = useState(false);

  const { data: userInfoData } = useGetUserInfoQuery();

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

    if (iscurrentState !== 'University') {
      setIsUniversity(false);
    }

    if (iscurrentState !== 'Manage Document') {
      setIsManageDocument(false);
    }
    if (iscurrentState !== 'Manage Air Ticket') {
      setIsManageAirTicket(false);
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
    isUniversity,
    isManageDocument,
    isMyProfile,
    isSettings,
  ]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/student',
    },

    {
      id: 'university',
      label: 'University',
      icon: 'ri-school-fill',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsUniversity(!isUniversity);
        setIscurrentState('University');
      },
      stateVariables: isUniversity,
      subItems: [
        {
          id: 'alluniversity',
          label: 'All University',
          icon: 'ri-government-fill',
          link: '/dashboard/student/university-management/all-university-for-student',
          pathName:
            '/dashboard/student/university-management/all-university-for-student',
          parentId: 'university',
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
          id: 'alldocuments',
          label: 'All Documents',
          icon: 'ri-file-list-fill',
          link: '/dashboard/student/manage-documents/all-submitted-documents-for-students',
          pathName:
            '/dashboard/student/manage-documents/all-submitted-documents-for-students',
          parentId: 'managedocument',
        },

        {
          id: 'documentuploadrequest',
          label: 'Doc Upload Request',
          link: '/dashboard/student/manage-documents/document-upload-request-for-students',
          icon: 'ri-file-list-3-fill',
          pathName:
            '/dashboard/student/manage-documents/document-upload-request-for-students',
          parentId: 'managedocument',
        },
      ],
    },

    {
      id: 'airTicketDocumentuploadrequest',
      label: 'Air Ticket Doc  Request',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/student/manage-air-ticket/air-ticket-upload-request',
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: 'ri-list-check-3',
      link: '/dashboard/student/applications',
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
          id: 'application-invoice',
          label: 'Application Invoices',
          icon: 'ri-receipt-fill',
          link: '/dashboard/student/application-invoices',
          parentId: 'invoices',
        },
      ],
    },
    {
      id: 'student-profile',
      label: 'My Profile',
      icon: 'ri-list-check-3',
      link: '/dashboard/student/student-profile',
    },
    ...(userInfoData?.data?.agent?._id
      ? [
          {
            id: 'your_agent_profile',
            label: 'Your Partner',
            icon: 'ri-user-settings-fill',
            link: '/dashboard/student/agent-profile',
          },
        ]
      : []),

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
          id: 'profilesettings',
          label: 'Profile Settings',
          icon: 'ri-user-settings-fill',
          link: '/dashboard/student/settings/profile',
          pathName: '/dashboard/student/settings/profile',
          parentId: 'settings',
        },
        {
          id: 'changeemail',
          label: 'Change Email',
          icon: 'ri-mail-add-fill',
          link: '/dashboard/student/settings/email',
          pathName: '/dashboard/student/settings/email',
          parentId: 'settings',
        },
        {
          id: 'changepassword',
          label: 'Change Password',
          icon: 'ri-lock-password-fill',
          link: '/dashboard/student/settings/password',
          pathName: '/dashboard/student/settings/password',
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
          id: 'application-payment',
          label: 'Application Payment',
          icon: 'ri-box-1-line',
          link: '/dashboard/student/payment-report/application-payment',
          pathName: '/dashboard/student/payment-report/application-payment',
          parentId: 'payment-report',
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default StudentSidebarData;
