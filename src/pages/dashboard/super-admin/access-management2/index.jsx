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
  const { id } = router.query; // ✅ Get ID from URL

  const [menuItems, setMenuItems] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allChecked, setAllChecked] = useState(false);

  const {
    data: getAllStaffMemberData,
    isLoading: getAllStaffMemberIsLoading,
  } = useGetStaffMemberInSuperAdminQuery();

  const [updateStaffMemberInSuperAdmin] = useUpdateStaffMemberInSuperAdminMutation();

  const userRole = selectedUser?.role;
  const panelTextPut = selectedUser?.role?.split('_').join('-');
  const userRoleShow = selectedUser?.role?.split('_').join(' ');

  // ✅ Auto-select user by ID from URL
  useEffect(() => {
    if (!getAllStaffMemberData?.data) return;

    if (!id) {
      // ✅ No ID in URL — reset selected user (if any)
      setSelectedUser(null);
      return;
    }

    // ✅ Try to find the user by ID
    const user = getAllStaffMemberData.data.find((u) => u._id === id);
    if (user) {
      setSelectedUser({
        label: `${user.first_name} ${user.last_name} (${formatRole(user.role)})`,
        value: user._id,
        role: user.role,
        accessible: user.accessible,
      });
    } else {
      // ❌ If ID not found in list, optionally reset
      setSelectedUser(null);
    }
  }, [id, getAllStaffMemberData]);


  // ✅ Handle access setup on selectedUser change
  useEffect(() => {
    const storedMenu = localStorage.getItem('simplifiedMenu');
    if (!storedMenu || !selectedUser?.role) return;

    const parsedMenu = JSON.parse(storedMenu);
    const panelText = selectedUser.role.split('_').join('-');

    const updateLinks = (items) =>
      items.map((item) => {
        const updatedItem = { ...item };
        if (updatedItem.link?.startsWith('/dashboard/')) {
          updatedItem.link = updatedItem.link.replace(/\/dashboard\/[^/]+/, `/dashboard/${panelText}`);
        }
        if (updatedItem.subItems) {
          updatedItem.subItems = updateLinks(updatedItem.subItems);
        }
        return updatedItem;
      });

    const addParentReferences = (items, parent = null) =>
      items.map((item) => {
        const newItem = { ...item, parent };
        if (item.subItems) {
          newItem.subItems = addParentReferences(item.subItems, newItem);
        }
        return newItem;
      });

    const menuWithUpdatedLinks = updateLinks(parsedMenu);
    const menuWithParents = addParentReferences(menuWithUpdatedLinks);
    setMenuItems(menuWithParents);

    let accessList = [];
    try {
      accessList = typeof selectedUser.accessible === 'string'
        ? JSON.parse(selectedUser.accessible)
        : Array.isArray(selectedUser.accessible)
          ? selectedUser.accessible
          : [];
    } catch (err) {
      console.error('Failed to parse accessible field:', err);
    }

    const transformedAccess = accessList.map((item) =>
      item.link?.startsWith('/dashboard/')
        ? { ...item, link: item.link.replace(/\/dashboard\/[^/]+/, `/dashboard/${panelText}`) }
        : item
    );

    const dashboardItem = menuWithParents.find((item) => item.label.toLowerCase() === 'dashboard');
    if (dashboardItem) {
      const exists = transformedAccess.some((a) => a.label === dashboardItem.label && a.link === dashboardItem.link);
      if (!exists) {
        transformedAccess.push({
          label: dashboardItem.label,
          link: dashboardItem.link,
        });
      }
    }

    setSelectedAccess(transformedAccess);
  }, [selectedUser]);

  const isChecked = (item) =>
    selectedAccess.some((a) => a.label === item.label && a.link === item.link);

  const formatRole = (role) => {
    if (!role) return '';
    const formatted = role.replace(/_/g, '-');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const handleToggle = (item) => {
    const exists = isChecked(item);
    let updated = [...selectedAccess];

    const collectChildren = (node) => {
      const items = [{ label: node.label, link: node.link }];
      if (node.subItems) {
        node.subItems.forEach((sub) => {
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
        (a) => !allChildren.some((b) => b.label === a.label && b.link === a.link)
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

  const handleSelectAllToggle = () => {
    const flattenItems = (items) => {
      let flat = [];
      items.forEach((item) => {
        flat.push({ label: item.label, link: item.link });
        if (item.subItems) {
          flat = flat.concat(flattenItems(item.subItems));
        }
      });
      return flat;
    };

    const allItems = flattenItems(menuItems);
    const filteredItems = allItems.filter((item) => item.label.toLowerCase() !== 'dashboard');

    const dashboardItem = selectedAccess.find((a) => a.label.toLowerCase() === 'dashboard');
    setSelectedAccess(
      !allChecked
        ? [...filteredItems, ...(dashboardItem ? [dashboardItem] : [])]
        : dashboardItem
        ? [dashboardItem]
        : []
    );

    setAllChecked(!allChecked);
  };

  const handleSave = async () => {
    try {
      const accessData = localStorage.getItem('accessibleUrlForUser');
      let parsed = accessData ? JSON.parse(accessData) : {};

      const updatedAccess = selectedAccess.map((item) =>
        item.link?.startsWith('/dashboard/')
          ? { ...item, link: item.link.replace(/\/dashboard\/[^/]+/, `/dashboard/${panelTextPut}`) }
          : item
      );

      const formData = new FormData();
      formData.append('accessible', JSON.stringify(updatedAccess));
      formData.append('user_id', selectedUser?.value ?? '');

      await updateStaffMemberInSuperAdmin(formData).unwrap();

      parsed[selectedUser.role] = updatedAccess;
      localStorage.setItem('accessibleUrlForUser', JSON.stringify(parsed));

      alert('Access updated successfully!');
    } catch (error) {
      console.error('Failed to save access:', error);
      alert('Failed to update access. Please try again.');
    }
  };

  const renderMenu = (items, level = 0) =>
    items.map((item, index) => {
      const hasSubItems = item.subItems && item.subItems.length > 0;
      const itemId = `access-${item.label}-${index}`;
      return (
        <div key={itemId} className="mb-3">
          <div className={`form-check ms-${level * 2}`}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={
                item.label.toLowerCase() === 'dashboard'
                  ? true
                  : isChecked(item)
              }
              onChange={() => {
                if (item.label.toLowerCase() !== 'dashboard') handleToggle(item);
              }}
              id={itemId}
              disabled={item.label.toLowerCase() === 'dashboard'}
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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#FFFFFF',
      borderColor: state.isFocused ? '#4CAF50' : '#ccc',
      borderRadius: '8px',
      padding: '5px',
      boxShadow: state.isFocused ? '0 0 5px rgba(76, 175, 80, 0.5)' : 'none',
      '&:hover': { borderColor: '#4CAF50' },
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
                <h2 className="fw-bold text-primary">Select a user</h2>
                <Select
                  placeholder="Select User"
                  styles={customStyles}
                  options={
                    getAllStaffMemberData?.data?.map((user) => ({
                      label: `${user.first_name} ${user.last_name} (${formatRole(user.role)})`,
                      value: user._id,
                      role: user.role,
                      accessible: user.accessible,
                    })) || []
                  }
                  value={selectedUser}
                  onChange={(selectedOption) => {
                    setSelectedUser(selectedOption);
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { id: selectedOption.value },
                      },
                      undefined,
                      { shallow: true } // avoid full reload
                    );
                  }}
                  isLoading={getAllStaffMemberIsLoading}
                />
              </div>
            </div>
          </div>

          {selectedUser && (
            <>
              <div className="mb-4">
                <h2 className="fw-bold text-primary">
                  Access Management for{' '}
                  <span className="text-dark text-capitalize">{userRoleShow}</span>
                </h2>
                <p className="text-muted">Please select the permissions you want to allow for this role.</p>
              </div>

              {menuItems.length === 0 ? (
                <div className="alert alert-info">Loading permissions menu...</div>
              ) : (
                <div className="row">
                  <div className="col-md-5">
                    <div className="card shadow-sm border-0 mb-4">
                      <div className="card-header bg-light d-flex justify-content-between align-items-center fw-bold">
                        <span>Permissions Menu</span>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="selectAllCheckbox"
                            checked={allChecked}
                            onChange={handleSelectAllToggle}
                          />
                          <label className="form-check-label fs-12" htmlFor="selectAllCheckbox">
                            Select All
                          </label>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="permission-tree overflow-auto" style={{ maxHeight: '500px' }}>
                          {renderMenu(menuItems)}
                        </div>
                      </div>
                    </div>
                  </div>

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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AccessManagementPage;
