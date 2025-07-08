import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './core/App'
import Home from './features/home/Home'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
      <Home />
    </App>
  </React.StrictMode>
) 