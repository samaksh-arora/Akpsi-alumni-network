import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import '../theme.css'
import '../styles.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/akpsi_network_data.json')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading ', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="loading">Loading network data...</div>
  }

  if (!data) {
    return <div className="loading">Error loading data. Please refresh.</div>
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Welcome to AKΨ Beta Omicron Network</h1>
        <p>{data.metadata.university} - {data.metadata.lastUpdated}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{data.statistics.totalAlumni}</div>
          <div className="stat-label">Total Alumni</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{Object.keys(data.companies).length}</div>
          <div className="stat-label">Companies</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{data.filters.pledgeClasses.length}</div>
          <div className="stat-label">Pledge Classes</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">{data.filters.industries.length}</div>
          <div className="stat-label">Industries</div>
        </div>
      </div>

      <div className="search-section">
        <h2>Quick Links</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <Link to="/alumni" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer', background: '#003366', color: 'white' }}>
              <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Browse Alumni</h3>
              <p style={{ color: '#e3f2fd', margin: 0 }}>View Complete Alumni Directory</p>
            </div>
          </Link>
          
          <Link to="/companies" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer', background: '#0066cc', color: 'white' }}>
              <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Company Directory</h3>
              <p style={{ color: '#e3f2fd', margin: 0 }}>View alumni by employer</p>
            </div>
          </Link>
          
          <Link to="/statistics" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer', background: '#004d99', color: 'white' }}>
              <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Network Stats</h3>
              <p style={{ color: '#e3f2fd', margin: 0 }}>Explore detailed analytics</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="search-section" style={{ marginTop: '2rem' }}>
        <h2>Top Employers</h2>
        <div className="stat-list">
          {Object.entries(data.statistics.topEmployers)
            .slice(0, 10)
            .map(([employer, count]) => (
              <div key={employer} className="stat-item">
                <span className="stat-item-label">{employer}</span>
                <span className="stat-item-value">{count} {count === 1 ? 'alumnus' : 'alumni'}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
