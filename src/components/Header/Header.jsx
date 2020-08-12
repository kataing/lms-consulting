import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

// Components
import Button from '../../components/Button/Button';

// Constants
import { auth } from '../../firebase/firebase.utils';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to="/">
        GO TO HOME
      </Link>
      <Button text="Sign Out" type="button" onClick={() => auth.signOut()} />
    </header>
  );
};

export default Header;
