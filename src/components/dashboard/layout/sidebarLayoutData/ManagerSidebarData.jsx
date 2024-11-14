import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ManagerSidebarData = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isTeams, setIsTeams] = useState(false);
  const [isEvents, setIsEvents] = useState(false);
  const [isShopping, setIsShopping] = useState(false);
  const [isChat, setIsChat] = useState(false);
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
      link: '/manager',
    },

    {
      label: 'pages',
      isHeader: true,
    },

    {
      id: 'teams',
      label: 'Teams',
      icon: 'ri-user-2-fill',
      link: '/manager/teams-for-manager',
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
          link: '/manager/seasonal-games-for-manager',
          parentId: 'events',
          pathName: '/manager/seasonal-games-for-manager',
        },

        {
          id: 'trainingschedule',
          label: 'Training Schedule',
          link: '/manager/training-schedule-for-manager',
          icon: 'ri-text-spacing',
          parentId: 'events',
          pathName: '/manager/training-schedule-for-manager',
        },
        {
          id: 'gameschedule',
          label: 'Game Schedule',
          link: '/manager/game-schedule-for-manager',
          icon: 'ri-game-line',
          parentId: 'events',
          pathName: '/manager/game-schedule-for-manager',
        },
        {
          id: 'specialevents',
          label: 'Special Events',
          link: '/manager/special-events-for-manager',
          icon: 'ri-calendar-event-line',
          parentId: 'events',
          pathName: '/manager/special-events-for-manager',
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
          link: '/manager/order-list-for-manager',
          icon: 'ri-shopping-cart-line',
          parentId: 'shopping',
          pathName: '/manager/order-list-for-manager',
        },
      ],
    },

    // {
    //   id: 'chat',
    //   label: 'Chat',
    //   icon: 'ri-chat-1-line',
    //   link: '/manager/chatForManager',
    //   pathName: '/manager/chatForManager',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsChat(!isChat);
    //     setIscurrentState('Chat');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isChat,
    // },

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
          link: '/manager/manager-settings',
          icon: 'ri-profile-line',
          parentId: 'settings',
          pathName: '/manager/manager-settings',
        },
        {
          id: 'changeemail',
          label: 'Change Email',
          icon: 'ri-mail-settings-line',
          link: '/manager/change-email-for-manager',
          parentId: 'settings',
          pathName: '/manager/change-email-for-manager',
        },

        {
          id: 'changepassword',
          label: 'Change Password',
          link: '/manager/change-password-for-manager',
          icon: 'ri-lock-password-line',
          parentId: 'settings',
          pathName: '/manager/change-password-for-manager',
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default ManagerSidebarData;
