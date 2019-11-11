const lodash = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  
  let bestBlog = blogs.reduce((best, blog) => best.likes > blog.likes
    ? best
    : blog
  )
  
  return {
    title: bestBlog.title, 
    author: bestBlog.author,
    likes: bestBlog.likes
  }
}

const mostLikes = blogs => {

  const bestBlogs = blogs.filter(blog => lodash.isEqual(blog.author, favoriteBlog(blogs).author))
  const bestLikes = totalLikes(bestBlogs)

  const authors = blogs.map(blog => blog.author)
  let init = []

  const reducer = (author, count) => {
    if (!author[count]) {
      author[count] = 1
    } else {
      author[count] += 1
    }
    return author
  }

  const authorsAndBlogs = authors.reduce(reducer, init)
  console.log(authorsAndBlogs)
  const blogNums = lodash.values(authorsAndBlogs)
  const max = lodash.max(blogNums)
  console.log(max)
  let arr = []
  for (var author in authorsAndBlogs)
    arr.push([author, authorsAndBlogs[author]])
  console.log(arr)
  const values = lodash.max(arr)
  console.log(values)
  console.log(values[0], values[1])

  return {
    author: favoriteBlog(blogs).author,
    likes: bestLikes
  }
}

const mostBlogs = blogs => {

  const authors = blogs.map(blog => blog.author)
  let init = []

  const reducer = (author, count) => {
    if (!author[count]) {
      author[count] = 1
    } else {
      author[count] += 1
    }
    return author
  }

  const authorsAndBlogs = 
  authors.reduce(reducer, init)

  let arr = []
  for (var author in authorsAndBlogs)
    arr.push([author, authorsAndBlogs[author]])
  
  const values = lodash.max(arr)

  return {
    author: values[0],
    blogs: values[1]
  }
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}