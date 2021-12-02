import React, { useState } from "react";

const ITEMSDUMMY = [
  {
    id: "1",
    description:
      "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance. Pro Tip: For an additional boost, ask your barista to try this with an extra shot.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
    price: "5.90",
    availability: "yes",
  },
];

const AuthContext = React.createContext({
  items: [],
  addItems: (item) => {},
  removeItem: (id) => {},
  chengedPrice: (id, newPrice) => {},
  fatchAute: (url) => {},
  Loading: false,
  isLoggedIn: false,
  token: "",
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [items, setItems] = useState(ITEMSDUMMY);
  const [Loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const isLoginHandler = (token) => {
    setToken(token);
  };

  const isLogoutHanlder = () => {
    setToken(null);
  };

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

  const fatchAute = (url, enteredEmail, enteredPassword) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed !";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const chengedPrice = (id, newPrice) => {
    for (const index in items) {
      if (items[index].id == id) items[index].price = newPrice;
    }
    console.log(items);
  };

  const contextValue = {
    items,
    addItems: addItemsHandler,
    removeItem: removeItemHandler,
    chengedPrice,
    fatchAute,
    Loading,
    isLoggedIn: userIsLoggedIn,
    token: token,
    login: isLoginHandler,
    logout: isLogoutHanlder,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
