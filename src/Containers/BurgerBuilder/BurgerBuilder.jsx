import React, { Component } from 'react'
import Au from '../../hoc/Au'

import Burger from "../../components/Burger/Burger";
import BuildControl from '../../components/Burger/BuildControls/BuildControl';
import Model from '../../components/Ui/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


//Price for the ingredients
const INGREDIENT_PRICES = {
    salad: 10 ,
    cheese: 20 ,
    meat: 20 ,
    bacon: 20
}

 class BurgerBuilder extends Component {
  
    state = {
        ingredients: {
            salad: 0 ,
            bacon: 0 ,
            cheese: 0 ,
            meat: 0 
        } ,
        purchaseable: false ,
        totalPrice : 29 ,
        orderSummary: false
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

        this.setState({purchaseable: sum > 0})
       
    }



    //Add functionlity for more ingredients***

    addIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice ,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    };

    //Remove ingredients functionlity****

    removeIngredientHandler =(type)=> {
        const oldCount = this.state.ingredients[type];
      
        //if oldCount is 0 then return notheing ***8
      
        if(oldCount <= 0) {
           return;
       }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount

        const priceDecuction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDecuction;
        this.setState({
            totalPrice: newPrice ,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    };

    
    orderSummaryHandler=()=> {
        
        this.setState({orderSummary: true})
         // console.log("Order Button click")
    }
  
    purchaseHandler=()=> {
      this.setState({orderSummary: false});
     }
  
  
     purchaseContiueHandler=()=> {
        alert("you Continue! ")
     }



    render() {
      
        //Disabled the less button ****
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }

      console.log(disabledInfo)
        return (
               <Au>
               <Model show={this.state.orderSummary} modelClosed={this.purchaseHandler}> 
                <OrderSummary ingredients={this.state.ingredients}
                PurchaseCanceled={this.purchaseHandler}
                purchaseContinued = {this.purchaseContiueHandler}
                price={this.state.totalPrice}
              />
                </Model>
                <Burger  ingredients={this.state.ingredients} />
                <BuildControl 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemove = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchaseable = {this.state.purchaseable}
                orderSummary={this.orderSummaryHandler}
                />
               </Au> 
        );
    }
};


export default BurgerBuilder;