import React, { useState } from 'react';

const RestTimeMap = {
  1: '0:30',
  2: '1:00',
  3: '2:00',
  4: '3:00',
  5: '4:00',
};

const CreateRoutineForm = ({
  exercisesList,
  setExercisesList,
}: {
  exercisesList: string[];
  setExercisesList: (exe: string[]) => void;
}) => {
  const getRestSelected = (): string => {
    return RestTimeMap[document.getElementById('rest')![0].value];
  };
  return (
    <div className='m-4'>
      <div className='my-3 flex align-middle gap-2 h-[35px]'>
        {exercisesList.length > 0 ? (
          exercisesList.map((exe, i) => {
            return (
              <div
                key={i}
                className={` ${Object.values(RestTimeMap).includes(exe) ? 'bg-slate-400' : 'bg-slate-300'} px-2 py-1 rounded-sm`}
              >
                {exe}
              </div>
            );
          })
        ) : (
          <h3 className='text-slate-500 text-[16px] h-4 my-auto'>Agrega ejercicios...</h3>
        )}
      </div>

      <div className='flex gap-2'>
        <select name='rest' placeholder='tiempo' id='rest' className='px-2 rounded-sm '>
          {Object.keys(RestTimeMap).map((key) => (
            <option value={key} key={key}>
              {RestTimeMap[key]}
            </option>
          ))}
        </select>
        <button onClick={() => setExercisesList([...exercisesList, getRestSelected()])}>Agregar descanso</button>
        {exercisesList.length > 0 && <button onClick={() => setExercisesList([])}>Limpiar</button>}
      </div>
    </div>
  );
};

export default CreateRoutineForm;
