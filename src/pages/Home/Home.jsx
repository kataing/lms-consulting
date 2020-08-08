import React from 'react';
import { auth } from '../../firebase/firebase.utils';

import styles from './Home.module.css';

// Components
import Header from '../../components/Header/Header';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';

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

  const handleOnClickSignOut = (e) => {
    auth.signOut();
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div>{auth.currentUser.firstName}</div>
      <Form className={styles.form} title={title} fields={fields} />
      <Button text="Sign Out" type="button" onClick={handleOnClickSignOut} />
    </>
  );
};

export default Home;
