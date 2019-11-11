import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {

  const blog = {
    author: 'J. Teppo',
    title: 'Testauksen perusteet',
    likes: 20
  }

  const component = render(
    <SimpleBlog
      blog={blog}
    />
  )

  expect(component.container).toHaveTextContent(
    'J. Teppo'
  )
  expect(component.container).toHaveTextContent(
    'Testauksen perusteet'
  )
  expect(component.container).toHaveTextContent(
    '20'
  )
})

test('clicking the button twice calls the event hadler twice', () => {
  const blog = {
    author: 'J. Teppo',
    title: 'Testauksen perusteet',
    likes: 20
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog
      blog={blog}
      onClick={mockHandler}
    />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})

