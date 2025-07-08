import './DefaultLayout.scss'
import Brand from '../components/Brand/Brand'
import Avatar from '../components/Avatar/Avatar'

function DefaultLayout({ children }) {
  return (
    <div className="app">
      <header className="header">
        <Brand />
        <Avatar />
      </header>
      <main className="content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 CryptoClient</p>
      </footer>
    </div>
  )
}

export default DefaultLayout 