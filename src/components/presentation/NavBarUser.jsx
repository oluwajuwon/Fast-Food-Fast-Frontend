import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkCartCount, logoutUser } from '../../actions/index';
import '../../styles/style.css';

class UserNavBar extends React.Component {
  state = {
  }

  async componentDidMount() {
    const { checkCartCount: checkCount } = this.props;
    await checkCount();
  }

  showNav = () => {
    const nav = document.getElementById('myNav');
    if (nav.className === 'navbar') {
      nav.className += ' responsive';
    } else {
      nav.className = 'navbar';
    }
  }

  async logout() {
    const { logoutUser: logUserout, history, checkCartCount: checkCount } = this.props;
    await logUserout();
    checkCount();
    history.push('/');
  }

  render() {
    const { cartCount, username } = this.props;
    return (
      <nav className="navbar" id="myNav">
        <Link to="/" className="nav-brand">Fast-Food-Fast</Link>
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
            <button type="button" onClick={() => this.logout()} className="logout-btn">Logout</button>
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
              <span id="cart-text">
              Your cart has
                {` ${cartCount} `}
              items
              </span>
              <br />
              <button type="button" className="blue-bg-colour white-text cart-btn">
                <Link to="/checkout" className="white-text">Proceed to checkout</Link>
              </button>
            </div>
          </div>
        </div>
        <button type="button" id="nav-icon" className="icon" onClick={() => this.showNav()}>&#9776;</button>
      </nav>
    );
  }
}

UserNavBar.defaultProps = {
  checkCartCount: null,
  username: '',
  cartCount: null,
  logoutUser: null,
  history: null,
};

UserNavBar.propTypes = {
  checkCartCount: PropTypes.func,
  username: PropTypes.string,
  cartCount: PropTypes.number,
  logoutUser: PropTypes.func,
  history: PropTypes.oneOfType([PropTypes.object]),
};

const mapStateToProps = ({ auth, cart }) => ({
  cartCount: cart.cartCount,
  username: auth && auth.user ? auth.user.username || auth.user.newUser.username : '',
});

export default connect(mapStateToProps, { checkCartCount, logoutUser })(withRouter(UserNavBar));
