import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Registration from "./pages/registration";
import Matches from "./pages/matches";
import Confirmation from "./pages/confirmation";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Test from "./pages/test";
import TeamPage from "./pages/teampage";
import PrivateRoute from './utils/privateroute.js'



import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/registration/:id" component={Registration} />
          <Route exact path="/matches/:id" component={Matches} />
          <Route exact path="/confirmation/:id" component={Confirmation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/teampage/:id" component={TeamPage} />

          <PrivateRoute exact path="/test" component={Test} />


        </div>
      </Router>
    );
  }
}

export default App;
