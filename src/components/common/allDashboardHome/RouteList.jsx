import React, { useEffect, useState } from 'react';

function formatRouteName(routePath) {
  const parts = routePath.split('/');
  let lastPart = parts[parts.length - 1];
  lastPart = lastPart.replace(/\.(jsx|js)$/, '');

  // Helper to split camelCase and capitalize words
  const splitAndCapitalize = (text) =>
    text
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space between camelCase
      .replace(/[-_]/g, ' ') // Replace - and _ with space
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
      .replace(/For SuperAdmin/i, '') // Remove "For SuperAdmin"
      .trim();

  if (lastPart.startsWith('[') && lastPart.endsWith(']')) {
    const parent = parts[parts.length - 2];
    return splitAndCapitalize(parent) + ' Details';
  }

  if (lastPart === 'index' && parts.length > 2) {
    return splitAndCapitalize(parts[parts.length - 2]);
  }

  return splitAndCapitalize(lastPart);
}

function extractRoutes(files) {
  return files.map((file) => {
    const routePath = file.route ?? file;
    const pathWithoutIndex = routePath.replace(/\/index(\.jsx|\.js)?$/, '');
    return {
      name: formatRouteName(routePath),
      path: pathWithoutIndex,
    };
  });
}

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('selectedRoutes') || '[]');
    setSelectedRoutes(saved);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('/api/files')
      .then((res) => res.json())
      .then((data) => {
        const filesArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.files)
            ? data.files
            : Array.isArray(data?.routes)
              ? data.routes
              : [];

        const extracted = extractRoutes(filesArray);
        setRoutes(extracted);
      })
      .catch((err) => console.error('Failed to fetch routes:', err));
  }, []);

  const toggleSelection = (path) => {
    setSelectedRoutes((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const handleSubmit = () => {
    localStorage.setItem('selectedRoutes', JSON.stringify(selectedRoutes));
    alert('Selected routes saved to localStorage');
    console.log('Saved:', selectedRoutes);
  };

  return (
    <div
      style={{
        padding: '20px',
        margin: '0 auto',
      }}
    >
      <h2>Route Permissions</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)',
          gap: '12px',
          marginTop: '20px',
        }}
      >
        {routes.map(({ name, path }) => (
          <div
            key={path}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              backgroundColor: '#f9f9f9',
              fontSize: '18px',
            }}
          >
            <label style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedRoutes.includes(path)}
                onChange={() => toggleSelection(path)}
                style={{ marginRight: '6px' }}
              />
              <strong>{name}</strong>
              <div style={{ fontSize: '12px', color: '#777' }}>({path})</div>
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Save Access Permissions
      </button>
    </div>
  );
};

export default RouteList;

// import React, { useEffect, useState } from 'react';

// function formatRouteName(routePath) {
//   const parts = routePath.split('/');
//   let lastPart = parts[parts.length - 1];
//   lastPart = lastPart.replace(/\.(jsx|js)$/, '');

//   if (lastPart.startsWith('[') && lastPart.endsWith(']')) {
//     return parts[parts.length - 2].replace(/[-_]/g, ' ') + ' Details';
//   }
//   if (lastPart === 'index' && parts.length > 2) {
//     return parts[parts.length - 2].replace(/[-_]/g, ' ');
//   }
//   return lastPart
//     .replace(/[-_]/g, ' ')
//     .split(' ')
//     .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//     .join(' ');
// }

// function extractRoutes(files) {
//   return files.map((file) => {
//     const routePath = file.route ?? file; // supports both {route} object or plain string
//     const pathWithoutIndex = routePath.replace(/\/index(\.jsx|\.js)?$/, '');
//     return {
//       name: formatRouteName(routePath),
//       path: pathWithoutIndex,
//     };
//   });
// }

// const RouteList = () => {
//   const [routes, setRoutes] = useState([]);
//   const [selectedRoutes, setSelectedRoutes] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('selectedRoutes') || '[]');
//     setSelectedRoutes(saved);

//     fetch('/api/files')
//       .then((res) => res.json())
//       .then((data) => {
//         const filesArray = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.files)
//             ? data.files
//             : Array.isArray(data?.routes)
//               ? data.routes
//               : [];

//         const extracted = extractRoutes(filesArray);
//         setRoutes(extracted);
//       })
//       .catch((err) => console.error('Failed to fetch routes:', err));
//   }, []);

//   const toggleSelection = (path) => {
//     setSelectedRoutes((prev) =>
//       prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
//     );
//   };

//   const handleSubmit = () => {
//     localStorage.setItem('selectedRoutes', JSON.stringify(selectedRoutes));
//     alert('Selected routes saved to localStorage');
//     console.log('Saved:', selectedRoutes);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
//       <h2>Route Permissions</h2>

//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(1, 1fr)', // default 1 column
//           gap: '12px',
//         }}
//         className="route-grid"
//       >
//         {routes.map(({ name, path }) => (
//           <div key={path} style={{ marginBottom: '8px' }}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={selectedRoutes.includes(path)}
//                 onChange={() => toggleSelection(path)}
//                 style={{ marginRight: '8px' }}
//               />
//               {name} ({path})
//             </label>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleSubmit}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           background: '#0070f3',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//         }}
//       >
//         Save Access Permissions
//       </button>
//     </div>
//   );
// };

// export default RouteList;
