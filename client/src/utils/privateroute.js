
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authState from './authinterface.js'



const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    { ...rest }
    render={ props => (
      authState.loggedIn ? (
        <Component { ...props } />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
  )} />
)

// <Route render={Component}>
// <Route render={RedirectTo="/login"}>

export default PrivateRoute
