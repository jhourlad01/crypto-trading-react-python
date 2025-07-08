import './DefaultLayout.scss'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function DefaultLayout({ children }) {
  return (
    <div className="app">
      <Header />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DefaultLayout 