import style from "./Menu.module.css";
import { Fragment } from "react";

const Optios = (props) => {
    const { today, ShowLunch, PartyTime, setItemsFilter, setParty } = props;

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
    if (filterKey === "price") {
      const filterItem = [...props.items].sort(
        (item_1, item_2) => item_2.price - item_1.price
      );
      filterItem = filterItem.filter((item) => item);
      return filterItem;
    }
    if (filterKey === "thursday") {
      const filterItem = props.items.filter((item) => item.thursday === "yes");
      return filterItem;
    }
    if (filterKey === "price increase") {
      const filterItem = props.items.filter(
        (item) => item.price > item.oldPrice
      );
      return filterItem;
    }
    if (filterKey === "price decrease") {
      const filterItem = props.items.filter(
        (item) => item.price < item.oldPrice
      );
      return filterItem;
    }
    if (filterKey === "the day") {
      const filterItem = [
        props.items[Math.floor(Math.random() * props.items.length)],
      ];
      return filterItem;
    }
    if (filterKey === "most popular") {
      var maxItem = Math.max(...props.items.map((item) => item.count));
      const filterItem = props.items.filter((item) => item.count === maxItem);
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

  const sortPriceHandler = (event) => {
    if (event.target.value === "all") {
      setItemsFilter(props.items);
    } else {
      setItemsFilter(filterItems(event.target.value, "price"));
    }
  };

  const selectPartyHandler = (event) => {
    if (event.target.value === "all") {
      setItemsFilter(props.items);
      setParty(event.target.value);
    } else {
      setParty(event.target.value);
      setItemsFilter(filterItems(event.target.value, "party"));
    }
  };

  const dateSelectHandler = (event) => {
    const selectDate = new Date(event.target.value).getDay();
    if (selectDate === 4) {
      setThursday(true);
      setItemsFilter(filterItems(selectDate, "thursday"));
    } else {
      setThursday(false);
      setItemsFilter(props.items);
    }
  };

  const showAsHandler = (event) => {
    if (event.target.value === "all") {
      setItemsFilter(props.items);
    } else if (event.target.value === "price increase") {
      setItemsFilter(filterItems(event.target.value, "price increase"));
    } else if (event.target.value === "price decrease") {
      setItemsFilter(filterItems(event.target.value, "price decrease"));
    } else if (event.target.value === "the day") {
      setItemsFilter(filterItems(event.target.value, "the day"));
    } else if (event.target.value === "most popular") {
      setItemsFilter(filterItems(event.target.value, "most popular"));
    }
  };

  return (
    <div className={style.div}>
      <label className={style.label}>Where Sit</label>
      <select name="sit" id="sit" onChange={selectSitHandler}>
        <option value="all">All</option>
        <option value="inside">inside</option>
        <option value="outside">outside</option>
      </select>

      <label className={style.label}>Category</label>
      <select name="category" id="category" onChange={selectCatgoryHandler}>
        <option value="all">All</option>
        <option value="alcohol">alcohol</option>
        <option value="coffee">coffee</option>
      </select>

      <label className={style.label}>Price Range</label>
      <select name="price" id="price" onChange={sortPriceHandler}>
        <option value="all">All</option>
        <option value="price">price</option>
      </select>

      <label className={style.label}>Show As</label>
      <select name="show-as" id="show-as" onChange={showAsHandler}>
        <option value="all">All</option>
        <option value="price increase">price increase</option>
        <option value="price decrease">price decrease</option>
        <option value="most popular">most popular</option>
        <option value="the day">a drink/dish of the day</option>
      </select>

      <label className={style.label}>Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        defaultValue={today}
        onChange={dateSelectHandler}
      />

      {ShowLunch && (
        <Fragment>
          <label>lunch</label>
          <select name="lunch" id="lunch" onChange={selectLunchHandler}>
            <option value="all">All</option>
            <option value="lunch">lunch</option>
          </select>
        </Fragment>
      )}

      {PartyTime && (
        <Fragment>
          <label>Party</label>
          <select name="party" id="party" onChange={selectPartyHandler}>
            <option value="all">All</option>
            <option value="party">party</option>
          </select>
        </Fragment>
      )}
    </div>
  );
};

export default Optios;
