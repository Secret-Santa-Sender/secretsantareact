import React, { Component } from "react";

class SingleTeam extends Component {
  render() {
	return(
	<li onClick={this.props.handleClick} id={this.props.team._id}> {this.props.team.teamName} poo</li>
		)
  }
}
export default SingleTeam;