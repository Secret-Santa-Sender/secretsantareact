import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import SingleTeam from "../components/TeamsListItem/teamslistitem";
import Profile from "../components/profile";

class Test extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: null,
      email: null,
      id: null,
      name: null,
      teamName: null,
      teams: [],
      redirectTo: null,
      showCreateTeam: false,
      profile: null
    };

    this.handleTeamSubmit = this.handleTeamSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePlusTeamClick = this.handlePlusTeamClick.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.handleTeamClick = this.handleTeamClick.bind(this);
  }

  getProfile() {
    return this.state.profile;
  }

  fetchUser() {
    API.checkForSession()
      .then(res => {
        console.log("check for session", res);
        return API.getUser(res.data.user._id);
      })
      .then(res => {
        console.log("the user returned from api call", res);

        let tempTeamArr = [];

        for (var i = 0; i < res.data.teams.length; i++) {
          tempTeamArr.push(res.data.teams[i]);
        }

        this.setState({
          id: res.data._id,
          teams: tempTeamArr,
          profile: {
            id: res.data._id,
            likes: res.data.likes,
            dislikes: res.data.dislikes
          },
          name: res.data.name
        });
      })
      .catch(() => {});
  }

  componentDidMount() {
    this.fetchUser();
  }

  handleTeamSubmit(event) {
    event.preventDefault();

    let teamName = {
      teamName: this.state.teamName
    };

    let userId = this.state.id;

    API.createTeam(teamName)
      .then(res => {
        let team = {
          teamId: res.data._id
        };
        console.log("response", res);

        return API.addTeamToParticipant(userId, team);
      })
      .then(res => {
        this.setState({
          teams: res.data.teams,
          showCreateTeam: false
        });
      })
      .catch(console.error);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleTeamClick(team, event) {
    this.setState({
      redirectTo: team.id
    });
  }

  handlePlusTeamClick(event) {
    this.setState({
      showCreateTeam: true
    });
  }

  createTeam() {
    if (this.state.showCreateTeam) {
      return (
        <div className="form-container">
          <form>
            <div>
              <label>Team Name:</label>
              <div className="input-block">
                <input
                  type="text"
                  name="teamName"
                  placeholder="The Santanas' Secret Santa"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="submit-container">
              <input
                type="submit"
                value="Create Team"
                onClick={this.handleTeamSubmit}
              />
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="plus-icon-container">
        <form>
          <div className="submit-container">
            <input
              type="submit"
              value="New Team"
              onClick={this.handlePlusTeamClick}
            />
          </div>
        </form>
      </div>
    );
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={"/teampage/" + this.state.redirectTo} />;
    }

    return (
      <div>
        <h2>Teams for {this.state.name}</h2>
        <div className="team-box">
          <h2>Your Teams:</h2>
          <ul>
            {this.state.teams.map(team => {
              return (
                <SingleTeam
                  team={team}
                  handleClick={event => this.handleTeamClick(team, event)}
                ></SingleTeam>
              );
            })}
          </ul>
          {this.createTeam()}
        </div>
        <Profile getProfile={this.getProfile} />
      </div>
    );
  }
}

export default Test;
