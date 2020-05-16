import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from "../../axios-orders";
import withErrroHandler from "../../hoc/WithErrorHandler/WithErrorHandler"
import { connect } from "react-redux"; 
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Ui/Spinner/Spinner";


 class Orders extends Component {
   
    
  

   componentDidMount () {
    this.props.onFetchOrders();
   }
   
    render() {
       let orders = <Spinner />
       if( !this.props.loading) {

        orders = (
            <div>
             {
             this.props.orders.map(
                 order => (
                     <Order key ={order.id} 
                     ingredients={order.ingredients}
                     price = {order.price}
                     />
                 )
             )
             }

            </div>
        )
       };
       

       return orders
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders ,
        loading: state.order.loading
    }

};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders:()=> dispatch(actions.fetchOrder()) 
    }

};


export default connect(mapStateToProps , mapDispatchToProps)(withErrroHandler(Orders , axios));