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
            menubar: true, // Enable full menu bar
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | ' +
              'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
              'link image media table | code fullscreen preview',
            branding: false, // Hide "Powered by TinyMCE"
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
