
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import appFirebase from './credenciales'
import './index.css'
import Auth from './pages/Auth'
import { Home } from './pages/Home'
import PageLayout from './pages/PageLayout'
import { Routines } from './pages/Routines'
import { UserStats } from './pages/UserStats'
import ErrorPage from './pages/ErrorPage'

const auth = getAuth(appFirebase);
const App = () => {

  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase)
    } else {
      setUsuario(null)
    }
  })

  return (

    <Routes>
      {
        usuario ?
          <>
            <Route path='/' element={<PageLayout>
              <Home />
            </PageLayout>} />
            <Route path='/routines' element={<PageLayout>
              <Routines />
            </PageLayout>} />
            <Route path='/userstats' element={<PageLayout>
              <UserStats />
            </PageLayout>} />
          </>
          :
          <Route path='/auth' element={<Auth />} />
      }
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
