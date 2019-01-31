import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { getMenu, selectFood } from '../actions/index';
import cartUtils from '../utils/cartUtils';
import NavBarUser from './presentation/NavBarUser';
import Footer from './presentation/Footer';
import '../styles/style.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.foodItems = cartUtils.getCartItems() ? JSON.parse(cartUtils.getCartItems()) : [];
    this.state = {
      loading: 'https://i.imgur.com/ungt2Pg.gif',
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: ' Loading...' });
    const { getMenu: getMenuItems } = this.props;
    await getMenuItems();
    this.setState({ loading: '' });
  }

  addFoodToCart = (newfood) => {
    const { selectFood: selectMenuItem } = this.props;
    const result = this.foodItems.find(food => food.food_id === newfood.food_id);
    if (!result || result === undefined) {
      this.foodItems.push({ ...newfood, quantity: 1 });
      const foodItemsString = JSON.stringify(this.foodItems);
      cartUtils.addItemToCart(foodItemsString);
      selectMenuItem();
      return toast.success('added item to cart');
    }
    return toast.error('you have already added this to cart');
  };

  renderList() {
    const { menu } = this.props;
    return menu.map(food => (
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
          <button type="button" onClick={() => this.addFoodToCart(food)} className="blue-bg-colour white-text">
            Add to cart
          </button>
        </div>
      </div>
    ));
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <NavBarUser />
        <main>
          <div className="container">
            <h2 className="text-center">All menu items</h2>
            <hr />
            <div className="meals">
              <div className={loading === '' ? 'text-center display-none' : 'text-center display-block'}>
                <img alt="loading" src={loading} className="center" />
              </div>
              <div className="flex-container" id="menu-output">
                {this.renderList()}
              </div>

              <div className="text-center">
                <button type="button" className="blue-bg-colour white-text">
                  <Link to="/">Show more items</Link>
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Menu.defaultProps = {
  menu: [],
  selectFood: null,
  getMenu: null,
};

Menu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.object),
  selectFood: PropTypes.func,
  getMenu: PropTypes.func,
};

const mapStateToProps = state => ({
  responseMessage: state.food ? state.food.message : null,
  menu: state.food && state.food.menu ? state.food.menu : [],
  cartItems: state.selectedFood ? state.selectedFood.items : [],
});

export default connect(mapStateToProps, { getMenu, selectFood })(Menu);
