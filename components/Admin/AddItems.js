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

  const addItemSubmitHandler = (event) => {
    event.preventDefault();
    id += 1;
    console.log(enteredDescription, enteredImage, enteredPrice, enteredAvailability);
    const item = {
      id: id,
      description: enteredDescription,
      image: enteredImage,
      price: enteredPrice,
      availability: enteredAvailability,
    };
    
    ctx.addItems(item);
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

  return (
    <form onSubmit={addItemSubmitHandler}>
      <div>
        <label>description:</label>
        <input type="text" onChange={descriptionEnteredHandler} />
        <label>image:</label>
        <input type="text" onChange={imageEnteredHandler} />
        <label>price:</label>
        <input type="float" onChange={priceEnteredHandler} />
        <label>availability:</label>
        <input type="text" onChange={availabilityEnteredHandler} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItems;
