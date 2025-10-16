import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ onLogout }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span>AKΨ</span> Beta Omicron Network
        </div>
        <nav>
          <Link to="/" className={isActive('/')}>
            Home
          </Link>
          <Link to="/alumni" className={isActive('/alumni')}>
            Alumni Directory
          </Link>
          <Link to="/companies" className={isActive('/companies')}>
            Companies
          </Link>
          <Link to="/statistics" className={isActive('/statistics')}>
            Statistics
          </Link>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </div>
    </div>
  )
}

