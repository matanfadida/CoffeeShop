import { useContext, useState } from "react";
import AuthContext from "../state/auth-context";
import Card from "../UI/Card";

import style from "./LoginAdmin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoginAdmin = () => {
  const ctx = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const onSubmitHandlerLogin = (event) => {
    event.preventDefault();
    ctx.fatchAute(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvxSQfTowm4dkpC0jqSnzCEtzSOEy2ukU",
      enteredEmail,
      enteredPassword
    );
  };

  const enteredEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const enteredPasswordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  return (
    <Card ClassName={style.form}>
      <form onSubmit={onSubmitHandlerLogin}>
        <div>
          <h1>Login</h1>
          <div className={style.control}>
            <label>Email</label>
            <input type="email" id="email" onChange={enteredEmailHandler} />
          </div>
          <div className={style.control}>
            <label>Password</label>
            <input
              type="password"
              id="password"
              onChange={enteredPasswordHandler}
            />
          </div>

          <div className={style.actions}>
            {ctx.Loading ? (
              <FontAwesomeIcon icon={faSpinner} size='2x' spin={true} />
            ) : (
              <button type="submit">Login</button>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
};

export default LoginAdmin;
