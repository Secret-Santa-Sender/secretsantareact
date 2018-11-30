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
          dislikes: res.data.dislikes
        });
      })
      .catch(() => {
        console.log("fetch/confirm participant name failed");
      });
  }

  render() {
    if (this.state.name !== "") {
      return (
        <div>
          <p>Thanks! You are confirmed for Secret Santa</p>
          <p>Name: {this.state.name}</p>
          <p>Your likes: {this.state.likes}</p>
          <p>Your dislikes: {this.state.dislikes}</p>
        </div>
      );
    } else {
      return <div>nothing to see here</div>;
    }
  }
}

export default Confirmation;
