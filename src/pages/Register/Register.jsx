import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './Register.module.css';

// Components
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

// Constants
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const Register = (props) => {
  const history = useHistory();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const _isMounted = useRef(true);

  const handleOnChange = (e) => {
    const name = e.target.getAttribute('name');
    const value = e.target.value;
    _isMounted.current &&
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = form;
    if (firstName.length === 0) {
      _isMounted.current && setErrorMessage('Please enter a first name');
      return;
    }
    if (lastName.length === 0) {
      _isMounted.current && setErrorMessage('Please enter a last name');
      return;
    }
    if (email.length === 0) {
      _isMounted.current && setErrorMessage('Please enter an email');
      return;
    }
    if (!email.toLowerCase().includes('@pearadime.com')) {
      _isMounted.current && setErrorMessage('Please use a Pear A Dime email');
      return;
    }
    if (password.length === 0) {
      _isMounted.current && setErrorMessage('Please enter a password');
      return;
    }
    if (password !== confirmPassword) {
      _isMounted.current &&
        setErrorMessage('Confirm Password must match Password');
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { firstName, lastName });
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrorMessage('');
      history.push('/discovery-form');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    return () => (_isMounted.current = false);
  }, []);

  return (
    <form className={styles.form} onSubmit={handleOnSubmit}>
      <h1 className={styles.title}>Register</h1>
      {errorMessage && (
        <div className={styles.errorMessage}>*{errorMessage}</div>
      )}
      <Input
        name="firstName"
        label="First Name"
        value={form.firstName}
        type="text"
        placeholder="Jane"
        onChange={handleOnChange}
      />
      <Input
        name="lastName"
        label="Last Name"
        value={form.lastName}
        type="text"
        placeholder="Doe"
        onChange={handleOnChange}
      />
      <Input
        name="email"
        label="Email"
        value={form.email}
        type="email"
        placeholder="user@email.com"
        onChange={handleOnChange}
      />
      <Input
        name="password"
        label="Password"
        value={form.password}
        type="password"
        onChange={handleOnChange}
      />
      <Input
        name="confirmPassword"
        label="Confirm Password"
        value={form.confirmPassword}
        type="password"
        onChange={handleOnChange}
      />
      <Button type="submit" text="Submit" />
      <Link className={styles.link} to="/login">
        Back to Login
      </Link>
    </form>
  );
};

export default Register;
