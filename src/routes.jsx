import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Index from './components/Index';
import login from './components/authentication/Login';
import signup from './components/authentication/Signup';
import Menu from './components/Menu';
import Checkout from './components/presentation/Checkout';
import NotFound from './components/NotFound';
import OrderHistory from './components/OrderHistory';

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/login" component={login} />
      <Route path="/signup" component={signup} />
      <Route path="/menu" component={Menu} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/my-orders" component={OrderHistory} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
