import React, { Component } from 'react'
import Au from '../../../hoc/Au/Au';
import styles from "./OrderSummary.module.css";
import Button from "../../Ui/Button/Button"


class OrderSummary extends Component {

   

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize', padding: "0 4%" }}>{igKey}: {this.props.ingredients[igKey]}</span>
                </li>
            });

        return (
            <Au>
                <h3>Your Order: </h3>
                <p className={styles.PText}>A delicious burger with the following ingredients</p>
                <ul className={styles.List}>
                    {ingredientSummary}
                </ul>
                <p className={styles.totalPrice}>Total Price: {this.props.price} &#8377;</p>
                <p className={styles.PText}>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.PurchaseCanceled} >CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued} >CONTINUE</Button>

            </Au>
        )
    }
}









export default OrderSummary;
