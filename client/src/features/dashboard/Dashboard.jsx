import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.scss'

function Dashboard() {
  const { isAuthenticated, getAccessTokenSilently, isLoading: authLoading } = useAuth0()
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [autotrade, setAutotrade] = useState({})
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) {
      navigate('/')
      return
    }
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently()
        const res = await fetch(`${import.meta.env.VITE_API_URL}/coins`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          let errMsg = 'API error'
          try {
            const err = await res.json()
            errMsg = err.detail || JSON.stringify(err)
          } catch (err) {
            console.error('Failed to parse error response:', err)
          }
          throw new Error(errMsg)
        }
        const data = await res.json()
        setCoins(data)
        setError(null)
      } catch (e) {
        setCoins([])
        setError(e.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [isAuthenticated, authLoading, getAccessTokenSilently, navigate])

  const handleToggle = (id) => {
    setAutotrade(prev => ({ ...prev, [id]: !prev[id] }))
  }

  if (authLoading || loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="dashboard">
      <div className="dashboard-header"></div>
      <div className="dashboard-content">
        {error && (
          <div className="flex items-center gap-2 bg-white border-l-4 border-red-500 shadow-sm rounded-xl px-4 py-3 mb-4">
            <span className="text-red-500 text-xl">&#9888;</span>
            <span className="text-ios-dark text-base font-medium">{error}</span>
          </div>
        )}
        <div className="dashboard-table-wrapper w-full overflow-x-auto">
          <table className="w-full bg-white text-left rounded-2xl shadow-lg overflow-hidden">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 bg-white/95 font-bold px-6 py-4 text-ios-dark border-b border-gray-200 shadow-sm backdrop-blur">Assets</th>
                <th className="sticky top-0 z-10 bg-white/95 font-bold px-6 py-4 text-ios-dark border-b border-gray-200 shadow-sm backdrop-blur text-right">Price (USD)</th>
                <th className="sticky top-0 z-10 bg-white/95 font-bold px-6 py-4 text-ios-dark border-b border-gray-200 shadow-sm backdrop-blur text-right">24h Change (%)</th>
                <th className="sticky top-0 z-10 bg-white/95 font-bold px-6 py-4 text-ios-dark border-b border-gray-200 shadow-sm backdrop-blur text-right">24H Forecast</th>
                <th className="sticky top-0 z-10 bg-white/95 font-bold px-6 py-4 text-ios-dark border-b border-gray-200 shadow-sm backdrop-blur text-right">7D Forecast</th>
                <th className="sticky top-0 z-10 bg-white/95 font-bold px-6 py-4 text-ios-dark border-b border-gray-200 shadow-sm backdrop-blur">Investment</th>
                <th className="sticky top-0 z-10 bg-white/95 font-bold px-6 py-4 text-ios-dark border-b border-gray-200 shadow-sm backdrop-blur">Gain</th>
                <th className="sticky top-0 z-10 bg-white/95 font-bold px-6 py-4 text-ios-dark border-b border-gray-200 shadow-sm backdrop-blur">Autotrade</th>
              </tr>
            </thead>
            <tbody>
              {coins.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-ios-dark/60 text-base font-medium">No data available</td>
                </tr>
              ) : (
                coins.map(coin => (
                  <tr key={coin.id} className="hover:bg-ios-light/60 transition">
                    <td className="px-6 py-4 text-ios-dark text-base font-medium align-middle flex items-center gap-2">
                      {coin.image ? (
                        <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full bg-white border border-gray-200" />
                      ) : (
                        <span role="img" aria-label="coin">🪙</span>
                      )}
                      {coin.name}({coin.symbol})
                    </td>
                    <td className="px-6 py-4 text-ios-dark text-base align-middle text-right">${coin.price_usd?.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
                    <td className={"px-6 py-4 text-base align-middle text-right " + (coin.percent_change_24h > 0 ? 'text-green-600' : coin.percent_change_24h < 0 ? 'text-red-600' : 'text-ios-dark')}> {coin.percent_change_24h?.toFixed(3)}%</td>
                    <td className="px-6 py-4 text-base align-middle text-right">{coin.forecast24h != null ? `${coin.forecast24h.toFixed(3)}%` : 'N/A'}</td>
                    <td className="px-6 py-4 text-base align-middle text-right">{coin.forecast7d != null ? `${coin.forecast7d.toFixed(3)}%` : 'N/A'}</td>
                    <td className="px-6 py-4 text-base align-middle text-right">N/A</td>
                    <td className="px-6 py-4 text-base align-middle text-right">N/A</td>
                    <td className="px-6 py-4 text-base align-middle text-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={!!autotrade[coin.id]}
                          onChange={() => handleToggle(coin.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition peer-focus:ring-2 peer-focus:ring-blue-400 relative">
                          <div className={"absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transition-transform " + (autotrade[coin.id] ? 'translate-x-5' : '')}></div>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
