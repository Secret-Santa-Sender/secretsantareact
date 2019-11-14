import React, { Component } from "react";
import API from "../utils/API";
import DatePicker from "react-date-picker";
import moment from "moment";
import authState from '../utils/authinterface.js'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      endDate: new Date(),
      page: "start",
      id: "",
      link: "",
      emailAddress: ""
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

  handleDateChange = endDate => this.setState({endDate})

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      page: "submitted"
    });

    //create the admin profile (also sends email)

    API.createAdmin({
      companyName: this.state.companyName,
      endDate: moment(this.state.endDate).format("YYYY-MM-DD"),
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
      <div className="contents">
        <div className="logo"><img src="willow.svg"/></div>
        <div className="title">
          <h1>Secret Santa Sender!</h1>
        </div>
        <div className="box">
        <div className="steps">
          <div className="step">
            <img src="signup.svg" width="200px" />
            <h2>Step 1</h2>
            Sign up for Secret Santa! Pick a date for the matches to be
            delievered by email.
          </div>
          <div className="step">
            <img src="friends.svg" width="200px" />
            <h2>Step 2</h2>
            Share your signup link with your friends and family!
          </div>
          <div className="step">
            <img src="present.svg" width="200px" />
            <h2>Step 3</h2>
            Everyone gets emailed their match on the mail date! Give your gifts!
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

  registrationForm() {
    return (
      <div className="contents">
        <div className="logo"><img src="willow.svg"/></div>
        <div className="title">
          <h1>Secret Santa Sender!</h1>
        </div>
        <div className="box">
          <div className="form-container">
          <form className="registration" onSubmit={this.handleSubmit}>
            <div className="form-line">
            <label>Group Name:</label>
            <div className="input-block">
              <input
                type="text"
                name="companyName"
                value={this.state.companyName}
                placeholder="E.g. Johnston Family"
                onChange={this.handleChange}
              />
              <br />
              The group name will be used on email to identify your secret santa list. <br /> For example, "Welcome to the Johston Family secret santa list!".
            </div>
            </div>
            <div className="form-line">
            <label>Mail Date:</label>
            <div className="input-block">
            <DatePicker 
                value={this.state.endDate}
                onChange={this.handleDateChange}
              />
             <br />
             This is the date that all the matches will emailed out to your group. <br />
             Everyone who's participating needs to be signed up before this date.
            </div>
            </div>
            <div className="form-line">
            <label>E-mail Address:</label>
            <div className="input-block">
              <input
                type="text"
                name="emailAddress"
                value={this.state.emailAddress}
                placeholder="yourname@mail.com"
                onChange={this.handleChange}
              />
              <br />
              This is your email. We'll send you a link to share with all the participants.
            </div>
            </div>
            <input type="submit" value="Submit" />
          </form>
          </div>
        </div>
      </div>
    );
  }

  linkPage() {
      return (
      <div className="contents">
        <div className="logo"><img src="willow.svg"/></div>
        <div className="title">
          <h1>Secret Santa Sender!</h1>
        </div>
        <div className="box">
        <div className="registrationLink">
          Thanks! Here is the signup link you can share with your group: 
          <div className="displayLink">
          <a href={this.registrationLink()}>
            {this.registrationLink()}
          </a>
          </div>
          Don't worry, this was also emailed to you!
        </div>
        </div>
      </div>
      );
  }

  registrationLink() {
    if (process.env.NODE_ENV === 'production') {
      return "http://www.secretsantasender.com/registration/" + this.state.id;
    }
    return "http://localhost:3000/registration/" + this.state.id;
  }

  render() {
    if (this.state.page === "start") {
      return this.startPage();
    } else if (this.state.page === "form") {
      return this.registrationForm();
    } else {
      return this.linkPage();
    }
  }
}

export default Home;
