import Brand from '../Brand/Brand'
import Avatar from '../Avatar/Avatar'

function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-ios text-ios-dark px-6 py-4 flex justify-between items-center flex-shrink-0 border-b border-black/10 relative z-[10000]">
      <Brand />
      <Avatar />
    </header>
  )
}

export default Header
