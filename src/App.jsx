import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Login from './pages/Login'
import Home from './pages/Home'
import AlumniDirectory from './pages/AlumniDirectory'
import CompanyDirectory from './pages/CompanyDirectory'
import Statistics from './pages/Statistics'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('akpsi_authenticated') === 'true'
  )

  const handleLogin = () => setIsAuthenticated(true)

  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected pages */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Navbar />
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Navbar />
              <AlumniDirectory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companies"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Navbar />
              <CompanyDirectory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Navbar />
              <Statistics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App