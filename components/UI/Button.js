import style from "./Button.module.css";

const Button = (props) => {

    const OnClickHandler = () => {
        props.onClick();
    }

    return <button onClick={OnClickHandler} className={`${style.button} ${props.ClassName}`}>{props.children}</button>
}

export default Button;