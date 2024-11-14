import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Navdata = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isWebsite, setIsWebsite] = useState(false);
  const [isNews, setIsNews] = useState(false);
  const [isWebsettings, setIsWebsettings] = useState(false);
  const [isGuardians, setIsGuardians] = useState(false);
  const [isEcommerce, setEcommerce] = useState(false);
  const [isPlayers, setIsPlayers] = useState(false);
  const [isTeams, setIsTeams] = useState(false);
  const [isEvents, setIsEvents] = useState(false);
  const [isAttendance, setIsAttendance] = useState(false);
  const [isSponsors, setIsSponsors] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isSubscriptions, setIsSubscriptions] = useState(false);
  const [isReports, setIsReports] = useState(false);
  const [isBilling, setIsBilling] = useState(false);
  const [isNoticeBoard, setIsNoticeBoard] = useState(false);
  const [isEarningManagement, setEarningManagement] = useState(false);
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
    if (iscurrentState !== 'Website') {
      setIsWebsite(false);
    }
    if (iscurrentState !== 'News') {
      setIsNews(false);
    }
    if (iscurrentState !== 'Guardians') {
      setIsGuardians(false);
    }
    if (iscurrentState !== 'Players') {
      setIsPlayers(false);
    }
    if (iscurrentState !== 'Events') {
      setIsEvents(false);
    }
    if (iscurrentState !== 'Attendance') {
      setIsAttendance(false);
    }
    if (iscurrentState !== 'Sponsors') {
      setIsSponsors(false);
    }
    if (iscurrentState !== 'Chat') {
      setIsChat(false);
    }
    // if (iscurrentState !== 'Subscriptions') {
    //   setIsSubscriptions(false);
    // }
    if (iscurrentState !== 'Reports') {
      setIsReports(false);
    }
    if (iscurrentState !== 'Billings') {
      setIsBilling(false);
    }

    if (iscurrentState !== 'Notices') {
      setIsNoticeBoard(false);
    }
    if (iscurrentState !== 'EarningManagement') {
      setEarningManagement(false);
    }
    if (iscurrentState !== 'Settings') {
      setIsSettings(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isWebsite,
    isGuardians,
    isPlayers,
    isTeams,
    isEvents,
    isAttendance,
    isSponsors,
    isChat,
    isSubscriptions,
    isReports,
    isBilling,
    isEarningManagement,
    isSettings,
  ]);

  const menuItems = [
    {
      label: 'Menu',
      isHeader: true,
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/admin',
    },
    // website part
    {
      id: 'website',
      label: 'Website',
      icon: 'ri-layout-line',
      link: '/',
      click: function (e) {
        e.preventDefault();
        setIsWebsite(!isWebsite);
        setIscurrentState('Website');
        // updateIconSidebar(e);
      },
      stateVariables: isWebsite,
      subItems: [
        {
          id: 'websetting',
          label: 'Website Settings',
          icon: 'ri-file-warning-line',
          link: '/#',
          parentId: 'website',
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsWebsettings(!isWebsettings);
          },
          stateVariables: isWebsettings,
          childItems: [
            {
              id: 'webinfo',
              label: 'Website Info',
              icon: 'ri-file-warning-line',
              link: '/admin/web-settings/web-info',
              parentId: 'website',
              pathname: '/admin/web-settings/web-info',
            },
            {
              id: 'slider',
              label: 'Slider',
              icon: 'ri-file-warning-line',
              link: '/admin/web-settings/slider',
              parentId: 'website',
              pathname: '/admin/web-settings/slider',
            },
            {
              id: 'gallery',
              label: 'Gallery',
              icon: 'ri-file-warning-line',
              link: '/admin/web-settings/gallery',
              parentId: 'website',
              pathname: '/admin/web-settings/gallery',
            },
          ],
        },
        {
          id: 'notices',
          label: 'Notices',
          icon: 'ri-coins-line',
          link: '/#',
          parentId: 'website',
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsNoticeBoard(!isNoticeBoard);
          },
          stateVariables: isNoticeBoard,
          childItems: [
            {
              id: 'add-notice',
              label: 'Add Notice',
              icon: 'ri-money-dollar-circle-line',
              link: '/admin/notices/add-notice',
              parentId: 'notices',
              pathName: '/admin/notices/add-notice',
            },
            {
              id: 'edit-notice',
              label: 'Edit Notice',
              icon: 'ri-money-dollar-circle-line',
              link: '/admin/notices/edit-notice',
              parentId: 'notices',
              pathName: '/admin/notices/edit-notice',
            },
            {
              id: 'notice-list',
              label: 'Notice List',
              icon: 'ri-money-dollar-circle-line',
              link: '/admin/notices',
              parentId: 'notices',
              pathName: 'admin/notices',
            },
          ],
        },
        {
          id: 'ecommerce',
          label: 'E-commerce',
          icon: 'ri-store-3-line',
          link: '',
          parentId: 'website',
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setEcommerce(!isEcommerce);
          },
          stateVariables: isEcommerce,
          childItems: [
            {
              id: 'addproduct',
              label: 'Add Product',
              link: '/admin/ecommerce/add-product',
              icon: 'ri-product-hunt-fill',
              parentId: 'ecommerce',
              pathName: '/admin/ecommerce/add-product',
            },
            {
              id: 'allproduct',
              label: 'All Product',
              link: '/admin/ecommerce/all-product',
              icon: 'ri-product-hunt-line',
              parentId: 'ecommerce',
              pathName: '/admin/ecommerce/all-product',
            },
            {
              id: 'allorderlist',
              label: 'Order Lists',
              link: '/admin/ecommerce/order-lists',
              icon: 'ri-bank-card-line',
              parentId: 'ecommerce',
              pathName: '/admin/ecommerce/order-lists',
            },
            {
              id: 'category',
              label: 'Category',
              icon: 'ri-open-source-line',
              link: '/admin/ecommerce/shop-category',
              parentId: 'ecommerce',
              pathName: '/admin/ecommerce/shop-category',
            },
            {
              id: 'productsize',
              label: 'Product Sizes',
              icon: 'ri-menu-5-fill',
              link: '/admin/ecommerce/product-size',
              parentId: 'ecommerce',
              pathName: '/admin/ecommerce/product-size',
            },
          ],
        },
        {
          id: 'news',
          label: 'News',
          icon: 'ri-newspaper-line',
          link: '/#',
          parentId: 'website',
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsNews(!isNews);
            updateIconSidebar(e);
          },
          stateVariables: isNews,
          childItems: [
            {
              id: 'news',
              label: 'News List',
              icon: 'ri-newspaper-line',
              link: '/admin/news',
              parentId: 'website',
            },
            {
              id: 'addNews',
              label: 'Add News',
              icon: 'ri-newspaper-line',
              link: '/admin/news/add-news',
              parentId: 'website',
            },
            {
              id: 'category',
              label: 'Category',
              icon: 'ri-user-add-line',
              link: '/admin/news/category',
              parentId: 'news',
              pathName: '/admin/news/category',
            },
          ],
        },

        {
          id: 'message',
          label: 'Contact Message',
          icon: 'ri-file-list-line',
          link: '/admin/contact-message',
          parentId: 'website',
          pathName: '/admin/contact-message',
        },
        {
          id: 'waitlist',
          label: 'Waitlist Request',
          icon: 'ri-user-add-line',
          link: '/admin/waitlist-request',
          parentId: 'website',
          pathName: '/admin/waitlist-request',
        },
      ],
    },

    {
      label: 'pages',
      isHeader: true,
    },
    {
      id: 'guardians',
      label: 'Guardians',
      icon: 'ri-layout-line',
      link: '',
      click: function (e) {
        e.preventDefault();
        setIsGuardians(!isGuardians);
        setIscurrentState('Guardians');
        updateIconSidebar(e);
      },
      stateVariables: isGuardians,
      subItems: [
        {
          id: 'addguardian',
          label: 'Add Guardian',
          icon: 'ri-user-add-line',
          link: '/admin/add-guardian',
          parentId: 'guardians',
          pathName: '/admin/add-guardian',
        },
        {
          id: 'allguardian',
          label: 'All Guardians',
          link: '/admin/all-guardians',
          icon: 'ri-group-line',
          parentId: 'guardians',
          pathName: '/admin/all-guardians',
        },

        {
          id: 'activeguardian',
          label: 'Active Guardians',
          link: '/admin/active-guardians',
          icon: 'ri-group-line',
          parentId: 'guardians',
          pathName: '/admin/active-guardians',
        },

        {
          id: 'inactiveguardian',
          label: 'Inactive Guardians',
          link: '/admin/inactive-guardians',
          icon: 'ri-group-line',
          parentId: 'guardians',
          pathName: '/admin/inactive-guardians',
        },
      ],
    },

    {
      id: 'players',
      label: 'Players',
      icon: 'ri-user-2-fill',
      link: '',
      click: function (e) {
        e.preventDefault();
        setIsPlayers(!isPlayers);
        setIscurrentState('Players');
        updateIconSidebar(e);
      },
      stateVariables: isPlayers,
      subItems: [
        {
          id: 'addplayer',
          label: 'Add Player',
          icon: 'ri-user-add-fill',
          link: '/admin/add-player',
          parentId: 'players',
          pathName: '/admin/add-player',
        },
        {
          id: 'allplayer',
          label: 'All Player',
          link: '/admin/all-players',
          icon: 'ri-group-fill',
          parentId: 'players',
          pathName: '/admin/all-players',
        },
        {
          id: 'activePlayers',
          label: 'Active Players',
          link: '/admin/active-players',
          icon: 'ri-group-fill',
          parentId: 'players',
          pathName: '/admin/active-players',
        },
        {
          id: 'inactivePlayers',
          label: 'Inactive Players',
          link: '/admin/inactive-players',
          icon: 'ri-group-fill',
          parentId: 'players',
          pathName: '/admin/inactive-players',
        },
      ],
    },
    {
      id: 'teams',
      label: 'Teams',
      icon: 'ri-team-line',
      link: '',
      stateVariables: isTeams,
      click: function (e) {
        e.preventDefault();
        setIsTeams(!isTeams);
        setIscurrentState('Teams');
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: 'add-new-team',
          label: 'Add New Team',
          icon: 'ri-add-circle-line',
          link: '/admin/add-new-team',
          parentId: 'teams',
          pathName: '/admin/add-new-team',
        },
        {
          id: 'teammanagement',
          label: 'Team Management',
          icon: 'ri-arrow-left-right-line',
          link: '/admin/team-management',
          parentId: 'teams',
          pathName: '/admin/team-management',
        },
        {
          id: 'managers',
          label: 'Managers',
          link: '/admin/managers',
          icon: 'ri-user-6-line',
          parentId: 'teams',
          pathName: '/admin/managers',
        },
        {
          id: 'trainers',
          label: 'Trainers',
          link: '/admin/trainers',
          icon: 'ri-map-pin-user-line',
          parentId: 'teams',
          pathName: '/admin/trainers',
        },
      ],
    },
    {
      label: 'Components',
      isHeader: true,
    },
    {
      id: 'events',
      label: 'Events',
      icon: 'ri-calendar-event-line',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsEvents(!isEvents);
        setIscurrentState('Events');
        updateIconSidebar(e);
      },
      stateVariables: isEvents,
      subItems: [
        {
          id: 'seasonalgames',
          label: 'Seasonal Games',
          icon: 'ri-gamepad-line',
          link: '/admin/seasonal-games',
          parentId: 'events',
          pathName: '/admin/seasonal-games',
        },
        {
          id: 'trainingschedule',
          label: 'Training Schedule',
          icon: 'ri-text-spacing',
          link: '/admin/training-schedule',
          parentId: 'events',
          pathName: '/admin/training-schedule',
        },
        {
          id: 'game-schedules',
          label: 'Game Schedule',
          link: '/admin/game-schedules',
          icon: 'ri-game-line',
          parentId: 'events',
          pathName: '/admin/game-schedules',
        },
        {
          id: 'specialevents',
          label: 'Special Events',
          link: '/admin/special-events',
          icon: 'ri-honour-line',
          parentId: 'events',
          pathName: '/admin/special-events',
        },
      ],
    },
    // {
    //   id: 'attendance',
    //   label: 'Attendance',
    //   icon: 'ri-folder-user-line',
    //   link: '/admin/attendance',
    //   pathName: '/admin/attendance',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsAttendance(!isAttendance);
    //     setIscurrentState('Attendance');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isAttendance,
    // },

    {
      id: 'sponsors',
      label: 'Sponsors',
      icon: 'ri-hotspot-line',
      link: '/admin/sponsors',
      pathName: '/admin/sponsors',
      click: function (e) {
        e.preventDefault();
        setIsSponsors(!isSponsors);
        setIscurrentState('Sponsors');
        updateIconSidebar(e);
      },
      stateVariables: isSponsors,
    },
    // {
    //   id: 'chat',
    //   label: 'Chat',
    //   icon: 'ri-chat-1-line',
    //   link: '/admin/chat',
    //   pathName: '/admin/chat',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsChat(!isChat);
    //     setIscurrentState('Chat');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isChat,
    // },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      icon: 'ri-mail-open-line',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsSubscriptions(!isSubscriptions);
        setIscurrentState('Subscriptions');
        updateIconSidebar(e);
      },
      stateVariables: isSubscriptions,
      subItems: [
        {
          id: 'playersubscriptions',
          label: 'Player Registrations ',
          icon: 'ri-user-2-fill',
          link: '/admin/player-registrations-subscriptions',
          parentId: 'subscriptions',
          pathName: '/admin/player-registrations-subscriptions',
        },
        // {
        //   id: 'teamsubscriptions',
        //   label: 'Team Subscriptions',
        //   icon: 'ri-time-line',
        //   link: '/admin/teamSubscriptions',
        //   parentId: 'subscriptions',
        //   pathName: '/admin/teamSubscriptions',
        // },
        {
          id: 'seasonalgamesubscriptions',
          label: 'Seasonal Games',
          link: '/admin/seasonal-game-subscriptions',
          icon: 'ri-gamepad-line',
          parentId: 'subscriptions',
          pathName: '/admin/seasonal-game-subscriptions',
        },
      ],
    },
    // {
    //   id: 'reports',
    //   label: 'Reports',
    //   icon: 'ri-file-chart-line',
    //   link: '/admin/reports',
    //   pathName: '/admin/reports',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsReports(!isReports);
    //     setIscurrentState('Reports');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isReports,
    // },
    {
      id: 'billings',
      label: 'Billings',
      icon: 'ri-coins-line',
      link: '/#',

      click: function (e) {
        e.preventDefault();
        setIsBilling(!isBilling);
        setIscurrentState('Billings');
        updateIconSidebar(e);
      },
      stateVariables: isBilling,
      subItems: [
        {
          id: 'charges',
          label: 'Charges',
          icon: 'ri-money-dollar-circle-line',
          link: '/admin/charges',
          parentId: 'billings',
          pathName: '/admin/charges',
        },
        {
          id: 'totalEarning',
          label: 'Total Earning',
          icon: 'ri-money-dollar-box-fill',
          link: '/admin/earning-management/total-earning',
          parentId: 'earningManagement',
          pathName: '/admin/earning-management/total-earning',
        },
      ],
    },
    // {
    //   id: 'earningManagement',
    //   label: 'Earning Management',
    //   icon: 'ri-currency-fill',
    //   link: '/#',

    //   click: function (e) {
    //     e.preventDefault();
    //     setEarningManagement(!isEarningManagement);
    //     setIscurrentState('EarningManagement');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isEarningManagement,
    //   subItems: [
    //     {
    //       id: 'totalEarning',
    //       label: 'Total Earning',
    //       icon: 'ri-money-dollar-box-fill',
    //       link: '/admin/earning-management/total-earning',
    //       parentId: 'earningManagement',
    //       pathName: '/admin/earning-management/total-earning',
    //     },
    //   ],
    // },

    {
      id: 'settings',
      label: 'Settings',
      icon: 'ri-settings-3-line',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsSettings(!isSettings);
        setIscurrentState('Settings');
        updateIconSidebar(e);
      },
      stateVariables: isSettings,
      subItems: [
        // {
        //   id: 'systemsettings',
        //   label: 'System Settings',
        //   link: '/admin/adminSystemSettings',
        //   icon: 'ri-centos-fill',
        //   parentId: 'settings',
        //   pathName: '/admin/adminSystemSettings',
        // },
        {
          id: 'others',
          label: 'Club Or Team Settings',
          link: '/admin/settings',
          pathName: '/admin/settings',
          icon: 'ri-list-settings-line',
          parentId: 'settings',
        },
        {
          id: 'profilesettings',
          label: 'Profile Settings',
          link: '/admin/admin-profile-settings',
          icon: 'ri-profile-line',
          parentId: 'settings',
          pathName: '/admin/admin-profile-settings',
        },
        {
          id: 'changeemail',
          label: 'Change Email',
          icon: 'ri-mail-settings-line',
          link: '/admin/change-email-for-admin',
          parentId: 'settings',
          pathName: '/admin/change-email-for-admin',
        },

        {
          id: 'changepassword',
          label: 'Change Password',
          link: '/admin/change-password-for-admin',
          icon: 'ri-lock-password-line',
          parentId: 'settings',
          pathName: '/admin/change-password-for-admin',
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
