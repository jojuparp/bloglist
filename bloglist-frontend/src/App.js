import React, { useState, useEffect } from 'react'
import { setMessage } from './reducers/notificationReducer'

import Notification from './components/Notification'
import Menu from './components/Menu'

import blogService from './services/blogs'
import userService from './services/users'

const App = ({ store }) => {

  const message = store.getState()
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    userService.getAll()
      .then(initialUsers => {
        setUsers(initialUsers)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleMessage = arg => {
    store.dispatch(setMessage(arg))
  }

  const handleBlogs = (blogs) => {
    setBlogs(blogs)
  }

  return (
    <div className="container">
      {message
        ? <Notification message={message} />
        : null}

      <Menu
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        setUser={setUser}
        handleMessage={handleMessage}
        users={users}
      />

    </div>
  )
}

export default App
