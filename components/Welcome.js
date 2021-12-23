import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "./state/auth-context";

const Welcome = (props) => {
  const ctx = useContext(AuthContext);
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
    router.replace("/Menu");
  };
  const baristaHandler = () => {
    router.replace("/Baristas/login");
  };
  const adminHandler = () => {
    router.replace("/admin/home");
  };
  return (
    <div>
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
    </div>
  );
};

export default Welcome;
