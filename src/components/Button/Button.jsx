import React from 'react';

import styles from './Button.module.css';

const Button = ({ text, type }) => {
  return (
    <button className={styles.button} type={type}>
      {text}
    </button>
  );
};

export default Button;
