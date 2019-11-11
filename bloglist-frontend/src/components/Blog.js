import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Blog = ({ blog }) => {

  const Compact = () => (
    <li>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>, by {blog.author}
    </li>
  )

  return (
    <div className='blogs'>
      {Compact()}
    </div>
  )}

export default Blog