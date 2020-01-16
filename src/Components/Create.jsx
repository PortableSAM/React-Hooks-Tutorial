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

  const onCreate = event => {
    const newPost = {
      Title: title,
      Auth: auth,
      Post: post,
      Date: Time
    };
    event.preventDefault();

    const db = firebase.firestore();
    try {
      db.collection("Boards")
        .doc()
        .set(newPost);
      alert("Post 전송 완료");
    } catch (error) {
      console.error("Not Data", error);
      alert("실패, 데이터가 없습니다.");
    }
  };
  console.log(onCreate.length);
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
            onChange={event => setTitle(event.target.value)}
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
            onChange={event => setAuth(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="PostText">Text</Label>
          <Input
            type="textarea"
            name="post"
            id="PostText"
            defaultValue={setPost}
            onChange={event => setPost(event.target.value)}
          />
        </FormGroup>
      </Form>

      <button
        className="btn btn-outline-warning"
        onClick={onCreate}
        type="Submit"
      >
        <Link to="/">Submit</Link>
      </button>

      <Link to="/">
        <button className="btn btn-outline-primary">Cancel</button>
      </Link>
    </Container>
  );
}

export default Create;
