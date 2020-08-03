import React from 'react';

const Input = ({ name, label, placeholder, handleOnChange }) => {
  return (
    <>
      <label>{label}</label>
      <input name={name} placeholder={placeholder} onChange={handleOnChange} />
    </>
  );
};

export default Input;
