const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { name: 1, username: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})
  
blogsRouter.post('/', async (request, response, next) => {
  
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body

    if (!body.likes) body.likes = 0
    
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
      comments: body.comments
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {

  try {

    const body = request.body

    const blog = await Blog.findById(request.params.id)
  
    const comment = new Comment({
      content: body.content
    })
  
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment.content)
    await blog.save()
    response.json(savedComment.toJSON())

  } catch (exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
  
  try {

    const decodedToken = jwt
      .verify(request.token, process.env.SECRET)
    
    if (!request.token || !decodedToken.id) {
      return response.status(401)
        .json({ error: 'token missing or invalid' })
    }

    const blogToRemove = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

    console.log(blogToRemove.user)
    console.log(user._id)

    if (blogToRemove.user.toString() !== user._id.toString()) {
      return response.status(401)
        .json({ error: 'unauthorized user' })
    }
    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter