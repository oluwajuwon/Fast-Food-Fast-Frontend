import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLoggedinUser } from './actions/index';
import Index from './components/Index';
import login from './components/authentication/Login';
import signup from './components/authentication/Signup';
import Menu from './components/Menu';
import Checkout from './components/presentation/Checkout';
import NotFound from './components/NotFound';
import OrderHistory from './components/OrderHistory';

class Routes extends React.Component {
  async componentDidMount() {
    const { getLoggedinUser: getCurrentUser } = this.props;
    await getCurrentUser();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/login" component={login} />
          <Route path="/signup" component={signup} />
          <Route path="/menu" component={Menu} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/my-orders" component={OrderHistory} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

Routes.defaultProps = {
  getLoggedinUser: null,

};

Routes.propTypes = {
  getLoggedinUser: PropTypes.func,
};

export default connect(null, { getLoggedinUser })(Routes);
