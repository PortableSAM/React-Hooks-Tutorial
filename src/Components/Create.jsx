import React from "react";
import { Form, FormGroup, Label, Input, Container } from "reactstrap";
import { Link } from "react-router-dom";

const firebase = require("firebase/app");
require("firebase/firestore");

function Create() {
  const [title, setTitle] = React.useState();
  const [auth, setAuth] = React.useState();
  const [post, setPost] = React.useState();

  const Time = {
    currentTime: firebase.firestore.Timestamp.fromDate(new Date())
  };

  const onCreate = e => {
    e.preventDefault();
    const newPost = {
      Title: title,
      Auth: auth,
      Post: post,
      Date: Time
    };
    if (newPost === null) {
      console.log("Not Data");
    } else {
      const db = firebase.firestore();
      db.collection("Boards").add(newPost);
    }
  };
  console.log(title);
  return (
    <Container>
      <Form>
        <FormGroup>
          <Label for="PostTitle">Title</Label>
          <Input
            type="text"
            name="title"
            id="postTitle"
            placeholder="Title"
            defaultValue={setTitle}
            onChange={e => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="PostAuthor">Author</Label>
          <Input
            type="text"
            name="auth"
            id="postAuthor"
            placeholder="Auhtor"
            defaultValue={setAuth}
            onChange={e => setAuth(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="PostText">Text</Label>
          <Input
            type="textarea"
            name="post"
            id="PostText"
            defaultValue={setPost}
            onChange={e => setPost(e.target.value)}
          />
        </FormGroup>
      </Form>
      <button
        className="btn btn-outline-warning"
        onClick={onCreate}
        type="Submit"
        style={{ padding: "0", width: "95px", height: "40px" }}
      >
        <Link
          to="/"
          style={{
            padding: "9px 22px",
            textDecoration: "none",
            color: "gray"
          }}
        >
          Submit
        </Link>
      </button>
      <Link to="/">
        <button className="btn btn-outline-primary">Cancel</button>
      </Link>
    </Container>
  );
}

export default Create;
