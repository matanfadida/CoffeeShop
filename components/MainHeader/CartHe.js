import { useContext } from "react";
import AuthContext from "../state/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartHe = () => {
    const ctx = useContext(AuthContext);
    const countOrder = ctx.dynamicItems.reduce((number, item) => {
        return number + item.amount;
      }, 0);

    return (
        <button
        //   onClick={ctx.onShowCart}
        //   className={`${styles.button} ${bumpState && styles.bump} `}
        >
          <span >
            <FontAwesomeIcon icon={faShoppingCart} />
          </span>
          <span>Your Cart</span>
          <span>{countOrder}</span>
        </button>
      );
}

export default CartHe;