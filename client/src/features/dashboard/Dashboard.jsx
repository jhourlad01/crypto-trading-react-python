import './Dashboard.scss'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

const userBalance = 12450.23;
const autotradingCount = 0;

function Dashboard() {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/coins`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch coin data')
        return res.json()
      })
      .then((data) => {
        setCryptos(data)
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
        setCryptos([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="dashboard dashboard-table-view">
      <div className="dashboard-balance-bar">
        <span className="autotrading-status">Autotrading: {autotradingCount} asset</span>
        <div className="balance-bar-right">
          <span className="balance-amount">${userBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <button className="balance-topup-btn" title="Top up balance">＋</button>
        </div>
      </div>
      <div className="dashboard-table-wrapper">
        {loading ? (
          <div className="dashboard-loading">Loading...</div>
        ) : error ? (
          <div className="dashboard-error">{error}</div>
        ) : (
          <table className="crypto-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Price (USD)</th>
                <th>24h Change</th>
                <th>24H Forecast</th>
                <th>7D Forecast</th>
                <th>Gain</th>
                <th>Autotrade</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((c) => (
                <tr key={c.symbol}>
                  <td>
                    <span className="asset-icon" role="img" aria-label={c.symbol}>{c.icon || ''}</span>
                    <span className="asset-name-bold">{c.name}</span>
                    <span className="asset-symbol-paren"> ({c.symbol})</span>
                  </td>
                  <td>${c.price_usd?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className={c.percent_change_24h >= 0 ? 'up' : 'down'}>
                    {c.percent_change_24h !== undefined ? `${c.percent_change_24h.toFixed(2)}%` : '-'}
                  </td>
                  <td className="forecast">-</td>
                  <td className="forecast">-</td>
                  <td className="gain">-</td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Dashboard
