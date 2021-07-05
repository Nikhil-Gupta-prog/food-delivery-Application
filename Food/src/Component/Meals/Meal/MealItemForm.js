import React,{useRef, useState} from "react";
import Input from "../../UI/Input";
import Classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

    const submitHandler = (event) => {
      event.preventDefault();
  
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;
  
      if (
        enteredAmount.trim().length === 0 ||
        enteredAmountNumber < 1 ||
        enteredAmountNumber > 5
      ) {
        setAmountIsValid(false);
        return;
      }
  
      props.onAddToCart(enteredAmountNumber);
    };
    
     

  return (
    <form className={Classes.form} onSubmit={submitHandler}>
      <Input
      ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_` + props.id,
          type: "number",
          min: 1,
          max: 7,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+Add</button>
      {!amountIsValid && <p>Please Enter suffecient number (1-7)</p>}
    </form>
  );
};

export default MealItemForm;
