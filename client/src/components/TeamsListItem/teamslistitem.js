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
		let teamlink = "/teampage/" + this.props.team.id;
		return (
			<li
				className="team-list-item"
				//onClick={this.props.handleClick}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}
			>
				<a href={teamlink}>
					<span>{this.props.team.teamName}</span>
				</a>
				{this.showHover()}
			</li>
		);
	}
}
export default SingleTeam;
