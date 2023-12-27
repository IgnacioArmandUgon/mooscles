export interface Exercise {
  bodyPart: BodyPartType;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: [];
  instructions: string[];
}

export type BodyPartType =
  | 'back'
  | 'cardio'
  | 'chest'
  | 'lower arms'
  | 'lower legs'
  | 'neck'
  | 'shoulders'
  | 'upper arms'
  | 'upper legs'
  | 'waist'
  | '';

export const getExercisesByBodyPart = async (bodyPart: BodyPartType): Promise<Exercise[] | undefined> => {
  try {
    const resp = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=20`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3ca5df8a13msh75476a7cdf85b28p13782ajsn66fbf6ddaee9',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error({ error });
  }
};
