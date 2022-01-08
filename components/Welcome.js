import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "./state/auth-context";
import Card from "./UI/Card";

const Welcome = (props) => {
  const ctx = useContext(AuthContext);
  ctx.baristaLogoutHandler();
  ctx.adminLogoutHandler();
  if (ctx.isLoggedIn) {
    ctx.logout();
  }
  const router = useRouter();

  const clientHandler = () => {
    fetch("/api/auth/guest", {
      method: "PUT",
      body: JSON.stringify({
        id: "61c05ee22b74d3d1e9998dc9",
        guest: (+props.guest[0] + 1).toString(),
      }),
      headers: { "Content-Type": "application/json" },
    }).then((result) => {});
    ctx.cleanItemHandler();
    router.replace("/Menu");
  };
  const baristaHandler = () => {
    ctx.cleanItemHandler();
    router.replace("/Baristas/login");
  };
  const adminHandler = () => {
    ctx.cleanItemHandler();
    router.replace("/admin/login");
  };
  const RegisterHandler = () => {
    ctx.cleanItemHandler();
    router.replace("/Register");
  };
  const LoginHandler = () => {
    ctx.cleanItemHandler();
    router.replace("/login");
  };


  return (
    <Card>
      <h1>What Are You?</h1>
      <div>
        <label typy="text">Admin</label>
        <button onClick={adminHandler}>Admin</button>
      </div>
      <div>
        <label type="text">Baristas</label>
        <button onClick={baristaHandler}>Baristas</button>
      </div>
      <div>
        <label type="text">Clients</label>
        <button onClick={clientHandler}>Clients</button>
      </div>
      <div>
        <label type="text">Register? Sign in now!</label>
        <button onClick={LoginHandler}>Sign In</button>
      </div>
      <div>
        <label type="text">Register now!</label>
        <button onClick={RegisterHandler}>Sign Un</button>
      </div>
    </Card>
  );
};

export default Welcome;
