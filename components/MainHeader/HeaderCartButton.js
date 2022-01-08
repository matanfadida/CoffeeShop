import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../state/auth-context";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  const ctx = useContext(AuthContext);
  const router = useRouter();
  const [bumpState, setBumpState] = useState(false);
  const { dynamicItems } = ctx;
    const countOrder = dynamicItems.reduce((number, item) => {
      return number + item.amount;
    }, 0);

    const moveToCartHandler = () => {
      router.push('/Pay');
    }

  useEffect(() => {
    setBumpState(true);
    const timer = setTimeout(() => {
      setBumpState(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [dynamicItems]);

  return (
    <button
      onClick={moveToCartHandler}
      className={`${styles.button} ${bumpState && styles.bump} `}
    >
      <span className={styles.icon}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{countOrder}</span>
      <span className={styles.badge}>{`${ctx.totalAmount}$`}</span>
    </button>
  );
};

export default HeaderCartButton;
