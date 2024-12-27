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

    if (iscurrentState !== 'University') {
      setIsUniversity(false);
    }

    if (iscurrentState !== 'Manage Document') {
      setIsManageDocument(false);
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

        // {
        //   id: 'applieduniversity',
        //   label: 'Applied University',
        //   link: '/dashboard/student/university-management/applied-university-for-student',
        //   icon: 'ri-building-4-fill',
        //   pathName:
        //     '/dashboard/student/university-management/applied-university-for-student',
        //   parentId: 'university',
        // },
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
      id: 'myprofile',
      label: 'My profile',
      icon: 'ri-article-line',
      link: '/dashboard/student/profile-settings-for-student',
      pathName: '/dashboard/student/profile-settings-for-student',
      click: function (e) {
        e.preventDefault();
        setIsMyProfile(!isMyProfile);
        setIscurrentState('My Profile');
      },
      stateVariables: isMyProfile,
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default StudentSidebarData;
