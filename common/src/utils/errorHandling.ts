/* eslint-disable no-console */
import { SupabaseErrorStatus } from '@database/database.types';

const baseErrorMessage = 'An error occurred while processing the request';

export const handleError = (status: SupabaseErrorStatus, idLabel?: string) => {
  const errorMessage = idLabel ? baseErrorMessage : `${baseErrorMessage} "${idLabel}"`;
  console.log(errorMessage);

  // TODO: Add more error handling if needed
};
