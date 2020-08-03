import React from 'react';

// Components
import Form from '../components/Form';

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

  return (
    <div>
      <Form title={title} fields={fields} />
    </div>
  );
};

export default Home;
