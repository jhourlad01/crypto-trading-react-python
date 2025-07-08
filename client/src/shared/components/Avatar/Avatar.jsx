import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, LogOut } from 'lucide-react'
import './Avatar.scss'

function Avatar() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked')
    setIsOpen(false)
  }

  return (
    <div className="avatar-container" ref={dropdownRef}>
      <button className="avatar-button" onClick={handleToggle}>
        <div className="avatar-icon">👤</div>
      </button>
      
      {isOpen && (
        <div className="avatar-dropdown">
          <div className="dropdown-menu">
            <Link to="/dashboard" className="dropdown-item" onClick={() => setIsOpen(false)}>
              <span className="dropdown-icon"><LayoutDashboard size={18} color="#111" /></span>
              Dashboard
            </Link>
            <button className="dropdown-item" onClick={handleLogout}>
              <span className="dropdown-icon"><LogOut size={18} color="#111" /></span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Avatar 