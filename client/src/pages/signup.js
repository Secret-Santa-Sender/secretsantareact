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
      name: "",
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
      name: this.state.name
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
      this.state.name.length > 0 &&
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

    return (
      <div>
        <h4>Signup</h4>
        <div className="box">
          <div className="form-container">
            <form className="registration" onSubmit={this.handleSubmit}>
              <div className="form-line">
                <label>Name:</label>
                <div className="input-block">
                  <input
                    type="text"
                    name="name"
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
        </div>
      </div>
    );
  }
}

export default Signup;
