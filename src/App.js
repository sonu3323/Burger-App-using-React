import React, { useEffect , Suspense } from 'react';
 import { Route, Switch , withRouter ,Redirect } from "react-router-dom";

import "./App.css"
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
//import Checkout from './Containers/Checkout/Checkout';
//import Orders from "./Containers/Orders/Orders";
//import Auth from './Containers/Auth/Auth,';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from "./store/actions/index";


const Checkout = React.lazy(() => {
  return import('./Containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import("./Containers/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import('./Containers/Auth/Auth,');
});

const App = props=> {
   const {onTryAutoSignup} = props;

  useEffect( () => {
    onTryAutoSignup();
  }, []);
  
   
    let routes = ( 
     <Switch>
      <Route path="/auth" render={(props)=> <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
      );
      
   
if(props.isAuthenticated) {
  routes = (
    <Switch>  
    <Route path="/checkout" render={(props)=> <Checkout {...props} />} />
    <Route path="/orders" render={(props)=> <Orders {...props} />} />
    <Route path="/logout" component={Logout} />
    <Route path="/auth" render={(props)=> <Auth {...props} />} />
    <Route path="/" exact component={BurgerBuilder} />
    <Redirect to="/" />
    </Switch>
  )
}

    return (
      <Layout> 
      <Suspense fallback={<p>loading....</p>}> {routes} </Suspense>
       </Layout>
    )
  
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
