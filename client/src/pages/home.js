import React, { Component } from "react";
import { Route } from "react-router-dom";
import API from "../utils/API";
import html from "../utils/emailhtml.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      endDate: "",
      submitted: false,
      id: "",
      link: "",
      emailAddress: "",
      email: {
        from: '"Playmates 🍼" <kinderplaymates@gmail.com>', // sender address
        to: undefined, // list of receivers
        subject: "Hello here's your Secret Santa Registration link", // Subject line
        text: "Uhhh...Hello world?", // plain text body
        html: "<b>Sup prof?</b>" // html body
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      submitted: true
    });

    //create the admin profile

    API.createAdmin({
      companyName: this.state.companyName,
      endDate: this.state.endDate,
      emailAddress: this.state.emailAddress
    })
      .then(res => {
        console.log("admin created - here is response:", res.data._id);
        this.setState(
          {
            id: res.data._id,
            link: "http://localhost:3000/registration/" + res.data._id,
            email: {
              to: this.state.emailAddress,
              html: html.html(
                "http://localhost:3000/registration/" + res.data._id
              )
            }
          },
          () => {
            console.log("state before sending email:", this.state);
            API.sendEmail(this.state.email).then(res => {
              console.log(res);
            });
          }
        );
      })
      .catch(err => {
        console.log("crete admin failed" + err);
      });
  }

  registrationForm() {
    return (
      <div>
        <p>
          Secret Santa! Welcome to Secret Santa, please enter your company name
          below to receive a unique link.
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Company Name:
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
          <label>
            Email Address:
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
    );
  }

  render() {
    if (this.state.submitted === false) {
      return this.registrationForm();
    } else {
      return (
        <p>
          Thanks! Here is your unique link:
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
