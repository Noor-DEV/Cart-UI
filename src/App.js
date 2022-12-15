import React, { useState } from "react";
import "./App.css";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  function cartToggle() {
    setCartIsShown((prevState) => !prevState);
  }
  return (
    <CartProvider>
      <Header onCartToggle={cartToggle} />
      <main>
        {cartIsShown && (
          <Cart cartIsShown={cartIsShown} onCartToggle={cartToggle} />
        )}
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
