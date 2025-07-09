import { useAuth0 } from '@auth0/auth0-react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Avatar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  if (!isAuthenticated) {
    return (
      <button className="avatar-button login-avatar-btn" onClick={() => loginWithRedirect()} title="Login">
        <div className="avatar-icon">🔒</div>
      </button>
    )
  }

  return (
    <div className="avatar-dropdown" ref={menuRef}>
      <button
        className="avatar-button"
        title={user?.email}
        onClick={() => setOpen((v) => !v)}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        {user?.picture ? (
          <img src={user.picture} alt="avatar" className="avatar-img" style={{ width: 32, height: 32, borderRadius: '50%' }} />
        ) : (
          <div className="avatar-icon">👤</div>
        )}
        <span style={{ fontWeight: 500 }}>{user?.name || user?.email}</span>
      </button>
      {open && (
        <div className="avatar-menu" style={{ position: 'absolute', right: 0, top: '100%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 8, minWidth: 140, zIndex: 1000 }}>
          <button
            className="avatar-menu-item"
            style={{ width: '100%', padding: '8px 16px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => { setOpen(false); navigate('/dashboard') }}
          >
            Dashboard
          </button>
          <button
            className="avatar-menu-item"
            style={{ width: '100%', padding: '8px 16px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: '#d00' }}
            onClick={() => { setOpen(false); logout({ logoutParams: { returnTo: window.location.origin } }) }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Avatar
