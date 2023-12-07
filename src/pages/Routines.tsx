import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { BodyPartType, Exercise, getExercisesByBodyPart } from '../api/api';
import CreateRoutineForm from '../components/CreateRoutineForm';
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
  const [bodyPart, setBodyPart] = useState<BodyPartType>('cardio');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [exercisesList, setExercisesList] = useState<string[]>([]);
  useEffect(() => {
    if (bodyPart) {
      getExercisesByBodyPart(bodyPart).then((resp) => setExercises(resp || []));
    }
  }, [bodyPart]);

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='tracking-widest mb-4'>Rutinas</h1>
          <h2 className='mb-4'>
            Mira todos los ejercicios disponibles y crea tu rutina personalizada,
          </h2>
          <h3>o echa un vistazo a las creadas por otros usuarios..</h3>
        </div>
        <div className='flex items-center w-1/5'>
          <button className='w-full h-full' onClick={() => setIsFormOpen(!isFormOpen)}>
            Crear rutina
          </button>
        </div>
      </div>
      {isFormOpen && <CreateRoutineForm exercisesList={exercisesList} />}
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
              className='bg-slate-900/40 flex items-center justify-between rounded p-3 w-[400px]'
            >
              <img src={exe.gifUrl} width={100} className='rounded my-2' />
              <div className='flex flex-col ml-2'>
                <p className='font-bold'>
                  {exe.name[0].toUpperCase() + exe.name.substring(1)}{' '}
                </p>
                <span>
                  Tipo: {partesDelCuerpo.find((e) => e.value === exe.bodyPart)?.label}
                </span>
              </div>
              <button
                className=' bg-transparent hover:bg-slate-600/20'
                onClick={() => setExercisesList([...exercisesList, exe.name])}
              >
                Agregar
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
