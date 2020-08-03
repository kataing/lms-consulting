import React from 'react';

// Components
import Form from '../components/Form';

const Register = () => {
  const title = 'Register';
  const fields = [
    { label: 'Email', type: 'text', placeholder: 'user@email.com' },
    { label: 'Password', type: 'password', placeholder: '' },
    { label: 'Confirm Password', type: 'password', placeholder: '' },
  ];

  return <Form title={title} fields={fields} />;
};

export default Register;
