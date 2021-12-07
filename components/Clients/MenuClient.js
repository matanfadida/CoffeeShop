import { useContext } from "react";
import ShowItems from "../Menu/ShowItems";
import AuthContext from "../state/auth-context";

const Menu = () => {
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
              name={item.name}
            />
          ))}
        </ul>
      );
}

export default Menu;





