import React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from './ContactData/ContantData'



 class Checkout extends Component {
    
    state = {
        ingredients: {
            salad : 1,
            cheese:1,
            meat:1,
            bacon:1
        }
    }
    

   //Store the ingredients from the URL **
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);

        let data= {};

        for (let params of query.entries()) {
            data[params[0]] = +params[1];
        }
        this.setState({ ingredients: data});
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
               <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
            </div>
        )
    }
}


export default Checkout;