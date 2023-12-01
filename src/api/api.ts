export interface Exercise {
    "name":  string,
    "type": string,
    "muscle": string,
    "equipment": string,
    "difficulty": string,
    "instructions":string
  }

export const getExercisesByMuscle = async (muscle: string): Promise<Exercise[] | undefined> => { 
    try {
        const resp = await fetch('https://api.api-ninjas.com/v1/exercises?muscle=' + muscle, {
            method: 'GET',
            headers: { 'X-Api-Key': 'EwfIdcE5brqbnHufb1GgAA==f9jakT46hLd2TODz' }
        })
        const data = await resp.json()
        return data
    } catch (error) {
        console.log({error})
    }
}