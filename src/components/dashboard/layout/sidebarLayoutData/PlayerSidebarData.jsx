import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PlayerSidebarData = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isTeams, setIsTeams] = useState(false);
  const [isEvents, setIsEvents] = useState(false);
  const [isShopping, setIsShopping] = useState(false);
  const [isChat, setIsChat] = useState(false);
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
    document.body.classList.remove('twocolumn-panel');
    if (iscurrentState !== 'Dashboard') {
      setIsDashboard(false);
    }

    if (iscurrentState !== 'Teams') {
      setIsTeams(false);
    }
    if (iscurrentState !== 'Events') {
      setIsEvents(false);
    }

    if (iscurrentState !== 'Chat') {
      setIsChat(false);
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
    isTeams,
    isEvents,
    isChat,
    isMyProfile,
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
      link: '/player',
    },

    {
      label: 'pages',
      isHeader: true,
    },

    {
      id: 'teams',
      label: 'Teams',
      icon: 'ri-user-2-fill',
      link: '/player/teams-for-player',
      click: function (e) {
        e.preventDefault();
        setIsTeams(!isTeams);
        setIscurrentState('Teams');
        updateIconSidebar(e);
      },
      stateVariables: isTeams,
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
          link: '/player/seasonal-games-for-player',
          parentId: 'events',
          pathName: '/player/seasonal-games-for-player',
        },

        {
          id: 'gameschedule',
          label: 'Game Schedule',
          link: '/player/game-schedule-for-player',
          icon: 'ri-game-line',
          parentId: 'events',
          pathName: '/player/game-schedule-for-player',
        },
        {
          id: 'trainingschedule',
          label: 'Training Schedule',
          link: '/player/training-schedule-for-player',
          icon: 'ri-text-spacing',
          parentId: 'events',
          pathName: '/player/training-schedule-for-player',
        },
        {
          id: 'specialevents',
          label: 'Special Events',
          link: '/player/special-events-for-player',
          icon: 'ri-text-spacing',
          parentId: 'events',
          pathName: '/player/special-events-for-player',
        },
      ],
    },

    {
      id: 'shopping',
      label: 'Shopping',
      icon: 'ri-store-line',
      link: '/#',
      click: function (e) {
        e.preventDefault();
        setIsShopping(!isShopping);
        setIscurrentState('Shopping');
        updateIconSidebar(e);
      },
      stateVariables: isShopping,
      subItems: [
        // {
        //   id: 'productlist',
        //   label: 'Product List',
        //   icon: 'ri-list-check-2',
        //   link: '/guardian/productListForGuardian',
        //   parentId: 'shopping',
        //   pathName: '/guardian/productListForGuardian',
        // },

        // {
        //   id: 'shoppingcart',
        //   label: 'Shopping Cart',
        //   link: '/guardian/shoppingCartForGuardian',
        //   icon: 'ri-shopping-cart-line',
        //   parentId: 'shopping',
        //   pathName: '/guardian/shoppingCartForGuardian',
        // },
        {
          id: 'orderlist',
          label: 'order List',
          link: '/player/order-list-for-player',
          icon: 'ri-shopping-cart-line',
          parentId: 'shopping',
          pathName: '/player/order-list-for-player',
        },
      ],
    },

    // {
    //   id: 'chat',
    //   label: 'Chat',
    //   icon: 'ri-chat-1-line',
    //   link: '/player/chatForPlayer',
    //   pathName: '/player/chatForPlayer',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsChat(!isChat);
    //     setIscurrentState('Chat');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isChat,
    // },

    {
      id: 'myprofile',
      label: 'My profile',
      icon: 'ri-article-line',
      link: '/player/player-profile-for-player',
      pathName: '/player/player-profile-for-player',
      click: function (e) {
        e.preventDefault();
        setIsMyProfile(!isMyProfile);
        setIscurrentState('My Profile');
        updateIconSidebar(e);
      },
      stateVariables: isMyProfile,
    },
    {
      label: 'Components',
      isHeader: true,
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
        updateIconSidebar(e);
      },
      stateVariables: isSettings,
      subItems: [
        {
          id: 'profilesettings',
          label: 'Profile Settings',
          link: '/player/player-settings',
          icon: 'ri-profile-line',
          parentId: 'settings',
          pathName: '/player/player-settings',
        },
        {
          id: 'changeemail',
          label: 'Change Email',
          icon: 'ri-mail-settings-line',
          link: '/player/change-email-for-player',
          parentId: 'settings',
          pathName: '/player/change-email-for-player',
        },

        {
          id: 'changepassword',
          label: 'Change Password',
          link: '/player/change-password-for-player',
          icon: 'ri-lock-password-line',
          parentId: 'settings',
          pathName: '/player/change-password-for-player',
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default PlayerSidebarData;
