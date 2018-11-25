import React, { Component } from "react";
//import { Route } from "react-router-dom";
import API from "../utils/API";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      id: this.props.match.params.id
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

  handleSubmit1(event) {
    event.preventDefault();

    console.log("state", this.state);

    this.setState({
      submitted: true
    });

    API.makeMatches(this.state.id)
      .then(res => {
        console.log("here's your participants:", res);
      })
      .catch(() => {
        console.log("getting matches failed");
      });
  }

  handleSubmit2(event) {
    event.preventDefault();

    console.log("state", this.state);

    API.getCompaniesDueToday()
      .then(res => {
        console.log("here's your companies:", res);
      })
      .catch(() => {
        console.log("getting companies failed");
      });
  }

  render() {
    return (
      <div>
        <p>click here to make matches</p>
        <button type="button" onClick={this.handleSubmit1}>
          Click Me!
        </button>
        <button type="button" onClick={this.handleSubmit2}>
          Get Companies
        </button>
      </div>
    );
  }
}

export default Matches;
