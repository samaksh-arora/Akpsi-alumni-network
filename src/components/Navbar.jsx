import { Link, useLocation, useNavigate } from 'react-router-dom'
import './navbar.css'
import '../styles.css'
import '../theme.css'

export default function Navbar({ onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()  // Call the logout function from App.jsx
    }
    navigate('/login')  // Redirect to login page
  }

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">AKΨ Beta Omicron</div>
        <nav>
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/alumni" className={isActive('/alumni')}>Directory</Link>
          <Link to="/companies" className={isActive('/companies')}>Companies</Link>
          <Link to="/statistics" className={isActive('/statistics')}>Stats</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </div>
    </div>
  )
}
