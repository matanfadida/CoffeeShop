import React, { useReducer, useState } from "react";

const AuthContext = React.createContext({
  items: [],
  addItemToCartHandler: (item) => {},
  removeItemFromCartHandler: (id) => {},
  fatchAute: (url) => {},
  Loading: false,
  dynamicItems: [],
  totalAmount: 0,
  error: '',
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

  let error_;

  const userIsLoggedIn = !!token;

  const isLoginHandler = (token) => {
    setToken(token);
  };

  const isLogoutHanlder = () => {
    setToken(null);
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

  const fatchAute = async (url, enteredEmail, enteredPassword, enteredAge) => {
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        age: enteredAge,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setLoading(false);

    try {
      if (!response.ok) {
        console.log(data.message);
        throw new Error(data.message || "Error");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data);
    return data;
  };

  const contextValue = {
    items: items,
    addItemToCartHandler,
    removeItemFromCartHandler,
    cleanItemHandler,
    fatchAute,
    dynamicItems: cartStateReduce.items,
    totalAmount: cartStateReduce.totalAmount,
    Loading,
    isLoggedIn: userIsLoggedIn,
    error:error_,
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
