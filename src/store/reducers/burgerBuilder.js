import * as actionTypes from "../actions/actionTypes";



const initalState = {
    ingredients: null,
    totalPrice: 29 ,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 10 ,
    bacon: 20,
    cheese: 20 ,
    meat: 20 ,
}

const reducer = (state = initalState , action)=> {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: 
        return {
            ...state ,
            ingredients: {
                ...state.ingredients ,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            } ,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        };

        
        case actionTypes.REMOVE_INGREDIMENT: 
        return {
            ...state ,
            ingredients: {
                ...state.ingredients ,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            } ,

            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName] 
        };

       
       
        case actionTypes.SET_INGREDIENTS: 
        return {
            ...state ,
            ingredients: {
                salad: action.ingredients.salad ,
                bacon: action.ingredients.bacon ,
                cheese: action.ingredients.cheese ,
                meat: action.ingredients.meat
            },
            error: false,
            totalPrice: 29
        };


        case actionTypes.FETCH_INGREDIENTS_FAILED: 
        return {
            ...state ,
            error: true
        };

    }
   
   
    return state;
}

export default reducer;