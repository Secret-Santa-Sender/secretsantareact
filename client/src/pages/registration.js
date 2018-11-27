import React, { Component } from "react";
//import { Route } from "react-router-dom";
import API from "../utils/API";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      likes: "",
      dislikes: "",
      imgurl: "",
      email: "",
      company: this.props.match.params.id,
      companyName: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.company);
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.companyName);
    event.preventDefault();

    API.createParticipant({
      name: this.state.name,
      likes: this.state.likes,
      dislikes: this.state.dislikes,
      imgurl: this.state.imgurl,
      email: this.state.email,
      company: this.props.match.params.id
    })
      .then(res => {
        console.log("particpant created:", res);
      })
      .catch(() => {
        console.log("crete participant failed");
      });
  }

  componentDidMount() {
    this.fetchCompanyName();
  }

  fetchCompanyName() {
    API.findAdmin(this.props.match.params.id)
      .then(res => {
        console.log("response", res);
        this.setState({ companyName: res.data.companyName });
      })
      .catch(() => {
        console.log("fetch company name failed");
      });
  }

  registrationForm() {
    return (
      <div>
        <p>
          You are signing up for {this.state.companyName}'s Secret Santa! <br />
          Please enter your details below to sign up!
        </p>

        <form onSubmit={this.handleSubmit}>
          <label>
            You full name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Likes:
            <input
              type="text"
              name="likes"
              value={this.state.likes}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Dislikes:
            <input
              type="text"
              name="dislikes"
              value={this.state.dislikes}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Link to your profile photo:
            <input
              type="text"
              name="imgurl"
              value={this.state.imgurl}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Your email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  render() {
    if (this.state.companyName !== "") {
      return this.registrationForm();
    } else {
      return <div> 404 or whatever</div>;
    }
  }
}

export default Registration;
