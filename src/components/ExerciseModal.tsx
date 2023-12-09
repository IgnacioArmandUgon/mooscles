import React from 'react';

const ExerciseModal = ({ children }) => {
  return (
    <div className='relative'>
      <div className='absolute w-full h-[90vh] flex justify-center items-center '>
        <div className='bg-slate-800 rounded py-3 px-5 shadow-lg min-w-[250px]'>{children}</div>
      </div>
    </div>
  );
};

export default ExerciseModal;
