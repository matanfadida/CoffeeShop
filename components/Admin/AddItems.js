import { useContext, useState } from "react";
import { useRouter } from 'next/router';
import AuthContext from "../state/auth-context";

const AddItems = () => {
    const id = 1;
  const ctx = useContext(AuthContext);
  const router = useRouter();
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredImage, setEnteredImage] = useState("");
  const [enteredPrice, setEnteredPrice] = useState(0);
  const [enteredAvailability, setEnteredAvailability] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredTable, setEnteredTable] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");

  const addItemSubmitHandler = async(event) => {
    event.preventDefault();
    id += 1;
    const item = {
      id: id,
      name: enteredName,
      description: enteredDescription,
      image: enteredImage,
      price: enteredPrice,
      oldPrice: '',
      availability: enteredAvailability,
      table:enteredTable,
      category:enteredCategory,
    };
    
    // ctx.addItems(item);
    const response = await fetch('/api/items/data', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {'Content-Type':'application/json'}
    });
    const data = await response.json();
    // console.log(data);


    router.push('/adminlogin/Menu');
  };
  const descriptionEnteredHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const imageEnteredHandler = (event) => {
    setEnteredImage(event.target.value);
  };
  const priceEnteredHandler = (event) => {
    setEnteredPrice(event.target.value);
  };
  const availabilityEnteredHandler = (event) => {
    setEnteredAvailability(event.target.value);
  };
  const nameEnteredHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const tableEnteredHandler = (event) => {
    setEnteredTable(event.target.value);
  };
  const categortEnteredHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  return (
    <form onSubmit={addItemSubmitHandler}>
      <div>
        <label>description:</label>
        <input type="text" onChange={descriptionEnteredHandler} />
        <br/>
        <label>image:</label>
        <input type="text" onChange={imageEnteredHandler} />
        <br/>
        <label>price:</label>
        <input type="float" onChange={priceEnteredHandler} />
        <br/>
        <label>availability:</label>
        <input type="text" onChange={availabilityEnteredHandler} />
        <br/>
        <label>name:</label>
        <input type="text" onChange={nameEnteredHandler} />
        <br/>
        <label>table:</label>
        <input type="float" onChange={tableEnteredHandler} />
        <br/>
        <label>category:</label>
        <input type="text" onChange={categortEnteredHandler} />
        <br/>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItems;
