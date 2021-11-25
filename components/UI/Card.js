import style from './Card.module.css';

const Card = (props) => {
    return <div className={`${style.card} ${props.ClassName}`}>{props.children}</div>
}

export default Card;