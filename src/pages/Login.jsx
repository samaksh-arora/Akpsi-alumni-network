import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin = () => {} }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Change this password as needed
  const CHAPTER_PASSWORD = 'BetaOmicron2024'

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password.trim() === CHAPTER_PASSWORD) {
      localStorage.setItem('akpsi_authenticated', 'true')
      onLogin() // safe since default is provided
      navigate('/')
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>AKΨ Beta Omicron</h1>
        <p>Wayne State University</p>
        <p style={{ marginBottom: '2rem', color: '#6c757d' }}>
          Members Only - Enter Password
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <input
            type="password"
            placeholder="Enter chapter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}