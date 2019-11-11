import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useField } from '../hooks'

import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ user, setUser, handleMessage }) => {

  const un = useField('text')
  const pw = useField('password')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const username = un.value
      const password = pw.value
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      un.reset()
      pw.reset()
      handleMessage(`welcome ${user.name}!`)
      setTimeout(() => {
        handleMessage(null)
      }, 3000)
    } catch (exception) {
      console.log(exception)
      handleMessage('Incorrect username or password!')
      setTimeout(() => {
        handleMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const logout = () => {

    return (
      <div>
        {user.name} is logged in
        <button onClick={handleLogout}>
       logout
        </button>
      </div>
    )
  }

  const login = () => {
    return(
      <div>
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type={un.type}
              onChange={un.onChange}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type={pw.type}
              onChange={pw.onChange}
            />
            <Button variant='primary' type='submit'>
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  return (
    <div>
      {!user ? login() : logout()}
    </div>
  )

}

export default LoginForm