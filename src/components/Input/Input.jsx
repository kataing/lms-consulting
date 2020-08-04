import React from 'react';

import styles from './Input.module.css';

const Input = ({ name, label, placeholder, handleOnChange, type }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        type={type}
      />
    </div>
  );
};

export default Input;
