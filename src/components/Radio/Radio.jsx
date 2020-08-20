import React from 'react';
import styles from './Radio.module.css';

const Radio = ({
  id,
  label,
  name,
  errorMessage,
  handleOnChange,
  styleType,
  options,
}) => (
  <div className={`${styles.componentContainer} ${styles[styleType]}`}>
    {errorMessage && (
      <div className={styles.errorMessage}>* {errorMessage}</div>
    )}
    <div className={styles.rowContainer}>
      <label className={styles.label}>{`${id}. ${name}`}</label>

      <div>
        {options.map((option) => (
          <span className={styles.radioLabel} key={option.label}>
            <input
              type="radio"
              onChange={handleOnChange}
              id={`${id} | ${option.label}`}
              name={`${id} | ${name}`}
              value={option.value}
            />
            <label htmlFor={`${id} | ${option.label}`}>{option.label}</label>
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default Radio;
