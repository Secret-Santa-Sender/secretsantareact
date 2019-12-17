import React, { Component } from "react";
import API from "../utils/API";
import SingleParticipant from "../components/ParticipantListItem/participantlistitem";

class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      // endDate: new Date(),
      link: "",
      whosin: [],
      userName: "",
      email: "",
      teamID: "",
      complete: false
    };

    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSendEmail = this.handleSendEmail.bind(this);
  }

  componentDidMount() {
    this.fetchTeamName();
    this.fetchParticipants();
  }

  fetchTeamName() {
    API.findTeam(this.props.match.params.id)
      .then(res => {
        console.log("response", res);
        this.setState({
          teamName: res.data.teamName,
          teamID: res.data._id,
          complete: res.data.complete
          // endDate: res.data.endDate
        });
      })
      .catch(() => {
        console.log("fetch company name failed");
      });
  }

  fetchParticipants() {
    API.findParticipantsAtTeam(this.props.match.params.id)
      .then(res => {
        console.log("response", res);

        let newParticipants = [];

        for (var i = 0; i < res.data.length; i++) {
          newParticipants.push(res.data[i].name);
        }

        console.log("new participants", newParticipants);
        this.setState({
          whosin: newParticipants
          // endDate: res.data.endDate
        });
      })
      .catch(() => {
        console.log("find participants failed");
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleUserSubmit(event) {
    event.preventDefault();
    let user = {
      email: this.state.email,
      name: this.state.userName,
      team: this.state.teamName,
      teamID: this.state.teamID,
      link: ""
    };
    //lookup the user in the database and if they exist,
    //send them the "invite email existing"
    //otherwise, send them "invite email new user"

    API.getParticipantByEmail(user.email)
      .then(res => {
        if (!res.data) {
          API.createParticipant({
            email: user.email,
            name: user.name,
            teams: user.teamID
          })
            .then(res => {
              let correct_link =
                "http://localhost:3000/linksignup/" + res.data._id;
              if (process.env.NODE_ENV === "production") {
                correct_link =
                  "http://www.secretsantasender.com/linksignup/" + res.data._id;
              }
              user.link = correct_link;
              API.sendInviteEmailNewUser(user).then(res => {
                console.log("sendinviteemail existing triggered", res);
              });
            })
            .catch(console.error);
        } else {
          for (let team of res.data.teams) {
            if (team._id === user.teamID)
              return alert("user already on this team");
          }

          let link =
            "http://localhost:3000/addingtoteam/" +
            res.data._id +
            "/" +
            user.teamID;

          if (process.env.NODE_ENV === "production") {
            link =
              "http://www.secretsantasender.com/linksignup/" +
              res.data._id +
              "/" +
              user.teamID;
          }

          user.link = link;
          API.sendInviteEmailExisting(user)
            .then(res => {
              console.log("response from sending email invite existing", res);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  }

  handleSendEmail() {
    API.sendAllEmails(this.state.teamID)
      .then(p => {
        console.log("send all emails response", p);
        let pairs = [];
        for (let pair of p.data) {
          pairs.push({
            from: pair.from.name,
            to: pair.to.name
          });
        }
        console.log("cleaned pairs", pairs);

        API.updateTeam(this.state.teamID, { complete: true, pairs: pairs });
      })
      .then(res => {
        this.setState({ complete: true });
      })
      .catch(console.error);
  }

  render() {
    let button = (
      <div>
        <p>
          Click below to send your santas! Warning: You can only do this once!
        </p>
        <input
          type="submit"
          value="Send Secret Santas"
          onClick={this.handleSendEmail}
        />
      </div>
    );
    if (this.state.complete) {
      button = <div>Already sent emails, enjoy your Secret Santa!</div>;
    }
    return (
      <div>
        <h2>Team: {this.state.teamName}</h2>
        <div className="box">
          <h4>Team Members:</h4>
          <ul>
            {this.state.whosin.map(participant => {
              return <SingleParticipant item={participant}></SingleParticipant>;
            })}
          </ul>
          <h4>Add a new team member:</h4>
          <div className="form-container">
            <form>
              <div className="form-line">
                <label>Name:</label>
                <input
                  type="text"
                  name="userName"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-line">
                <label>Email:</label>
                <input type="text" name="email" onChange={this.handleChange} />
              </div>
              <div className="submit-container">
                <input
                  type="submit"
                  value="Add Member"
                  onClick={this.handleUserSubmit}
                />
              </div>
            </form>
            <div>{button}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamPage;
