import Link from "next/link";
import ShowItems from "../Menu/ShowItems";

const MenuAdmin = (props) => {

  return (
    <ul>
      {props.items.map((item) => (
        <ShowItems
          key={item.id}
          id={item.id}
          description={item.description}
          image={item.image}
          price={item.price}
          availability={item.availability}
          name={item.name}
          oldPrice={item.oldPrice}
        />
      ))}
      <Link href="/additems">add</Link>
    </ul>
  );
};

export default MenuAdmin;
