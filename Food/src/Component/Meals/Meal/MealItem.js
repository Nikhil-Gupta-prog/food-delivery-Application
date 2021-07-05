import React,{useContext} from 'react';

import MealItemForm from "./MealItemForm";
import Classes from "./MealItem.module.css";
import CartContext from '../../../Store/CartContext';

const MealItem = (props) => {
    const cartCtx = useContext(CartContext)
    const price = `$${props.price}`;

    const addToCartHandler =amount=>{
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        })
    }
    

    return (
        
        <li className={Classes.meal}>
            
                <div >
                    <h3>{props.name} </h3>
                    <div className={Classes.description}>{props.description}</div>
                    <div className={Classes.price}>{price}</div>
                    
                </div>
            
                <MealItemForm id={props.id} onAddToCart ={addToCartHandler} />
            
        </li>
        
    )
}

export default MealItem
