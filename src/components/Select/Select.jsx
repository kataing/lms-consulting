import React from 'react';

import styles from './Select.module.css';

const Select = ({ label, options, currentCategory, ...otherProps }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <select className={styles.select} {...otherProps} value={currentCategory}>
        <option value="null">None</option>;
        {options.map((option) => {
          if (option.id === currentCategory) {
            return (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            );
          } else {
            return (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default Select;
