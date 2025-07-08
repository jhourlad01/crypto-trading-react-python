import Brand from '../Brand/Brand'
import Avatar from '../Avatar/Avatar'
import './Header.scss'

function Header() {
  return (
    <header className="header">
      <Brand />
      <Avatar />
    </header>
  )
}

export default Header 