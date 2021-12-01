import { useState } from "react";
import Card from "../UI/Card";
import style from "../Admin/LoginAdmin.module.css";

const Register = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const onSubmitHandlerRegister = (event) => {
    event.preventDefault();
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]");
  };

  const enteredEmailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const enteredPasswordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  return (
    <Card ClassName={style.form}>
      <form onSubmit={onSubmitHandlerRegister}>
        <div>
          <h1>Register</h1>
          <div className={style.control}>
            <label>Email</label>
            <input
              type="email"
              id="email"
              onChange={enteredEmailHandler}
            />
          </div>
          <div className={style.control}>
            <label>Password</label>
            <input
              type="password"
              id="password"
              onChange={enteredPasswordHandler}
            />
          </div>
          <div className={style.control}>
            <label>Age</label>
            <input
              type="number"
              id="age"
              onChange={enteredEmailHandler}
            />
          </div>
          <button type="submit">Register</button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
