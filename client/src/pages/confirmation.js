import React, { Component } from "react";
//import { Route } from "react-router-dom";
import API from "../utils/API";

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      name: "",
      likes: "",
      dislikes: ""
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit1 = this.handleSubmit1.bind(this);
    // this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

  componentDidMount() {
    this.updateAndFetch();
  }

  updateAndFetch() {
    API.confirmParticipant(this.props.match.params.id)
      .then(res => {
        console.log("response", res);
        this.setState({
          name: res.data.name,
          likes: res.data.likes,
          dislikes: res.data.dislikes,
          imgUrl: res.data.imgUrl
        });
      })
      .catch(() => {
        console.log("fetch/confirm participant name failed");
      });
  }

  render() {
    if (this.state.name !== "") {
      return (
      <div className="contents">
        <div className="logo"><img src="/willow.svg"/></div>
        <div className="title">
          <h1>Secret Santa Sender!</h1>
        </div>
        <div className="box">
            <div className="registration-message">
              <p>Thanks! You are confirmed for Secret Santa.</p>
              <p>
                <b>Name:</b> {this.state.name}
              </p>
              <p>
                <b>Your likes:</b> {this.state.likes}
              </p>
              <p>
                <b>Your dislikes:</b> {this.state.dislikes}
              </p>
              <p>
                <b>Your photo:</b>
              </p>
              <br />
              <img src={this.state.imgUrl} height="100px" />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>nothing to see here</div>;
    }
  }
}

export default Confirmation;
