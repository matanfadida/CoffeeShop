import { useContext, useRef } from "react";
import { useRouter } from "next/router";
import AuthContext from "../state/auth-context";

import styles from "./ShowItems.module.css";
import ItemsFrom from "./ItemsFrom";

const ShowItems = (props) => {
  const newPriceInputRef = useRef();
  const router = useRouter();
  const ctx = useContext(AuthContext);
  const AdminLogin = router.pathname === "/admin/Menu";
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  let availability = props.availability === "yes";
  let partyState = props.PartyTime && props.party === 'party';
  let ThursdayState = props.Thursday && ctx.isLoggedIn;
  let stateAvailability = <li>{props.availability}</li>;

  if(!ctx.isLoggedIn && props.category === 'alcohol'){
    availability = false;
    stateAvailability = <li>no</li>;
  }
  
  if (partyState || props.openMenu){
    availability = true;
    stateAvailability = <li>yes</li>
  }
  let oldPrice = false;

  if(ThursdayState){
    availability = true;
    stateAvailability = <li>yes</li>
  }

  if (
    props.oldPrice !== "" &&
    current.getHours() < 16 &&
    current.getHours() >= 14 &&
    current.getMinutes() > 0 &&
    current.getMinutes() < 59
  ) {
    const oldPriceNumber = +props.oldPrice;
    const newPriceNumber = +props.price;
    oldPrice = oldPriceNumber > newPriceNumber;
  }

  const removeItems = async () => {
    await fetch("/api/items/data", {
      method: "DELETE",
      body: JSON.stringify({ id: props.id }),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/adminlogin/Menu");
  };
  const chengedPriceHandler = async () => {
    const enteredNewPrice = newPriceInputRef.current.value;
    await fetch("/api/items/data", {
      method: "PUT",
      body: JSON.stringify({
        id: props.id,
        newPrice: enteredNewPrice,
        price: props.price,
      }),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/admin/Menu");
  };

  const addToCartHandler = (amount) => {
    ctx.addItemToCartHandler({
      id: props.id,
      price: props.price,
      amount: amount,
      name: props.name,
      category: props.category,
    });
  };

  return (
    <div className={styles.div}>
      <ul>
        <img src={props.image} alt={props.name} />
        <br />
        <label>Description</label>
        <li>{props.description}</li>
        <label>Price</label>
        <li>
          {oldPrice ? (
            <p>
              {"old Price: " +
                props.oldPrice +
                " " +
                "new Price: " +
                props.price}
            </p>
          ) : (
            props.price
          )}
        </li>
        <label>Availability</label>
        {stateAvailability}
      </ul>
      {AdminLogin && (
        <div>
          <button onClick={chengedPriceHandler}>Edit Price</button>
          <input type="number" ref={newPriceInputRef} />
          <button onClick={removeItems}>Remove</button>
        </div>
      )}
      {availability && (
        <ItemsFrom id={props.id} onAddToCart={addToCartHandler} />
      )}
    </div>
  );
};

export default ShowItems;
