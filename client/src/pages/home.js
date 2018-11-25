import React, { Component } from "react";
//import { Route } from "react-router-dom";
import API from "../utils/API";
import html from "../utils/emailhtml.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      endDate: "",
      page: "start",
      id: "",
      link: "",
      emailAddress: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleStart(event) {
    this.setState({ page: "form" });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      page: "submitted"
    });

    //create the admin profile (also sends email)

    API.createAdmin({
      companyName: this.state.companyName,
      endDate: this.state.endDate,
      emailAddress: this.state.emailAddress
    })
      .then(res => {
        console.log("admin created - here is response:", res.data);
        this.setState({
          id: res.data._id,
          link: "http://localhost:3000/registration/" + res.data._id
        });
      })
      .catch(err => {
        console.log("crete admin failed" + err);
      });
  }

  startPage() {
    return (
      <div>
      <div className="fixed-header">
      <h1>Secret Santa Sender!</h1>
      </div>
        <div className="steps">
        <div className="step">
        <img src="signup.svg" width="200px"></img>
        <h2>Step 1</h2>
        Sign up for Secret Santa!
        Pick a date for the matches to be delievered by email.
        </div>
        <div className="step">
        <img src="friends.svg" width="200px"></img>
        <h2>Step 2</h2>
        Share your signup link with your friends and family!
        </div>
        <div className="step">
        <img src="present.svg" width="200px"></img>
        <h2>Step 3</h2>
        Everyone gets emailed their match on the mail date!
        Give your gifts!
        </div>
        </div>
        <div className="start-button-container">
        <div className="start-button" onClick={this.handleStart}>Let's get started!</div>
        </div>
      </div>
    );
  }

  registrationForm() {
    return (
      <div>
      <div className="fixed-header">
      <h1>Secret Santa Sender!</h1>
      </div>
      <div className="header-clear">
        <form onSubmit={this.handleSubmit}>
          <label>
            Family/Group/Company Name:
            <input
              type="text"
              name="companyName"
              value={this.state.companyName}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            EndDate (YYYY-MM-DD):
            <input
              type="text"
              name="endDate"
              value={this.state.enddate}
              onChange={this.handleChange}
            />
          </label>
          <br/>
          <label>
            E-mail Address:
            <input
              type="text"
              name="emailAddress"
              value={this.state.emailAddress}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.page === "start") {
      return this.startPage();
    } else if (this.state.page === "form") {
      return this.registrationForm();
    } else {
      return (
        <p>
          Thanks. Here is your unique link. Don't worry, this was also emailed
          to you!:
          <a href={"http://localhost:3000/registration/" + this.state.id}>
            http://localhost:3000/registration/
            {this.state.id}
          </a>
        </p>
      );
    }
  }
}

export default Home;
