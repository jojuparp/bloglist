import React from 'react'
import { useField } from '../hooks'
import { Button, Form } from 'react-bootstrap'
import blogService from '../services/blogs'

const Comments = ({ blog, setBlogs }) => {

  const content = useField('text')

  const rows = () => blog.comments.map(c =>
    <li key={c}>
      {c}
    </li>)

  const addComment = event => {

    event.preventDefault()
    const comment = {
      content: content.value
    }

    try  {
      blogService
        .comment(comment, blog.id)
        .then(() => {
          blogService.getAll()
            .then(initialBlogs => {
              setBlogs(initialBlogs)
            })})
      //'oikea' tapa alla. kokeile kaiken
      //tilankäsittelyn siirtämsitä app-komponenttiin
      /* .then(returnedBlog => {
        setBlogs(blogs
          .map(b => b.id !== blog.id ? b : returnedBlog))
          }) */
      content.reset()
    } catch (exception) {
      console.log(exception)
    }

  }

  return (
    <div>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Label>Leave a comment:</Form.Label>
          <Form.Control
            type={content.type}
            onChange={content.onChange}
          />
        </Form.Group>
      </Form>
      <Button variant='primary' type='submit' onClick={addComment}>
              comment
      </Button>
      <ul>{rows()}</ul>

    </div>
  )
}

export default Comments