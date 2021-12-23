import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../components/state/auth-context";
import Card from "../../components/UI/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const BaristaLogin = (props) => {
  const ctx = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const enterCodeRef = useRef();
  const router = useRouter();

  const enteredCodeHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const enteredCodeRef = enterCodeRef.current.value;
    if (enteredCodeRef !== "") {
      const barista = props.baristasData.find(
        (baristas) => baristas.id === enteredCodeRef
      );
      if (barista) {
        if (barista.id === enteredCodeRef) {
          ctx.baristaLoginHandler();
          ctx.baristaName(barista.name);
          setLoading(false);
          router.replace("/Baristas");
        } else {
          setError("Chack your code");
        }
      } else {
        setError("Chack your code");
      }
    } else {
      setError("code can't be empty!");
    }
    setLoading(false);
  };

  return (
    <Card>
      <form onSubmit={enteredCodeHandler}>
        <h1>Barista</h1>
        <div>
          <label>Your Code</label>
          <input type="code" id="code" ref={enterCodeRef} />
        </div>
        <div>
          {Loading ? (
            <FontAwesomeIcon icon={faSpinner} size="2x" spin={true} />
          ) : (
            <button type="submit">Login</button>
          )}
        </div>
        {error && <p>{error}</p>}
      </form>
    </Card>
  );
};

// 61c40f78bb27f52ed78ac1ca

export default BaristaLogin;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const result = db.collection("baristas");

  const baristasData = await result.find().toArray();

  client.close();

  return {
    props: {
      baristasData: baristasData.map((barista) => ({
        id: barista._id.toString(),
        name: barista.name,
      })),
    },
  };
}
