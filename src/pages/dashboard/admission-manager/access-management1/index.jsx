import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  useGetStaffMemberInSuperAdminQuery,
  useUpdateStaffMemberInSuperAdminMutation,
} from '@/slice/services/super admin/staffMemberService';

const AccessManagementPage = () => {
  const router = useRouter();
  // const { userRole } = router.query;

  const [menuItems, setMenuItems] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: getAllStaffMemberData,
    isLoading: getAllStaffMemberIsLoading,
  } = useGetStaffMemberInSuperAdminQuery();

    const [
      updateStaffMemberInSuperAdmin,
      {
        data: updateStaffMemberData,
        error: updateStaffMemberError,
        isLoading: updateStaffMemberIsLoading,
      },
    ] = useUpdateStaffMemberInSuperAdminMutation();

  const userRole = selectedUser?.role;
  const  panelTextPut = selectedUser?.role?.split('_').join('-'); // e.g., "SUPER_ADMIN" => "SUPER-ADMIN"
  const  userRoleShow = selectedUser?.role?.split('_').join(' '); // e.g., "SUPER_ADMIN" => "SUPER-ADMIN"

console.log("data",getAllStaffMemberData);
    console.log("selectedUser", selectedUser);
    console.log("panelText", panelTextPut);


  useEffect(() => {
   if (!userRole) return;
    const storedMenu = localStorage.getItem('simplifiedMenu');
    if (storedMenu) {
      const parsedMenu = JSON.parse(storedMenu);

      const addParentReferences = (items, parent = null) => {
        return items.map(item => {
          const newItem = { ...item, parent };
          if (item.subItems) {
            newItem.subItems = addParentReferences(item.subItems, newItem);
          }
          return newItem;
        });
      };

       console.log("storedMenu", storedMenu);


      const menuWithParents = addParentReferences(parsedMenu);
      setMenuItems(menuWithParents);

      // const existingAccess = localStorage.getItem('accessibleUrlForUser');
       const existingAccess = selectedUser?.accessible;

       console.log("existingAccess", existingAccess);
      if (existingAccess) {
        const parsed = JSON.parse(existingAccess);
        const roleAccess = parsed[userRole] || [];
        setSelectedAccess(roleAccess);
      } else {
        setSelectedAccess([]);
      }
    }
  }, [userRole]);

  const isChecked = (item) => {
    return selectedAccess.some(
      (a) => a.label === item.label && a.link === item.link
    );
  };

  const handleToggle = (item) => {
    const exists = isChecked(item);
    let updated = [...selectedAccess];

    const collectChildren = (node) => {
      const items = [{ label: node.label, link: node.link }];
      if (node.subItems) {
        node.subItems.forEach(sub => {
          items.push(...collectChildren(sub));
        });
      }
      return items;
    };

    const collectParents = (node) => {
      const parents = [];
      let current = node.parent;
      while (current) {
        parents.push({ label: current.label, link: current.link });
        current = current.parent;
      }
      return parents;
    };

    const allChildren = collectChildren(item);
    const allParents = collectParents(item);

    if (exists) {
      updated = updated.filter(
        (a) => !allChildren.some(b => b.label === a.label && b.link === a.link)
      );
    } else {
      [...allChildren, ...allParents].forEach((a) => {
        if (!updated.some((b) => b.label === a.label && b.link === a.link)) {
          updated.push(a);
        }
      });
    }

    setSelectedAccess(updated);
  };

