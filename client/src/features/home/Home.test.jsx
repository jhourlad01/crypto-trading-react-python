import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Home from './Home'

describe('Home', () => {
  it('renders welcome message', () => {
    const { getByText } = render(<Home />)
    expect(getByText('Welcome to CryptoClient')).toBeInTheDocument()
    expect(getByText('Your advanced cryptocurrency trading platform')).toBeInTheDocument()
  })
}) 