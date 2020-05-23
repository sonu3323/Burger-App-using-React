import React, { useEffect, useState } from "react";
import Au from "../../hoc/Au/Au";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControl from "../../components/Burger/BuildControls/BuildControl";
import Model from "../../components/Ui/Model/Model";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import axios from "../../axios-orders";
import Spinner from "../../components/Ui/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [Purchasing, setPurchasing] = useState(false);
 

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  //Order button disabled functionality
  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const orderSummaryHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("./auth");
    }

    // console.log("Order Button click")
  };

  const purchaseCencelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContiueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  //Disabled the less button ****
  const disabledInfo = {
    ...props.ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Au>
        <Burger ingredients={props.ings} />

        <BuildControl
          ingredientAdded={props.onIngredientAdded}
          ingredientRemove={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchaseable={updatePurchaseState(props.ings)}
          orderSummary={orderSummaryHandler}
          isAuth={props.isAuthenticated}
        />
      </Au>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        PurchaseCanceled={purchaseCencelHandler}
        purchaseContinued={purchaseContiueHandler}
        price={props.price}
      />
    );
  }

  // console.log(disabledInfo)
  return (
    <Au>
      <Model show={Purchasing} modelClosed={purchaseCencelHandler}>
        {orderSummary}
      </Model>
      {burger}
    </Au>
  );
};

const mapStatetoProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(WithErrorHandler(BurgerBuilder, axios));
