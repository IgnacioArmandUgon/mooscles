import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeExeById } from '../store/routineSlice';
const ExcerciseElement = ({ isRest, exe }) => {
  const dispatch = useDispatch();

  const { name, id } = exe;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  var patron = /\bscaleX\(\s*[\d.]+\s*\)\s*/g;

  const stylesWithNoScaleX = CSS.Transform.toString(transform)?.replace(patron, '');

  const style = {
    transform: stylesWithNoScaleX,
    transition,
  };

  return (
    <div className='flex gap-1'>
      <div
        ref={setNodeRef}
        className={`${isRest ? 'bg-slate-400' : 'bg-slate-300'} px-2 py-1 rounded-sm min-w-[75px] text-center relative group`}
        style={style}
        {...attributes}
        {...listeners}
      >
        {name}
      </div>
      <button
        className={`p-0 text-[12px] ${isRest ? 'bg-slate-400' : 'bg-slate-300'}
         `}
        onClick={() => {
          dispatch(removeExeById(id));
        }}
      >
        ✖️
      </button>
    </div>
  );
};

export default ExcerciseElement;
