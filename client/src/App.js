import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home";
import Registration from "./pages/registration";
import Confirmation from "./pages/confirmation";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProfilePage from "./pages/profilepage";
import TeamPage from "./pages/teampage";
import AddingToTeam from "./pages/addingtoteam";
import LinkSignup from "./pages/linksignup";
import PrivateRoute from "./utils/privateroute.js";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/registration/:id" component={Registration} />
          <Route exact path="/confirmation/:id" component={Confirmation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/teampage/:id" component={TeamPage} />
          <Route
            exact
            path="/addingtoteam/:userID/:teamID"
            component={AddingToTeam}
          />
          <Route exact path="/linksignup/:userID" component={LinkSignup} />

          <PrivateRoute exact path="/profilepage" component={ProfilePage} />
        </div>
      </Router>
    );
  }
}

export default App;
