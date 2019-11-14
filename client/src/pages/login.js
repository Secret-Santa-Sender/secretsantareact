import React, { Component } from 'react'
import axios from 'axios'
import API from "../utils/API";
import { Redirect } from 'react-router-dom'
import authState from '../utils/authinterface.js'



class Login extends Component {

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
      username: this.state.email,
      password: this.state.password
    }


    //request to server to check username/password
    API.loginParticipant(user)
    .then(function(res) {
    	console.log('response from login', res)
    	if (res.data.user._id) {
    		authState.loggedIn = true
    	}
    	console.log('authstate', authState)
      this.setState({redirectTo: true})
    }.bind(this))
    .catch(console.error)
    }

render() {

  if (this.state.redirectTo) {
    return <Redirect to='/test' />
  }

  return(
  <div>
  <h4>Login</h4>
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

export default Login;
