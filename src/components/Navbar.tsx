import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
import appFirebase from '../credenciales';
const auth = getAuth(appFirebase);
const linkStyles = 'px-3 py-1 rounded hover:bg-slate-300/10 active:bg-slate-300/20 '
export const Navbar = () => {
    return (
        <nav className='flex justify-between  my-4 mx-5'>
            <ol className='flex gap-2 text-lg text-blue-500'>
                <li>
                    <Link to="/" className={linkStyles}>💪🏻 Mooscles</Link>
                </li>
                <li>

                    <Link to="/routines" className={linkStyles}>Rutinas</Link>
                </li>
                <li>

                    <Link to="/userstats" className={linkStyles}>Estadisticas</Link>
                </li>
            </ol>
            <div className='flex gap-4'>
                <i className='text-white font-light'>
                    My  <span className='text-blue-500'>mooscles</span> are getting bigger.
                </i>
                <Link to='/auth' className={linkStyles} onClick={() => signOut(auth)}>Cerrar sesión</Link>
            </div>
        </nav >
    )
}
