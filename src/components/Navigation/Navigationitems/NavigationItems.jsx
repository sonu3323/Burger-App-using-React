import React from "react";
import styles from "./Navigationitems.module.css";
import NavigationItem from "./Navigationitem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>

      {props.iaAuthenticated ? (
        <NavigationItem link="/orders"> Orders </NavigationItem>
      ) : null}

      {!props.iaAuthenticated ? (
        <NavigationItem link="/auth"> LogIn</NavigationItem>
      ) : (
        <NavigationItem link="/logout"> Logout</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
