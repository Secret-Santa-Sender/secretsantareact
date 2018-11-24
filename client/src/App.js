import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Registration from "./pages/registration";
import Matches from "./pages/matches";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/registration/:id" component={Registration} />
          <Route exact path="/matches/:id" component={Matches} />
        </div>
      </Router>
    );
  }
}

export default App;
