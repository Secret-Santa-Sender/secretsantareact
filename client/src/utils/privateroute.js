
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authState from './authinterface.js'



const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    { ...rest }
    render={ props => {
    	console.log("authState.loggedIn: ", authState.loggedIn)
    	if (authState.loggedIn === null) {
    	  return null
    	} else if (authState.loggedIn) {
    	  return <Component { ...props } />
    	} else {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
      }
    }
   />
)

// <Route render={Component}>
// <Route render={RedirectTo="/login"}>

export default PrivateRoute
