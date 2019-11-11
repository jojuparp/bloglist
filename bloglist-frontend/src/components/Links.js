import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Links = () => {

  const padding = {
    paddingRight: 5,
    paddingTop: 5
  }

  return (
    <div>
      <Link style={padding} to='/'>Home</Link>
      <Link style={padding} to='/users'>Users</Link>
    </div>
  )
}

export default Links