const handleSave = async () => {
  try {
    // Get access data from localStorage
    const accessData = localStorage.getItem('accessibleUrlForUser');
    let parsed = {};

    if (accessData) {
      parsed = JSON.parse(accessData);
    }

    // Update links with selected panel text
    const updatedAccess = selectedAccess.map((item) => {
      if (item.link?.startsWith('/dashboard/')) {
        return {
          ...item,
          link: item.link.replace(/\/dashboard\/[^/]+/, `/dashboard/${panelTextPut}`),
        };
      }
      return item;
    });

    // Convert updated data to FormData
    const formData = new FormData();
    formData.append('accessible', JSON.stringify(updatedAccess));
    formData.append('user_id', selectedUser?.value ?? '');

    // Call API to update
    const result = await updateStaffMemberInSuperAdmin(formData).unwrap();

    // Update localStorage with new access info
    parsed[userRole] = updatedAccess;
    localStorage.setItem('accessibleUrlForUser', JSON.stringify(parsed));

    console.log('Saved accessibleUrlForUser:', parsed);
    alert('Access updated successfully!');
  } catch (error) {
    console.error('Failed to save access:', error);
    alert('Failed to update access. Please try again.');
  }
};




  const renderMenu = (items, level = 0) => {
    return items.map((item, index) => {
      const hasSubItems = item.subItems && item.subItems.length > 0;
      const itemId = `access-${item.label}-${index}`;

      return (
        <div key={itemId} className="mb-3">
          <div className={`form-check ms-${level * 2}`}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={isChecked(item)}
              onChange={() => handleToggle(item)}
              id={itemId}
            />
            <label className="form-check-label fw-medium fs-12" htmlFor={itemId}>
              {item.label}
            </label>
          </div>

          {hasSubItems && (
            <div className={`ms-${(level + 1) * 2} mt-1`}>
              {renderMenu(item.subItems, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#FFFFFF',
      borderColor: state.isFocused ? '#4CAF50' : '#ccc',
      borderRadius: '8px',
      padding: '5px',
      boxShadow: state.isFocused ? '0 0 5px rgba(76, 175, 80, 0.5)' : 'none',
      '&:hover': {
        borderColor: '#4CAF50',
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#4CAF50'
        : state.isFocused
          ? '#e8f5e9'
          : 'white',
      color: state.isSelected ? 'white' : '#333',
      padding: '10px',
      cursor: 'pointer',
    }),
    menu: (base) => ({
      ...base,
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    }),
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-5">
                <h2 className="fw-bold text-primary">
                  Select a user
                </h2>
                <Select
  placeholder="Select User"
  styles={customStyles}
  options={
    getAllStaffMemberData?.data?.map(user => ({
      label: `${user.first_name} ${user.last_name}`,
      value: user._id, // Fix this line
      role: user.role,
      accsible: user.accessible,
    })) || []
  }
  value={selectedUser} // Now this works properly
  onChange={(selectedOption) => {
    setSelectedUser(selectedOption); // Now the selected user stays
  }}
  isLoading={getAllStaffMemberIsLoading}
/>

              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="fw-bold text-primary">
              Access Management for <span className="text-dark text-capitalize">{userRoleShow}</span>
            </h2>
            <p className="text-muted">Please select the permissions you want to allow for this role.</p>
          </div>

          {menuItems.length === 0 ? (
            <div className="alert alert-info">Loading permissions menu...</div>
          ) : (
            <div className="row">
              {/* Left Section: Menu Tree */}
              <div className="col-md-5">
                <div className="card shadow-sm border-0 mb-4">
                  <div className="card-header bg-light fw-bold">Permissions Menu</div>
                  <div className="card-body">
                    <div className="permission-tree overflow-auto" style={{ maxHeight: "500px" }}>
                      {renderMenu(menuItems)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section: Allowed Access */}
              <div className="col-md-7">
                <div className="card shadow-sm border-0 mb-4">
                  <div className="card-header bg-light fw-bold">Allowed Access</div>
                  <div className="card-body">
                    {selectedAccess.length === 0 ? (
                      <p className="text-muted">No access selected yet.</p>
                    ) : (
                      <ul className="list-group list-group-flush">
                        {selectedAccess.map((item, index) => (
                          <li key={`${item.label}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{item.label}</span>
                            <small className="text-muted">{item.link}</small>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="text-end mt-3">
                  <button onClick={handleSave} className="btn btn-success px-4">
                    Save Access
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AccessManagementPage;






























// import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';
// import { useCustomData } from '@/utils/common/data/customeData';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// const SuperAdminSidebarData = () => {
//   const [isUniversities, setIsUniversities] = useState(false);
//   const [isInvoices, setIsInvoices] = useState(false);
//   const [isSubscriptionManagement, setSubscriptionManagement] = useState(false);
//   const [isPackageManagement, setIsPackageManagement] = useState(false);
//   const [isPaymentReport, setIsPaymentReport] = useState(false);
//   const [isSettings, setIsSettings] = useState(false);
//   const [isBlogs, setIsBlogs] = useState(false);
//   const [earnings, setEarnings] = useState(false);
//   const [isManageDocument, setIsManageDocument] = useState(false);
//   const router = useRouter();


//       const storedMenu = localStorage.getItem('simplifiedMenu');
//       let menuObj;
//       if (storedMenu) {
//         menuObj = JSON.parse(storedMenu);
//       }
    
//   const customeData = useCustomData();
//   const paneltext = customeData.paneltext;
//   const { data: userInfoData } = useGetUserInfoQuery();
//   const userRole = userInfoData?.data?.role;
//   //const userRole = 'agent';

//  console.log("userInfoData", userInfoData?.data?.accessible);
// // Attempt to parse the data if it's a string
// let rawData = userInfoData?.data?.accessible;

// try {
//   if (typeof rawData === 'string') {
//     rawData = JSON.parse(rawData);
//   }
// } catch (e) {
//   console.error("Failed to parse accessible data:", e);
// }

// const structuredData = [];

// if (Array.isArray(rawData)) {
//   rawData.forEach(item => {
//     if (item.link === "/#") {
//       structuredData.push({ ...item, subItems: [] });
//     } else {
//       const parent = structuredData.find(parentItem => item.link.startsWith(parentItem.label.toLowerCase()));

//       if (parent && parent.subItems) {
//         parent.subItems.push(item);
//       } else {
//         const universityParent = structuredData.find(p => p.label === "Universities");
//         if (universityParent && universityParent.subItems) {
//           universityParent.subItems.push(item);
//         } else {
//           structuredData.push(item);
//         }
//       }
//     }
//   });
// } else {
//   console.warn("Expected an array for accessible, but got:", typeof rawData);
// }
// console.log("structuredData", structuredData);

// const getRoleBasedAccess = (role) => {

//   const accessData = structuredData;

//   if (!accessData) return [];

//   try {
//     const parsed = typeof accessData === 'string' ? JSON.parse(accessData) : accessData;
//     return parsed[role] || [];
//   } catch (error) {
//     console.error("JSON parse error in getRoleBasedAccess:", error);
//     return [];
//   }
// };

//   const isAllowed = (item, allowedAccess) => {
//     return allowedAccess.some(
//       (access) => access.label === item.label && access.link === item.link
//     );
//   };

//   const updateIconSidebar = (e) => {
//     if (e?.target?.getAttribute('subitems')) {
//       const ul = document.getElementById('two-column-menu');
//       const iconItems = ul?.querySelectorAll('.nav-icon.active') || [];
//       [...iconItems].forEach((item) => {
//         item.classList.remove('active');
//         const id = item.getAttribute('subitems');
//         document.getElementById(id)?.classList.remove('show');
//       });
//     }
//   };



  

//   const menuItems = [
//    {
//     id: 'dashboard',
//     label: 'Dashboard',
//     icon: 'ri-dashboard-2-line',
//     link: '/dashboard/' + paneltext,
//   },
//   {
//     id: 'universities',
//     label: 'Universities',
//     icon: 'ri-school-fill',
//     link: '/#',
//     click: (e) => {
//       e.preventDefault();
//       setIsUniversities(!isUniversities);
//       updateIconSidebar(e);
//     },
//     stateVariables: isUniversities,
//     subItems: [
//       {
//         id: 'alluniversity',
//         label: 'All University',
//         icon: 'ri-school-fill',
//         link: '/dashboard/' + paneltext + '/university-management/all-university',
//         parentId: 'universities',
//       },
//       {
//         id: 'adduniversity',
//         label: 'Add University',
//         icon: 'ri-school-fill',
//         link: '/dashboard/' + paneltext + '/university-management/add-university',
//         parentId: 'universities',
//       },
//     ],
//   },
//   {
//     id: 'allpermittedusers',
//     label: 'Roles & Permissions',
//     icon: 'ri-user-star-fill',
//     link: '/dashboard/' + paneltext + '/super-admin-panel/all-permitted-users',
//   },
//   {
//     id: 'recent-application',
//     label: 'Recent Application',
//     icon: 'ri-article-fill',
//     link: '/dashboard/' + paneltext + '/recent-application',
//   },
//   {
//     id: 'agents',
//     label: 'Partner',
//     icon: 'ri-group-2-fill',
//     link: '/dashboard/' + paneltext + '/agents',
//   },
//   {
//     id: 'students',
//     label: 'Students',
//     icon: 'ri-group-fill',
//     link: '/dashboard/' + paneltext + '/students',
//   },
//   {
//     id: 'alldocuments',
//     label: 'Document Required List',
//     icon: 'ri-file-copy-2-fill',
//     link: '/dashboard/' + `${paneltext}` + '/all-documents',
//   },
//   {
//     id: 'managedocument',
//     label: 'Manage Documents',
//     icon: 'ri-article-fill',
//     link: '/#',
//     click: function (e) {
//       e.preventDefault();
//       setIsManageDocument(!isManageDocument);
//     },
//     stateVariables: isManageDocument,
//     subItems: [
//       {
//         id: 'alldocument',
//         label: 'Accepted Documents',
//         icon: 'ri-file-fill',
//         link: '/dashboard/' + `${paneltext}` + '/manage-documents/all-document-for-superAdmin',
//         pathName: '/dashboard/' + `${paneltext}` + '/manage-documents/all-document-for-superAdmin',
//         parentId: 'managedocument',
//       },
//       {
//         id: 'documentuploadrequest',
//         label: 'Requested & Submitted',
//         icon: 'ri-file-list-3-fill',
//         link: '/dashboard/' + `${paneltext}` + '/manage-documents/document-upload-request',
//         pathName: '/dashboard/' + `${paneltext}` + '/manage-documents/document-upload-request',
//         parentId: 'managedocument',
//       },
//       {
//         id: 'newRequest',
//         label: 'New Requests',
//         icon: 'ri-file-list-3-fill',
//         link: '/dashboard/' + `${paneltext}` + '/manage-documents/new-document-request',
//         pathName: '/dashboard/' + `${paneltext}` + '/manage-documents/new-document-request',
//         parentId: 'managedocument',
//       },
//     ],
//   },
//   {
//     id: 'airTicketDocumentuploadrequest',
//     label: 'Air Ticket Request',
//     icon: 'ri-ticket-2-line',
//     link: '/dashboard/' + `${paneltext}` + '/manage-air-ticket/air-ticket-upload-request',
//   },
//   {
//     id: 'airportpickupchargerequest',
//     label: 'Airport Pickup Request',
//     icon: 'ri-flight-takeoff-line',
//     link: '/dashboard/' + `${paneltext}` + '/airport-pickup-request',
//   },
//   {
//     id: 'report',
//     label: 'Report',
//     icon: 'ri-bank-card-line',
//     link: '/#',
//     click: function (e) {
//       e.preventDefault();
//       setIsPaymentReport(!isPaymentReport);
//     },
//     stateVariables: isPaymentReport,
//     subItems: [
//       {
//         id: 'package-payment',
//         label: 'Package Payment',
//         icon: 'ri-red-packet-line',
//         link: '/dashboard/' + `${paneltext}` + '/payment-report/package-payment',
//         pathName: '/dashboard/' + `${paneltext}` + '/payment-report/package-payment',
//         parentId: 'report',
//       },
//       {
//         id: 'application-payment',
//         label: 'Application Payment',
//         icon: 'ri-box-1-line',
//         link: '/dashboard/' + `${paneltext}` + '/payment-report/application-payment',
//         pathName: '/dashboard/' + `${paneltext}` + '/payment-report/application-payment',
//         parentId: 'report',
//       },
//       {
//         id: 'familyTrip',
//         label: 'Family Trip',
//         icon: 'ri-gift-line',
//         link: '/dashboard/' + `${paneltext}` + '/familyTrip',
//         parentId: 'report',
//       },
//       {
//         id: 'yearlyBonous',
//         label: 'Yearly Bonus',
//         icon: 'ri-percent-line',
//         link: '/dashboard/' + `${paneltext}` + '/yearlyBonous',
//         parentId: 'report',
//       },
//     ],
//   },
//   {
//     id: 'blogs',
//     label: 'Blogs',
//     icon: 'ri-school-fill',
//     link: '/#',
//     click: function (e) {
//       e.preventDefault();
//       setIsBlogs(!isBlogs);
//       updateIconSidebar(e);
//     },
//     stateVariables: isBlogs,
//     subItems: [
//       {
//         id: 'addblog',
//         label: 'Add Blog',
//         icon: 'ri-school-fill',
//         link: '/dashboard/' + `${paneltext}` + '/blog/add-blog',
//         parentId: 'blogs',
//       },
//       {
//         id: 'allblogs',
//         label: 'Blogs List',
//         icon: 'ri-school-fill',
//         link: '/dashboard/' + `${paneltext}` + '/blog/blog-list',
//         parentId: 'blogs',
//       },
//     ],
//   },
//   {
//     id: 'contact-messages',
//     label: 'Contact Messages',
//     icon: 'ri-group-fill',
//     link: '/dashboard/' + `${paneltext}` + '/contact-messages',
//   },
//   {
//     id: 'subscription',
//     label: 'Subscription',
//     icon: 'ri-rss-line',
//     link: '/#',
//     click: function (e) {
//       e.preventDefault();
//       setSubscriptionManagement(!isSubscriptionManagement);
//     },
//     stateVariables: isSubscriptionManagement,
//     subItems: [
//       {
//         id: 'subscriptionList',
//         label: 'Subscription List',
//         icon: 'ri-rss-line',
//         link: '/dashboard/' + `${paneltext}` + '/subscription/subscription-list',
//         pathName: '/dashboard/' + `${paneltext}` + '/subscription/subscription-list',
//         parentId: 'subscription',
//       },
//     ],
//   },
//   {
//     id: 'management',
//     label: 'Team Management',
//     icon: 'ri-group-fill',
//     link: '/dashboard/' + `${paneltext}` + '/teams',
//   },
//   {
//     id: 'settings',
//     label: 'Settings',
//     icon: 'ri-settings-3-line',
//     link: '/#',
//     click: function (e) {
//       e.preventDefault();
//       setIsSettings(!isSettings);
//     },
//     stateVariables: isSettings,
//     subItems: [
//       {
//         id: 'paymentsettings',
//         label: 'Payment Settings',
//         icon: 'ri-refund-2-fill',
//         link: '/dashboard/' + `${paneltext}` + '/settings/payment',
//         pathName: '/dashboard/' + `${paneltext}` + '/settings/payment',
//         parentId: 'settings',
//       },
//       {
//         id: 'profilesettings',
//         label: 'Profile Settings',
//         icon: 'ri-user-settings-fill',
//         link: '/dashboard/' + `${paneltext}` + '/settings/profile',
//         pathName: '/dashboard/' + `${paneltext}` + '/settings/profile',
//         parentId: 'settings',
//       },
//       {
//         id: 'changeemail',
//         label: 'Change Email',
//         icon: 'ri-mail-add-fill',
//         link: '/dashboard/' + `${paneltext}` + '/settings/email',
//         pathName: '/dashboard/' + `${paneltext}` + '/settings/email',
//         parentId: 'settings',
//       },
//       {
//         id: 'changepassword',
//         label: 'Change Password',
//         icon: 'ri-lock-password-fill',
//         link: '/dashboard/' + `${paneltext}` + '/settings/password',
//         pathName: '/dashboard/' + `${paneltext}` + '/settings/password',
//         parentId: 'settings',
//       },
//     ],
//   },
// {
//   id: 'access-management',
//   label: 'Access Management',
//   icon: 'ri-shield-keyhole-fill',
//   link: `/dashboard/${paneltext}/access-management?userRole=admission_manager}`,
//   rolesAllowed: ['super_admin'], // Optional: restrict to super admins
// },
//   ];

//   const filteredMenuItems = React.useMemo(() => {
//     if (userRole === 'super_admin') return menuItems;
//     const allowedAccess = getRoleBasedAccess(userRole);
//     // Normalize current path (ignore query params/hash)
//     const currentPath = router.pathname.toLowerCase();
//       // Check if current path is in allowedAccess links
//     // check if current path matches any allowed link
//     const isAllowedUrl = allowedAccess.some(access =>
//       access.link.toLowerCase() === currentPath
//     );

//     if (!isAllowedUrl) {
//       alert("You can't access this page.");
//       // redirect to a safe page
//       router.replace(`/dashboard/${paneltext}`);
//     }


//     const filterItems = (items) => {
//       return items
//         .map((item) => {
//           const isItemAllowed = isAllowed(item, allowedAccess);
//           const filteredSubItems = item.subItems?.filter((sub) => isAllowed(sub, allowedAccess)) || [];

//           if (!isItemAllowed && filteredSubItems.length === 0) return null;

//           const newItem = {
//             ...item,
//             subItems: filteredSubItems.length > 0 ? filteredSubItems : undefined,
//           };

//           const originalItem = menuItems.find((m) => m.id === item.id);
//           if (originalItem?.stateVariables !== undefined) {
//             newItem.stateVariables = originalItem.stateVariables;
//           }
//           if (originalItem?.click) {
//             newItem.click = originalItem.click;
//           }

//           return newItem;
//         })
//         .filter(Boolean);
//     };

//     return filterItems(menuItems);
//   }, [
//     userRole,
//     paneltext,
//     isUniversities,
//     isInvoices,
//     isSubscriptionManagement,
//     isPackageManagement,
//     isPaymentReport,
//     isSettings,
//     isBlogs,
//     earnings,
//     isManageDocument,
//   ]);

//   // ✅ Console log label & link only
//   useEffect(() => {
//     if (!filteredMenuItems || filteredMenuItems.length === 0) return;

//     const extractLabelAndLink = (items) => {
//       return items.map((item) => {
//         const base = {
//           label: item.label,
//           link: item.link,
//         };

//         if (item.subItems) {
//           base.subItems = extractLabelAndLink(item.subItems);
//         }

//         return base;
//       });
//     };

//     const simplifiedMenu = extractLabelAndLink(filteredMenuItems);
//     localStorage.setItem('simplifiedMenu', JSON.stringify(simplifiedMenu));
//     console.log('Simplified Menu saved to localStorage:', simplifiedMenu);

//   }, [filteredMenuItems]);



//   return <React.Fragment>{filteredMenuItems}</React.Fragment>;
// };

// export default SuperAdminSidebarData;


















