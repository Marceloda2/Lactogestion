export const logError = (context: string, error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.warn(`[${context}] ${errorMessage}`);
  return errorMessage;
};

export const isApiError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const formatApiError = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message;
  }
  return 'An unexpected error occurred';
};