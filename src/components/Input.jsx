import React from 'react';

const Input = ({ name, label, placeholder, handleOnChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input name={name} placeholder={placeholder} onChange={handleOnChange} />
    </div>
  );
};

export default Input;
