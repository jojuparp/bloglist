import React from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { Table } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Blogs = ({
  blogs, setBlogs, user,
  handleMessage
}) => {

  if (!user || !blogs) return null

  const blogFormRef = React.createRef()

  const rows = () => {
    return blogs.sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <tr key={blog.id}>
          <td>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </td>
          <td>
            {blog.author}
          </td>
        </tr>
      )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped><tbody>
        {rows()}
      </tbody></Table>
      <Togglable buttonLabel ="new blog" ref={blogFormRef}>
        <BlogForm
          setBlogs={setBlogs}
          blogs={blogs}
          setMessage={handleMessage}
        />
      </Togglable>
    </div>
  )
}

export default Blogs