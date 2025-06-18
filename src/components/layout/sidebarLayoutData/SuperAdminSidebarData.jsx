
import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
import { useCustomData } from '@/utils/common/data/customeData';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SuperAdminSidebarData = () => {
  const [isUniversities, setIsUniversities] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSubscriptionManagement, setSubscriptionManagement] = useState(false);
  const [isPackageManagement, setIsPackageManagement] = useState(false);
  const [isPaymentReport, setIsPaymentReport] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isBlogs, setIsBlogs] = useState(false);
  const [earnings, setEarnings] = useState(false);
  const [isManageDocument, setIsManageDocument] = useState(false);
  const router = useRouter();


      const storedMenu = localStorage.getItem('simplifiedMenu');
      let menuObj;
      if (storedMenu) {
        menuObj = JSON.parse(storedMenu);
      }
    
  const customeData = useCustomData();
  const paneltext = customeData.paneltext;
  const { data: userInfoData } = useGetUserInfoQuery();
  const userRole = userInfoData?.data?.role;
  //const userRole = 'agent';

  const getRoleBasedAccess = (role) => {
    const accessData = localStorage.getItem('accessibleUrlForUser');
    if (!accessData) return [];
    const parsed = JSON.parse(accessData);
    return parsed[role] || [];
  };

  const isAllowed = (item, allowedAccess) => {
    return allowedAccess.some(
      (access) => access.label === item.label && access.link === item.link
    );
  };

  const updateIconSidebar = (e) => {
    if (e?.target?.getAttribute('subitems')) {
      const ul = document.getElementById('two-column-menu');
      const iconItems = ul?.querySelectorAll('.nav-icon.active') || [];
      [...iconItems].forEach((item) => {
        item.classList.remove('active');
        const id = item.getAttribute('subitems');
        document.getElementById(id)?.classList.remove('show');
      });
    }
  };



  

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/dashboard/' + paneltext,
    },
    {
      id: 'universities',
      label: 'Universities',
      icon: 'ri-school-fill',
      style: `${customeData.hideforaccountant}`,
      link: '/#',
      click: (e) => {
        e.preventDefault();
        setIsUniversities(!isUniversities);
        updateIconSidebar(e);
      },
      stateVariables: isUniversities,
      subItems: [
        {
          id: 'alluniversity',
          label: 'All University',
          icon: 'ri-school-fill',
          link: '/dashboard/' + paneltext + '/university-management/all-university',
          parentId: 'universities',
        },
        {
          id: 'adduniversity',
          label: 'Add University',
          icon: 'ri-school-fill',
          link: '/dashboard/' + paneltext + '/university-management/add-university',
          parentId: 'universities',
        },
      ],
    },
    {
      id: 'students',
      label: 'Students',
      icon: 'ri-group-fill',
      style: `${customeData.hideforaccountant}`,
      link: '/dashboard/' + paneltext + '/students',
    },
    {
      id: 'package-management',
      label: 'Package Management',
      icon: 'ri-red-packet-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/#',
      click: (e) => {
        e.preventDefault();
        setIsPackageManagement(!isPackageManagement);
        updateIconSidebar(e);
      },
      stateVariables: isPackageManagement,
      subItems: [
        {
          id: 'package',
          label: 'Packages',
          icon: 'ri-price-tag-2-fill',
          link: '/dashboard/' + paneltext + '/packages',
          parentId: 'package-management',
        },
        {
          id: 'coupon',
          label: 'Coupon Management',
          icon: 'ri-coupon-3-fill',
          link: '/dashboard/' + paneltext + '/coupon-management',
          parentId: 'package-management',
        },
        {
          id: 'hotoffer',
          label: 'Hot Offers',
          icon: 'ri-fire-fill',
          link: '/dashboard/' + paneltext + '/hot-offer',
          parentId: 'package-management',
        },
      ],
    },
    {
      id: 'super-admin-earnings',
      label: 'Earnings',
      icon: 'ri-coins-line',
      style: `${customeData.hideforadmissionmanger}`,
      link: '/#',
      click: (e) => {
        e.preventDefault();
        setEarnings(!earnings);
      },
      stateVariables: earnings,
      subItems: [
        {
          id: 'total-receive-amount',
          label: 'Total Receive Amount',
          icon: 'ri-money-rupee-circle-line',
          link: '/dashboard/' + paneltext + '/super-admin-earnings/total-receive-amount',
          parentId: 'super-admin-earnings',
        },
        {
          id: 'super-admin-profit',
          label: 'Super Admin Profit',
          icon: 'ri-money-rupee-circle-line',
          link: '/dashboard/' + paneltext + '/super-admin-earnings/super-admin-profit',
          parentId: 'super-admin-earnings',
        },
      ],
    },
    {
      id: 'alldocuments',
      label: 'Document Required List',
      icon: 'ri-file-copy-2-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/dashboard/' + paneltext + '/all-documents',
    },
    {
      id: 'managedocument',
      label: 'Manage Documents',
      icon: 'ri-article-fill',
      style: `${customeData.hideforadmissionmanger} ${customeData.hideforaccountant}`,
      link: '/#',
      click: (e) => {
        e.preventDefault();
        setIsManageDocument(!isManageDocument);
      },
      stateVariables: isManageDocument,
      subItems: [
        {
          id: 'alldocument',
          label: 'Accepted Documents',
          icon: 'ri-file-fill',
          link: '/dashboard/' + paneltext + '/manage-documents/all-document-for-superAdmin',
          parentId: 'managedocument',
        },
        {
          id: 'documentuploadrequest',
          label: 'Requested & Submitted',
          icon: 'ri-file-list-3-fill',
          link: '/dashboard/' + paneltext + '/manage-documents/document-upload-request',
          parentId: 'managedocument',
        },
      ],
    },
{
  id: 'access-management',
  label: 'Access Management',
  icon: 'ri-shield-keyhole-fill',
  link: `/dashboard/${paneltext}/access-management?userRole=admission_manager}`,
  rolesAllowed: ['super_admin'], // Optional: restrict to super admins
},
  ];

  const filteredMenuItems = React.useMemo(() => {
    if (userRole === 'super_admin') return menuItems;
    const allowedAccess = getRoleBasedAccess(userRole);
    // Normalize current path (ignore query params/hash)
    const currentPath = router.pathname.toLowerCase();
      // Check if current path is in allowedAccess links
    // check if current path matches any allowed link
    const isAllowedUrl = allowedAccess.some(access =>
      access.link.toLowerCase() === currentPath
    );

    if (!isAllowedUrl) {
      alert("You can't access this page.");
      // redirect to a safe page
      router.replace(`/dashboard/${paneltext}`);
    }


    const filterItems = (items) => {
      return items
        .map((item) => {
          const isItemAllowed = isAllowed(item, allowedAccess);
          const filteredSubItems = item.subItems?.filter((sub) => isAllowed(sub, allowedAccess)) || [];

          if (!isItemAllowed && filteredSubItems.length === 0) return null;

          const newItem = {
            ...item,
            subItems: filteredSubItems.length > 0 ? filteredSubItems : undefined,
          };

          const originalItem = menuItems.find((m) => m.id === item.id);
          if (originalItem?.stateVariables !== undefined) {
            newItem.stateVariables = originalItem.stateVariables;
          }
          if (originalItem?.click) {
            newItem.click = originalItem.click;
          }

          return newItem;
        })
        .filter(Boolean);
    };

    return filterItems(menuItems);
  }, [
    userRole,
    paneltext,
    isUniversities,
    isInvoices,
    isSubscriptionManagement,
    isPackageManagement,
    isPaymentReport,
    isSettings,
    isBlogs,
    earnings,
    isManageDocument,
  ]);

  // ✅ Console log label & link only
  useEffect(() => {
    if (!filteredMenuItems || filteredMenuItems.length === 0) return;

    const extractLabelAndLink = (items) => {
      return items.map((item) => {
        const base = {
          label: item.label,
          link: item.link,
        };

        if (item.subItems) {
          base.subItems = extractLabelAndLink(item.subItems);
        }

        return base;
      });
    };

    const simplifiedMenu = extractLabelAndLink(filteredMenuItems);
    localStorage.setItem('simplifiedMenu', JSON.stringify(simplifiedMenu));
  }, [filteredMenuItems]);



  return <React.Fragment>{filteredMenuItems}</React.Fragment>;
};

export default SuperAdminSidebarData;
