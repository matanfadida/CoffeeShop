import { useState } from "react";

const LoginAdmin = () => {
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const onSubmitHandlerLogin = (event) =>{
      event.preventDefault();
      console.log(enteredUserName, enteredPassword);
  }

  const enteredUserNameHandler = (event) => {
    setEnteredUserName(event.target.value);
  }

  const enteredPasswordHandler = (event) => {
    setEnteredPassword(event.target.value);
  }
  return (
    <form onSubmit={onSubmitHandlerLogin}>
      <div>
        <h3>Login</h3>
        <div>
          <label>User Name</label>
          <input type='text' id='userName' onChange={enteredUserNameHandler}/>
        </div>
        <div>
          <label>Password</label>
          <input type='password' id='password' onChange={enteredPasswordHandler}/>
        </div>
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginAdmin;
