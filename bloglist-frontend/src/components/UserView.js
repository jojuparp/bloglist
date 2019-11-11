import React from 'react'

const UserView = ({ user }) => {

  if (!user) return null

  const rows = () => {
    return user.blogs.map(blog =>
      <li key={blog.id}>
        {blog.title}
      </li>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>added blogs</h3>

      {user.blogs.length !== 0 ? rows() : <p>No blogs!</p>}
    </div>
  )
}

export default UserView