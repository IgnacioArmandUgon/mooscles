import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appFirebase from '../credenciales';
const auth = getAuth(appFirebase);
const linkStyles = 'px-3 py-1 rounded hover:bg-slate-300/10 active:bg-slate-300/20 ';
export const Navbar = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textArray = [
    <i>
      Time to poomp the <span className='text-blue-500'>mooscles</span>
    </i>,
    <i>
      I'm growing <span className='text-blue-500'>stronker</span>
    </i>,
    <i>
      My <span className='text-blue-500'>mooscles</span> are getting bigger
    </i>,
    <i>
      I'm growing very <span className='text-blue-500'>stronk</span>
    </i>,
    <i>
      Another day of <span className='text-blue-500'>mooscles</span>
    </i>,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndice) => (prevIndice + 1) % textArray.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className='flex justify-between  items-center my-4 mx-5'>
      <ol className='flex gap-2 text-lg text-blue-500'>
        <li>
          <Link to='/' className={linkStyles}>
            💪🏻 Mooscles
          </Link>
        </li>
        <li>
          <Link to='/routines' className={linkStyles}>
            Rutinas
          </Link>
        </li>
        <li>
          <Link to='/userstats' className={linkStyles}>
            Estadisticas
          </Link>
        </li>
      </ol>
      <div className='flex gap-4 items-center'>
        {textArray[currentTextIndex]}
        <Link to='/auth' className={linkStyles} onClick={() => signOut(auth)}>
          Cerrar sesión
        </Link>
      </div>
    </nav>
  );
};
