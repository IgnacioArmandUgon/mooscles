import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { BodyPartType, Exercise, getExercisesByBodyPart } from '../api/api';
const partesDelCuerpo = [
  { value: 'back', label: 'Espalda' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'chest', label: 'Pecho' },
  { value: 'lower arms', label: 'Brazos inferiores' },
  { value: 'lower legs', label: 'Piernas inferiores' },
  { value: 'neck', label: 'Cuello' },
  { value: 'shoulders', label: 'Hombros' },
  { value: 'upper arms', label: 'Brazos superiores' },
  { value: 'upper legs', label: 'Piernas superiores' },
  { value: 'waist', label: 'Cintura' },
];
export const Routines = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyPart, setBodyPart] = useState<BodyPartType>('');
  useEffect(() => {
    if (bodyPart) {
      getExercisesByBodyPart(bodyPart).then((resp) => setExercises(resp || []));
    }
  }, [bodyPart]);

  return (
    <>
      <h1 className='tracking-widest mb-4'>Rutinas</h1>
      <h2>Crea tu rutina</h2>
      <Select
        options={partesDelCuerpo}
        onChange={(e) => setBodyPart((e?.value as BodyPartType) || '')}
        className='w-full my-4'
      />
      <div className='flex gap-2 my-2 flex-wrap'>
        {exercises.map((exe, index) => {
          return (
            <div
              key={index}
              className='bg-slate-900/40 flex items-center flex-col justify-between rounded p-5 w-[400px]'
            >
              <p className='font-bold'>
                {exe.name[0].toUpperCase() + exe.name.substring(1)}{' '}
              </p>
              <span>
                Tipo: {partesDelCuerpo.find((e) => e.value === exe.bodyPart)?.label}
              </span>

              <img src={exe.gifUrl} width={200} className='rounded my-2' />
              <button className=' w-full bg-transparent hover:bg-slate-600/20'>
                Agregar
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
