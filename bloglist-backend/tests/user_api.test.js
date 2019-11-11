const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.remove({})

  const userObjects = helper.users
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('creating a new user', () => {

  test.only('a user is not created with invalid data', async () => {
    const user = {
      name: 'Joppe',
      username: 'joppe99'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  test('proper handling when data is invalid', async () => {

  })
})

afterAll(() => {
  mongoose.connection.close()
})