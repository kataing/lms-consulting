import React, { useState, useEffect, useRef } from 'react';

import styles from './Login.module.css';

// Components
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

// Constants
import { auth } from '../../firebase/firebase.utils';

const Login = () => {
  const fields = [
    { label: 'Email', type: 'text', placeholder: 'user@email.com' },
    { label: 'Password', type: 'password', placeholder: '' },
  ];
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const _isFirstRun = useRef(true);
  const _isMounted = useRef(true);

  const handleOnChange = (e) => {
    const name = e.target.getAttribute('name');
    const value = e.target.value;
    _isMounted.current &&
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (email.length === 0) {
      _isMounted.current && setErrorMessage('Please enter an email');
      return;
    }
    if (password.length === 0) {
      _isMounted.current && setErrorMessage('Please enter a password');
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setForm({ email: '', password: '' });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    if (_isFirstRun.current) {
      _isFirstRun.current = false;
    }
    return () => (_isMounted.current = false);
  }, []);

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <h1 className={styles.title}>Login</h1>
        {errorMessage && (
          <div className={styles.errorMessage}>*{errorMessage}</div>
        )}
        <Input
          name="email"
          label="Email"
          placeholder="user@email.com"
          handleOnChange={handleOnChange}
        />
        <Input
          name="password"
          label="Password"
          value={form.password}
          type="password"
          handleOnChange={handleOnChange}
        />
        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
};

export default Login;
