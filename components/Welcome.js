import { useRouter } from "next/router";

const Welcome = (props) => {
  const router = useRouter();

  fetch("/api/auth/guest", {
    method: "PUT",
    body: JSON.stringify({
      id: "61c05ee22b74d3d1e9998dc9",
      guest: (+props.guest[0] + 1).toString(),
    }),
    headers: { "Content-Type": "application/json" },
  }).then(result => {
    console.log(result);
  });

  const clientHandler = () => {
    router.replace("/Menu");
  };
  return (
    <div>
      <h1>What Are You?</h1>
      <div>
        <label typy="text">Admin</label>
        <button>Admin</button>
      </div>
      <div>
        <label type="text">Baristas</label>
        <button>Baristas</button>
      </div>
      <div>
        <label type="text">Clients</label>
        <button onClick={clientHandler}>Clients</button>
      </div>
    </div>
  );
};

export default Welcome;
