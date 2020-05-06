import React, { Component } from 'react'
import Au from '../../hoc/Au/Au'
import Burger from "../../components/Burger/Burger";
import BuildControl from '../../components/Burger/BuildControls/BuildControl';
import Model from '../../components/Ui/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler"
import axios from "../../axios-orders";
import Spinner from '../../components/Ui/Spinner/Spinner';


//Price for the ingredients
const INGREDIENT_PRICES = {
    salad: 10 ,
    cheese: 20 ,
    meat: 20 ,
    bacon: 20
}

 class BurgerBuilder extends Component {
  
    state = {
        ingredients: null ,
        purchaseable: false ,
        totalPrice : 29 ,
        orderSummary: false ,
        loading: false ,
        error : false
    }
  

    componentDidMount() {
      
      console.log(this.props)
        axios.get("https://react-my-burger-547ea.firebaseio.com/ingredients.json")
        .then((Response) => {
           this.setState({ ingredients : Response.data })
        })
        .catch(error => {
            this.setState( { error: true })
        })
        
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
        //axios for post the data in our dataBase
     
        //Object to store the data in dataBase to assign obj in axios
    //    this.setState({ loading: true })
    //     const order = {
    //        imgredients : this.state.ingredients ,
    //        price: this.state.totalPrice ,
    //        customer: {
    //            name: "Sonu sharma" ,
    //            address: {
    //                city: 'Ateli ',
    //                dist: 'Mohinder Garh',
    //                state: "Haryana"
    //             } ,
    //             email: "test@gmail.com" ,
    //             mob: 8708161926
    //        } ,

    //     deliveryMethod: "fastest"
    //    };
       
    //     axios.post('/orders.json' , order)
    //     .then((Response=> {
    //         console.log(Response);
    //         this.setState({ loading: false , orderSummary: false});
    //     }))
    //     .catch(error=> {
    //         console.log(error);
    //         this.setState({ loading:false , orderSummary: false});
    //     })
           
              const queryParams = [];
              for(let i in this.state.ingredients) {
                  queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
              }
             
              queryParams.push("price= " + this.state.totalPrice)
              const queryString  = queryParams.join("&");
             
            console.log(queryString)
                this.props.history.push({
                 pathname: "checkout" ,
                 search: "?" + queryString
             });
    };

    

     render() {
      
        //Disabled the less button ****
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }
        
        let orderSummary = null; 
        let burger=  this.state.error ? <p>Ingredients can't be loaded</p> :  <Spinner />;
        
        if(this.state.ingredients){
               
            burger =  (
            <Au>
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

           orderSummary = <OrderSummary ingredients={this.state.ingredients}
            PurchaseCanceled={this.purchaseHandler}
            purchaseContinued = {this.purchaseContiueHandler}
            price={this.state.totalPrice}
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


export default WithErrorHandler(BurgerBuilder , axios);