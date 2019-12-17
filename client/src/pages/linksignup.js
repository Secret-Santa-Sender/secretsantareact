import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

class LinkSignup extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      redirectTo: false,
      retypePassword: "",
      name: "",
      email: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    API.getUser(this.props.match.params.userID)
      .then(res => {
        console.log("the user returned from api call", res);

        this.setState({
          name: res.data.name,
          email: res.data.email
        });
      })
      .catch(console.error);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let user = {
      password: this.state.password,
      id: this.props.match.params.userID
    };
    console.log("user before going off and updating", user);

    //request to server to update a user with new password
    API.updateParticipant(user.id, { password: user.password })
      .then(res => {
        this.setState({ redirectTo: true });
      })
      .catch(console.error);
  }

  readyToSubmit() {
    return (
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
        <h2>
          <img id="willow" src="willow.svg" />
          Signup
        </h2>
        <div className="box">
          <h4>Welcome {this.state.name}!</h4>
          We have your email as {this.state.email}.<br />
          Please add a password for your account:
          <div className="form-container">
            <form className="registration" onSubmit={this.handleSubmit}>
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

export default LinkSignup;
