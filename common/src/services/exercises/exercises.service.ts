import { SupabaseErrorStatus, SupabaseResponseType } from '@database/api.types';
import commonSupabaseInstance from '@database/supabase.instance';
import { GetExercisesResponseData } from './exercises.types';
import { handleError } from '@utils/errorHandling';

const ExercisesService = {
  getExercises: async (): Promise<SupabaseResponseType<GetExercisesResponseData>> => {
    const { data, error } = await commonSupabaseInstance.from('exercises').select('*');

    if (error) {
      handleError(SupabaseErrorStatus.GENERIC_ERROR, 'exercises list');

      return {
        error: {
          message: 'Error fetching exercises',
          status: SupabaseErrorStatus.GENERIC_ERROR,
        },
      };
    }

    return {
      data,
    };
  },
};

export default ExercisesService;
