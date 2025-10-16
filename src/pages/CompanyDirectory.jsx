import { useState, useEffect } from 'react'

export default function CompanyDirectory() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

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
    return <div className="loading">Loading company directory...</div>
  }

  if (!data) {
    return <div className="loading">Error loading data. Please refresh.</div>
  }

  const companies = Object.values(data.companies)
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCompanyClick = (company) => {
    setSelectedCompany(company)
  }

  const closeModal = () => {
    setSelectedCompany(null)
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Company Directory</h1>
        <p>Explore {companies.length} companies where our alumni work</p>
      </div>

      <div className="search-section">
        <h2>Search Companies</h2>
        <input
          type="text"
          placeholder="Search by company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '2px solid #e1e8ed', borderRadius: '8px' }}
        />
      </div>

      <p className="results-count">
        Showing <strong>{filteredCompanies.length}</strong> companies
      </p>

      <div className="company-grid">
        {filteredCompanies.map((company, index) => (
          <div 
            key={index} 
            className="company-card"
            onClick={() => handleCompanyClick(company)}
          >
            <h3>{company.name}</h3>
            <p className="company-meta">
              <strong>{company.alumniCount}</strong> {company.alumniCount === 1 ? 'alumnus' : 'alumni'}
            </p>
            {company.industries && company.industries.length > 0 && (
              <div className="industry-tags">
                {company.industries.map((industry, idx) => (
                  <span key={idx} className="industry-tag">{industry}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedCompany && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: '#003366', marginBottom: '1rem' }}>{selectedCompany.name}</h2>
            <p style={{ color: '#6c757d', marginBottom: '1.5rem' }}>
              {selectedCompany.alumniCount} {selectedCompany.alumniCount === 1 ? 'alumnus' : 'alumni'}
            </p>
            
            <h3 style={{ marginBottom: '1rem' }}>Alumni at this company:</h3>
            <ul className="alumni-list">
              {selectedCompany.alumni.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>

            <button 
              onClick={closeModal}
              className="btn btn-primary"
              style={{ marginTop: '1.5rem', width: '100%' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
