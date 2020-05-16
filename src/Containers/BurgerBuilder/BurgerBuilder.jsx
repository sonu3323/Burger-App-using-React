import React, { Component } from 'react'
import Au from '../../hoc/Au/Au'
import { connect } from "react-redux"; 
import Burger from "../../components/Burger/Burger";
import BuildControl from '../../components/Burger/BuildControls/BuildControl';
import Model from '../../components/Ui/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler"
import axios from "../../axios-orders";
import Spinner from '../../components/Ui/Spinner/Spinner';
import * as actionTypes from "../../store/actions/action";


//Price for the ingredients
// const INGREDIENT_PRICES = {
//     salad: 10 ,
//     cheese: 20 ,
//     meat: 20 ,
//     bacon: 20
// }

 class BurgerBuilder extends Component {
  
    state = {
       // ingredients: null ,
        purchaseable: false ,
        totalPrice : 29 ,
        orderSummary: false ,
        loading: false ,
        error : false
    }
  

    componentDidMount() {
      
      console.log(this.props)
        // axios.get("https://react-my-burger-547ea.firebaseio.com/ingredients.json")
        // .then((Response) => {
        //    this.setState({ ingredients : Response.data })
        // })
        // .catch(error => {
        //     this.setState( { error: true })
        // })
        
    }


     //Order button disabled functionality
    updatePurchaseState (ingredients) {
      
        const sum = Object.keys(ingredients)
        .map(igKey=> {
            return ingredients[igKey]; 
        }) 
        .reduce(((sum , el )=> {
            return sum + el;
        } ),0);

            return sum > 0
       
    }



    //Add functionlity for more ingredients***

    // addIngredientHandler =(type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updateCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updateCount

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         totalPrice: newPrice ,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    // };

    // //Remove ingredients functionlity****

    // removeIngredientHandler =(type)=> {
    //     const oldCount = this.state.ingredients[type];
      
    //     //if oldCount is 0 then return notheing ***8
      
    //     if(oldCount <= 0) {
    //        return;
    //    }
    //     const updateCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updateCount

    //     const priceDecuction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDecuction;
    //     this.setState({
    //         totalPrice: newPrice ,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients);
    // };

    
    orderSummaryHandler=()=> {
        
        this.setState({orderSummary: true})
         // console.log("Order Button click")
    }
  
    purchaseHandler=()=> {
      this.setState({orderSummary: false});
     }
  
  
     purchaseContiueHandler=()=> {
 
                this.props.history.push("/checkout");
    };

    

     render() {
      
        //Disabled the less button ****
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }
        
        let orderSummary = null; 
        let burger=  this.state.error ? <p>Ingredients can't be loaded</p> :  <Spinner />;
        
        if(this.props.ings){
               
            burger =  (
            <Au>
            <Burger  ingredients={this.props.ings} />
    
            <BuildControl 
            ingredientAdded = {this.props.onIngredientAdd} 
            ingredientRemove = {this.props.onIngredientRemoved}
            disabled = {disabledInfo}
            price = {this.props.price}
            purchaseable = {this.updatePurchaseState(this.props.ings)}
            orderSummary={this.orderSummaryHandler}
            />
            </Au>
            );

           orderSummary = <OrderSummary ingredients={this.props.ings}
            PurchaseCanceled={this.purchaseHandler}
            purchaseContinued = {this.purchaseContiueHandler}
            price={this.props.price}
          />
        
        }

        

    // console.log(disabledInfo)
        return (
               <Au>
               < Model show={this.state.orderSummary } modelClosed={this.purchaseHandler }> 
             { orderSummary }
                </Model>
                { burger }
               </Au> 
        );
    }
};


const mapStatetoProps = state => {
    return {
    ings: state.ingredients ,
    price: state.totalPrice
    }
};

const mapDispatchtoProps = dispatch => {
return {

    onIngredientAdd : (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT , ingredientNmae: ingName }) ,
    onIngredientRemoved : (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIMENT , ingredientNmae: ingName })

}

};


export default connect(mapStatetoProps , mapDispatchtoProps)(WithErrorHandler(BurgerBuilder , axios));