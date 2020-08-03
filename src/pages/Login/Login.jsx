import React from 'react';

import styles from './Login.module.css';

// Components
import Form from '../../components/Form/Form';

const Login = () => {
  const title = 'Login';
  const fields = [
    { label: 'Email', type: 'text', placeholder: 'user@email.com' },
    { label: 'Password', type: 'password', placeholder: '' },
  ];

  return <Form className={styles.form} title={title} fields={fields} />;
};

export default Login;
