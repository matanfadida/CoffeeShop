import { Fragment, useState } from "react";
import ShowItems from "../Menu/ShowItems";

const Menu = (props) => {
  const [itemsFilter, setItemsFilter] = useState(props.items);
  const [party, setParty] = useState('')
  const current = new Date();
  let ShowLunch =
  current.getHours() <= 16 &&
  current.getHours() >= 14 &&
  current.getMinutes() >= 0 &&
  current.getMinutes() <= 59;
  let PartyTime = ShowLunch && current.getDay() === 0;

  const filterItems = (event, filterKey) => {
    if (filterKey === "sit") {
      const filterItem = props.items.filter((item) => item.table === event);
      return filterItem;
    }
    if (filterKey === "category") {
      const filterItem = props.items.filter((item) => item.category === event);
      return filterItem;
    }
    if (filterKey === "lunch") {
      const filterItem = props.items.filter((item) => item.oldPrice !== "");
      return filterItem;
    }
    if (filterKey === "party") {
      const filterItem = props.items.filter((item) => item.party === "yes");
      return filterItem;
    }
  };

  const selectSitHandler = (event) => {
    if (event.target.value === "all") {
      setItemsFilter(props.items);
    } else {
      setItemsFilter(filterItems(event.target.value, "sit"));
    }
  };

  const selectCatgoryHandler = (event) => {
    if (event.target.value === "all") {
      setItemsFilter(props.items);
    } else {
      setItemsFilter(filterItems(event.target.value, "category"));
    }
  };

  const selectLunchHandler = (event) => {
    if (event.target.value === "all") {
      setItemsFilter(props.items);
    } else {
      setItemsFilter(filterItems(event.target.value, "lunch"));
    }
  };

  const selectPartyHandler = (event) => {
    if (event.target.value === "all") {
      setItemsFilter(props.items);
    } else {
      setParty(event.target.value);
      setItemsFilter(filterItems(event.target.value, "party"));
    }
  };
  
  return (
    <Fragment>
      <label>Where Sit?</label>
      <select name="sit" id="sit" onChange={selectSitHandler}>
        <option value="all">All</option>
        <option value="inside">inside</option>
        <option value="outside">outside</option>
      </select>

      <label>Category</label>
      <select name="category" id="category" onChange={selectCatgoryHandler}>
        <option value="all">All</option>
        {props.items.map((item) => (
          <option key={item.id} value={item.category}>
            {item.category}
          </option>
        ))}
      </select>

      {ShowLunch && (
        <Fragment>
          <label>lunch</label>
          <select name="lunch" id="lunch" onChange={selectLunchHandler}>
            <option value="all">All</option>
            <option value="lunch">lunch</option>
          </select>
        </Fragment>
      )}

      {PartyTime && <Fragment><label>Party</label>
      <select name="party" id="party" onChange={selectPartyHandler}>
        <option value="all">All</option>
        <option value="party">party</option>
      </select></Fragment>}

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
            PartyTime
            party={party}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default Menu;
