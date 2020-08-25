import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

// Components

// Constants
import { auth } from '../../firebase/firebase.utils';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.link} to="/discovery-form">
        DISCOVERY FORM
      </Link>
      <Link className={styles.link} to="/edit-form">
        EDIT DISCOVERY FORM
      </Link>
      <Link className={styles.link} to="/add-lms">
        ADD LMS
      </Link>
      <Link className={styles.link} to="/edit-lms">
        EDIT LMS
      </Link>
      <div className={styles.link} onClick={() => auth.signOut()}>
        SIGN OUT
      </div>
    </header>
  );
};

export default Header;
