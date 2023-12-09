import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import appFirebase from './credenciales';
import './index.css';
import Auth from './pages/Auth';
import ErrorPage from './pages/ErrorPage';
import Exercises from './pages/Exercises';
import { Home } from './pages/Home';
import PageLayout from './pages/PageLayout';
import { Routines } from './pages/Routines';
import { UserStats } from './pages/UserStats';

const auth = getAuth(appFirebase);
const App = () => {
  const [usuario, setUsuario] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    console.log({ usuarioFirebase });
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase);
    } else {
      setUsuario(null);
    }
  });

  // if (!usuario) {
  //   return;
  // }
  return (
    <Routes>
      {usuario ? (
        <>
          <Route
            path='/'
            element={
              <PageLayout>
                <Home />
              </PageLayout>
            }
          />
          <Route
            path='/routines'
            element={
              <PageLayout>
                <Routines />
              </PageLayout>
            }
          />
          <Route
            path='/userstats'
            element={
              <PageLayout>
                <UserStats />
              </PageLayout>
            }
          />
          <Route
            path='/exercises'
            element={
              <PageLayout>
                <Exercises />
              </PageLayout>
            }
          />
        </>
      ) : (
        <>
          <Route path='/' element={<Navigate to='/auth' />} />
          <Route path='/auth' element={<Auth />} />
        </>
      )}
      <Route path='/auth' element={<Navigate to='/' />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
