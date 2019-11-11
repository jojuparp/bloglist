import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks'

const BlogForm = ({ setMessage, setBlogs, blogs }) => {


  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          author.reset()
          title.reset()
          url.reset()
          setMessage('New blog added!')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    } catch (exception) {
      console.log(exception)
      author.reset()
      title.reset()
      url.reset()
    }
  }

  return (
    <div>
      <form>
        <h3>add new blog</h3>
        <div>
        title:
          <input
            type={title.type}
            value={title.value}
            onChange={title.onChange}
          />
        </div>
        <div>
        author:
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
        url:
          <input
            type={url.type}
            value={url.value}
            onChange={url.onChange}
          />
        </div>
        <p><button onClick={addBlog}>create</button></p>
      </form>
    </div>
  )
}

export default BlogForm