import { useField } from 'formik';
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const ColorPicker = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    helpers.setValue(color.hex);
  };

  const popover = {
    position: 'absolute',
    zIndex: 2,
  };

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  return (
    <div>
      <div>
        <label htmlFor={name} className="form-label fs-2">
          {label || 'Name'}
        </label>
        <div
          style={{
            width: -50,
            height: 50,
            backgroundColor: field.value || '#e9f1fa',
            border: '1px solid #ccc',
            borderRadius: '5px',
            margin: '5px 0',
            cursor: 'pointer',
          }}
          onClick={handleClick}
        />
        {displayColorPicker && (
          <div style={popover}>
            <div style={cover} onClick={handleClose} />
            <ChromePicker color={field.value} onChange={handleChange} />
          </div>
        )}
      </div>
      {meta.touched && meta.error && (
        <div style={{ color: 'red', marginTop: '5px' }}>{meta.error}</div>
      )}
    </div>
  );
};

export default ColorPicker;
