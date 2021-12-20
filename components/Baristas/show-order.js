import CartItem from "../Cart/CartItem";

const ShowOrder = (props) => {
    // console.log(props.data.map(da => console.log(da.id)))

    return <div>{<ul>
        {props.ordersData.map((data) => (
          <CartItem
            key={data.id}
            name={data.name}
            id={data.id}
            price={data.price}
            amount={data.amount}
            vip={data.vip}
          />
        ))}
      </ul>}</div>
}

export default ShowOrder;