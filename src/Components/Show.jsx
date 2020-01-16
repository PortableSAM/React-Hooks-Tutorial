import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

const firebase = require("firebase/app");
require("firebase/firestore");

function Show(props) {
  const brdId = props.match.params.id;
  console.log(props);
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
            key: doc.id,
            ...doc.data().Date.currentTime
          };
          setBoardItem(items);
        } else {
          console.log("Not search Documnet");
        }
      });
    };
    return fetchData();
  }, [brdId]);
  console.log(new Date(boardItem.seconds * 1000));

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("Boards")
      .doc(brdId)
      .delete();
  };

  return (
    <Container
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        textAlign: "start"
      }}
    >
      <div className="show-heading" style={{ margin: "10px" }}>
        <div className="show-title" style={{ marginBottom: "5px" }}>
          <h5> Title: {boardItem.Title}</h5>
        </div>
        <div className="show-auth" style={{ marginBottom: "5px" }}>
          <h5> Auth: {boardItem.Auth}</h5>
        </div>
        <div className="show-date" style={{ margin: "5px 0" }}>
          <h5>
            Date: {new Date(boardItem.seconds * 1000).toLocaleDateString("ko")}
          </h5>
        </div>
      </div>
      <div
        className="show-body"
        style={{ height: "400px", background: "#c6d4df", borderRadius: "5px" }}
      >
        <div
          className="show-content"
          style={{ margin: "5px", letterSpacing: "2px" }}
        >
          {boardItem.Post}
        </div>
      </div>
      <Link to="/" style={{ margin: "10px", alignSelf: "end" }}>
        <button
          className="btn btn-outline-secondary"
          style={{ marginRight: "10px" }}
        >
          Board List
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={onDelete}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </button>
      </Link>
    </Container>
  );
}

export default Show;
