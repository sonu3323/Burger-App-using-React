import React from 'react';
import BurgerIngedient from './BurgerIngedient';
import styles from "./Burgeringredient.module.css";



function Burger(props) {
  
  console.log(props)

  let transformedIngredients = Object.keys(props.ingredients)
  .map(igKay => {
    
    return [...Array(props.ingredients[igKay])].map(( _ , i) => {
         
        return  <BurgerIngedient key={igKay + i } type={igKay} />
    } )
  })
  .reduce((arr , el) => {
     return arr.concat(el)
      }, [] )
  
  console.log(transformedIngredients)
  
  if(transformedIngredients.length === 0){
    transformedIngredients = <p>Please Start Adding Ingredients!</p>
  }
  return (
        <div className={styles.Burger}>
            <BurgerIngedient type="bread-top" />
           {transformedIngredients}
            <BurgerIngedient type="bread-bottom" />
        </div>
    )
}

export default Burger;
