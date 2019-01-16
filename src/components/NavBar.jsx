import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div>
    <nav className="navbar" id="myNav">
      <Link to="/" className="nav-brand">
          Fast-Food-Fast
      </Link>
      <Link to="/">View Menu</Link>
      <Link to="/login" className="profile">
          Sign in
      </Link>
      <div className="dropdown profile">
        <button type="button" className="dropbtn">
            Cart items (
          <span id="cart-count" />
            )
          <i className="fa fa-caret-down" />
        </button>
        <div className="dropdown-content">
          <div className="cart-body">
              Your cart is empty
            <br />
            <button type="button" className="blue-bg-colour white-text cart-btn">
              <Link to="/login" className="white-text">
                  Login to order
              </Link>
            </button>
          </div>
        </div>
      </div>
      <i id="nav-icon" className="icon">
          &#9776;
      </i>
    </nav>
  </div>
);

export default NavBar;
