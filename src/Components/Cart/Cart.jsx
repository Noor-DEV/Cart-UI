import React, { useState, useContext } from "react";
import classes from "./cart.module.css";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/Cart-Context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { items, totalAmount, addItemToCart, removeItemFromCart, clearItems } =
    useContext(CartContext);
  function cartItemRemoveHandler(id) {
    removeItemFromCart(id);
  }
  function cartItemAddHandler(item) {
    console.log(item, "CARTADDITEMHANDLER____noor______hassan______");
    addItemToCart({ ...item, amount: 1 });
  }
  function showOrderForm() {
    setIsCheckout(true);
  }
  function orderHandler(userData) {
    setIsSubmitting(true);
    fetch(
      "https://react-backend-d4c31-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: items,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIsSubmitted(true);
        setIsSubmitting(false);
      });
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => {
        return (
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
  const sumbittingContent = (
    <h1>Submitting Your Order....Please Wait.........</h1>
  );
  const submittedContent = (
    <React.Fragment>
      <h2>Your order has been Successfully Submitted</h2>
      <br />
      <div className={classes.actions}>
        <button className={classes["button__alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button} onClick={() => clearItems()}>
          Clear Cart
        </button>
      </div>
    </React.Fragment>
  );
  const normalModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckout && (
        <Checkout onClose={props.onClose} onConfirm={orderHandler} />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button__alt"]} onClick={props.onClose}>
            Close
          </button>
          {items.length > 0 && (
            <button className={classes.button} onClick={showOrderForm}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );
  return (
    <Modal onCartToggle={props.onCartToggle}>
      {!isSubmitted && !isSubmitting && normalModalContent}
      {isSubmitting && !isSubmitted && sumbittingContent}
      {isSubmitted && submittedContent}
    </Modal>
  );
};

export default Cart;
