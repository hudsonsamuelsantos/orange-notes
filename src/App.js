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
import AddNote from './pages/AddNote/AddNote'
import DeleteNote from './pages/DeleteNote/DeleteNote'
import AddNotepad from './pages/AddNotepad/AddNotepad'

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
              <Route path='/add-notepad' element={!user ? <Navigate to={'/'} /> : <AddNotepad />} />
              <Route path='/search' element={!user ? <Navigate to={'/'} /> : <Search />} />
              <Route path='/notes/add/:id' element={!user ? <Navigate to={'/'} /> : <AddNote />} />
              <Route path='/notes/delete/:id/:index' element={!user ? <Navigate to={'/'} /> : <DeleteNote />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
