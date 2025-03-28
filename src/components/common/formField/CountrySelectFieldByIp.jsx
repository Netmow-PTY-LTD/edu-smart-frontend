// import { ErrorMessage, Field } from 'formik';
// import React from 'react';
// import Select from 'react-select';

// const CountrySelectFieldByIp = ({
//   name,
//   label,
//   options,
//   defaultCountry,
//   ...props
// }) => {
//   return (
//     <div className="mb-4">
//       <label htmlFor={name} className="form-label fs-2 mb-3">
//         {label || 'Select'}
//       </label>

//       <Field name={name}>
//         {({ field, form }) => {
//           // Find the selected option based on the value (defaultCountry or Formik value)

//           console.log(defaultCountry);
//           const selectedOption =
//             options?.length > 0
//               ? options?.find(
//                   (option) =>
//                     option.value === field.value ||
//                     option.value === defaultCountry
//                 )
//               : null;

//           const handleChange = (selectedOption) => {
//             form.setFieldValue(
//               name,
//               selectedOption ? selectedOption.value : null
//             );
//           };

//           return (
//             <Select
//               {...props}
//               id={name}
//               name={name}
//               value={selectedOption} // Set value from Formik
//               onChange={handleChange}
//               options={options}
//               classNamePrefix="select"
//               isClearable={true}
//             />
//           );
//         }}
//       </Field>

//       <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
//     </div>
//   );
// };

// export default CountrySelectFieldByIp;

import { ErrorMessage, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const CountrySelectFieldByIp = ({
  name,
  label,
  options,
  defaultCountry,
  ...props
}) => {
  const [initialCountry, setInitialCountry] = useState(null);

  // Set default country only once when component mounts
  useEffect(() => {
    if (defaultCountry && options?.length > 0) {
      const foundCountry = options.find(
        (option) => option.value === defaultCountry
      );
      setInitialCountry(foundCountry || null);
    }
  }, [defaultCountry, options]);

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fs-2 mb-3">
        {label || 'Select'}
      </label>

      <Field name={name}>
        {({ field, form }) => {
          const selectedOption =
            options.find((option) => option.value === field.value) || null;

          const handleChange = (selectedOption) => {
            form.setFieldValue(
              name,
              selectedOption ? selectedOption.value : null
            );
          };

          return (
            <Select
              {...props}
              id={name}
              name={name}
              value={selectedOption || initialCountry} // Show initial country only if no selection
              onChange={handleChange}
              options={options}
              classNamePrefix="select"
              isClearable={true}
            />
          );
        }}
      </Field>

      <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default CountrySelectFieldByIp;
