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


export const purchaseBurger =(orderData , token)=>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth='+ token , orderData )
            .then( response => {
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


export const fetchOrder =(token , userId)=>{
 return dispatch => {
     dispatch(fetchOrderStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
     axios.get("/orders.json" + queryParams)
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

