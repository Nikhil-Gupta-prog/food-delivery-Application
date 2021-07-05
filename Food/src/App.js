import React, { useState } from "react";
import Cart from "./Component/Cart/Cart";
import Header from "./Component/Layout/Header";
import Meals from "./Component/Meals/Meals";
import CartProvider from "./Store/CartProvider";




function App() {
const [cartIsShow, setCartIsShow ] = useState(false)

const ShowCartHandler = () =>{
  setCartIsShow(true)
}
const HideCartHandler = () =>{
  setCartIsShow(false)

}

  return (
    <CartProvider>
    { cartIsShow && <Cart  onHide={HideCartHandler}/>}

      <Header onShowCart={ShowCartHandler} />
      <main>
      <Meals />

      </main>
      </CartProvider>
    
  );
}

export default App;
