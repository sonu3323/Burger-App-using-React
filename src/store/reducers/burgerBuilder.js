import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


const initalState = {
    ingredients: null,
    totalPrice: 29 ,
    error: false ,
    builing: false
};

const INGREDIENT_PRICES = {
    salad: 10 ,
    bacon: 20,
    cheese: 20 ,
    meat: 20 ,
}


const addIngredients = (state, action) => {
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients , updateIngredient)
    const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName] ,
        builing: true
    
    }
      return updateObject(state , updateState);
};


const removeIngredients =(state, action)=>{
    const updateIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
        const updatedIngs = updateObject(state.ingredients , updateIng)
         const updateSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName] ,
        builing: true
      }
        return updateObject(state , updateSt)

};


const setIngredients =(state, action) => {
    return updateObject( state ,{ 
        ingredients: {
            salad: action.ingredients.salad ,
            bacon: action.ingredients.bacon ,
            cheese: action.ingredients.cheese ,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 29 ,
        builing: false
    } );

};


const fetchIngredients=(state, action)=>{
    return updateObject(state , {error: true});

}

const reducer = (state = initalState , action)=> {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIMENT: return removeIngredients(state, action)  ;
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredients(state, action);
        default: return state;
    }
   
};

export default reducer;