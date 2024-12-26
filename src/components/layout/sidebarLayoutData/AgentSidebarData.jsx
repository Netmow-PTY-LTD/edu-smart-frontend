import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AgentSidebarData = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isWebsite, setIsWebsite] = useState(false);
  const [isManageDocument, setIsManageDocument] = useState(false);
  const [isStudentManagement, setIsStudentManagement] = useState(false);
  const [isUinversityManagement, setIsUinversityManagement] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
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
    if (iscurrentState !== 'Dashboard') {
      setIsDashboard(false);
    }

    if (iscurrentState !== 'Website') {
      setIsWebsite(false);
    }

    if (iscurrentState !== 'Manage Document') {
      setIsManageDocument(false);
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
      label: 'University Management',
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
      label: 'Student Management',
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

    // {
    //   id: 'managedocument',
    //   label: 'Manage Documents',
    //   icon: 'ri-article-fill',
    //   link: '/#',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsManageDocument(!isManageDocument);
    //     setIscurrentState('Manage Document');
    //   },
    //   stateVariables: isManageDocument,
    //   subItems: [
    //     {
    //       id: 'alldocument',
    //       label: 'All Document',
    //       link: '/dashboard/agent/manage-documents/all-document-for-agent',
    //       icon: 'ri-file-fill',
    //       pathName: '/dashboard/agent/manage-documents/all-document-for-agent',
    //       parentId: 'managedocument',
    //     },
    //     {
    //       id: 'documentuploadrequest',
    //       label: 'Doc Upload Request',
    //       link: '/dashboard/agent/manage-documents/document-upload-request',
    //       icon: 'ri-file-list-3-fill',
    //       pathName: '/dashboard/agent/manage-documents/document-upload-request',
    //       parentId: 'managedocument',
    //     },
    //   ],
    // },

    {
      id: 'myprofile',
      label: 'My profile',
      icon: 'ri-article-line',
      link: '/dashboard/agent/profile-settings-for-agent',
      pathName: '/dashboard/agent/profile-settings-for-agent',
      click: function (e) {
        e.preventDefault();
        setIsMyProfile(!isMyProfile);
        setIscurrentState('My Profile');
      },
      stateVariables: isMyProfile,
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
      subItems: [],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default AgentSidebarData;
