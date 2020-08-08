import React from 'react';

import styles from './Button.module.css';

const Button = ({ text, type, ...otherProps }) => {
  return (
    <button className={styles.button} type={type} {...otherProps}>
      {text}
    </button>
  );
};

export default Button;
