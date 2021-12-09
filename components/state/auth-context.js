import React, { useReducer, useState } from "react";

// const ITEMSDUMMY = [
//   {
//     id: "1",
//     name: "Vodka Baloga",
//     description:
//       "Beluga Noble vodka is a distinctive chemical-free vodka with true Siberian provenance. Its lightly sweet flavors of vanilla, oatmeal and honey get spicier on the back palate, leading to a dry and bracing finish. ",
//     image:
//       "https://www.liquor.com/thmb/BRR3y99WnR72Qk7alJINXWGuIjo=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bottle-review_Beluga_main_720x720-cb8c6266e203440e8826f4008eee018e.jpg",
//     price: "15.90",
//     oldPrice: "",
//     availability: "no",
//     table: "inside",
//     category: "vodka",
//   },
//   {
//     id: "2",
//     name: "Espresso",
//     description:
//       "Espresso shots topped with hot water create a light layer of crema culminating in this wonderfully rich cup with depth and nuance. Pro Tip: For an additional boost, ask your barista to try this with an extra shot.",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG",
//     price: "5.90",
//     oldPrice: "",
//     availability: "yes",
//     table: "outside",
//     category: "coffee",
//   },
// ];

const AuthContext = React.createContext({
  items: [],
  addItems: (item) => {},
  removeItem: (id) => {},
  addItemToCartHandler: (item) => {},
  removeItemFromCartHandler: (id) => {},
  chengedPrice: (id, newPrice) => {},
  fatchAute: (url) => {},
  Loading: false,
  dynamicItems: [],
  totalAmount: 0,
  isLoggedIn: false,
  token: "",
  login: (token) => {},
  logout: () => {},
  filterItems: (event) => {},
});

/////

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updateItems;
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updateTotalAmount = state.totalAmount - existingCartItem.price;
    let updateItems;

    if (existingCartItem.amount === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    }
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "CLEAN") {
    return defaultState;
  }
  return defaultState;
};

/////

export const AuthContextProvider = (props) => {
  const [items, setItems] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [cartStateReduce, dispatchCartState] = useReducer(
    cartReducer,
    defaultState
  );

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

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };

  const cleanItemHandler = () => {
    dispatchCartState({ type: "CLEAN" });
  };

  const fatchAute = async (url, enteredEmail, enteredPassword) => {
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = response.json();
    setLoading(false);

    if (!response.ok) {
      throw new Error(data.message || "Error");
    }
    console.log(data);
    return data;

    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: enteredEmail,
    //     password: enteredPassword,
    //     returnSecureToken: true,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => {
    //     setLoading(false);
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then((data) => {
    //         let errorMessage = "Authentication failed !";
    //         if (data && data.error && data.error.message) {
    //           errorMessage = data.error.message;
    //         }
    //         throw new Error(errorMessage);
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  };

  const chengedPrice = (id, newPrice) => {
    for (const index in items) {
      if (items[index].id == id) {
        items[index].oldPrice = items[index].price;
        items[index].price = newPrice;
      }
    }
    console.log(items);
  };


  const contextValue = {
    items: items,
    addItems: addItemsHandler,
    removeItem: removeItemHandler,
    addItemToCartHandler,
    removeItemFromCartHandler,
    cleanItemHandler,
    chengedPrice,
    fatchAute,
    dynamicItems: cartStateReduce.items,
    totalAmount: cartStateReduce.totalAmount,
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
