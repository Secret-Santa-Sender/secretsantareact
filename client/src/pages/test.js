import React, { Component } from 'react'
import axios from 'axios'
import API from "../utils/API";
import { Redirect } from 'react-router-dom'
import SingleTeam from "../components/TeamsListItem/teamslistitem";



class Test extends Component {

	constructor () {
		super()
		this.state = {
      loggedin: null,
      email: null,
      id: null,
      teamName: null,
      teams: [],
      redirectTo: null,
      likes:null,
      dislikes: null,
      editVisible: false
		}

		this.handleTeamSubmit = this.handleTeamSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTeamClick = this.handleTeamClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleEditProfileSubmit = this.handleEditProfileSubmit.bind(this)    
    
		
	}


  fetchUser() {
    API.checkForSession()
      .then(res => {
        console.log("check for session", res)
        return API.getUser(res.data.user._id);
      })
      .then(res => {
        console.log("the user returned from api call", res)

        let tempTeamArr = []

        for (var i=0; i<res.data.teams.length; i++){
          tempTeamArr.push(res.data.teams[i])
        }

        this.setState(
          { id: res.data._id, 
           teams: tempTeamArr, 
           likes: res.data.likes, 
           dislikes: res.data.dislikes});
      })
      .catch(() => {});
  }

  componentDidMount() {
    this.fetchUser();
  }


    handleTeamSubmit(event) {

    event.preventDefault()

      let teamName = {
        teamName: this.state.teamName}

      let userId = this.state.id

      API.createTeam(teamName)
      .then(res => {
        let team = {
          teamId: res.data._id
        }
        console.log("response", res)
        
        return API.addTeamToParticipant(userId, team)
      })
      .then(res => {
        this.setState({
          teams: res.data.teams
        })

      })
      .catch(console.error)


    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTeamClick(event) {

      this.setState({
        redirectTo: event.target.id
      })

    }

    handleEditClick(event) {
      this.setState({
        editVisible: true
      })

    }

    handleEditProfileSubmit(event) {
      event.preventDefault()

      API.updateParticipant(this.state.id, {likes: this.state.likes, dislikes: this.state.dislikes})
      .then(this.setState({editVisible: false}))
      .catch(console.error)

    }
    profile(){
      return(    
        <div>
        <h2> my profile </h2>
        <p>my likes:</p> {this.state.likes}

        <p>my dislikes:</p>{this.state.dislikes}
        <button onClick={this.handleEditClick}> edit profile </button>
        
        </div>)
    }


    editProfile(){
      return(
       <div>
        <form>
          What are your likes?:<br/>
          <input type="text" name="likes" value={this.state.likes} onChange={this.handleChange}/><br/>
          What do you not like so much?:
          <input type="text" name="dislikes" value={this.state.dislikes} onChange={this.handleChange}/><br/>
          submit
          <input type="submit" value="Submit" onClick={this.handleEditProfileSubmit}/>
        </form>
        </div>

        )
    }

render() {

  if (this.state.redirectTo) {
    return <Redirect to={'/teampage/'+this.state.redirectTo} />
  }

  let editProfile = <div></div>

  if (this.state.editVisible === true){
     editProfile = this.editProfile()
  }else if (this.state.editVisible === false){
    editProfile =  this.profile()
  }

  return(
  <div>
  <h4>create a team</h4>
  <form>
      team name:<br/>
    <input type="text" name="teamName" onChange={this.handleChange}/><br/>
    <input type="submit" value="Submit" onClick={this.handleTeamSubmit}/>
  </form>
 
  <div>
  <h2> teams i'm on </h2>
           <ul>
          {this.state.teams.map (team =>{
            return(
              <SingleTeam team={team} handleClick={this.handleTeamClick}> 
              </SingleTeam>
              )
          })}
          </ul> 
  </div>

  <div>
    {editProfile}
  </div>


  </div>
  
 

  );
  }
}

export default Test;
