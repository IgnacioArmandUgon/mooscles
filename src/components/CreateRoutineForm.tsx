import React, { useRef, useState } from 'react';
import ExcerciseElement from './ExcerciseElement';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

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
  exercisesList: { name: string, id: number }[];
  setExercisesList: (exe: { name: string, id: number }[]) => void;
}) => {
  const getRestSelected = (): string => {
    return RestTimeMap[document.getElementById('rest')![0].value];
  };

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

        const getExeById = (id) => exercisesList.find((exe) => exe.id === id)
        const oldIndex = exercisesList.indexOf(getExeById(active.id)!);
        const newIndex = exercisesList.indexOf(getExeById(over.id)!);

        const newArray = arrayMove(exercisesList, oldIndex, newIndex);

        setExercisesList(newArray);
      }
    }
  }

  return (
    <div className='m-4'>
      <div className='my-3 flex align-middle gap-2 h-[35px]'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={exercisesList}
            strategy={verticalListSortingStrategy}
          >
            {exercisesList.length > 0 ? (
              exercisesList.map((exe, i) => {
                return (
                  <ExcerciseElement isRest={Object.values(RestTimeMap).includes(exe.name)} exe={exe} key={i} />
                );
              })
            ) : (
              <h3 className='text-slate-500 text-[16px] h-4 my-auto'>Agrega ejercicios...</h3>
            )}
          </SortableContext>
        </DndContext>
      </div>

      <div className='flex gap-2'>
        <select name='rest' placeholder='tiempo' id='rest' className='px-2 rounded-sm '>
          {Object.keys(RestTimeMap).map((key) => (
            <option value={key} key={key}>
              {RestTimeMap[key]}
            </option>
          ))}
        </select>
        <button onClick={() => setExercisesList([...exercisesList, { name: getRestSelected(), id: Date.now() }])}>Agregar descanso</button>
        {exercisesList.length > 0 && <button onClick={() => setExercisesList([])}>Limpiar</button>}
      </div>
    </div>
  );
};

export default CreateRoutineForm;
