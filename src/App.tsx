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
import RoutinesList from './pages/RoutinesList';

const auth = getAuth(appFirebase);
const App = () => {
  const [usuario, setUsuario] = useState<null | User | 'initial'>('initial'); //Tengo que ponerle un valor inicial truty porque sino cuando refresco la pagina el null inicial de este estádo me redirige de nuevo al /auth a pesar de que ya tenga las credenciales de firebase

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      console.log({ usuarioFirebase });
      setUsuario(usuarioFirebase);
    } else {
      setUsuario(null);
    }
  });

  const PrivateRoute = ({ component }) => {
    return usuario ? <PageLayout>{component}</PageLayout> : <Navigate to='/auth' />;
  };
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute component={<Home />} />} />
      <Route path='/routines' element={<PrivateRoute component={<Routines />} />} />
      <Route path='/routines/more' element={<PrivateRoute component={<RoutinesList />} />} />
      <Route path='/userstats' element={<PrivateRoute component={<UserStats />} />} />
      <Route path='/exercises' element={<PrivateRoute component={<Exercises />} />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
};

export default App;
