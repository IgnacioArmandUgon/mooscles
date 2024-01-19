import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import appFirebase from '../credenciales';
import { routineExer } from './Routines';
import ExcerciseElement from '../components/ExcerciseElement';
import { RestTimeMap } from '../components/CreateRoutineForm';
interface routineFromDb {
  author: string;
  routine: routineExer[];
}

const RoutinesList = () => {
  const [routinesList, setRoutinesList] = useState<routineFromDb[]>([]);

  const db = getFirestore(appFirebase);

  const getRoutines = () => {
    getDocs(collection(db, 'Routines')).then((querySnapshot) => {
      let routines: routineFromDb[] = [];
      querySnapshot.forEach((doc) => {
        routines.push(doc.data() as routineFromDb);
      });
      setRoutinesList(routines);
    });
  };

  useEffect(() => {
    getRoutines();
  }, []);
  console.log({ routinesList });
  return (
    <div>
      <h1 className='my-10'>Lista de routinas</h1>
      <div className='flex flex-col gap-2'>
        {routinesList.map(({ author, routine }) => {
          return (
            <div className='flex justify-between'>
              <div className='flex gap-1'>
                {routine.map((exe, i) => {
                  return <ExcerciseElement isRest={Object.values(RestTimeMap).includes(exe.name)} exe={exe} key={i} />;
                })}
              </div>
              <h3>Creada por: {author}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoutinesList;
