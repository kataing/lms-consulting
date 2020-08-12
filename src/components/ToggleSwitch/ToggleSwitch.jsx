import React from 'react';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({
  label,
  name,
  handleOnChange,
  style,
  ...otherProps
}) => (
  <div className={`${styles.switchContainer} ${styles[style]}`} {...otherProps}>
    <label>{label}</label>
    <label className={styles.switch}>
      <input type="checkbox" onChange={handleOnChange} name={name} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  </div>
);

export default ToggleSwitch;
