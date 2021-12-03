import { useContext, useState } from "react";
import Card from "../UI/Card";
import AuthContext from "../state/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import style from "../Admin/LoginAdmin.module.css";

const Register = () => {
  const ctx = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const onSubmitHandlerRegister = async (event) => {
    event.preventDefault();
    try {
      const result = ctx.fatchAute(
        "/api/auth/signup",
        enteredEmail,
        enteredPassword
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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
          {/* <div className={style.control}>
            <label>Age</label>
            <input type="number" id="age" onChange={enteredEmailHandler} />
          </div> */}
          <div className={style.actions}>
            {ctx.Loading ? (
              <FontAwesomeIcon icon={faSpinner} size="2x" spin={true} />
            ) : (
              <button type="submit">Register</button>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
};

export default Register;
