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
            selector: 'textarea',
            height: 400,
            menubar: true,
            toolbar_mode: 'wrap',
            plugins:
              'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
            toolbar:
              'undo redo | formatselect | insertFAQ | addNestedFAQ | removeFAQ | bold italic underline strikethrough | ' +
              'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
              'link image media table | code fullscreen preview',
            branding: false,

            // ✅ Disable TinyMCE custom right-click menu
            contextmenu: false,
            // Allow only specific HTML elements (remove all class and style attributes)
            valid_elements: '*[*]', // Allow all elements and attributes (you will control what gets stripped out separately)

            // Remove styles when pasting
            paste_remove_styles: true,
            paste_remove_spans: true,
            paste_strip_class_attributes: 'all',
            paste_auto_cleanup_on_paste: true,

            setup: (editor) => {
              // ✅ Add "Insert FAQ" button (adds a new FAQ block)
              editor.ui.registry.addButton('insertFAQ', {
                text: 'Add FAQ',
                icon: 'plus',
                tooltip: 'Add new FAQ',
                onAction: () => {
                  // Get the current cursor position
                  const cursorNode = editor.selection.getNode();
                  const parentDiv = cursorNode.closest('div.faq-container');

                  // FAQ block HTML with div for FAQ description
                  const faqHTML = `
                    <div class="faq-block">
                      <details open>
                        <div class="faq-header">
                          <summary contenteditable="true">FAQ Title</summary>
                        </div>
                        <div class="faq-content">
                          <div contenteditable="true">FAQ Description</div>
                        </div>
                      </details>
                    </div>
                  `;

                  // If the cursor is inside an existing FAQ container, add a new FAQ inside it
                  if (parentDiv) {
                    parentDiv.insertAdjacentHTML('beforeend', faqHTML);
                  } else {
                    // If the cursor is outside any FAQ container, add a new FAQ at the editor root level
                    editor.insertContent(faqHTML);
                  }
                },
              });

              // ✅ Add "Remove FAQ" button
              editor.ui.registry.addButton('removeFAQ', {
                text: 'Remove FAQ',
                icon: 'remove',
                tooltip: 'Remove selected FAQ',
                onAction: () => {
                  // Get the selected node
                  const selectedNode = editor.selection.getNode();

                  // Find the closest parent <div class="faq-block">
                  const faqBlock = selectedNode.closest('.faq-block');

                  // If the selected node is inside a FAQ block, remove it
                  if (faqBlock) {
                    faqBlock.remove();
                  } else {
                    alert('Please select a FAQ to remove.');
                  }
                },
              });

              // Ensure <summary> and <details> elements are editable
              editor.on('init', () => {
                // Set <summary> and <details> elements to be editable
                editor.dom.select('summary').forEach((summary) => {
                  editor.dom.setAttrib(summary, 'contenteditable', 'true');
                });
                editor.dom.select('details').forEach((details) => {
                  editor.dom.setAttrib(details, 'contenteditable', 'true');
                });
              });

              // When the cursor moves, ensure the correct element is selected for editing
              editor.on('NodeChange', (e) => {
                const selectedNode = editor.selection.getNode();
                if (selectedNode.tagName === 'SUMMARY') {
                  // Select the text inside <summary> for easy editing
                  editor.selection.select(selectedNode.firstChild); // Select text node inside <summary>
                }
              });
            },
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
