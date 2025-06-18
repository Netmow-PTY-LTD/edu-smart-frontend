import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const AccessManagementPage = () => {
  const router = useRouter();
  const { userRole } = router.query;

  const [menuItems, setMenuItems] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState([]);

  // Load menu items and previous access from localStorage on first render or when userRole changes
  useEffect(() => {
    if (!userRole) return; // Wait for userRole to be available from query

    const storedMenu = localStorage.getItem('simplifiedMenu');

    if (storedMenu) {
      const parsedMenu = JSON.parse(storedMenu);
          console.log("parsedMenu", parsedMenu);

      setMenuItems(parsedMenu);

      // Load previous access for this role from new key 'accessibleUrlForUser'
      const existingAccess = localStorage.getItem('accessibleUrlForUser');
      if (existingAccess) {
        const parsed = JSON.parse(existingAccess);
        const roleAccess = parsed[userRole] || [];
        setSelectedAccess(roleAccess);
        console.log('accessibleUrlForUser loaded:', parsed);
      } else {
        setSelectedAccess([]); // No existing access found
        console.log('accessibleUrlForUser not found in localStorage');
      }
    }
  }, [userRole]);

  // Check if item is already selected
  const isChecked = (item) => {
    return selectedAccess.some(
      (a) => a.label === item.label && a.link === item.link
    );
  };

  // Toggle selected access on checkbox click
  const handleToggle = (item) => {
    const exists = isChecked(item);
    let updated;

    if (exists) {
      updated = selectedAccess.filter(
        (a) => !(a.label === item.label && a.link === item.link)
      );
    } else {
      updated = [...selectedAccess, { label: item.label, link: item.link }];
    }

    setSelectedAccess(updated);
  };

const handleSave = () => {
  const accessData = localStorage.getItem('accessibleUrlForUser');
  let parsed = {};
  if (accessData) {
    parsed = JSON.parse(accessData);
  }
  // You set this manually before saving
  const panelText = 'admission-manager'; // or 'agent', 'super-admin', etc.
  // Update all links to use the selected panelText
  const updatedAccess = selectedAccess.map((item) => {
    const updatedItem = { ...item };
    if (updatedItem.link && updatedItem.link.startsWith('/dashboard/')) {
      updatedItem.link = updatedItem.link.replace(
        /\/dashboard\/[^/]+/,
        `/dashboard/${panelText}`
      );
    }
    return updatedItem;
  });

  parsed[userRole] = updatedAccess;
  localStorage.setItem('accessibleUrlForUser', JSON.stringify(parsed));

  console.log('Saved accessibleUrlForUser:', parsed);
  alert('Access updated successfully!');
};

  // Render nested menu items recursively
  const renderMenu = (items) => {
    return items.map((item, index) => (
      <div key={item.label + index} className="mb-3 ml-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked(item)}
            onChange={() => handleToggle(item)}
            className="w-4 h-4"
          />
          <span className="font-medium">{item.label}</span>
        </label>
        {item.subItems && (
          <div className="ml-5 mt-2">{renderMenu(item.subItems)}</div>
        )}
      </div>
    ));
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid max-w-4xl mx-auto py-6">
          <h3 className="text-xl font-semibold mb-4">
            Access Management for <span className="text-blue-600">{userRole}</span>
          </h3>

          {menuItems.length === 0 ? (
            <p>Loading menu...</p>
          ) : (
            <>
              {renderMenu(menuItems)}

              <hr className="border-t border-gray-300 my-6" />

              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
              >
                Save Access
              </button>

              {selectedAccess.length > 0 && (
                <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-200">
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">
                    Allowed Access for <span className="text-blue-600">{userRole}</span>
                  </h4>
                  <ul className="list-disc ml-5 text-sm text-gray-800">
                    {selectedAccess.map((item, index) => (
                      <li key={`${item.label}-${index}`}>
                        {item.label}{' '}
                        <span className="text-gray-500 text-xs">({item.link})</span>
                      </li>
                    ))}
                  </ul>
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
