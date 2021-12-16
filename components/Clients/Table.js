
const Table = (props) => {
    return <li>
        {`number table ${props.id+1} `}
        <br/>
        {` number chair open ${props.chair.filter(index => index !== 0)}`}
    </li>
}

export default Table;