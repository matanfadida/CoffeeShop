import style from "./day-item.module.css";

const DayItem = (props) => {
    const { theDay } = props
    console.log(theDay[0].image)
  return (
    <div className={style.row}>
      <h1 className={style.h1}>The Item Day !</h1>
      <p className={style.underline}></p>
      <div>
        <div className={style.column}>
          <img
            className={style["day-image"]}
            src={theDay[0].image}
            alt={theDay[0].name}
          />
        </div>
        <div className={style.column}>
          <div className={style.p}>
            <div className={style.description}>
              <h3>Description</h3>
            </div>
            <p>{theDay[0].description}</p>
            <div className={style.description}>
              <h3>Price</h3>
            </div>
            <p>{theDay[0].price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayItem;
