import React from 'react';

import styles from './Input.module.css';

const Input = ({ name, label, placeholder, handleOnChange }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        name={name}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default Input;
