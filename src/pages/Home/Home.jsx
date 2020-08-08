import React, { useState, useEffect, useRef } from 'react';

import styles from './Home.module.css';

// Components
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

// Constants
import { auth } from '../../firebase/firebase.utils';

const Home = () => {
  const title = 'Learning Management System Match';
  const fields = [
    {
      label: 'Input 1',
      type: 'text',
      placeholder: '',
      errorMessage: 'Input 1 is a required field',
    },
    {
      label: 'Input 2',
      type: 'text',
      placeholder: '',
      errorMessage: 'Input 2 is a required field',
    },
    {
      label: 'Input 3',
      type: 'text',
      placeholder: '',
      errorMessage: 'Input 3 is a required field',
    },
    {
      label: 'Input 4',
      type: 'text',
      placeholder: '',
      errorMessage: 'Input 4 is a required field',
    },
    {
      label: 'Input 5',
      type: 'text',
      placeholder: '',
      errorMessage: 'Input 5 is a required field',
    },
    {
      label: 'Input 6',
      type: 'text',
      placeholder: '',
      errorMessage: 'Input 6 is a required field',
    },
  ];
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const _isMounted = useRef(true);
  const _isFirstRun = useRef(true);

  const handleOnChange = (e) => {
    const name = e.target.getAttribute('name');
    const value = e.target.value;
    _isMounted.current &&
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < fields.length; i += 1) {
      const { label, errorMessage } = fields[i];
      if (form[label].length === 0) {
        _isMounted.current && setErrorMessage(errorMessage);
        return;
      }
    }
    console.log(form);
  };

  const handleOnClickSignOut = (e) => {
    auth.signOut();
  };

  useEffect(() => {
    if (_isFirstRun.current) {
      _isFirstRun.current = false;
    }
    return () => (_isMounted.current = false);
  }, []);

  // Remove after fields have been loaded
  useEffect(() => {
    if (!_isFirstRun.current) {
      let form = {};
      for (let i = 0; i < fields.length; i += 1) {
        form[fields[i].label] = '';
      }
      _isMounted.current && setForm(form);
    }
  }, []);

  return (
    <>
      <Header />
      <div>{auth.currentUser.firstName}</div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <h1 className={styles.title}>{title}</h1>
          {errorMessage && (
            <div className={styles.errorMessage}>*{errorMessage}</div>
          )}
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
        <Button text="Sign Out" type="button" onClick={handleOnClickSignOut} />
      </div>
    </>
  );
};

export default Home;
