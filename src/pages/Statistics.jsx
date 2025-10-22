import { useState, useEffect } from 'react'
import './statistics.css'
import '../theme.css'
import '../styles.css'

export default function Statistics() {
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
    return <div className="loading">Loading statistics...</div>
  }

  if (!data) {
    return <div className="loading">Error loading data. Please refresh.</div>
  }

  const maxEmployerCount = Math.max(...Object.values(data.statistics.topEmployers))
  const maxIndustryCount = Math.max(...Object.values(data.statistics.industries))
  const maxClassCount = Math.max(...Object.values(data.statistics.pledgeClasses))

  return (
    <div className="container">
      <div className="page-header">
        <h1>Network Statistics</h1>
        <p>Insights into the Beta Omicron professional network</p>
      </div>

      <div className="stats-container">
        {/* Overview Stats */}
        <div className="stat-section">
          <h2>Network Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{data.statistics.totalAlumni}</div>
              <div className="stat-label">Total Alumni</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Object.keys(data.companies).length}</div>
              <div className="stat-label">Companies Represented</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{data.filters.pledgeClasses.length}</div>
              <div className="stat-label">Pledge Classes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{data.filters.industries.length}</div>
              <div className="stat-label">Industry Sectors</div>
            </div>
          </div>
        </div>

        {/* Top Employers */}
        <div className="stat-section">
          <h2>Top 15 Employers</h2>
          <div className="stat-list">
            {Object.entries(data.statistics.topEmployers)
              .slice(0, 15)
              .map(([employer, count]) => (
                <div key={employer} className="stat-item">
                  <div style={{ flex: 1 }}>
                    <div className="stat-item-label">{employer}</div>
                    <div className="stat-bar">
                      <div 
                        className="stat-bar-fill" 
                        style={{ width: `${(count / maxEmployerCount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="stat-item-value">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Industry Distribution */}
        <div className="stat-section">
          <h2>Industry Distribution</h2>
          <div className="stat-list">
            {Object.entries(data.statistics.industries)
              .sort((a, b) => b[1] - a[1])
              .map(([industry, count]) => (
                <div key={industry} className="stat-item">
                  <div style={{ flex: 1 }}>
                    <div className="stat-item-label">{industry}</div>
                    <div className="stat-bar">
                      <div 
                        className="stat-bar-fill" 
                        style={{ width: `${(count / maxIndustryCount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="stat-item-value">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Pledge Class Breakdown */}
        <div className="stat-section">
          <h2>Pledge Class Distribution</h2>
          <div className="stat-list">
            {Object.entries(data.statistics.pledgeClasses)
              .sort((a, b) => b[1] - a[1])
              .map(([pledgeClass, count]) => (
                <div key={pledgeClass} className="stat-item">
                  <div style={{ flex: 1 }}>
                    <div className="stat-item-label">{pledgeClass}</div>
                    <div className="stat-bar">
                      <div 
                        className="stat-bar-fill" 
                        style={{ width: `${(count / maxClassCount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="stat-item-value">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Graduation Years */}
        <div className="stat-section">
          <h2>Alumni by Graduation Year</h2>
          <div className="stat-list">
            {Object.entries(data.statistics.graduationYears)
              .sort((a, b) => b[0] - a[0])
              .map(([year, count]) => (
                <div key={year} className="stat-item">
                  <span className="stat-item-label">Class of {year}</span>
                  <span className="stat-item-value">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="stat-section">
          <h2>Top Alumni Locations</h2>
          <div className="stat-list">
            {Object.entries(data.statistics.locations)
              .slice(0, 15)
              .map(([location, count]) => (
                <div key={location} className="stat-item">
                  <span className="stat-item-label">{location}</span>
                  <span className="stat-item-value">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

