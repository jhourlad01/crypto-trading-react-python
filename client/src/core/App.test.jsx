import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders children', () => {
    const { getByText } = render(
      <App>
        <span>Test Child</span>
      </App>
    )
    expect(getByText('Test Child')).toBeInTheDocument()
  })
}) 