import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMenu } from '../actions/index';
import NavBar from './NavBar';
import Footer from './presentation/Footer';
import '../styles/style.css';

class Index extends React.Component {
  async componentDidMount() {
    setTimeout(async () => {
      const { isLoggedin, history } = this.props;
      if (isLoggedin === true) {
        return history.push('/menu');
      }
      const { getMenu: getMenuItems } = this.props;
      await getMenuItems();
      return null;
    }, 200);
  }

  recentMenuList() {
    const { menu, history } = this.props;
    return menu.slice(-4).map(food => (
      <div className="item" key={food.food_id}>
        <div className="item-container">
          <div className="img-container">
            <img className="img-fluid" src={food.image} alt="menu-item" />
          </div>
          <div className="item-details">
            <h3>{food.food_name}</h3>
            <p>
              Price:&nbsp;
              <span className="price-figure">
                &#8358;
                {food.price}
              </span>
            </p>
            <p>
              Description:&nbsp;
              {food.description}
            </p>
            <p>
              Category:&nbsp;
              {food.category_name}
            </p>
          </div>
          <button type="button" onClick={() => history.push('/login')} className="blue-bg-colour white-text">
            Add to cart
          </button>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="top-hero">
          <div className="container">
            <div className="top-hero-text">
              <h1>Welcome to Fast-Food-Fast</h1>
              <p>Your number one food ordering platform.</p>
              <p>
                FFF is an application where customers can place order for meals daily and get it
                delivered to them in a Split Second
              </p>
            </div>
            <div className="top-hero-btn">
              <button type="button" className="blue-bg-colour ">
                <Link to="/login" className="white-text">Order now</Link>
              </button>
              <button type="button" className="green-bg">
                <Link to="/signup" className="white-text">Sign up now</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <h3 className="Class-inro">Recent Menu Items</h3>
          <div className="flex-container">
            {this.recentMenuList()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Index.defaultProps = {
  getMenu: () => {},
  history: null,
  isLoggedin: false,
  menu: [],
};

Index.propTypes = {
  getMenu: PropTypes.func,
  history: PropTypes.oneOfType([PropTypes.object]),
  isLoggedin: PropTypes.bool,
  menu: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = ({ auth, food }) => ({
  isLoggedin: auth ? auth.isLoggedin : null,
  menu: food && food.menu ? food.menu : [],
});

export default connect(mapStateToProps, { getMenu })(Index);
