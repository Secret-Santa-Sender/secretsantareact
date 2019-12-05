import React, { Component } from 'react'
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
      teamID: ""
    };

    this.handleUserSubmit = this.handleUserSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
          teamID: res.data._id
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
        this.setState({
          whosin: res.data,
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
        })
    }

    handleUserSubmit(event) {

    event.preventDefault()
    let user = {
      email: this.state.email,
      name: this.state.userName,
      team: this.state.teamName,
      teamID: this.state.teamID,
      link: ""}
    //lookup the user in the database and if they exist, send them the "invite email existing"
    //otherwise, send them "invite email new user"

    API.getParticipantByEmail(user.email)
    .then(res => {
      console.log("response from get by email",res)
      if (!res.data){
        alert("no user found")
        API.createParticipant({email: user.email, name: user.name})
        .then(res => {
          user.link = "http://localhost:3000/linksignup/"+res.data._id
          API.sendInviteEmailNewUser(user)
          .then(res => {
            console.log("sendinviteemail existing triggered", res)
          })
        })
        .catch(console.error)
      }
      else{

        for (let team of res.data.teams){         
          if (team._id === user.teamID)
            return alert("user already on this team")
        }

        let link = "http://localhost:3000/addingtoteam/"+res.data._id+"/"+user.teamID
        user.link = link
        API.sendInviteEmailExisting(user)
        .then(res => {
          console.log("response from sending email invite existing", res)})
          .catch(console.error) 
      }
    })
    .catch(console.error)


    }

  render() {
  	return(
  	<div> 

	  	<h2>team {this.state.teamName} </h2>

	  		<div> 
	  			<p>
	  				<h2>who all is in? </h2>
	  				<ul>
	  				{this.state.whosin.map (participant =>{
			            return(
			              <SingleParticipant item={participant}>
			              </SingleParticipant>
			              )
			         })}
	  				</ul>
	  			</p>
	  		</div>
	  <div> 
	  <form>
      add user to team:<br/>
      name
	    <input type="text" name="userName" onChange={this.handleChange}/><br/>
	  email
	    <input type="text" name="email" onChange={this.handleChange}/><br/>

	    <input type="submit" value="Submit" onClick={this.handleUserSubmit}/>
	  </form>
  </div>
  	</div>

  	);
  }

}


export default TeamPage;
