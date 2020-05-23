import React from "react";
import styles from "./Order.module.css";

const Order = ({ price, ingredients }) => {
  let items = [];

  for (let item in ingredients) {
    items.push({
      name: item,
      amount: ingredients[item],
    });
  }

  return (
    <div className={styles.Order}>
      <p>
        Ingredients :
        {items.map((item) => (
          <span
            key={item.name}
            style={{
              textTransform: "capitalize",
              display: "inline-block",
              margin: " 0 8px",
              padding: "5px",
              border: "1px solid #ccc",
            }}
          >
            {" "}
            {item.name} = ({item.amount})
          </span>
        ))}
      </p>
      <p>
        Price: <strong>{price} &#8377;</strong>
      </p>
    </div>
  );
};

export default Order;
