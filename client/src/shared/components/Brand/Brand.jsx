import './Brand.scss'
import { Link } from 'react-router-dom'

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Homepage">
      <div className="brand-logo">
        <span className="logo-icon">₿</span>
      </div>
      <div className="brand-name">
        <h1>CryptoClient</h1>
      </div>
    </Link>
  )
}

export default Brand 