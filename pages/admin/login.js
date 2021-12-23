import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../components/state/auth-context";
import Card from "../../components/UI/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const AdminLogin = (props) => {
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
      const admin = props.adminsData.find(
        (admin) => admin.id === enteredCodeRef
      );
      if (admin) {
        if (admin.id === enteredCodeRef) {
          ctx.adminLoginHandler();
          ctx.adminName(admin.name);
          setLoading(false);
          router.replace("/admin/home");
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
        <h1>Admin</h1>
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

export default AdminLogin;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://matan:matanfadida@cluster0-shard-00-00.u8zmn.mongodb.net:27017,cluster0-shard-00-01.u8zmn.mongodb.net:27017,cluster0-shard-00-02.u8zmn.mongodb.net:27017/coffe-database?ssl=true&replicaSet=atlas-lrttc1-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const result = db.collection("admins");

  const adminsData = await result.find().toArray();

  client.close();

  return {
    props: {
        adminsData: adminsData.map((admin) => ({
        id: admin._id.toString(),
        name: admin.name,
      })),
    },
  };
}
