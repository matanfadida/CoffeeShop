import ChooesTable from "../Clients/choos-table";
import Card from "../UI/Card";
import ShowOrder from "./show-order";

const Barista = (props) => {
  // console.log(props._id[0].id);

  return (
    <div>
      {
        <ul>
          {props.ordersData.map((data, index) => (
            <Card key={props._id[index].id}>
              <ShowOrder key={props._id[index].id} ordersData={data.data} />
              <label>total Amount: </label>
              {props.totalAmount[index].totalAmount}
              <br />
              
              <ChooesTable
                ordersData={data.data}
                totalAmount={props.totalAmount[index].totalAmount}
                id={props._id[index]}
                tablesData={props.tablesData}
                idTable={props.idTable}
                place={props.place[index]}
              />
            </Card>
          ))}
        </ul>
      }
    </div>
  );
};

export default Barista;
