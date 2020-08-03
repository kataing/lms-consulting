import React from 'react';

import styles from './Register.module.css';

// Components
import Form from '../../components/Form/Form';

const Register = () => {
  const title = 'Register';
  const fields = [
    { label: 'Email', type: 'text', placeholder: 'user@email.com' },
    { label: 'Password', type: 'password', placeholder: '' },
    { label: 'Confirm Password', type: 'password', placeholder: '' },
  ];

  return <Form className={styles.form} title={title} fields={fields} />;
};

export default Register;
