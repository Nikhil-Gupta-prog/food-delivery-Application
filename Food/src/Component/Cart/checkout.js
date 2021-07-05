// import React,{useRef, useState} from 'react';
// import classes from "./checkout.module.css";

// const isEmpty = value => value.trim()==='';
// const isNotSixChars = value => value.trim().length !== 6;

// const Checkout = (props) => {

//     const [formInputsValidity, setFormInputsValidity] = useState({
//         name:true,
//         street:true,
//         postalCode:true,
//         city:true
//     })


//     const nameInputRef = useRef()
//     const streetInputRef = useRef()
//     const postalInputRef = useRef()
//     const cityInputRef = useRef()

//     const submitHandler = (e) =>{
//         e.preventDefault()

//         const enteredName = nameInputRef.current.value;
//         const enteredStreet = streetInputRef.current.value;
//         const enteredPostal = postalInputRef.current.value;
//         const enteredCity = cityInputRef.current.value;

//         const enterNameIsValid = isEmpty(enteredName)
//         const enterStreetIsValid = isEmpty(enteredStreet)
//         const enterPostalIsValid = isNotSixChars(enteredPostal)
//         const enterCityIsValid = isEmpty(enteredCity)

//         setFormInputsValidity({
//             name:enterNameIsValid,
//             street:enterStreetIsValid,
//             postalCode:enterPostalIsValid,
//             city:enterCityIsValid
//         })

//         const formIsValid = enterNameIsValid && enterStreetIsValid &&  enterPostalIsValid && enterCityIsValid;

//         if(!formIsValid){
//             return;
//         }
//         //submit
//     }
//     return (
//         <form className={classes.form} onSubmit={submitHandler}>
//       <div className={classes.control}>
//         <label htmlFor='name'>Your Name</label>
//         <input type='text' id='name' ref={nameInputRef} />
//         {!formInputsValidity.name && <p>Please enter a valid name!</p>}
//       </div>
//       <div className={classes.control}>
//         <label htmlFor='street'>Street</label>
//         <input type='text' id='street' ref={streetInputRef} />
//         {!formInputsValidity.street && <p>Please enter a valid street name!</p>}

//       </div>
//       <div className={classes.control}>
//         <label htmlFor='postal'>Postal Code</label>
//         <input type='text' id='postal' ref={postalInputRef} />
//         {!formInputsValidity.postalCode && <p>Please enter a Zip Code!</p>}

//       </div>
//       <div className={classes.control}>
//         <label htmlFor='city'>City</label>
//         <input type='text' id='city' ref={cityInputRef} />
//         {!formInputsValidity.city && <p>Please enter a valid City name!</p>}

//       </div>
//       <div className={classes.actions}>
//         <button type='button' onClick={props.onCancel}>
//           Cancel
//         </button>
//         <button className={classes.submit}>Confirm</button>
//       </div>
//     </form>
//     )
// }

// export default Checkout;



import { useRef, useState } from 'react';

import classes from './checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postalCode:enteredPostalCode,
        city:enteredCity
    })
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
