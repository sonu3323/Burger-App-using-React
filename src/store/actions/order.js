import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";


export const purchaseBurgerSuccess = (id , orderData) => {
return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData

}
};

export const purchaseBurgerFail =(error)=>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

const purchaseBurgerStart=()=>{
    return {
        type: actionTypes.PURCHASE_BURGER_START,

    };
};


export const purchaseBurger =(orderData)=>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', orderData )
            .then( response => {
              console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data.name , orderData));
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            } );
    }
};



export const purchaseInit =()=>{
    return {
        type: actionTypes.PURCHASE_INIT
    };
};


export const fetchOrderSucess =(orders)=>{
 return {
    type: actionTypes.FETCH_ORDER_SUCESS ,
    orders: orders

 };
};


export const fetchOrderFail =(error)=>{
    return {
        type: actionTypes.FETCH_ORDER_FAIL ,
        error:error
    }
};

export const fetchOrderStart = ()=> {
return {
    type: actionTypes.FETCH_ORDER_START ,
}
};


export const fetchOrder =()=>{
 return dispatch => {
     dispatch(fetchOrderStart());
    axios.get("/orders.json")
    .then(Res=> {
        const fetchedOrders = [];
        for(let key in Res.data) {
           fetchedOrders.push({
               ...Res.data[key] ,
               id: key
            });
        }
       dispatch(fetchOrderSucess(fetchedOrders))
      //  console.log(this.state.orders)
    })
    .catch(error => {
        dispatch(fetchOrderFail())
    })

 };

};

