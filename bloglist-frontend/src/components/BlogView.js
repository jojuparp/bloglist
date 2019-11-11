import React from 'react'

import Comments from './Comments'

import blogService from '../services/blogs'

const BlogView = ({ blog, setBlogs, user, blogs }) => {

  if (!blog) return null

  const addLike = event => {
    //event.preventDefault()
    const blogObject = {
      ...blog,
      likes: blog.likes+1
    }

    blogService
      .update(blogObject, blog.id)
      .then(() => {
        blogService.getAll()
          .then(initialBlogs => {
            setBlogs(initialBlogs)
          })})
      /* .then(returnedBlog => {
        setBlogs(blogs
          .map(b => b.id !== blog.id ? b : returnedBlog))
      }) */
      .catch(error => {
        console.log(error)
      })
  }

  const handleRemove = () => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) return

    blogService.setToken(user.token)

    blogService
      .remove(blog.id)
      .then(() => {
        blogService.getAll()
          .then(initialBlogs => {
            setBlogs(initialBlogs)
          })})
      .catch(error => {
        console.log(error)
      })
  }

  const removeButton = () => {
    if (blog.user.username !== user.username)
    {
      return null
    }
    return (
      <button onClick={handleRemove}>
        remove
      </button>
    )
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`${blog.url}`}>{blog.url}</a> <br />
      {blog.likes} likes
      <button onClick={addLike}>like</button> <br />
      added by {blog.author} <br />
      {/* removeButton() */}
      <h3>Comments</h3>
      <Comments blog={blog} setBlogs={setBlogs}/>
    </div>
  )
}

export default BlogView