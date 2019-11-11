import React from 'react'
import User from './User'

const Users = ({ users }) => {

  const rows = () => {
    return users.map(user =>
      <User
        key={user.id}
        user={user}/>
    )
  }

  return (
    <div>
      <h2>Users</h2>

      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {rows()}
        </tbody>
      </table>
    </div>
  )
}

export default Users