import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import Blogs from './Blogs'
import Users from './Users'
import LoginForm from './LoginForm'
import Links from './Links'
import UserView from './UserView'
import BlogView from './BlogView'

const Menu = ({
  blogs, setBlogs, user, setUser, handleMessage,
  users,
}) => {

  if (!blogs) return null

  const userById = id => {
    return users.find(u => u.id === id)
  }

  const blogById = id => {
    return blogs.find(b => b.id === id)
  }

  const padding = {
    paddingRight: 5,
    paddingTop: 5
  }

  const style = {
    padding: 10,
    backgroundColor: 'lightgrey'
  }

  return (
    <Router>

      <div>
        <div style={style}>
          {user ? <Links /> : null}
          <LoginForm
            style={padding}
            user={user}
            setUser={setUser}
            handleMessage={handleMessage}
          />
        </div>

        <div>
          <h1>Blog App</h1>
          {user ? null : <p>Welcome! Please log in!</p>}
        </div>

        <Route exact path='/users' render={() => <Users users={users}/>}/>
        <Route exact path='/' render={() =>
          <Blogs
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            handleMessage={handleMessage}

          />}/>
        <Route exact path="/users/:id" render={({ match }) =>
          <UserView user={userById(match.params.id)} />
        }/>
        <Route exact path="/blogs/:id" render={({ match }) =>
          <BlogView
            blog={blogById(match.params.id)}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
          />
        }/>
      </div>

    </Router>

  )
}

export default Menu