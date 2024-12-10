import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UniversityAdministratorSidebarData = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);

  const [isUniWebManagement, setIsUniWebManagement] = useState(false);

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
    if (iscurrentState !== 'Manage University Site') {
      setIsUniWebManagement(false);
    }
  }, [iscurrentState]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/university-administrator',
    },
    {
      id: 'manageuniversitysite',
      label: 'Manage University Site',
      icon: 'ri-settings-2-fill',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsUniWebManagement(!isUniWebManagement);
        setIscurrentState('Manage University Site');
        updateIconSidebar(e);
      },
      stateVariables: isUniWebManagement,
      subItems: [
        {
          id: 'universityalldescripstions',
          label: 'University Descriptions',
          icon: 'ri-file-info-fill',
          link: '/dashboard/university-administrator/manage-website/university-all-descriptions',
          parentId: 'manageuniversitysite',
        },
        {
          id: 'universityslider',
          label: 'University Slider',
          icon: 'ri-file-image-fill',
          link: '/dashboard/university-administrator/manage-website/university-slider',
          parentId: 'manageuniversitysite',
        },
        {
          id: 'galleryuniversity',
          label: 'University Gallery ',
          icon: 'ri-gallery-fill',
          link: '/dashboard/university-administrator/manage-website/university-gallery',
          parentId: 'manageuniversitysite',
        },
        {
          id: 'universityfaqs',
          label: 'University FAQS',
          icon: 'ri-question-answer-fill',
          link: '/dashboard/university-administrator/manage-website/university-faqs',
          parentId: 'manageuniversitysite',
        },
        {
          id: 'universitysponsors',
          label: 'University Sponsors',
          icon: 'ri-hand-coin-fill',
          link: '/dashboard/university-administrator/manage-website/university-sponsors',
          parentId: 'manageuniversitysite',
        },
        {
          id: 'universitytestimonials',
          label: 'University Testimonials',
          icon: 'ri-shield-star-fill',
          link: '/dashboard/university-administrator/manage-website/university-testimonials',
          parentId: 'manageuniversitysite',
        },
        {
          id: 'universitysociallinks',
          label: 'University Social Links',
          icon: 'ri-links-fill',
          link: '/dashboard/university-administrator/manage-website/university-social-links',
          parentId: 'manageuniversitysite',
        },
      ],
    },
    {
      id: 'departments',
      label: 'University Departments',
      icon: 'ri-school-fill',
      link: '/dashboard/university-administrator/university-management/university-departments',
    },
    {
      id: 'programs',
      label: 'University Programs',
      icon: 'ri-building-4-fill',
      link: '/dashboard/university-administrator/university-management/university-programs',
    },
    {
      id: 'courses',
      label: 'University Courses',
      icon: 'ri-building-fill',
      link: '/dashboard/university-administrator/university-management/university-courses',
    },

 
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default UniversityAdministratorSidebarData;
