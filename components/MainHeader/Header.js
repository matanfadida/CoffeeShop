import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import style from "../MainHeader/Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { useContext } from "react";
import AuthContext from "../state/auth-context";

const Header = () => {
  const ctx = useContext(AuthContext);
  const loggoutHandler = () => {
    ctx.logout();
  }
  return (
    <header className={style.header}>
      <Link href="/"><h1>
        <FontAwesomeIcon icon={faCoffee} size="2x" />
        F&R Coffee
      </h1></Link>
      <HeaderCartButton />
      {ctx.isLoggedIn && <button className={style.button} onClick={loggoutHandler}>Loggout</button>}
      {!ctx.isLoggedIn && <Link href="/login"><button  className={style.button} >Login</button></Link>}
    </header>
  );
};

export default Header;
