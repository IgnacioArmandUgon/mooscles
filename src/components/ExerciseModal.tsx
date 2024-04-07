import React from 'react';

const ExerciseModal = ({ children }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-10 bg-dark-300/40'>
      <div className='w-full h-[90vh] flex justify-center items-center '>
        <div className='bg-dark-100 rounded py-5 px-7 shadow-2xl min-w-[250px]'>{children}</div>
      </div>
    </div>
  );
};

export default ExerciseModal;
