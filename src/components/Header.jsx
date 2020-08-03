import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      HEADER
      <Link to="/login">GO TO LOGIN</Link>
      <Link to="/register">GO TO REGISTER</Link>
      <Link to="/">GO TO HOME</Link>
    </header>
  );
};

export default Header;
