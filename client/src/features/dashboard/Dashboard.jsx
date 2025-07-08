import './Dashboard.scss'

const cryptos = [
  { symbol: 'BTC', name: 'Bitcoin', price: '67,200.00', change: '+2.15%', forecast24h: '+1.8%', forecast7d: '+4.2%', icon: '🟠' },
  { symbol: 'ETH', name: 'Ethereum', price: '3,120.50', change: '-0.85%', forecast24h: '+0.5%', forecast7d: '+2.1%', icon: '🟣' },
  { symbol: 'BNB', name: 'Binance Coin', price: '590.10', change: '+1.02%', forecast24h: '+1.2%', forecast7d: '+3.0%', icon: '🟡' },
  { symbol: 'SOL', name: 'Solana', price: '155.30', change: '+4.12%', forecast24h: '+2.7%', forecast7d: '+6.5%', icon: '🟩' },
  { symbol: 'DOGE', name: 'Dogecoin', price: '0.1620', change: '-1.25%', forecast24h: '-0.3%', forecast7d: '+0.8%', icon: '🟤' },
]

const userBalance = 12450.23;
const autotradingCount = 0;

function Dashboard() {
  return (
    <div className="dashboard dashboard-table-view">
      <div className="dashboard-balance-bar">
        <span className="autotrading-status">Autotrading: {autotradingCount} asset</span>
        <div className="balance-bar-right">
          <span className="balance-amount">${userBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          <button className="balance-topup-btn" title="Top up balance">＋</button>
        </div>
      </div>
      <div className="dashboard-table-wrapper">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Price (USD)</th>
              <th>24h Change</th>
              <th>24H Forecast</th>
              <th>7D Forecast</th>
              <th>Autotrade</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((c) => (
              <tr key={c.symbol}>
                <td>
                  <span className="asset-icon" role="img" aria-label={c.symbol}>{c.icon}</span>
                  <span className="asset-name-bold">{c.name}</span>
                  <span className="asset-symbol-paren"> ({c.symbol})</span>
                </td>
                <td>${c.price}</td>
                <td className={c.change.startsWith('+') ? 'up' : 'down'}>{c.change}</td>
                <td className={c.forecast24h.startsWith('+') ? 'up' : 'down'}>{c.forecast24h}</td>
                <td className={c.forecast7d.startsWith('+') ? 'up' : 'down'}>{c.forecast7d}</td>
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
      </div>
    </div>
  )
}

export default Dashboard 