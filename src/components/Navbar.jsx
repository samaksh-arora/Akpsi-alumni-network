import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../styles.css'
import '../theme.css'
import './navbar.css'

export default function Navbar({ onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    setIsMenuOpen(false)
    navigate('/login')
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">AKΨ Beta Omicron</div>
        
        {/* Hamburger Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/alumni" className={isActive('/alumni')} onClick={handleLinkClick}>
            Directory
          </Link>
          <Link to="/companies" className={isActive('/companies')} onClick={handleLinkClick}>
            Companies
          </Link>
          <Link to="/statistics" className={isActive('/statistics')} onClick={handleLinkClick}>
            Stats
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </div>
    </div>
  )
}
