import React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from './ContactData/ContantData';




 class Checkout extends Component {
    
    state = {
        ingredients: null ,
        totalPrice: null

    }
    

   //Store the ingredients from the URL **
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);

        let data= {};
        let price = 0;
        for (let params of query.entries()) {
           
            if( params[0] === "price" ) {
               price = params[1];
            }else {
                data[params[0]] = +params[1];

            }
        }
        this.setState({ ingredients: data , totalPrice: price});
    }
    // }

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
                ingredients={this.state.ingredients} 
               checkoutCancelled = {this.checkoutCancelled}
               checkoutContinued = {this.checkoutContinued}
               />
               <Route path={`${this.props.match.path}/contact-data`}
                render={(props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />) } />
            </div>
        )
    }
}


export default Checkout;