import React, { useState } from "react";

const ITEMSDUMMY = [
  {
    id: "1",
    description:
      "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance. Pro Tip: For an additional boost, ask your barista to try this with an extra shot.",
    image: "Caffè Americano",
    price: "5.90",
    availability: "yes",
  },
];

const AuthContext = React.createContext({
  items: [],
  addItems: (item) => {},
  removeItem: (id) => {},
  chengedPrice: (id, newPrice) => {},
});

export const AuthContextProvider = (props) => {
  const [items, setItems] = useState(ITEMSDUMMY);

  const addItemsHandler = (item) => {
    const updateItems = [...items];
    updateItems.push(item);
    setItems(updateItems);
  };

  const removeItemHandler = (id) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      return newItems;
    });
  };

  const chengedPrice = (id, newPrice) => {
    for (const index in items) {
      if (items[index].id == id) items[index].price = newPrice;
    }
    console.log(items);
  };

  return (
    <AuthContext.Provider
      value={{
        items,
        addItems: addItemsHandler,
        removeItem: removeItemHandler,
        chengedPrice,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
