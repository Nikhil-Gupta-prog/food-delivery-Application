import React,{Fragment, useContext,useState} from 'react';
import CartContext from '../../Store/CartContext';
import Modal from '../UI/Modal';
import Classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from './checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmitting, setDidSubmitting] = useState(false)


    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount}`;
    const hashCount = cartCtx.items.length > 0;

    const cartItemAddHandler =(item) =>{
        cartCtx.addItem({...item, amount: 1});
    }

    const cartItemRemoveHandler = (id) =>{
        cartCtx.removeItem(id);
    }

    const orderHandler = () =>{
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) =>{
        setIsSubmitting(true)
       const response = await fetch('https://meallist-769cc-default-rtdb.firebaseio.com/order.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderItems:cartCtx.items
            }),           
        })

            if(!response.ok){
                throw new Error('Something went wrong !')
            }
        setIsSubmitting(false)
        setDidSubmitting(true)
        cartCtx.clearCart()

        const responseData = await response.json()
    }



    const cartItems = (<ul className={Classes['cart-items']} >
       {cartCtx.items.map((item)=>(
        <CartItem 
        key={item.id}
         name={item.name}
          amount={item.amount} 
          price={item.price}
           onAdd ={cartItemAddHandler.bind(null,item)} 
           onRemove ={cartItemRemoveHandler.bind(null,item)}
         />
        
        ))}</ul>
    );

    const modalAction = (
            <div className={Classes.actions}>
                <button  className={Classes['button--alt']} onClick={props.onHide}>Close</button>
                {hashCount && <button className={Classes.button} onClick={orderHandler}>Order</button>}

            </div>
    )

    const modalCart =( <Fragment>
          {cartItems}
            <div className={Classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>

            </div>
           {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel = {props.onHide}/>}
            {!isCheckout && modalAction}
    </Fragment>)

    const successMessage = (
        <Fragment>
            <h3>Successfully Sent the Order!</h3>
            <p>You can Contact on this number 9874321000</p>
            <div className={Classes.actions}>
                <button  className={Classes.button} onClick={props.onHide}>Close</button>
            </div>
        </Fragment>
    )

    return (
        <Modal onHide={props.onHide}>

       { !isSubmitting && !didSubmitting && modalCart}
       { isSubmitting && <p>Sending Order Data...</p>}
       {!isSubmitting && didSubmitting && successMessage}

       </Modal>

    )
}

export default Cart;
