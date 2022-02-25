import React from "react";
import { getSession } from "next-auth/react";
import { Fragment, useContext, useEffect, useState } from "react";
import ShowItems from "../Menu/ShowItems";
import AuthContext from "../state/auth-context";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Card from "../UI/Card";

import style from "./Menu.module.css";
import Optios from "./options";
import DayItem from "./day-item";

const Menu = (props) => {
  const ctx = useContext(AuthContext);
  const router = useRouter();
  const [itemsFilter, setItemsFilter] = useState(props.items);
  const [party, setParty] = useState("");
  const [Thursday, setThursday] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [getData, setGetData] = useState(false);
  const current = new Date();
  const today = current.toISOString().split("T")[0];
  const theDay = [props.items[Math.floor(Math.random() * props.items.length)]];

  let ShowLunch =
    current.getHours() <= 17 &&
    current.getHours() >= 14 &&
    current.getMinutes() >= 0 &&
    current.getMinutes() <= 59;
  let PartyTime = ShowLunch && current.getDay() === 0;

  useEffect(async () => {
    setGetData(true);
    if (current.getDay() === 4) {
      setThursday(true);
      setItemsFilter(filterItems(current.getDay(), "thursday"));
    } else {
      setThursday(false);
      setItemsFilter(props.items);
    }

    if (ctx.isLoggedIn || router.pathname.includes("/Baristas")) {
      const session = await getSession();
      if (session) {
        setOpenMenu(true);
        const age = +session.user.age;
        if (age >= 18) {
          await fetch("/api/items/data", {
            method: "PUT",
            body: JSON.stringify({
              age: age,
              availability: "yes",
              category: props.category,
            }),
            headers: { "Content-Type": "application/json" },
          });
        }
      } else if (router.pathname.includes("/Baristas")) {
        setOpenMenu(true);
        await fetch("/api/items/data", {
          method: "PUT",
          body: JSON.stringify({
            age: 19,
            availability: "yes",
            category: props.category,
          }),
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      await fetch("/api/items/data", {
        method: "PUT",
        body: JSON.stringify({
          availability: props.availability,
          category: props.category,
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
    setGetData(false);
  }, [ctx.isLoggedIn]);

  const filterItemsHandler = (filterItem) => {
    setItemsFilter(filterItem);
  };

  const setPartyHandler = (event) => {
    console.log(event);
    setParty(event);
  };

  if (getData) {
    return (
      <Card>
        <FontAwesomeIcon icon={faSpinner} size="2x" spin={true} />
        <p>Fetch items..</p>
      </Card>
    );
  }

  return (
    <Fragment>
      <div className={style["main-image"]}>
        <img src="/main.jpg" alt="" />
      </div>

      <Optios
        setItemsFilter={filterItemsHandler}
        items={props.items}
        today={today}
        ShowLunch
        PartyTime
        setParty={setPartyHandler}
      />

      <DayItem theDay={theDay} />
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
            Thursday={Thursday}
            category={item.category}
            openMenu={openMenu}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default React.memo(Menu);
