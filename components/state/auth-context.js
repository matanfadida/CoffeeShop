import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useReducer, useState } from "react";

const AuthContext = React.createContext({
  changeOrdersHandler: () => {},
  getOrderId: "",
  getUser: "",
  setUser: (email) => {},
  setOrderId: (id) => {},
  ordered: false,
  baristaChange: false,
  place: {},
  baristaLoginHandler: () => {},
  baristaLogin: false,
  changeBaristasHandler: () => {},
  collectionChair: (place) => {},
  addItemToCartHandler: (item) => {},
  removeItemFromCartHandler: (id) => {},
  fatchAute: (url) => {},
  Loading: false,
  dynamicItems: [],
  totalAmount: 0,
  error: "",
  isLoggedIn: false,
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
  const [Loading, setLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [place, setPlace] = useState({});
  const [getOrderId, setOrderId] = useState("");
  const [getUser, setUser] = useState("");
  const [baristaChange, setBaristaChange] = useState(false);
  const [baristaLogin, setBaristaLogin] = useState(false);
  const [cartStateReduce, dispatchCartState] = useReducer(
    cartReducer,
    defaultState
  );
  const { data: session } = useSession();
  let userIsLoggedIn = false;

  if (session) {
    userIsLoggedIn = true;
  }

  let error_;

  const isLogoutHanlder = () => {
    signOut();
    userIsLoggedIn = false;
  };

  const changeOrdersHandler = () => {
    setOrdered(true);
  };

  const changeBaristasHandler = () => {
    setBaristaChange(true);
  };

  const baristaLoginHandler = () => {
    setBaristaLogin(true);
  };

  const collectionChair = (place) => {
    setPlace(place);
  };

  const setOrderIdHandler = (id) => {
    setOrderId(id);
  };

  const setUserHandler = (email) => {
    setUser(email);
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
    changeOrdersHandler,
    getOrderId,
    getUser,
    setUser: setUserHandler,
    setOrderId: setOrderIdHandler,
    ordered,
    baristaChange,
    collectionChair,
    place,
    baristaLogin,
    baristaLoginHandler,
    changeBaristasHandler,
    addItemToCartHandler,
    removeItemFromCartHandler,
    cleanItemHandler,
    fatchAute,
    dynamicItems: cartStateReduce.items,
    totalAmount: cartStateReduce.totalAmount,
    Loading,
    isLoggedIn: userIsLoggedIn,
    error: error_,
    logout: isLogoutHanlder,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
