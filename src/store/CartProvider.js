import React, { useReducer } from "react";

import CartContext from "./Cart-Context";

const DEFAULT_CART_CONTEXT = {
  items: [],
  totalAmount: 0,
};
const cart_reducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const newTotalAmount =
        prevState.totalAmount + action.payload.amount * action.payload.price;
      // const existingItemIndex = prevState.items.findIndex(
      //   (item) => item.id === action.payload.id
      // );
      // const existingItem = prevState.items[existingItemIndex];

      // let updatedItems;
      // if (existingItem) {
      //   const updatedItem = {
      //     ...existingItem,
      //     amount: existingItem.amount + action.payload.amount,
      //   };
      //   updatedItems = [...prevState.items];
      //   updatedItems[existingItemIndex] = updatedItem;
      // } else {
      //   updatedItems = [...prevState.items, action.payload];
      // }
      // return { items: updatedItems, totalAmount: newTotalAmount };
      let newItems;
      if (prevState.items.some((item) => item.id === action.payload.id)) {
        newItems = prevState.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: item.amount + action.payload.amount,
            };
          }
          return item;
        });
      } else {
        newItems = [...prevState.items, action.payload];
      }
      return { items: newItems, totalAmount: newTotalAmount };
    case "REMOVE_ITEM":
      const foundItem = prevState.items.find((item) => item.id === action.id);

      const deductedTotalAmount = prevState.totalAmount - foundItem.price;
      if (foundItem.amount === 1) {
        const newItems = prevState.items.filter(
          (item) => item.id !== action.id
        );
        return {
          items: [...newItems],
          totalAmount: deductedTotalAmount,
        };
      } else {
        const updatedItems = prevState.items.map((item) => {
          if (item.id === action.id) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        });

        return { items: updatedItems, totalAmount: deductedTotalAmount };
      }
    case "CLEAR_ITEMS":
      return { items: [], totalAmount: 0 };
    default:
      return prevState;
  }
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(
    cart_reducer,
    DEFAULT_CART_CONTEXT
  );
  const addItemToCart = (item) => {
    console.log(item, "----item-b4-dispatch------");
    dispatchCart({ type: "ADD_ITEM", payload: item });
  };
  const removeItemFromCart = (id) => {
    dispatchCart({ type: "REMOVE_ITEM", id });
  };
  const clearItems = () => {
    dispatchCart({ type: "CLEAR_ITEMS" });
  };
  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        dispatchCart,
        addItemToCart,
        removeItemFromCart,
        totalAmount: cartState.totalAmount,
        clearItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
