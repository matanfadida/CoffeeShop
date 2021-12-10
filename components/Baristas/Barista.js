import CartItem from "../Cart/CartItem";


const Barista = (props) => {

  // console.log(props.ordersData.map(as=>as.name))
  

    return <div>{<ul>
        {props.ordersData.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            total={item.totalAmount}
          />
        ))}
      </ul>}</div>
}

export default Barista;