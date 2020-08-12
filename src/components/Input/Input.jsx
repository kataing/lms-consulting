import React from 'react';

import styles from './Input.module.css';

const Input = ({ label, ...otherProps }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} {...otherProps} />
    </div>
  );
};

export default Input;
