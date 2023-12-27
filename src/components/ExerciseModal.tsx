import React from 'react';

const ExerciseModal = ({ children }) => {
  return (
    <div className='relative z-10'>
      <div className='absolute w-full h-[90vh] flex justify-center items-center '>
        <div className='bg-slate-800 rounded py-5 px-7 shadow-lg min-w-[250px]'>{children}</div>
      </div>
    </div>
  );
};

export default ExerciseModal;
