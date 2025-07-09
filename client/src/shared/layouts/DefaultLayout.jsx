import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function DefaultLayout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-ios-light overflow-x-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col bg-ios-light px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
