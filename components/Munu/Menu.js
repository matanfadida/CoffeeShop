import { useState } from "react";
import Link from 'next/link';
import ShowItems from "./ShowItems";

const ITEMSDUMMY = [
  {
    id: "1",
    name: "coffee",
    title: "coffee",
    price: "5.90",
    cup: "medium",
  },
];
const Menu = () => {
  const [items, setItems] = useState(ITEMSDUMMY);

  return (
    <ul>
      {items.map((item) => (
        <ShowItems
          key={item.id}
          name={item.name}
          title={item.title}
          price={item.price}
          cup={item.cup}
        />
      ))}
      <Link href="/AddItems">add</Link>
    </ul>
  );
};

export default Menu;
