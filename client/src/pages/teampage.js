import React, { Component } from 'react'
import API from "../utils/API";

class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      endDate: new Date(),
      link: ""
    };
    }

  componentDidMount() {
    this.fetchCompanyName();
   // this.fetchParticipants();
  }

  fetchCompanyName() {
    API.findTeam(this.props.match.params.id)
      .then(res => {
        console.log("response", res);
        this.setState({
          companyName: res.data.companyName,
          endDate: res.data.endDate
        });
      })
      .catch(() => {
        console.log("fetch company name failed");
      });
  }

  render() {
  	return(
  	<div> team name </div>
  	);
  }

}


export default TeamPage;
