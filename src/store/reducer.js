import * as actionTypes from "../store/action";


const initalState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 29
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
                [action.ingredientNmae]: state.ingredients[action.ingredientNmae] + 1
            } ,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientNmae]
        };

        case actionTypes.REMOVE_INGREDIMENT: 
        return {
            ...state ,
            ingredients: {
                ...state.ingredients ,
                [action.ingredientNmae]: state.ingredients[action.ingredientNmae] - 1
            } ,

            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientNmae] 
        };
    }
    return state;
}

export default reducer;