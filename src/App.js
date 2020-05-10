import React, { Component } from 'react';
 import { Route, Switch } from "react-router-dom";

import "./App.css"
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Checkout from './Containers/Checkout/Checkout';
import Orders from "./Containers/Orders/Orders"

class App extends Component {

  render() {
    return (
      <Layout>
        <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={BurgerBuilder} />
        </Switch>
       </Layout>
    )
  }
};


export default App
