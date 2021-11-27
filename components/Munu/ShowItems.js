
const ShowItems = (props) => {
    return <ul>
        <li>{props.name}</li>
        <li>{props.title}</li>
        <li>{props.price}</li>
        <li>{props.cup}</li>
    </ul>
}

export default ShowItems;