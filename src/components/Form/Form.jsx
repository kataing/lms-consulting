import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

// Components
import Input from '../Input/Input';
import Button from '../Button/Button';

const Form = ({ title, fields, className }) => {
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  // const _isMounted = useRef(false);
  const _isFirstRun = useRef(true);

  const handleOnChange = (e) => {
    const name = e.target.getAttribute('name');
    const value = e.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < fields.length; i += 1) {
      const { label, errorMessage } = fields[i];
      if (form[label].length === 0) {
        setErrorMessage(errorMessage);
        return;
      }
    }
    console.log(form);
  };

  useEffect(() => {
    if (_isFirstRun.current) {
      _isFirstRun.current = false;
    }
  });

  useEffect(() => {
    if (!_isFirstRun.current) {
      let form = {};
      for (let i = 0; i < fields.length; i += 1) {
        form[fields[i].label] = '';
      }
      setForm(form);
    }
  }, []);

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleOnSubmit}>
      <h1 className={styles.title}>{title}</h1>
      {errorMessage && <div>{errorMessage}</div>}
      {fields.map(({ label, placeholder }) => (
        <Input
          key={label}
          name={label}
          label={label}
          placeholder={placeholder}
          handleOnChange={handleOnChange}
        />
      ))}
      <Button type="submit" text="Submit" />
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.array,
};

Form.defaultProps = {
  fields: [],
};

export default Form;
