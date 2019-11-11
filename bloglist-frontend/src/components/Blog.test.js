import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, getByText } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test.only('the compact view is displayed after rendering', () => {

  const blog = {
    title: 'Testing',
    author: 'Tester',
    url: 'http://example.com',
    likes: 0
  }

  const component = render(
    <Blog
      blog={blog}
    />
  )

  expect(component.container).not.toHaveTextContent('http://example.com')
  expect(component.container).not.toHaveTextContent('0')
})

test('the full view is displayed after clicking', () => {
  const blog = {
    title: 'Testing',
    author: 'Tester',
    url: 'http://example.com',
    likes: 0
  }

  const mockHandler = jest.fn()

  //replace handleClick with mockHandler in Blog-component
  //before running the test!!!
  let { getByText } = render(
    <Blog
      blog={blog}
      mockClick={mockHandler}
    />
  )

  const button = getByText('blogs')
  const element = getByText('http://example.com')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
  expect(element).toBeDefined()

})