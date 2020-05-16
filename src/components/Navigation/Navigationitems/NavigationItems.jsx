import React from 'react';
import styles from "./Navigationitems.module.css";
import NavigationItem from "./Navigationitem/NavigationItem"


const NavigationItems = (props) => {
    return (
       <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>
        Burger Builder
        </NavigationItem>
        <NavigationItem link="/orders">
            Orders
        </NavigationItem>
        <NavigationItem link="/auth">
            Authenticate
        </NavigationItem>
       </ul>
    )
}

export default NavigationItems;
