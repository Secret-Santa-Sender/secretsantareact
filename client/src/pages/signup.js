import React, { Component } from 'react'
import API from "../utils/API";
import { Redirect } from 'react-router-dom'


class Signup extends Component {

  constructor () {
    super()
    this.state = {
      email: '',
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
      email: this.state.email,
      password: this.state.password,
    }


    //request to server to add a new username/password
    API.createParticipant2(user)
    .then(function(user) {
      this.setState({redirectTo: true})
    }.bind(this))
    .catch(console.error)
  }

render() {

  if (this.state.redirectTo) {
    return <Redirect to='/login' />
  }

  return(
  <div>
  <h4>Signup</h4>
  <form>
    email:<br/>
    <input type="text" name="email" onChange={this.handleChange}/><br/>
    password:<br/>
    <input type="text" name="password" onChange={this.handleChange}/>
    <input type="submit" value="Submit" onClick={this.handleSubmit}/>
  </form>
  </div>
  );
  }
}

export default Signup;