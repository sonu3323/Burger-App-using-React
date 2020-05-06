import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from "../../axios-orders";
import withErrroHandler from "../../hoc/WithErrorHandler/WithErrorHandler"


 class Orders extends Component {
   
  state= {
      orders : [] ,
      loading: true
  }


   componentDidMount () {
    axios.get("/orders.json")
    .then(Res=> {
        const fetchedOrders = [];
        for(let key in Res.data) {
           fetchedOrders.push({
               ...Res.data[key] ,
               id: key
            });
        }
        this.setState({ loading: false , orders:fetchedOrders })
      //  console.log(this.state.orders)
    })
    .catch(error => {
        this.setState({ loading: false })
    })
   }
   
    render() {
       
        return (
            <div>
             {
             this.state.orders.map(
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
    }
}


export default withErrroHandler(Orders , axios);