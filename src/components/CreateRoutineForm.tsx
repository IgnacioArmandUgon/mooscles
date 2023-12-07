import React from 'react';

const CreateRoutineForm = ({ exercisesList }: { exercisesList: string[] }) => {
  return (
    <div className='m-4'>
      {/* Routine mapping */}
      <div className='my-3 flex gap-2'>
        {exercisesList.length > 0 ? (
          exercisesList.map((exe) => {
            return <div>{exe}</div>;
          })
        ) : (
          <h3 className='text-slate-500'>Agrega ejercicios..</h3>
        )}
      </div>

      <div>
        <button>Agregar descanso</button>
      </div>
    </div>
  );
};

export default CreateRoutineForm;
