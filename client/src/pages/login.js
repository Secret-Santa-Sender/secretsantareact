import React, { Component } from "react";
import axios from "axios";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import authState from "../utils/authinterface.js";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirectTo: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let user = {
      username: this.state.email,
      password: this.state.password
    };

    //request to server to check username/password
    API.loginParticipant(user)
      .then(
        function(res) {
          console.log("response from login", res);
          if (res.data.user._id) {
            authState.loggedIn = true;
          }
          console.log("authstate", authState);
          this.setState({ redirectTo: true });
        }.bind(this)
      )
      .catch(console.error);
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to="/profilepage" />;
    }

    let signup_link = "http://localhost:3000/signup";
    console.log("process.env", process.env.NODE_ENV);
    if (process.env.NODE_ENV === "production") {
      let signup_link = "http://www.secretsantasender.com/signup";
    }

    return (
      <div>
        <h2>
          <img id="willow" src="willow.svg" />
          Login
        </h2>
        <div className="box">
          <div className="form-container">
            <form className="registration" onSubmit={this.handleSubmit}>
              <div className="form-line">
                <label>Email:</label>
                <div className="input-block">
                  <input
                    type="text"
                    name="email"
                    placeholder="E.g. carlos.santana@outlook.com"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-line">
                <label>Password:</label>
                <div className="input-block">
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="submit-container">
                <input
                  type="submit"
                  value="Submit"
                  onClick={this.handleSubmit}
                />
              </div>
            </form>
          </div>
          <div>
            Don't have an account? <a href={signup_link}>Signup</a> here
            instead.
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
