import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import { Exercise, getExercisesByMuscle } from '../api/api'

export const Home = () => {
    const [exercises, setExercises] = useState<Exercise[]>()
    const getExercises = async () => {
        const data = await getExercisesByMuscle('biceps')
        setExercises(data)
    }
    useEffect(() => {
        getExercises()
    }, [])

    return (
        <div className='m-2'>
            <PageTitle>Aquí están tus moocles</PageTitle>

            {
                exercises?.map((ex) => <p>{ex.name}</p>)
            }

        </div>
    )
}
