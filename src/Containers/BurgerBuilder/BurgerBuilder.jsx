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
import * as actions from "../../store/actions/index";


 class BurgerBuilder extends Component {
  
    state = {
        purchaseable: false ,
        orderSummary: false ,
      
    }
  

    componentDidMount() {
      
      console.log(this.props);
      this.props.onInitIngredients();
    }
      
  


     //Order button disabled functionality
    updatePurchaseState= (ingredients)=> {
      
        const sum = Object.keys(ingredients)
        .map(igKey=> {
            return ingredients[igKey]; 
        }) 
        .reduce(((sum , el )=> {
            return sum + el;
        } ),0);

            return sum > 0
       
    }


    orderSummaryHandler=()=> {
        if(this.props.isAuthenticated){
            this.setState({orderSummary: true})
        }else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("./auth");
        }
        
        
        // console.log("Order Button click")
    }
  
    purchaseCencelHandler=()=> {
         this.setState({orderSummary: false});
     }
  
  
     purchaseContiueHandler=()=> { 
        this.props.onInitPurchase();
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
               
            burger = (
            <Au>
            <Burger  ingredients={this.props.ings} />
    
            <BuildControl 
            ingredientAdded = {this.props.onIngredientAdded} 
            ingredientRemove = {this.props.onIngredientRemoved}
            disabled = {disabledInfo}
            price = {this.props.price}
            purchaseable = {this.updatePurchaseState(this.props.ings)}
            orderSummary={this.orderSummaryHandler}
            isAuth={this.props.isAuthenticated}
            />
            </Au>
            );

           orderSummary = <OrderSummary ingredients={this.props.ings}
            PurchaseCanceled={this.purchaseCencelHandler}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error ,
        isAuthenticated: state.auth.token !=null
    };
};

const mapDispatchtoProps = dispatch => {
return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path)=>  dispatch(actions.setAuthRedirectPath(path))
   };

};


export default connect(mapStatetoProps, mapDispatchtoProps)(WithErrorHandler( BurgerBuilder, axios ));