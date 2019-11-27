import React, { Component } from 'react'
import API from "../utils/API";
import { Redirect } from 'react-router-dom'


class LinkSignup extends Component {

  constructor () {
    super()
    this.state = {
      password: '',
      redirectTo: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)    
    
  }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit(event) {

    event.preventDefault()

    let user = {
      password: this.state.password,
      id: props.match.params.id
    }


    //request to server to update a user with new password
    API.updateParticipant(user.id, user.password)

  }

render() {

  if (this.state.redirectTo) {
    return <Redirect to='/login' />
  }

  return(
  <div>
  <h4>Signup</h4>
  <form>
    <input type="text" name="email" onChange={this.handleChange}/><br/>
    password:<br/>
    <input type="text" name="password" onChange={this.handleChange}/>
    <input type="submit" value="Submit" onClick={this.handleSubmit}/>
  </form>
  </div>
  );
  }
}

export default LinkSignup;