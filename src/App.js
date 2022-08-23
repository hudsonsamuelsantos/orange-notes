import './App.css'

import { useState, useEffect } from 'react'

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'

import { AuthProvider } from './context/AuthContext'

import { useAuthentication } from './hooks/useAuthentication'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Search from './pages/Search/Search'

import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, user => {
      setUser(user)
    })

  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path='/' element={!user ? <Login /> : <Navigate to={'/dashboard'} />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to={'/'} />} />
              <Route path='/dashboard' element={!user ? <Navigate to={'/'} /> : <Dashboard />} />
              <Route path='/search' element={!user ? <Navigate to={'/'} /> : <Search />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
