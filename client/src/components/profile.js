import React, { Component } from "react";
import axios from "axios";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import authState from "../utils/authinterface.js";

class Profile extends Component {
	constructor() {
		super();

		this.state = {
			likes: [],
			dislikes: [],
			hasProfile: false,
			editVisible: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleEditProfileSubmit = this.handleEditProfileSubmit.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleEditProfileSubmit(event) {
		event.preventDefault();

		API.updateParticipant(this.props.getProfile().id, {
			likes: this.state.likes,
			dislikes: this.state.dislikes
		})
			.then(this.setState({ editVisible: false }))
			.catch(console.error);
	}

	handleEditClick(event) {
		this.setState({
			likes: this.props.getProfile().likes,
			dislikes: this.props.getProfile().dislikes,
			editVisible: true
		});
	}

	showEditForm() {
		return (
			<div className="profile-box">
				<h2>Your Profile</h2>
				<form>
					<div>
						<label>Likes: </label>
						<input
							type="text"
							name="likes"
							value={this.state.likes}
							placeholder="Warm sweaters, cookies."
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label>Dislikes: </label>
						<input
							type="text"
							name="dislikes"
							placeholder="Coal, grumpy elves."
							value={this.state.dislikes}
							onChange={this.handleChange}
						/>
					</div>
					<div className="submit-container">
						<input
							type="submit"
							value="Update Profile"
							onClick={this.handleEditProfileSubmit}
						/>
					</div>
				</form>
			</div>
		);
	}

	showProfile() {
		if (!this.state.hasProfile && this.props.getProfile() !== null) {
			this.setState({
				likes: this.props.getProfile().likes,
				dislikes: this.props.getProfile().dislikes,
				hasProfile: true
			});
		}
		return (
			<div className="profile-box">
				<h2>Your Profile</h2>
				<div>Likes: {this.state.likes}</div>
				<div>Dislikes: {this.state.dislikes}</div>
				<form>
					<div className="submit-container">
						<input
							type="submit"
							value="Edit Profile"
							onClick={this.handleEditClick}
						/>
					</div>
				</form>
			</div>
		);
	}

	render() {
		if (this.state.editVisible) {
			return this.showEditForm();
		}
		return this.showProfile();
	}
}

export default Profile;
