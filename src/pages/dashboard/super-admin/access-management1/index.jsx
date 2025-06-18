import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  useGetStaffMemberInSuperAdminQuery,
} from '@/slice/services/super admin/staffMemberService';

const AccessManagementPage = () => {
  const router = useRouter();
  const { userRole } = router.query;

  const [menuItems, setMenuItems] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: getAllStaffMemberData,
    isLoading: getAllStaffMemberIsLoading,
  } = useGetStaffMemberInSuperAdminQuery();

  console.log("data",getAllStaffMemberData);

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

      const menuWithParents = addParentReferences(parsedMenu);
      setMenuItems(menuWithParents);

      const existingAccess = localStorage.getItem('accessibleUrlForUser');
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

  const handleSave = () => {
    const accessData = localStorage.getItem('accessibleUrlForUser');
    let parsed = {};
    if (accessData) {
      parsed = JSON.parse(accessData);
    }
    parsed[userRole] = selectedAccess;
    localStorage.setItem('accessibleUrlForUser', JSON.stringify(parsed));
    alert('Access updated successfully!');
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
              Access Management for <span className="text-dark">{userRole}</span>
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
