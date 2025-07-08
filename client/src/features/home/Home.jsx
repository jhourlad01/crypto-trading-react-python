import './Home.scss'
import { LineChart, ShieldCheck, Coins, Smartphone, Newspaper, TrendingUp, Globe2 } from 'lucide-react'

function Home() {
  return (
    <div className="home">
      <div className="hero-banner relative overflow-hidden">
        <svg className="hero-network-bg" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#007aff" strokeWidth="1.5">
            <circle cx="200" cy="120" r="8" fill="#007aff"/>
            <circle cx="400" cy="80" r="6" fill="#00e0d3"/>
            <circle cx="700" cy="200" r="10" fill="#ffb86c"/>
            <circle cx="1200" cy="160" r="7" fill="#5856d6"/>
            <circle cx="1000" cy="400" r="9" fill="#00e0d3"/>
            <circle cx="300" cy="500" r="7" fill="#ffb86c"/>
            <circle cx="900" cy="100" r="8" fill="#007aff"/>
            <circle cx="600" cy="400" r="7" fill="#5856d6"/>
            <line x1="200" y1="120" x2="400" y2="80" />
            <line x1="400" y1="80" x2="700" y2="200" />
            <line x1="700" y1="200" x2="1200" y2="160" />
            <line x1="1200" y1="160" x2="1000" y2="400" />
            <line x1="1000" y1="400" x2="300" y2="500" />
            <line x1="300" y1="500" x2="200" y2="120" />
            <line x1="900" y1="100" x2="1200" y2="160" />
            <line x1="900" y1="100" x2="700" y2="200" />
            <line x1="600" y1="400" x2="1000" y2="400" />
            <line x1="600" y1="400" x2="300" y2="500" />
          </g>
          <g opacity="0.18">
            <text x="210" y="110" fontSize="38" fontWeight="bold" fill="#f7931a">₿</text>
            <text x="1210" y="180" fontSize="32" fontWeight="bold" fill="#627eea">Ξ</text>
            <rect x="650" y="250" width="8" height="38" rx="3" fill="#00e0d3"/>
            <rect x="665" y="230" width="8" height="58" rx="3" fill="#ffb86c"/>
            <rect x="680" y="260" width="8" height="28" rx="3" fill="#007aff"/>
          </g>
        </svg>
        {/* Floating SVG blobs */}
        <span className="floating-blob" style={{top: '-60px', left: '-60px', width: '200px', height: '200px', background: 'radial-gradient(circle, #00e0d3 60%, transparent 100%)', animationDelay: '0s'}}></span>
        <span className="floating-blob" style={{bottom: '-80px', right: '-80px', width: '260px', height: '260px', background: 'radial-gradient(circle, #ffb86c 60%, transparent 100%)', animationDelay: '2s'}}></span>
        <span className="floating-blob" style={{top: '40%', left: '80%', width: '120px', height: '120px', background: 'radial-gradient(circle, #007aff 60%, transparent 100%)', animationDelay: '1s'}}></span>
        <div className="hero-content-box">
          <div className="hero-content relative z-10">
            <h1 className="hero-heading">Welcome to CryptoClient</h1>
            <p className="hero-subtext">Your advanced cryptocurrency trading platform</p>
            <button className="cta-button animate-bounce">Get Started</button>
          </div>
        </div>
      </div>
      <div className="features-section">
        <div className="container">
          <h2>Why Choose CryptoClient?</h2>
          <div className="features-grid">
            <div className="feature-card animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="feature-icon"><LineChart size={56} strokeWidth={2.2} color="#007aff" /></div>
              <h3>Real-time Trading</h3>
              <p>Execute trades with lightning-fast speed and real-time market data</p>
            </div>
            <div className="feature-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="feature-icon"><ShieldCheck size={56} strokeWidth={2.2} color="#5856d6" /></div>
              <h3>Secure Platform</h3>
              <p>Bank-level security with multi-factor authentication and cold storage</p>
            </div>
            <div className="feature-card animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="feature-icon"><Coins size={56} strokeWidth={2.2} color="#ffb86c" /></div>
              <h3>Low Fees</h3>
              <p>Competitive trading fees starting from 0.1% per transaction</p>
            </div>
            <div className="feature-card animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="feature-icon"><Smartphone size={56} strokeWidth={2.2} color="#00e0d3" /></div>
              <h3>Mobile Ready</h3>
              <p>Trade anywhere with our responsive mobile-optimized platform</p>
            </div>
          </div>
        </div>
      </div>
      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">$2.5B+</div>
              <div className="stat-label">Trading Volume</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Cryptocurrencies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </div>
      <div className="cta-section">
        <div className="container">
          <h2>Ready to Start Trading?</h2>
          <p>Join thousands of traders who trust CryptoClient</p>
          <div className="cta-buttons">
            <button className="primary-button">Create Account</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
      </div>
      <div className="testimonials-section">
        <div className="container">
          <h2>What Our Traders Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"CryptoClient made trading so much easier. The interface is intuitive and the fees are unbeatable!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div className="author-info">
                  <h4>Alex Chen</h4>
                  <span>Professional Trader</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Security was my biggest concern, but CryptoClient's multi-factor authentication gives me peace of mind."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💻</div>
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <span>Tech Entrepreneur</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The mobile app is fantastic! I can trade anywhere, anytime. Perfect for my busy lifestyle."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🎓</div>
                <div className="author-info">
                  <h4>Mike Rodriguez</h4>
                  <span>Student Investor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="news-section">
        <div className="container">
          <h2>Latest Crypto News</h2>
          <div className="news-grid">
            <div className="news-card">
              <div className="news-image"><Newspaper size={48} strokeWidth={2.2} color="#007aff" /></div>
              <div className="news-content">
                <h3>Bitcoin Reaches New Heights</h3>
                <p>Bitcoin continues its upward trajectory, reaching new milestone prices in 2024.</p>
                <span className="news-date">2 hours ago</span>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image"><TrendingUp size={48} strokeWidth={2.2} color="#5856d6" /></div>
              <div className="news-content">
                <h3>Ethereum 2.0 Update</h3>
                <p>Major updates to Ethereum network promise improved scalability and lower fees.</p>
                <span className="news-date">5 hours ago</span>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image"><Globe2 size={48} strokeWidth={2.2} color="#00e0d3" /></div>
              <div className="news-content">
                <h3>DeFi Growth Continues</h3>
                <p>Decentralized Finance protocols see unprecedented growth in user adoption.</p>
                <span className="news-date">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-cta">
        <div className="container">
          <div className="footer-content">
            <div className="footer-text">
              <h2>Start Your Trading Journey Today</h2>
              <p>Join the future of finance with CryptoClient</p>
            </div>
            <div className="footer-actions">
              <button className="primary-button">Sign Up Free</button>
              <button className="outline-button">View Demo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 