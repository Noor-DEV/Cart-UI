import React, { useContext } from "react";
import { useRef } from "react";

import CartContext from "../../store/Cart-Context";

import Input from "../UI/Input";
import classes from "./MealSummary.module.css";

const Meal = (props) => {
  const { addItemToCart } = useContext(CartContext);
  const formattedPrice = `$${props.item.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    const newItem = { ...props.item, amount: +amount };
    addItemToCart(newItem);
  };
  return (
    <div className={classes["meal-container"]}>
      <div className={classes.img_container}>
        {/* <img
          className={classes.img}
          src="https://images.unsplash.com/photo-1664575196044-195f135295df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        /> */}
        <img
          src="https://images.unsplash.com/photo-1670592137100-3de943c0d7e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
          className={classes.img}
        />
      </div>
      <div className={classes.content_container}>
        <h1 className={classes["meal-header"]}>{props.item.title}</h1>
        <div className={classes["meal-content"]}>
          <p>{props.item.description}</p>
        </div>
        <div className={classes["meal-price"]}>
          <span className={classes["price-text"]}>Price: </span>
          <span className={classes.money}>{formattedPrice}</span>
        </div>
        {/* <div className={classes["meal-btns"]}> */}
        {/* <button type="button" className={classes.btn}>
            Add to Cart
          </button>
          <button className={classes.btn}>Add to Favorites</button> */}
        <MealItemForm id={props.item.id} onAddItem={addToCartHandler} />
        {/* </div> */}
      </div>
    </div>
  );
};

const MealItemForm = (props) => {
  const amountRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("***********ADDING_TO_REDUCER_STATE****************");
    props.onAddItem(Number(amountRef.current.value));
  };
  return (
    <form className={classes["meal-btns"]} onSubmit={handleSubmit}>
      <Input
        input={{
          id: props.id,
          type: "number",
          name: "amount",
          // id: {props.id},
          // type: "number",
          // name: "amount",
        }}
        ref={amountRef}
        label="Amount"
      />
      <button className={classes.btn} type="submit">
        Add to Cart
      </button>
    </form>
  );
};
export default Meal;
