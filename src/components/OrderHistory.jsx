import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrderHistory } from '../actions/index';
import Modal from './presentation/Modal';
import NavBarUser from './presentation/NavBarUser';
import Footer from './presentation/Footer';

class OrderHistory extends React.Component {
  state = {
    orderItems: [],
    showModal: false,
  };

  componentDidMount() {
    const {
      isLoggedin, history, userId, getOrderHistory: getHistory,
    } = this.props;
    if (isLoggedin === false) {
      return history.push('/login');
    }
    return getHistory(userId);
  }

  showItems = async (foodItems) => {
    await this.setState({ orderItems: JSON.parse(foodItems) });
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  renderList() {
    const { orders } = this.props;
    return orders.map((order, index) => (
      <div className="item" key={order.order_id}>
        <div className="item-container">
          <div className="item-details">
            <p className="item-index white-text">{index + 1}</p>
            <p>
              <b>Order Date:</b>
                &nbsp;
              {new Date(order.created_at).toDateString()}
            </p>

            <p>
              <b>Items:</b>
                &nbsp;
              <button
                type="button"
                className="blue-bg-colour white-text"
                onClick={e => this.showItems(order.food_items, e)}
              >
                  View Items
              </button>
            </p>

            <p>
              <b>Amount Paid:</b>
                &nbsp;&#8358;
              {order.amount}
            </p>

            <p>
              <b>Status: </b>
              <span>{order.order_status}</span>
            </p>

            <p>{order.decline_reason}</p>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { showModal, orderItems } = this.state;
    const { orders } = this.props;
    return (
      <div>
        <NavBarUser />
        <main>
          <Modal show={showModal} handleClose={this.hideModal}>
            <div className="container">
              <h2>Ordered Food Items</h2>
              {orders && orders.length > 0
                ? orderItems.map((item, index) => (
                  <div className="food-item" key={item.food_id}>
                    <p className="item-index white-text">{index + 1}</p>
                    <p>
                      <b>Food name:</b>
                      {` ${item.food_name}`}
                    </p>

                    <p>
                      <b>Price:</b>
                      {` ${item.price}`}
                    </p>

                    <p>
                      <b>Quantity:</b>
                      {` ${item.quantity}`}
                    </p>
                  </div>
                ))
                : ''}
            </div>
          </Modal>
          <div className="container">
            <h2 className="text-center">My Order History</h2>
            <hr />

            <div className="meals">
              <div className="flex-container" id="order-history-output">
                {this.renderList()}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

OrderHistory.defaultProps = {
  orders: [],
  isLoggedin: false,
  history: null,
  getOrderHistory: null,
  userId: null,
};

OrderHistory.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  isLoggedin: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.object]),
  userId: PropTypes.number,
  getOrderHistory: PropTypes.func,
};

const mapStateToProps = state => ({
  isLoggedin: state.auth ? state.auth.isLoggedin : null,
  userId: state.auth && state.auth.response ? state.auth.response.userId : null,
  orders:
    state.order.response && state.order.response.myOrders ? state.order.response.myOrders : [],
});

export default connect(
  mapStateToProps,
  { getOrderHistory },
)(OrderHistory);
