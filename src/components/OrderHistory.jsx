import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getOrderHistory, deleteOrder } from '../actions/index';
import Modal from './presentation/Modal';
import NavBarUser from './presentation/NavBarUser';
import Footer from './presentation/Footer';

class OrderHistory extends React.Component {
  state = {
    orderItems: [],
    showModal: false,
    showConfirmModal: false,
    orderID: null,
    loading: 'https://i.imgur.com/ungt2Pg.gif',
  };

  async componentDidMount() {
    const {
      isLoggedIn, history, userId, getOrderHistory: getHistory,
    } = this.props;
    if (isLoggedIn === false) {
      return history.push('/login');
    }
    await getHistory(userId);
    return this.setState({ loading: '' });
  }

  confirmDelete = async (order) => {
    await this.setState({ showConfirmModal: true, orderID: order.order_id });
  }

  orderDelete = async () => {
    const { orderID } = this.state;
    const { deleteOrder: deleteAnOrder } = this.props;
    await deleteAnOrder(orderID);
    toast.success('Order deleted');
    this.setState({ showConfirmModal: false });
  }

  hideConfirmModal = () => {
    this.setState({ showConfirmModal: false });
  };

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
                id="showitemsBtn"
                className="blue-bg-colour white-text"
                onClick={() => this.showItems(order.food_items)}
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
            <button
              type="button"
              id="deletebtn"
              className="red-bg-colour white-text"
              onClick={() => this.confirmDelete(order)}
            >
              Delete order
            </button>

          </div>
        </div>
      </div>
    ));
  }

  render() {
    const {
      showModal, orderItems, showConfirmModal, loading,
    } = this.state;
    const { orders } = this.props;
    return (
      <div>
        <NavBarUser />
        <main>
          <Modal show={showConfirmModal} handleClose={this.hideConfirmModal}>
            <div className="delete-order">
              <h1>Are you sure?</h1>
              <div>
                <button type="button" className="btn green-bg white-text" onClick={() => this.hideConfirmModal()}>No</button>
                <button type="button" id="confirm-delete" className="btn red-bg-colour white-text" onClick={() => this.orderDelete()}>Yes</button>
              </div>
            </div>
          </Modal>

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
            <div className={loading === '' ? 'text-center display-none' : 'text-center display-block'}>
              <img alt="loading" src={loading} className="center" />
            </div>
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
  isLoggedIn: false,
  history: null,
  getOrderHistory: null,
  userId: null,
  deleteOrder: null,
};

OrderHistory.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  isLoggedIn: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.object]),
  userId: PropTypes.number,
  getOrderHistory: PropTypes.func,
  deleteOrder: PropTypes.func,
};

const mapStateToProps = ({ auth, order }) => ({
  isLoggedIn: auth ? auth.isLoggedin : null,
  userId: auth && auth.user ? auth.user.userId || auth.user.newUser.user_id : null,
  orders:
    order.response && order.response.myOrders ? order.response.myOrders : [],
});

export default connect(
  mapStateToProps,
  { getOrderHistory, deleteOrder },
)(OrderHistory);
