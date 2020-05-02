import React, { Component } from 'react';

import "./App.css"
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';

class App extends Component {

  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    )
  }
};


export default App
