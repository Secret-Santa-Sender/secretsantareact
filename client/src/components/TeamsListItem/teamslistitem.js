import React, { Component } from "react";

class SingleTeam extends Component {
	constructor() {
		super();
		this.state = {
			hover: false
		};

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.showHover = this.showHover.bind(this);
	}

	handleMouseOver(event) {
		this.setState({
			hover: true
		});
	}

	handleMouseOut(event) {
		this.setState({
			hover: false
		});
	}

	showHover() {
		if (this.state.hover) {
			return <span className="team-edit-hover">edit</span>;
		} else {
			return <span className="team-edit-hover"></span>;
		}
	}

	render() {
		return (
			<li
				className="team-list-item"
				onClick={this.props.handleClick}
				id={this.props.team._id}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}
			>
				<span>{this.props.team.teamName}</span>
				{this.showHover()}
			</li>
		);
	}
}
export default SingleTeam;
