import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkCartCount } from '../../actions/index';

class UserNavBar extends React.Component {
  state = {
  }

  componentDidMount() {
    const { checkCartCount: checkCount } = this.props;
    checkCount();
  }

  render() {
    const { cartCount, username } = this.props;
    return (
      <nav className="navbar" id="myNav">
        <Link to="#home" className="nav-brand">Fast-Food-Fast</Link>
        <Link to="/menu">View Menu</Link>
        <div className="dropdown">
          <button type="button" className="dropbtn">
            Orders
            <i className="fa fa-caret-down" />
          </button>
          <div className="dropdown-content">
            <Link to="/my-orders">Order history</Link>
          </div>
        </div>
        <div className="dropdown profile">
          <button type="button" className="dropbtn">
            Howdy,&nbsp;
            {username}
            <i className="fa fa-caret-down" />
          </button>
          <div className="dropdown-content">
            <Link to="my-account">My Account</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
        <div className="dropdown profile">
          <button type="button" className="dropbtn">
            Cart items
            (
            {cartCount}
            )
            <i className="fa fa-caret-down" />
          </button>
          <div className="dropdown-content">
            <div className="cart-body">
              <span id="cart-text">Your cart is empty</span>
              <br />
              <button type="button" className="blue-bg-colour white-text cart-btn">
                <Link to="/checkout">Procedd to checkout</Link>
              </button>
            </div>
          </div>
        </div>
        <button type="button" id="nav-icon" className="icon">&#9776;</button>
      </nav>
    );
  }
}

UserNavBar.defaultProps = {
  checkCartCount: null,
  username: '',
  cartCount: null,
};

UserNavBar.propTypes = {
  checkCartCount: PropTypes.func,
  username: PropTypes.string,
  cartCount: PropTypes.number,
};

const mapStateToProps = state => ({
  cartCount: state.cart.cartCount,
  username: state.login && state.login.username ? state.login.username : '',
});

export default connect(mapStateToProps, { checkCartCount })(UserNavBar);
