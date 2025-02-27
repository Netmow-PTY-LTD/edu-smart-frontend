import React, { useEffect, useState } from 'react';

const AdmissionManagerSidebarData = () => {
  //state data
  const [isUniversities, setIsUniversities] = useState(false);
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
    if (iscurrentState !== 'Universities') {
      setIsUniversities(false);
    }
  }, [iscurrentState]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/admission-manager',
    },
    // {
    //   id: 'universities',
    //   label: 'Universities',
    //   icon: 'ri-school-fill',
    //   link: '/#',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsUniversities(!isUniversities);
    //     setIscurrentState('Universities');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isUniversities,
    //   subItems: [
    //     {
    //       id: 'alluniversity',
    //       label: 'All University',
    //       icon: 'ri-school-fill',
    //       link: '/dashboard/admission-manager/university-management/all-university',
    //       parentId: 'universities',
    //     },
    //     {
    //       id: 'adduniversity',
    //       label: 'Add University',
    //       icon: 'ri-school-fill',
    //       link: '/dashboard/admission-manager/university-management/add-university',
    //       parentId: 'universities',
    //     },
    //   ],
    // },

    {
      id: 'recent-application',
      label: 'Recent Application',
      icon: 'ri-article-fill',
      link: '/dashboard/admission-manager/recent-application',
    },

    // {
    //   id: 'alldocuments',
    //   label: 'Document Required List',
    //   icon: 'ri-file-copy-2-fill',
    //   link: '/dashboard/admission-manager/all-documents',
    // },
    {
      id: 'agents',
      label: 'Agents',
      icon: 'ri-group-2-fill',
      link: '/dashboard/admission-manager/agents',
    },
    {
      id: 'students',
      label: 'Students',
      icon: 'ri-group-fill',
      link: '/dashboard/admission-manager/students',
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
          id: 'profilesettings',
          label: 'Profile Settings',
          icon: 'ri-user-settings-fill',
          link: '/dashboard/admission-manager/settings/profile',
          pathName: '/dashboard/admission-manager/settings/profile',
          parentId: 'settings',
        },
        // {
        //   id: 'changeemail',
        //   label: 'Change Email',
        //   icon: 'ri-mail-add-fill',
        //   link: '/dashboard/admission-manager/settings/email',
        //   pathName: '/dashboard/admission-manager/settings/email',
        //   parentId: 'settings',
        // },
        // {
        //   id: 'changepassword',
        //   label: 'Change Password',
        //   icon: 'ri-lock-password-fill',
        //   link: '/dashboard/admission-manager/settings/password',
        //   pathName: '/dashboard/admission-manager/settings/password',
        //   parentId: 'settings',
        // },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default AdmissionManagerSidebarData;
