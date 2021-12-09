import { Fragment, useContext, useState } from "react";
import ShowItems from "../Menu/ShowItems";
import AuthContext from "../state/auth-context";

const Menu = (props) => {
  const ctx = useContext(AuthContext);
  const [itemsFilter, setItemsFilter] = useState(props.items);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const filterItems = (event, filterKey) => {
    if (filterKey === "sit") {
      const filterItem = props.items.filter((item) => item.table === event);
      return filterItem;
    }
    if (filterKey === "category") {
      const filterItem = props.items.filter((item) => item.category === event);
      return filterItem;
    }
  };


  const selectSitHandler = (event) => {
    if (event.target.value === "all") {
      setItemsFilter(props.items);
    } else {
      setItemsFilter(filterItems(event.target.value, 'sit'));
    }
  };

  const selectCatgoryHandler = (event) => {
    if (event.target.value === "all") {
      setItemsFilter(props.items);
    } else {
      setItemsFilter(filterItems(event.target.value, 'category'));
    }
  }


  return (
    <Fragment>
      <label>Where Sit?</label>
      <select name="sit" id="sit" onChange={selectSitHandler}>
        <option value="all">All</option>
        <option value="inside">inside</option>
        <option value="outside">outside</option>
      </select>

      <label>Category</label>
      <select name="sit" id="sit" onChange={selectCatgoryHandler}>
      <option value="all">All</option>
        {props.items.map((item) => (
          <option key={item.id} value={item.category}>{item.category}</option>
        ))}
      </select>

      <ul>
        {itemsFilter.map((item) => (
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
      </ul>
    </Fragment>
  );
};

export default Menu;
