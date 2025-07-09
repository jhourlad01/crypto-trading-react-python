import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './core/App'
import Home from './features/home/Home'
import Dashboard from './features/dashboard/Dashboard'
import './index.scss'
import { Auth0Provider } from '@auth0/auth0-react'

// fetchWithAuth removed or commented out due to invalid hook usage

const domain = 'joe-estrella.us.auth0.com'
const clientId = 'Wd1t5JLE8OMxtFV0qv2IZ2URagwb0S7V'
const audience = import.meta.env.VITE_AUTH0_AUDIENCE

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
    >
      <BrowserRouter>
        <App>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </App>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
)
