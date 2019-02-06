import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div>
    <nav className="navbar" id="myNav">
      <Link to="/" className="nav-brand">
          Fast-Food-Fast
      </Link>
      <Link to="/login" className="profile">
          Login
      </Link>
    </nav>
  </div>
);

export default NavBar;
