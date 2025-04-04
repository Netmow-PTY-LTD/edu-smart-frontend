// import { useField } from 'formik';
// import dynamic from 'next/dynamic';
// import { useEffect, useState } from 'react';

// // Dynamically import TinyMCE Editor (Client-side only)
// const Editor = dynamic(
//   () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
//   { ssr: false }
// );

// const FormikTinyMCE = ({ label, apiKey, ...props }) => {
//   const [field, meta, helpers] = useField(props);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setIsMounted(true);
//     }
//   }, []);

//   return (
//     <div className="mb-3">
//       <label className="form-label fs-2">{label}</label>
//       {isMounted ? (
//         <Editor
//           apiKey={apiKey} // Use your TinyMCE API Key
//           value={field.value}
//           init={{
//             height: 400,
//             menubar: true, // Enable full menu bar
//             plugins: [
//               'advlist autolink lists link image charmap print preview anchor',
//               'searchreplace visualblocks code fullscreen',
//               'insertdatetime media table paste code help wordcount',
//             ],
//             toolbar:
//               'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | ' +
//               'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
//               'link image media table | code fullscreen preview',
//             branding: false, // Hide "Powered by TinyMCE"
//           }}
//           onEditorChange={(content) => helpers.setValue(content)}
//           onBlur={() => helpers.setTouched(true)}
//         />
//       ) : (
//         <p>Loading editor...</p>
//       )}
//       {meta.touched && meta.error && (
//         <div className="text-danger">{meta.error}</div>
//       )}
//     </div>
//   );
// };

// export default FormikTinyMCE;

// import { useField } from 'formik';
// import dynamic from 'next/dynamic';
// import { useEffect, useState } from 'react';

// // Dynamically import TinyMCE Editor (Client-side only)
// const Editor = dynamic(
//   () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
//   { ssr: false }
// );

// const FormikTinyMCE = ({ label, apiKey, ...props }) => {
//   const [field, meta, helpers] = useField(props);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setIsMounted(true);
//     }
//   }, []);

//   return (
//     <div className="mb-3">
//       <label className="form-label fs-2">{label}</label>
//       {isMounted ? (
//         <Editor
//           apiKey={apiKey} // Use your TinyMCE API Key
//           value={field.value}
//           init={{
//             height: 400,
//             menubar: true,
//             plugins: [
//               'advlist autolink lists link image charmap print preview anchor',
//               'searchreplace visualblocks code fullscreen',
//               'insertdatetime media table paste code help wordcount',
//             ],
//             toolbar:
//               'undo redo | formatselect | bold italic underline strikethrough | ' +
//               'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
//               'link image media table | code fullscreen preview',
//             branding: false,

//             // Allow only specific HTML elements (remove all class and style attributes)
//             valid_elements: '*[*]', // Allow all elements and attributes (you will control what gets stripped out separately)

//             // Remove styles when pasting
//             paste_remove_styles: true,
//             paste_remove_spans: true,
//             paste_strip_class_attributes: 'all',
//             paste_auto_cleanup_on_paste: true,
//           }}
//           onEditorChange={(content) => helpers.setValue(content)}
//           onBlur={() => helpers.setTouched(true)}
//         />
//       ) : (
//         <p>Loading editor...</p>
//       )}
//       {meta.touched && meta.error && (
//         <div className="text-danger">{meta.error}</div>
//       )}
//     </div>
//   );
// };

// export default FormikTinyMCE;

import { useField } from 'formik';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import TinyMCE Editor (Client-side only)
const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  { ssr: false }
);

const FormikTinyMCE = ({ label, apiKey, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  return (
    <div className="mb-3">
      <label className="form-label fs-2">{label}</label>
      {isMounted ? (
        <Editor
          apiKey={apiKey} // Use your TinyMCE API Key
          value={field.value}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic underline strikethrough | ' +
              'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
              'link image media table | code fullscreen preview',
            branding: false,

            // Allow only specific HTML elements (remove all class and style attributes)
            valid_elements: '*[*]', // Allow all elements and attributes (you will control what gets stripped out separately)

            // Remove styles when pasting
            paste_remove_styles: true,
            paste_remove_spans: true,
            paste_strip_class_attributes: 'all',
            paste_auto_cleanup_on_paste: true,

            // Use paste_postprocess to remove all classes from pasted content
            paste_postprocess: (plugin, args) => {
              const pastedContent = args.node;
              Array.from(pastedContent.getElementsByTagName('*')).forEach(
                (node) => {
                  // Remove unwanted attributes
                  node.removeAttribute('class');
                  node.removeAttribute('style');
                  Array.from(node.attributes).forEach((attr) => {
                    if (attr.name.startsWith('data-')) {
                      node.removeAttribute(attr.name);
                    }
                  });

                  // Remove unwanted elements (SVG)
                  if (node.tagName.toLowerCase() === 'svg') {
                    node.remove();
                  }
                }
              );
            },
          }}
          onEditorChange={(content) => helpers.setValue(content)}
          onBlur={() => helpers.setTouched(true)}
        />
      ) : (
        <p>Loading editor...</p>
      )}
      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </div>
  );
};

export default FormikTinyMCE;
