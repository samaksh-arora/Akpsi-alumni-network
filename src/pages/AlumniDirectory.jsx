import { useState, useEffect } from 'react'
import AlumniCard from '../components/AlumniCard'
import './alumni.css'
import '../theme.css'
import '../styles.css'

export default function AlumniDirectory() {
  const [data, setData] = useState(null)
  const [filteredAlumni, setFilteredAlumni] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    name: '',
    pledgeClass: '',
    industry: '',
    graduationYear: '',
    employer: ''
  })

  useEffect(() => {
    fetch('/akpsi_network_data.json')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setFilteredAlumni(data.alumni)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading ', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!data) return

    let results = data.alumni.filter(alumni => {
      const matchName = !filters.name || 
        alumni.name.toLowerCase().includes(filters.name.toLowerCase())
      
      const matchClass = !filters.pledgeClass || 
        alumni.pledgeClass === filters.pledgeClass
      
      const matchIndustry = !filters.industry || 
        alumni.industry === filters.industry
      
      const matchYear = !filters.graduationYear || 
        alumni.graduationYear === parseInt(filters.graduationYear)
      
      const matchEmployer = !filters.employer || 
        alumni.currentEmployer === filters.employer

      return matchName && matchClass && matchIndustry && matchYear && matchEmployer
    })

    setFilteredAlumni(results)
  }, [filters, data])

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const clearFilters = () => {
    setFilters({
      name: '',
      pledgeClass: '',
      industry: '',
      graduationYear: '',
      employer: ''
    })
  }

  if (loading) {
    return <div className="loading">Loading alumni directory...</div>
  }

  if (!data) {
    return <div className="loading">Error loading data. Please refresh.</div>
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Alumni Directory</h1>
        <p>Search and connect with {data.alumni.length} Beta Omicron alumni</p>
      </div>

      <div className="search-section">
        <h2>Search & Filter</h2>
        <div className="filters">
          <div className="filter-group">
            <label>Search by Name</label>
            <input
              type="text"
              placeholder="Enter name..."
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Pledge Class</label>
            <select 
              value={filters.pledgeClass} 
              onChange={(e) => handleFilterChange('pledgeClass', e.target.value)}
            >
              <option value="">All Classes</option>
              {data.filters.pledgeClasses.map(pc => (
                <option key={pc} value={pc}>{pc}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Industry</label>
            <select 
              value={filters.industry} 
              onChange={(e) => handleFilterChange('industry', e.target.value)}
            >
              <option value="">All Industries</option>
              {data.filters.industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Graduation Year</label>
            <select 
              value={filters.graduationYear} 
              onChange={(e) => handleFilterChange('graduationYear', e.target.value)}
            >
              <option value="">All Years</option>
              {data.filters.graduationYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Employer</label>
            <select 
              value={filters.employer} 
              onChange={(e) => handleFilterChange('employer', e.target.value)}
            >
              <option value="">All Employers</option>
              {data.filters.employers.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-actions">
          <button onClick={clearFilters} className="btn btn-secondary">
            Clear All Filters
          </button>
        </div>
      </div>

      <p className="results-count">
        Showing <strong>{filteredAlumni.length}</strong> of <strong>{data.alumni.length}</strong> alumni
      </p>

      {filteredAlumni.length === 0 ? (
        <div className="empty-state">
          <h2>No alumni found</h2>
          <p>Try adjusting your filters</p>
        </div>
      ) : (
        <div className="alumni-grid">
          {filteredAlumni.map(alumni => (
            <AlumniCard key={alumni.id} alumni={alumni} />
          ))}
        </div>
      )}
    </div>
  )
}
