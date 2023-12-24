import React, { useState } from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, Route, Routes } from 'react-router-dom';
import appFirebase from './credenciales';
import './index.css';
import Auth from './pages/Auth';
import Exercises from './pages/Exercises';
import { Home } from './pages/Home';
import PageLayout from './pages/PageLayout';
import { Routines } from './pages/Routines';
import { UserStats } from './pages/UserStats';

const auth = getAuth(appFirebase);
const App = () => {
  const [usuario, setUsuario] = useState<null | User>(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuario(usuarioFirebase);
    } else {
      setUsuario(null);
    }
  });

  const PrivateRoute = ({ component }) => {
    console.log('asd');
    return usuario ? <PageLayout>{component}</PageLayout> : <Navigate to='/auth' />;
  };
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute component={<Home />} />} />
      <Route path='/routines' element={<PrivateRoute component={<Routines />} />} />
      <Route path='/userstats' element={<PrivateRoute component={<UserStats />} />} />
      <Route path='/exercises' element={<PrivateRoute component={<Exercises />} />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
};

export default App;
