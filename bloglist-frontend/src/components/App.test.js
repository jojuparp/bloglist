import React from 'react'
import { render,  waitForElement
} from '@testing-library/react'
jest.mock('../services/blogs')
import App from '../App'

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

Object
  .defineProperty(window, 'localStorage',
    { value: localStorageMock })

describe('<App />', () => {
  test('blogs wont render if user is not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('blogs render if user is logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage
      .setItem('loggedBlogAppUser',
        JSON.stringify(user))

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)
  })
})