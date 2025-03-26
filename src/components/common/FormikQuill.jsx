// import { useField } from 'formik';
// import dynamic from 'next/dynamic';

// // Dynamically import ReactQuill without SSR (client-side only)
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// const FormikQuill = ({ label, ...props }) => {
//   const [field, meta, helpers] = useField(props);

//   // Define the toolbar configuration for free options
//   const modules = {
//     toolbar: [
//       [{ header: '1' }, { header: '2' }, { font: [] }],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['bold', 'italic', 'underline'],
//       [{ align: [] }],
//       ['link', 'image'],
//       ['blockquote', 'code-block'],
//       ['clean'], // Clean button to remove all formatting
//     ],
//   };

//   return (
//     <div className="mb-3">
//       <label className="form-label fs-2">{label}</label>
//       {/* Render ReactQuill only after the component has been dynamically loaded */}
//       <ReactQuill
//         value={field.value}
//         onChange={(value) => helpers.setValue(value)}
//         onBlur={() => helpers.setTouched(true)}
//         modules={modules} // Apply the toolbar configuration
//       />
//       {/* Display validation error if the field has been touched and there's an error */}
//       {meta.touched && meta.error && (
//         <div className="text-danger">{meta.error}</div>
//       )}
//     </div>
//   );
// };

// export default FormikQuill;

// import { useField } from 'formik';
// import dynamic from 'next/dynamic';
// import { useEffect } from 'react';
// import 'react-quill/dist/quill.snow.css';

// // Dynamically import ReactQuill without SSR (client-side only)
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// // Import Quill and required modules
// import Quill from 'quill';
// import Table from 'quill-table';
// import QuillBetterTable from 'quill-better-table';

// // Register Quill table modules
// Quill.register({
//   'modules/table': Table,
//   'modules/better-table': QuillBetterTable,
// });

// const FormikQuill = ({ label, ...props }) => {
//   const [field, meta, helpers] = useField(props);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       Quill.register('modules/better-table', QuillBetterTable);
//     }
//   }, []);

//   // Define the toolbar configuration with table support
//   const modules = {
//     toolbar: [
//       [{ header: '1' }, { header: '2' }, { font: [] }],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['bold', 'italic', 'underline'],
//       [{ align: [] }],
//       ['link', 'image'],
//       ['blockquote', 'code-block'],
//       [{ table: [] }], // Table support
//       ['clean'], // Clean button to remove all formatting
//     ],
//     table: true, // Enable table module
//     'better-table': {
//       operationMenu: {
//         items: {
//           insertColumnRight: { text: 'Insert Column Right' },
//           insertColumnLeft: { text: 'Insert Column Left' },
//           insertRowUp: { text: 'Insert Row Up' },
//           insertRowDown: { text: 'Insert Row Down' },
//           deleteRow: { text: 'Delete Row' },
//           deleteColumn: { text: 'Delete Column' },
//           deleteTable: { text: 'Delete Table' },
//         },
//       },
//     },
//   };

//   return (
//     <div className="mb-3">
//       <label className="form-label fs-2">{label}</label>
//       {/* Render ReactQuill only after the component has been dynamically loaded */}
//       <ReactQuill
//         value={field.value}
//         onChange={(value) => helpers.setValue(value)}
//         onBlur={() => helpers.setTouched(true)}
//         modules={modules} // Apply the toolbar configuration
//       />
//       {/* Display validation error if the field has been touched and there's an error */}
//       {meta.touched && meta.error && (
//         <div className="text-danger">{meta.error}</div>
//       )}
//     </div>
//   );
// };

// export default FormikQuill;

import { useField } from 'formik';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill without SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const FormikQuill = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the component renders only in the browser
  }, []);

  if (!isClient) return null; // Prevents server-side rendering errors

  // Define the toolbar configuration with table support
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ align: [] }],
      ['link', 'image'],
      ['blockquote', 'code-block'],
      [{ table: [] }], // Table support
      ['clean'], // Clean button to remove all formatting
    ],
  };

  return (
    <div className="mb-3">
      <label className="form-label fs-2">{label}</label>
      <ReactQuill
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        modules={modules}
      />
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default FormikQuill;
