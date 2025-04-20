export enum SupabaseErrorStatus {
  GENERIC_ERROR = 'generic_error',
}

export type SupabaseResponseType<D> = {
  data?: D;
  error?: {
    message: string;
    status: SupabaseErrorStatus;
  };
};
