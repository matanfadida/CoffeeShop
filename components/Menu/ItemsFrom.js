import React, { useRef } from "react";

const ItemsFrom = props => {
    const amountAdd = useRef();

    const countClicks = (event) => {
      event.preventDefault();
      const enteredAmountNumber = +amountAdd.current.value;
      props.onAddToCart(enteredAmountNumber);
    };
  
    return (
      <form onSubmit={countClicks}>
        <input
          ref={amountAdd}
          label="Amount"
          input={{
            id: "amount_" + props.id,
            type: "number",
            min: "1",
            max: "5",
            defaultValue: "1",
          }}
        />
        <button>+ Add</button>
      </form>
    );
  };
  
export default ItemsFrom;