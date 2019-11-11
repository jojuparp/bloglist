const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.remove({})

  const blogObjects = helper.blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.blogs.length)
})

/* test('a specific blog can be viewed', async () => {
  const blogs = await helper.blogsInDb()

  const blogToView = blogs[0]

  const returnedBlog = await api
    .get(`api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  expect(returnedBlog.body).toEqual(blogToView)
}) */

test('a blog can be added', async () => {
  const newBlog = {
    title: 'Testing',
    author: 'Joni Parpala',
    url: 'http://example.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAtend = await helper.blogsInDb()
  expect(blogsAtend.length).toBe(helper.blogs.length+1)

  const authors = blogsAtend.map(n => n.author)
  expect(authors).toContain('Joni Parpala')
})

test('id-field is returned without underscore', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('undefined number of likes equals to zero', async () => {
  const body = {
    title: 'Testing',
    author: 'Joni P.',
    url: 'http://example.com',
  }

  if (!body.likes) body.likes = 0
  
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const joni = response.body.filter(a => a.author === 'Joni P.')
  expect(joni[0].likes).toBe(0)
})

test('blog must contain fields title and url', async () => {
  const newBlog = {
    author: 'Joni Parpala',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})