import React, { Component } from "react";
//import { Route } from "react-router-dom";
import API from "../utils/API";
import Moment from "react-moment";

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
      endDate: "",
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
    event.preventDefault();

    API.createParticipant({
      name: this.state.name,
      likes: this.state.likes,
      dislikes: this.state.dislikes,
      // imgUrl: this.state.imgurl,
      email: this.state.email,
      company: this.props.match.params.id
    })
      .then(res => {
        console.log("particpant created:", res);
      })
      .catch(() => {
        console.log("crete participant failed");
      });

    this.setState({ submitted: true });
  }

  componentDidMount() {
    this.fetchCompanyName();
  }

  fetchCompanyName() {
    API.findAdmin(this.props.match.params.id)
      .then(res => {
        console.log("response", res);
        this.setState({
          companyName: res.data.companyName,
          endDate: res.data.endDate
        });
      })
      .catch(() => {
        console.log("fetch company name failed");
      });
  }

  registrationForm() {
    return (
      <div className="contents">
        <div className="logo">
          <img src="/willow.svg" />
        </div>
        <div className="title">
          <h1>Secret Santa Sender!</h1>
        </div>
        <div className="box">
          <div className="registration-message">
            You're signing up for {this.state.companyName}'s secret santa list!
            <br />
            Please enter your details below. Once you've confirmed your email
            address, we'll send you your secret santa on{" "}
            <Moment format="YYYY-MM-DD">{this.state.endDate}</Moment>.
          </div>
          <div className="form-container">
            <form className="registration" onSubmit={this.handleSubmit}>
              <div className="form-line">
                <label>Full name:</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-line">
                <label>Likes:</label>
                <input
                  type="text"
                  name="likes"
                  value={this.state.likes}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-line">
                <label>Dislikes:</label>
                <input
                  type="text"
                  name="dislikes"
                  value={this.state.dislikes}
                  onChange={this.handleChange}
                />
              </div>
              {/*} <div className="form-line">
                <label>Link to your profile photo:</label>
                <input
                  type="text"
                  name="imgurl"
                  value={this.state.imgurl}
                  onChange={this.handleChange}
                />
              </div>*/}
              <div className="form-line">
                <label>Your email:</label>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }

  postRegistration() {
    return (
      <div className="contents">
        <div className="logo">
          <img src="/willow.svg" />
        </div>
        <div className="title">
          <h1>Secret Santa Sender!</h1>
        </div>
        <div className="box">
          <div className="registration-message">
            Thanks! We've sent you an email to {this.state.email}. Please use it
            to confirm your email address.
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.companyName !== "") {
      if (this.state.submitted === false) {
        return this.registrationForm();
      } else {
        return this.postRegistration();
      }
    } else {
      return <div> 404 or whatever</div>;
    }
  }
}

export default Registration;
