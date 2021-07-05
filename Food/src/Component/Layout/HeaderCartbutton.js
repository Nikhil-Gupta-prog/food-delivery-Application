import React,{useContext,useEffect,useState} from 'react';
import classes from "./HeaderCartbutton.module.css";
import CartIcon from "../Cart/CartIcon";
import cartContext from "../../Store/CartContext";


const HeaderCartbutton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(cartContext);

  const { items } = cartCtx;

    const numberOfCartItems = cartCtx.items.reduce((currentNumber, item)=>{
        return currentNumber+item.amount
    },0)

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
          return;
        }
        setBtnIsHighlighted(true);
    
        const timer = setTimeout(() => {
          setBtnIsHighlighted(false);
        }, 300);
    
        return () => {
          clearTimeout(timer);
        };
      }, [items]);

    return (
        
            <button className={btnClasses} onClick={props.onClick}>
                <span className={classes.icon}><CartIcon /></span>
                <span >Your Cart</span>
                <span className={classes.badge} >{numberOfCartItems}</span>
            </button>
      
    )
}

export default HeaderCartbutton
