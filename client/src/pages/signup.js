import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      retypePassword: "",
      username: "",
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
    console.log("Submit", this.state);
    let user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.username
    };

    //request to server to add a new username/password
    API.createParticipant2(user)
      .then(
        function(user) {
          this.setState({ redirectTo: true });
          console.log("redirected");
        }.bind(this)
      )
      .catch(console.error);
  }

  readyToSubmit() {
    return (
      this.state.email.length > 0 &&
      this.state.username.length > 0 &&
      this.state.password.length >= 6 &&
      this.state.password === this.state.retypePassword
    );
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to="/login" />;
    }

    let errorMsg = <div></div>;

    if (this.state.password.length > 0 && this.state.password.length < 6) {
      errorMsg = <div>Password should be least 6 letters.</div>;
    } else if (
      this.state.password.length >= 6 &&
      this.state.retypePassword.length > 0 &&
      this.state.password != this.state.retypePassword
    ) {
      errorMsg = <div>Incorrect Password</div>;
    }

    let login_link = "http://localhost:3000/login";

    if (process.env.NODE_ENV === "production") {
      let login_link = "http://www.secretsantasender.com/login";
    }

    return (
      <div>
        <h2>Signup</h2>
        <div className="box">
          <div className="form-container">
            <form className="registration" onSubmit={this.handleSubmit}>
              <div className="form-line">
                <label>Name:</label>
                <div className="input-block">
                  <input
                    type="text"
                    name="username"
                    placeholder="E.g. Carlos Santana"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
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
              <div className="form-line">
                <label>Retype Password:</label>
                <div className="input-block">
                  <input
                    type="password"
                    name="retypePassword"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="submit-container">
                <input
                  type="submit"
                  value="Submit"
                  onClick={this.handleSubmit}
                  disabled={!this.readyToSubmit()}
                />
                {errorMsg}
              </div>
            </form>
          </div>
          <div>
            Already have an account? <a href={login_link}>Login</a> here
            instead.
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
