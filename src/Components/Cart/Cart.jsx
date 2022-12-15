import React, { useContext } from "react";
import classes from "./cart.module.css";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/Cart-Context";

const Cart = (props) => {
  const { items, totalAmount, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  function cartItemRemoveHandler(id) {
    removeItemFromCart(id);
  }
  function cartItemAddHandler(item) {
    console.log(item, "CARTADDITEMHANDLER____noor______hassan______");
    addItemToCart({ ...item, amount: 1 });
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => {
        return (
          // <>
          //   <li key={item.id + Date.now()}>{item.title}</li>
          //   <br />
          //   <span>{item.amount}</span>
          // </>
          <CartItem
            {...item}
            key={item.id}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onCartToggle={props.onCartToggle}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button__alt"]} onClick={props.onCartToggle}>
          Close
        </button>
        {items.length > 0 && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
