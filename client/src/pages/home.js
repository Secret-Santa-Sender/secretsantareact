import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import DatePicker from "react-date-picker";
import moment from "moment";
import authState from "../utils/authinterface.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.handleStart = this.handleStart.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleStart(event) {
    this.setState({ redirect: true });
  }

  startPage() {
    return (
      <div className="contents">
        <div className="logo">
          <img src="willow.svg" />
        </div>
        <div className="title">
          <h1>Secret Santa Sender!</h1>
        </div>
        <div className="box">
          <div className="steps">
            <div className="step">
              <img src="signup.svg" width="200px" />
              <h2>Step 1</h2>
              Sign up for Secret Santa!
            </div>
            <div className="step">
              <img src="friends.svg" width="200px" />
              <h2>Step 2</h2>
              Invite your friends and family!
            </div>
            <div className="step">
              <img src="present.svg" width="200px" />
              <h2>Step 3</h2>
              Send your Secret Santas!
            </div>
          </div>
          <div className="start-button-container">
            <div className="start-button" onClick={this.handleStart}>
              Let's get started!
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/signup" />;
    }
    return this.startPage();
  }
}

export default Home;
