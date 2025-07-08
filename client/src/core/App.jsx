import DefaultLayout from '../shared/layouts/DefaultLayout'

function App({ children }) {
  // In the future, add providers or routing here
  return <DefaultLayout>{children}</DefaultLayout>
}

export default App 