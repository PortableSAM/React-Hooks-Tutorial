import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

const firebase = require("firebase/app");
require("firebase/firestore");

function Show(props) {
  const brdId = props.match.params.id;
  console.log(brdId);
  const [boardItem, setBoardItem] = React.useState([]);

  React.useEffect(() => {
    const fetchData = () => {
      const db = firebase.firestore();
      const dbRef = db.collection("Boards").doc(brdId);
      dbRef.get().then(doc => {
        if (doc.exists) {
          const items = {
            doc,
            ...doc.data(),
            key: doc.id
          };
          setBoardItem(items);
        } else {
          console.log("Not search Documnet");
        }
      });
    };
    return fetchData();
  }, []);
  console.log(boardItem);

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("Boards")
      .doc(brdId)
      .delete();
  };

  return (
    <Container>
      <div>Title:{boardItem.Title}</div>
      <div>Auth:{boardItem.Auth}</div>
      <div>Post :{boardItem.Post}</div>
      <Link to="/">
        <button className="btn btn-outline-secondary">Board List</button>
        <button className="btn btn-outline-danger" onClick={onDelete}>
          Delete
        </button>
      </Link>
    </Container>
  );
}

export default Show;
