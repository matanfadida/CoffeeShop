import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import style from "../MainHeader/Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <header className={style.header}>
      <h1>
        <FontAwesomeIcon icon={faCoffee} size="2x" />
        F&R Coffee
      </h1>
      <HeaderCartButton />
    </header>
  );
};

export default Header;
