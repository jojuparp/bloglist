const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('sum of a list of blogs likes', () => {
    const result = listHelper.totalLikes(testHelper.blogs)
    expect(result).toBe(36)
  })
  
})

describe('author with the most liked blog', () => {

  test('when list has numerous blogs', () => {
    expect(listHelper
      .favoriteBlog(testHelper.blogs))
      .toEqual(testHelper.mostLikes)
  })

})

describe('author with most total likes', () => {

  test('sum of best authors likes', () => {
    const result = listHelper.mostLikes(testHelper.blogs)
    expect(result).toEqual(testHelper.bestAuthor)
  })

})

describe('author with the most blogs', () => {

  test('finding author from list', () => {
    const result = listHelper.mostBlogs(testHelper.blogs)
    expect(result).toEqual(testHelper.mostBlogs)
  })

})