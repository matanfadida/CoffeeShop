import { useState } from "react";
import Card from "../UI/Card";
import style from "../Admin/LoginAdmin.module.css";

const Register = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const onSubmitHandlerRegister = (event) => {
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
      <form onSubmit={onSubmitHandlerRegister}>
        <div>
          <h3>Register</h3>
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
          <div>
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
