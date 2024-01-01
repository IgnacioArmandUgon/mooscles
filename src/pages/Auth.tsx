import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from './../credenciales';
import { firebaseErrorMessages } from '../utils/firebaseMessageMap';
const auth = getAuth(appFirebase);
const FORM_INITIAL_VALUE = {
  email: '',
  password: '',
  password2: '',
  isTouched: false,
  error: '',
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(FORM_INITIAL_VALUE);
  const { password, email, password2, isTouched, error } = formData;
  const navigate = useNavigate();
  const setFormError = (error) => setFormData({ ...formData, error });
  useEffect(() => {
    setFormError('');
    if (!Boolean(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))) {
      setFormError('Correo invalido');
    }
    if (isTouched && !password) {
      setFormError('Ingrese contraseña');
    }
    if (!isLogin) {
      if (password?.length < 8) {
        setFormError('La contraseña es demaciado corta');
      }
      if (password2 !== password) {
        setFormError('Las contraseñas con coinciden');
      }
    }
  }, [email, password, password2]);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value, isTouched: true });
  };

  const handleAuth = async () => {
    try {
      let credentials;
      isLogin
        ? (credentials = await signInWithEmailAndPassword(auth, email, password))
        : (credentials = await createUserWithEmailAndPassword(auth, email, password));
      navigate('/');
    } catch (err) {
      console.error({ err: err.code });
      if (err.code) {
        setFormError(firebaseErrorMessages[err.code]);
      } else {
        setFormError('Ocurrió un error inesperado (mirá la consola papá)');
      }
    }
  };
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='flex flex-col justify-between gap-4 bg-slate-500 p-4 rounded-sm h-[375px] min-w-[400px]'>
        <div className='flex flex-col gap-2'>
          <h1 className='mb-3'>{isLogin ? 'Ingresa' : 'Registrate'}</h1>
          <input
            value={formData.email}
            type='text'
            name='email'
            placeholder='Ingresa correo'
            className='p-2 outline-none rounded-sm'
            onChange={handleChange}
          />
          <input
            value={formData.password}
            type='password'
            name='password'
            placeholder='Ingresa contraseña'
            className='p-2 outline-none rounded-sm'
            onChange={handleChange}
          />
          {!isLogin && (
            <input
              value={formData.password2}
              type='password'
              name='password2'
              placeholder='Confirma contraseña'
              className='p-2 outline-none rounded-sm'
              onChange={handleChange}
            />
          )}
          {error && isTouched && <p>{error}</p>}
        </div>

        <div className='flex flex-col'>
          <button disabled={Boolean(error)} className='disabled:bg-slate-400/80' onClick={() => handleAuth()}>
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </button>
          <button
            className='bg-transparent hover:border-none'
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData(FORM_INITIAL_VALUE);
            }}
          >
            {isLogin ? 'Quiero registrarme' : 'Quiero ingresar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
