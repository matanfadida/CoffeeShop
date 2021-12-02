import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCoffee } from "@fortawesome/free-solid-svg-icons";
import style from "../MainHeader/Header.module.css";

const Header = () => {
  return (
    <>
      <header className={style.header}>
        <h1>
          <FontAwesomeIcon icon={faCoffee} size="2x" />
          F&R Coffee
        </h1>
        {/* <HeaderCartButton /> */}
        <FontAwesomeIcon icon={faShoppingCart} />
      </header>
      {/* <div className={styles["main-image"]}>
          <img src={mealsImage} alt="a table" />
        </div> */}
    </>
  );
};

export default Header;
