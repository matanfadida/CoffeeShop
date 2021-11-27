import React, {useEffect, useState} from "react";

const ITEMSDUMMY = [
    {
      id: "1",
      name: "coffee",
      title: "coffee",
      price: "5.90",
      cup: "medium",
    },
  ];

const AuthContext = React.createContext({
  addItems: (item) => {},
});

export const AuthContextProvider = (props) => {
    const [items, setItems] = useState(ITEMSDUMMY);

    const addItemsHandler = (item) => {
        setItems()
    }

    useEffect(() => {
        const fetchItems = async () => {
         const response = await fatch("https://coffee-project-6ee0d-default-rtdb.firebaseio.com/items.json");
         if (!response){
             throw new Error("Request failed!!");
         }
         const items = [];
         const data = await response.json();
         for (const item in data){
             items.push({id: item, name: data[item].name, title: data[item].title, price: data[item].price, cup: data[item].cup})
            }
            setItems(items);
        }
        fetchMeals().catch((error) => {console.log(error)})
            // setLoading(true);
            // setHasError(error.message || "Something went wrong!");
    }, [])

    return <AuthContext.Provider value={}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
