// import React, { useEffect, useState } from 'react';
// import PhoneInput from 'react-phone-input-2';
// import { useField, useFormikContext } from 'formik';
// import 'react-phone-input-2/lib/style.css';
// import countryList from 'react-select-country-list';

// const PhoneField = ({ name, label }) => {
//   const [field, meta, helpers] = useField(name);
//   const { values, setFieldValue } = useFormikContext();

//   const [countryCode, setCountryCode] = useState('us'); // default fallback
//   const countries = countryList().getData();

//   // Update country code based on selected country name
//   useEffect(() => {
//     if (values.country) {
//       const found = countries.find(
//         (c) => c.label.toLowerCase() === values.country.toLowerCase()
//       );
//       if (found) {
//         setCountryCode(found.value.toLowerCase()); // ISO Alpha-2 code
//       }
//     }
//   }, [values.country]);

//   return (
//     <div className="mb-4">
//       <label className="form-label fs-2 mb-3">{label}</label>
//       <PhoneInput
//         country={countryCode}
//         value={field.value}
//         onChange={(phone) => setFieldValue(name, phone)}
//         inputClass="form-control custom-phone"
//         inputStyle={{ width: '100%' }}
//         enableSearch={true} // allows search for countries
//       />
//       {meta.touched && meta.error && (
//         <div className="text-danger mt-1">{meta.error}</div>
//       )}
//     </div>
//   );
// };

// export default PhoneField;

import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useField, useFormikContext } from 'formik';
import 'react-phone-input-2/lib/style.css';
import countryList from 'react-select-country-list';

const PhoneField = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);
  const { values, setFieldValue } = useFormikContext();

  const [countryCode, setCountryCode] = useState('us'); // default fallback
  const countries = countryList().getData();

  // Update country code based on selected country name
  useEffect(() => {
    if (values.country) {
      const found = countries.find(
        (c) => c.label.toLowerCase() === values.country.toLowerCase()
      );
      if (found) {
        setCountryCode(found.value.toLowerCase()); // ISO Alpha-2 code
      }
    }
  }, [values.country]);

  return (
    <div className="mb-4">
      <label className="form-label fs-2 mb-3">{label}</label>

      {/* Inject the custom style */}
      <style>
        {`
          .custom-phone {
            border: 1px solid var(--color--secondary) !important;
            border-radius: 1.2rem !important;
            height: 4.8rem !important;
            background-color: transparent !important;
            font-size: 1.5rem !important;
          }
        `}
      </style>

      <PhoneInput
        country={countryCode}
        value={field.value}
        onChange={(phone) => setFieldValue(name, phone)}
        inputClass="custom-phone"
        inputStyle={{ width: '100%' }} // optional: remove this if you control width via class
        enableSearch={true}
      />

      {meta.touched && meta.error && (
        <div className="text-danger mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default PhoneField;
