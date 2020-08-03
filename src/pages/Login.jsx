import React from 'react';

// Components
import Form from '../components/Form';

const Login = () => {
  const title = 'Login';
  const fields = [
    { label: 'Email', type: 'text', placeholder: 'user@email.com' },
    { label: 'Password', type: 'password', placeholder: '' },
  ];

  return <Form title={title} fields={fields} />;
};

export default Login;
