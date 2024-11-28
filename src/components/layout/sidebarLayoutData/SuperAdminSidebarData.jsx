import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SuperAdminSidebarData = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isUniversities, setIsUniversities] = useState(false);
  const [isUniversity, setIsUniversity] = useState(false);
  const [isUniManagement, setIsUniManagement] = useState(false);

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
      link: '/super-admin',
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
          id: 'uni-management',
          label: 'University Management',
          icon: '',
          link: '/#',
          parentId: 'universities',
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsUniManagement(!isUniManagement);
            updateIconSidebar(e);
          },
          stateVariables: isUniManagement,
          childItems: [
            {
              id: 'alluniversity',
              label: 'All University',
              icon: '',
              link: '/super-admin/university-management/all-university',
              parentId: 'uni-management',
            },
          ],
        },
      ],
    },
    {
      id: 'package',
      label: 'Packages',
      icon: 'ri-price-tag-2-fill',
      link: '/super-admin/',
    },
    {
      id: 'agents',
      label: 'Agents',
      icon: 'ri-group-2-fill',
      link: '/super-admin/agents',
    },
    {
      id: 'students',
      label: 'Self Registered Students',
      icon: 'ri-group-fill',
      link: '/super-admin',
    },
    {
      id: 'students',
      label: 'By Agent Students',
      icon: 'ri-group-fill',
      link: '/super-admin',
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default SuperAdminSidebarData;
