import React from 'react';
import styles from './Radio.module.css';

const Radio = ({
  label,
  name,
  handleOnChange,
  styleType,
  options,
  ...otherProps
}) => (
  <div
    className={`${styles.switchContainer} ${styles[styleType]}`}
    {...otherProps}
  >
    <label>{label}</label>
    <div>
      {options.map((option) => (
        <span className={styles.radioLabel} key={option.label}>
          <input
            type="radio"
            onChange={handleOnChange}
            id={option.label}
            name={name}
            value={option.value}
          />
          <label htmlFor={option.label}>{option.label}</label>
        </span>
      ))}
    </div>
  </div>
);

export default Radio;
