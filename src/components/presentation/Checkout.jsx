import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBarUSer from './NavBarUser';
import { calculateTotal, checkCartCount } from '../../actions/index';
import cartUtils from '../../utils/cartUtils';
import '../../styles/style.css';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'Loading...',
      foodItems: [] || cartUtils.getCartItems() ? JSON.parse(cartUtils.getCartItems()) : [],
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: '' });
    const { calculateTotal } = this.props;
    calculateTotal();
  }

  removeItem = (food) => {
    const foodItems = cartUtils.getCartItems();
    const cart = JSON.parse(foodItems);
    let itemIndex;
    cart.map((cartItem, index) => {
      if (cartItem.food_id === food.food_id) {
        itemIndex = index;
      }
    });
    cart.splice(itemIndex, 1);
    cartUtils.addItemToCart(JSON.stringify(cart));
    this.setState({ foodItems: JSON.parse(cartUtils.getCartItems()) });
    const { calculateTotal, checkCartCount: checkCount } = this.props;
    calculateTotal();
    checkCount();
  }

  updateQuantity = (food, event) => {
    const { value } = event.target;
    const foodItems = cartUtils.getCartItems();
    const cart = JSON.parse(foodItems);
    const foodId = food.food_id;
    let foodFound;
    let itemIndex;
    cart.map((item, index) => {
      if (item.food_id === foodId) {
        foodFound = item;
        itemIndex = index;
      }
    });
    const updatedFooditem = {
      food_id: foodFound.food_id,
      name: foodFound.food_name,
      price: foodFound.price,
      quantity: parseInt(value, 10) || foodFound.quantity,
      image: foodFound.image,
      description: foodFound.description,
      category: foodFound.category_name,
    };
    cart.splice(itemIndex, 1, updatedFooditem);
    cartUtils.addItemToCart(JSON.stringify(cart));
    this.setState({ foodItems: JSON.parse(cartUtils.getCartItems()) });
    const { calculateTotal } = this.props;
    calculateTotal();
  }

  renderList() {
    const { foodItems } = this.state;
    return foodItems ? foodItems.map(food => (
      <div className="item" key={food.food_id}>
        <div className="item-container">
          <div className="img-container">
            <img className="img-fluid" src={food.image} alt="food-item" />
          </div>
          <div className="item-details">
            <h3>{food.name}</h3>
            <p>
              Price:
              <span className="price-figure">
                &#8358;
                {food.price}
              </span>
            </p>

            <p>
              Description:
              {food.description}
            </p>

            <p>
              Category:
              {food.category_name}
            </p>
          </div>
          <h3>
            Quantity:
            <input type="number" className="txt-quantity" key={food.food_id} onChange={event => this.updateQuantity(food, event)} min="0" id="quantity" defaultValue={food.quantity} />
          </h3>
          <button className="red-bg-colour white-text" type="button" onClick={e => this.removeItem(food, e)}>
            Remove
          </button>
        </div>
      </div>
    )) : '';
  }

  render() {
    const { loading, foodItems } = this.state;
    const { totalAmount } = this.props;
    return (
      <div>
        <NavBarUSer />
        <div className="container">
          <div className={loading === '' ? 'text-center display-none' : 'text-center display-block'}>
            <img alt="loading" src={loading} className="center" />
          </div>
          <h2 className="text-center">Checkout</h2>
          <hr />
          <div className={foodItems && foodItems.length < 1 ? 'text-center display-block' : 'text-center display-none'}>
            <h1>Your cart is empty</h1>
          </div>
          <div className="meals">
            <div className="flex-container" id="checkout-output">
              {this.renderList()}
            </div>
          </div>

          <div className={foodItems && foodItems.length < 1 ? 'text-center display-none' : 'text-center display-block'}>
            <h3>
              Total: &#8358;
              {totalAmount}
            </h3>
            <button type="button" className="blue-bg-colour white-text">
              Place Order
            </button>
            <div>
              <Link to="/menu" className=""> Back to Menu items</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalAmount: state.food ? state.food.totalAmount : [],
});

export default connect(mapStateToProps, { calculateTotal, checkCartCount })(Checkout);
