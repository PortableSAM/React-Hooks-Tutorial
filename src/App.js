import React from "react";
import BoardApp from "./Components/BoardApp";
import Create from "./Components/Create";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Show from "./Components/Show";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={BoardApp} />
        <Route path="/create" component={Create} />
        <Route path="/show/:id" component={Show} />
      </Router>
    </div>
  );
}

export default App;
