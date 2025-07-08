import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  it('renders children', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App>
          <span>Test Child</span>
        </App>
      </BrowserRouter>
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })
}) 