import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SuperAdminSidebarData = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isUniversities, setIsUniversities] = useState(false);
  const [isUniversity, setIsUniversity] = useState(false);
  const [isUniManagement, setIsUniManagement] = useState(false);
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
    if (iscurrentState !== 'Universities') {
      setIsUniversities(false);
    }
    if (iscurrentState !== 'University') {
      setIsUniversity(false);
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
    {
      id: 'package',
      label: 'Packages',
      icon: 'ri-price-tag-2-fill',
      link: '/dashboard/super-admin/packages',
    },
    {
      id: 'hotoffer',
      label: 'Hot Offers',
      icon: 'ri-fire-fill',
      link: '/dashboard/super-admin/hot-offer',
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
        {
          id: 'currencysettings',
          label: 'Currency Settings',
          icon: 'ri-money-dollar-circle-fill',
          link: '/dashboard/super-admin/settings/currency',
          pathName: '/dashboard/super-admin/settings/currency',
          parentId: 'settings',
        },
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
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default SuperAdminSidebarData;
