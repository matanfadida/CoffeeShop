import { useState } from "react";

const AddItems = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState(0);
  const [enteredCup, setEnteredCup] = useState("");

  const addItemSubmitHandler = (event) => {
    event.preventDefault();
    console.log(enteredName, enteredTitle, enteredPrice, enteredCup);
  };
  const nameEnteredHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const titleEnteredHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const priceEnteredHandler = (event) => {
    setEnteredPrice(event.target.value);
  };
  const cupEnteredHandler = (event) => {
    setEnteredCup(event.target.value);
  };

  return (
    <form onSubmit={addItemSubmitHandler}>
      <div>
        <label>name:</label>
        <input type="text" onChange={nameEnteredHandler} />
        <label>title:</label>
        <input type="text" onChange={titleEnteredHandler} />
        <label>price:</label>
        <input type="float" onChange={priceEnteredHandler} />
        <label>cup:</label>
        <input type="text" onChange={cupEnteredHandler} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItems;
