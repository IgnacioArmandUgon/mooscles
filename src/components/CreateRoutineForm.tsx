import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExercise, deleteRoutine, setRoutine } from '../store/routineSlice';
import { RootState } from '../store/store';
import ExcerciseElement from './ExcerciseElement';

const RestTimeMap = {
  1: '0:30',
  2: '1:00',
  3: '2:00',
  4: '3:00',
  5: '4:00',
};

const CreateRoutineForm = () => {
  const getRestSelected = (): string => {
    return RestTimeMap[document.getElementById('rest')![0].value];
  };

  const { routine } = useSelector((state: RootState) => state.routineStore);
  const dispatch = useDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      {
        const getExeById = (id) => routine.find((exe) => exe.id === id);
        const oldIndex = routine.indexOf(getExeById(active.id)!);
        const newIndex = routine.indexOf(getExeById(over.id)!);

        const newArray = arrayMove(routine, oldIndex, newIndex);

        dispatch(setRoutine(newArray));
      }
    }
  }

  return (
    <div className='p-2 my-2 rounded-md border-white border-dotted border-2'>
      <div className='mb-3 flex align-middle gap-2 h-[35px]'>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={routine} strategy={verticalListSortingStrategy}>
            {routine.length > 0 ? (
              routine.map((exe, i) => {
                return <ExcerciseElement isRest={Object.values(RestTimeMap).includes(exe.name)} exe={exe} key={i} />;
              })
            ) : (
              <h3 className='text-slate-500 text-[16px] h-4 my-auto'>Agrega ejercicios...</h3>
            )}
          </SortableContext>
        </DndContext>
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <select name='rest' placeholder='tiempo' id='rest' className='px-2 rounded-sm '>
            {Object.keys(RestTimeMap).map((key) => (
              <option value={key} key={key}>
                {RestTimeMap[key]}
              </option>
            ))}
          </select>
          <button onClick={() => dispatch(addExercise({ name: getRestSelected(), id: Date.now() }))}>Agregar descanso</button>
          {routine.length > 0 && <button onClick={() => dispatch(deleteRoutine())}>Limpiar</button>}
        </div>
        <button disabled={routine.length < 3}>Guardar</button>
      </div>
    </div>
  );
};

export default CreateRoutineForm;
