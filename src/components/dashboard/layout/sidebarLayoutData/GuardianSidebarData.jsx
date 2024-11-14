import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const GuardianNavdata = () => {
  const history = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isPlayers, setIsPlayers] = useState(false);
  const [isEvents, setIsEvents] = useState(false);
  const [isShopping, setIsShopping] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
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

    if (iscurrentState !== 'Players') {
      setIsPlayers(false);
    }
    if (iscurrentState !== 'Events') {
      setIsEvents(false);
    }
    if (iscurrentState !== 'Shopping') {
      setIsShopping(false);
    }

    if (iscurrentState !== 'Chat') {
      setIsChat(false);
    }

    if (iscurrentState !== 'Charges') {
      setIsInvoices(false);
    }
    if (iscurrentState !== 'Settings') {
      setIsSettings(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isPlayers,
    isEvents,
    isChat,
    isInvoices,
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
      link: '/guardian',
    },

    {
      label: 'pages',
      isHeader: true,
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
          link: '/guardian/add-player-for-guardian',
          parentId: 'players',
          pathName: '/guardian/add-player-for-guardian',
        },
        {
          id: 'allplayer',
          label: 'All Player',
          link: '/guardian/all-player-for-guardian',
          icon: 'ri-group-fill',
          parentId: 'players',
          pathName: '/guardian/all-player-for-guardian',
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
          link: '/guardian/seasonal-games-for-guardian',
          parentId: 'events',
          pathName: '/guardian/seasonal-games-for-guardian',
        },

        {
          id: 'gameschedule',
          label: 'Game Schedule',
          link: '/guardian/game-schedule-for-guardian',
          icon: 'ri-game-line',
          parentId: 'events',
          pathName: '/guardian/game-schedule-for-guardian',
        },
        {
          id: 'trainingschedule',
          label: 'Training Schedule',
          link: '/guardian/training-schedule-for-guardian',
          icon: 'ri-text-spacing',
          parentId: 'events',
          pathName: '/guardian/training-schedule-for-guardian',
        },
        {
          id: 'specialevents',
          label: 'Special Events',
          link: '/guardian/special-events-for-guardian',
          icon: 'ri-honour-line',
          parentId: 'events',
          pathName: '/guardian/special-events-for-guardian',
        },

        // {
        //   id: 'seasonalgamesorderlist',
        //   label: 'Order List',
        //   link: '/guardian/seasonal-games-order-list-for-guardian',
        //   icon: 'ri-honour-line',
        //   parentId: 'events',
        //   pathName: '/guardian/seasonal-games-order-list-for-guardian',
        // },
      ],
    },

    //   {
    //   id: 'invoice',
    //   label: 'Invoices',
    //   icon: 'ri-honour-line',
    //   link: '/guardian/seasonal-games-order-list-for-guardian',
    //   pathName: '/guardian/seasonal-games-order-list-for-guardian',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsChat(!isChat);
    //     setIscurrentState('Chat');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isChat,
    // },

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
          link: '/guardian/order-list-for-guardian',
          icon: 'ri-shopping-cart-line',
          parentId: 'shopping',
          pathName: '/guardian/order-list-for-guardian',
        },
      ],
    },

    // {
    //   id: 'chat',
    //   label: 'Chat',
    //   icon: 'ri-chat-1-line',
    //   link: '/guardian/chat-for-guardian',
    //   pathName: '/guardian/chat-for-guardian',
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsChat(!isChat);
    //     setIscurrentState('Chat');
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isChat,
    // },

    {
      id: 'invoices',
      label: 'Invoices',
      icon: 'ri-article-line',
      link: '/guardian/invoices-for-guardian',
      pathName: '/guardian/invoices-for-guardian',
      click: function (e) {
        e.preventDefault();
        setIsInvoices(!isInvoices);
        setIscurrentState('Invoices');
        updateIconSidebar(e);
      },
      stateVariables: isInvoices,
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
          link: '/guardian/guardian-settings',
          icon: 'ri-profile-line',
          parentId: 'settings',
          pathName: '/manager/manager-settings',
        },
        {
          id: 'changeemail',
          label: 'Change Email',
          icon: 'ri-mail-settings-line',
          link: '/guardian/change-email-for-guardian',
          parentId: 'settings',
          pathName: '/guardian/change-email-for-guardian',
        },

        {
          id: 'changepassword',
          label: 'Change Password',
          link: '/guardian/change-password-for-guardian',
          icon: 'ri-lock-password-line',
          parentId: 'settings',
          pathName: '/guardian/change-password-for-guardian',
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default GuardianNavdata;
