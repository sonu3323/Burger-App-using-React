import React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from './ContactData/ContantData';
import { connect } from "react-redux";



 class Checkout extends Component {
    
    state = {
        ingredients: null ,
        totalPrice: null

    }
    

    checkoutCancelled =()=>{
        this.props.history.goBack();
    };

    checkoutContinued=()=>{
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
      
        return (
            <div>
                <CheckoutSummary
                ingredients={this.props.ings} 
               checkoutCancelled = {this.checkoutCancelled}
               checkoutContinued = {this.checkoutContinued}
               />
               <Route path={`${this.props.match.path}/contact-data`}
                component={ContactData} />
            </div>
        )
    }
}


const mapStatetoProps = state => {
  return { 
      ings: state.ingredients 
}

};

export default connect(mapStatetoProps)(Checkout);