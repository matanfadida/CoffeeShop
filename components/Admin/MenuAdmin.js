import { useContext } from "react";
import Link from "next/link";
import ShowItems from "../Menu/ShowItems";
import AuthContext from "../state/auth-context";

const MenuAdmin = () => {
  const ctx = useContext(AuthContext);

  return (
    <ul>
      {ctx.items.map((item) => (
        <ShowItems
          key={item.id}
          id={item.id}
          description={item.description}
          image={item.image}
          price={item.price}
          availability={item.availability}
        />
      ))}
      <Link href="/additems">add</Link>
    </ul>
  );
};

export default MenuAdmin;
