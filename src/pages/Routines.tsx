import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { BodyPartType, Exercise, getExercisesByBodyPart } from '../api/api';
import CreateRoutineForm from '../components/CreateRoutineForm';
import ExerciseModal from '../components/ExerciseModal';
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
  const [currentExercise, setCurrentExercise] = useState<Partial<Exercise>>({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (bodyPart) {
      setIsLoading(true);
      getExercisesByBodyPart(bodyPart)
        .then((resp) => setExercises(resp || []))
        .finally(() => setIsLoading(false));
    }
  }, [bodyPart]);

  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <>
      {Object.keys(currentExercise).length >= 2 && (
        <ExerciseModal>
          <div className='flex gap-3 items-center'>
            <div className='w-[350px] h-[350px] mx-auto my-2'>
              <img
                src={currentExercise.gifUrl}
                alt={`Gif demostrativo del ejercicio ${currentExercise.name}`}
                width={350}
                className='rounded-sm'
              />
            </div>
            <div className='w-[450px] h-[350px] flex flex-col  gap-1'>
              <div className='flex items-baseline gap-2'>
                <h2>{capitalize(currentExercise.name!)}:</h2>
                {/* <h3>Instrucciones</h3> */}
              </div>
              <ul className='h-[250px] overflow-y-auto my-2'>
                {currentExercise.instructions?.map((i, index) => (
                  <li>
                    {index + 1} - {i}
                  </li>
                ))}
              </ul>
              <button className='w-full' onClick={() => setCurrentExercise({})}>
                Cerrar
              </button>
            </div>
          </div>
        </ExerciseModal>
      )}
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='tracking-widest mb-4'>Rutinas</h1>
          <h2 className='mb-4'>Mira todos los ejercicios disponibles y crea tu rutina personalizada,</h2>
          <h3>o echa un vistazo a las creadas por otros usuarios..</h3>
        </div>
        <div className='flex items-center w-1/5'>
          <button className='w-full h-full' onClick={() => setIsFormOpen(!isFormOpen)}>
            Crear rutina
          </button>
        </div>
      </div>
      {isFormOpen && <CreateRoutineForm exercisesList={exercisesList} />}
      <Select options={partesDelCuerpo} onChange={(e) => setBodyPart((e?.value as BodyPartType) || '')} className='w-full my-4' />
      <div className='flex gap-2 my-2 flex-wrap'>
        {isLoading ? (
          <h1>Cargando...</h1>
        ) : (
          exercises.map(({ name, gifUrl, bodyPart, instructions }, index) => {
            return (
              <div key={index} className='bg-slate-900/40 flex items-center justify-between rounded p-3 w-[400px]'>
                <div className='flex flex-col ml-2'>
                  <p className='font-bold'>{capitalize(name)} </p>
                  <span>Tipo: {partesDelCuerpo.find((e) => e.value === bodyPart)?.label}</span>
                </div>
                <div>
                  <button
                    className='bg-transparent hover:bg-slate-600/20 px-2'
                    onClick={() => setCurrentExercise({ name, gifUrl, instructions })}
                  >
                    Ver mas
                  </button>
                  <button
                    className='bg-transparent hover:bg-slate-600/20 px-2 underline underline-offset-2'
                    onClick={() => setExercisesList([...exercisesList, name])}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
