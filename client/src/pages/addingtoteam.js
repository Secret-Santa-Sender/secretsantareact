import React, { Component } from 'react'
import API from "../utils/API";
import { Redirect } from 'react-router-dom'


class AddingToTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: "",
    };

    }

  componentDidMount() {
    this.addTeamToUser();
  }

  addTeamToUser() {
    console.log("USER ID", this.props.match.params.userID)
    console.log("TEAM ID", this.props.match.params.teamID)
    let team = {teamId: this.props.match.params.teamID}
    API.addTeamToParticipant(this.props.match.params.userID, team)
    .then(res => {
      console.log("ADDED TEAM TO USER", res)
      this.setState({redirectTo: "/login"})
    })
    .catch(console.err);
  }



  render() {
    if(this.state.redirectTo === "/login") {
      return <Redirect to='/login' />
    }
    
  	return(
  	<div> 

	  	<h2>adding you to team...</h2>

  	</div>

  	);
  }

}


export default AddingToTeam;
