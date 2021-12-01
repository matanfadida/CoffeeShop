import { useState } from "react";
import Card from "../UI/Card";

import style from './LoginAdmin.module.css';

const LoginAdmin = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const onSubmitHandlerLogin = (event) => {
    event.preventDefault();
    console.log(enteredEmail, enteredPassword);
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
          <h3>Login</h3>
          <div>
            <label>Email</label>
            <input
              type="email"
              id="email"
              onChange={enteredEmailHandler}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              id="password"
              onChange={enteredPasswordHandler}
            />
          </div>
          <button type="submit">Login</button>
        </div>
      </form>
    </Card>
  );
};

export default LoginAdmin;
