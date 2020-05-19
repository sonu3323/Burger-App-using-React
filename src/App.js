import React, { Component } from 'react';
 import { Route, Switch , withRouter ,Redirect } from "react-router-dom";
 import asyncComponent from "./hoc/asyncComponents/asyncComponent";

import "./App.css"
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
//import Checkout from './Containers/Checkout/Checkout';
//import Orders from "./Containers/Orders/Orders";
//import Auth from './Containers/Auth/Auth,';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from "./store/actions/index";


const asyncCheckout = asyncComponent(() => {
  return import('./Containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import("./Containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import('./Containers/Auth/Auth,');
});

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
   
    let routes = ( 
     <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
      );
      
   
if(this.props.isAuthenticated) {
  routes = (
    <Switch>  
    <Route path="/checkout" component={asyncCheckout} />
    <Route path="/orders" component={asyncOrders} />
    <Route path="/logout" component={Logout} />
    <Route path="/auth" component={asyncAuth} />
    <Route path="/" exact component={BurgerBuilder} />
    <Redirect to="/" />
    </Switch>
  )
}

    return (
      <Layout> 
       {routes}
       </Layout>
    )
  }
};

const mapStateToProps = state => {
return {
  isAuthenticated: state.auth.token !=null
}

};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(App));
