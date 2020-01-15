import React from "react";
import fire_Config from "../Firebase/Firebase";
import { Table, Container } from "reactstrap";
import { Link } from "react-router-dom";

//import firebase from "../Firebase/Firebase";

const firebase = require("firebase/app");
require("firebase/firestore");

firebase.initializeApp(fire_Config);

function BoardApp() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = () => {
      const db = firebase.firestore();
      db.collection("Boards")
        .orderBy("Date", "desc")
        .onSnapshot(snapshot => {
          //debugger;
          const newData = snapshot.docs.map(doc => ({
            id: doc.id,
            doc,
            ...doc.data()
          }));
          setData(newData);
          //console.log(newData.doc.Date());
        });
      //setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    return fetchData();
  }, []);
  console.log(data);
  return (
    <div>
      <Container>
        <h2>Hello Board App</h2>
        <Table striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              {/*<th>Delete</th>*/}
            </tr>
          </thead>
          <tbody>
            {data.map(board => (
              <tr key={board.id}>
                <th scope="row">
                  <Link to={`/show/${board.id}`} board={board}>
                    {board.Title}
                  </Link>
                </th>
                <td>{board.Auth}</td>
                <td>
                  {new Date(
                    board.Date.currentTime.seconds * 1000
                  ).toLocaleDateString("ko")}
                  {/*{console.log(new Date(board.Date.currentTime.seconds * 1000))}*/}
                </td>
                <td>{/*<Delete board={board} />*/}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to="/create">
          <button className="btn btn-outline-primary">Post ADD</button>
        </Link>
      </Container>
    </div>
  );
}

export default BoardApp;
